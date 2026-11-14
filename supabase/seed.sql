insert into public.brands(name,slug) values
('Nike','nike'),('Adidas','adidas'),('New Balance','new-balance'),('Asics','asics'),('Puma','puma'),('Converse','converse'),('Salomon','salomon')
on conflict do nothing;
insert into public.categories(name,slug) values
('Lifestyle','lifestyle'),('Running','running'),('Streetwear','streetwear'),('Outdoor','outdoor')
on conflict do nothing;
