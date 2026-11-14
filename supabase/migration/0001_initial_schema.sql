-- STRYDE initial schema. Run with Supabase CLI: supabase db push
create extension if not exists pgcrypto;

create type public.order_status as enum ('pending','paid','processing','shipped','delivered','cancelled','refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('customer','admin'))
);
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  recipient text not null,
  line1 text not null,
  line2 text,
  city text not null,
  region text,
  postal_code text not null,
  country text not null default 'Philippines',
  phone text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  logo_url text,
  description text,
  created_at timestamptz not null default now()
);
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);
create table public.products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references public.brands(id),
  category_id uuid references public.categories(id),
  name text not null,
  slug text not null unique,
  description text,
  color text,
  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2),
  status text not null default 'draft' check (status in ('draft','active','archived')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order int not null default 0
);
create table public.inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size_label text not null,
  stock int not null default 0 check (stock >= 0),
  unique(product_id,size_label)
);
create table public.wishlists (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id,product_id)
);
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  status public.order_status not null default 'pending',
  subtotal numeric(12,2) not null,
  shipping_total numeric(12,2) not null default 0,
  total numeric(12,2) not null,
  currency text not null default 'PHP',
  shipping_address jsonb not null,
  payment_provider text,
  provider_reference text unique,
  created_at timestamptz not null default now()
);
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  size_label text not null,
  unit_price numeric(12,2) not null,
  quantity int not null check (quantity > 0)
);
create table public.promotions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percentage','fixed')),
  discount_value numeric(12,2) not null check (discount_value > 0),
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean not null default false
);
create table public.editorial_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body text,
  cover_image text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.user_roles where user_id = auth.uid() and role = 'admin') $$;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.addresses enable row level security;
alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.inventory enable row level security;
alter table public.wishlists enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.promotions enable row level security;
alter table public.editorial_posts enable row level security;

create policy "profiles read own" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
create policy "profiles update own" on public.profiles for update to authenticated using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy "roles read own or admin" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy "addresses own all" on public.addresses for all to authenticated using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "public brands" on public.brands for select to anon, authenticated using (true);
create policy "public categories" on public.categories for select to anon, authenticated using (true);
create policy "public active products" on public.products for select to anon, authenticated using (status = 'active' or public.is_admin());
create policy "public product images" on public.product_images for select to anon, authenticated using (exists(select 1 from public.products p where p.id=product_id and p.status='active') or public.is_admin());
create policy "inventory public read" on public.inventory for select to anon, authenticated using (true);
create policy "wishlist own" on public.wishlists for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "orders own read" on public.orders for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy "order items own read" on public.order_items for select to authenticated using (exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin())));
create policy "active promotions public" on public.promotions for select to anon, authenticated using (active = true);
create policy "published editorial public" on public.editorial_posts for select to anon, authenticated using (published = true or public.is_admin());

-- Admin write access for catalog/editorial operations.
create policy "admin manages brands" on public.brands for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages categories" on public.categories for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages products" on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages images" on public.product_images for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages inventory" on public.inventory for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages promotions" on public.promotions for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages editorial" on public.editorial_posts for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin updates order status" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Safe inventory decrement primitive. Call only from a trusted server-side checkout function.
create or replace function public.reserve_inventory(p_product_id uuid, p_size_label text, p_quantity integer)
returns boolean language plpgsql security definer set search_path = public
as $$
declare affected integer;
begin
  if p_quantity < 1 then raise exception 'Quantity must be positive'; end if;
  update public.inventory set stock = stock - p_quantity
  where product_id = p_product_id and size_label = p_size_label and stock >= p_quantity;
  get diagnostics affected = row_count;
  return affected = 1;
end;
$$;
revoke all on function public.reserve_inventory(uuid,text,integer) from public, anon, authenticated;
-- Grant execute only to service_role via trusted Edge Function environment.
grant execute on function public.reserve_inventory(uuid,text,integer) to service_role;
