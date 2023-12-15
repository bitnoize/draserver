INSERT INTO "Categories" (category_name, category_redirect_url, category_redirect_type)
VALUES
  ('автошколы', 'https://uslugipoisk.ru/kak-vybrat-avtoshkolu/', 302),
  ('кредиты', 'https://uslugipoisk.ru/7-sovetov-po-vyboru-kreditovaniya-dlya-biznesa/', 302),
  ('автосервисы', 'https://uslugipoisk.ru/7-sovetov-po-vyboru-avtoservisa-nadezhnost-opyt-i-prozrachnost-uslug/', 302);

INSERT INTO "CategoryDomains" (category_id, domain_name)
VALUES
  (1, 'carkadeservice.ru'),
  (1, 'katalizatorperm.ru'),
  (1, 'ptomasterkran.ru'),
  (2, 'whiteform.ru'),
  (2, 'ais18.ru');

