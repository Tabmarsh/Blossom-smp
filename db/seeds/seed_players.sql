-- Seed players from the README tier list
-- Run with psql or paste into Supabase SQL editor

insert into players (username, display_name, points, rank, created_at)
values
  ('Synixa1', 'Synixa1', 0, 1, now()),
  ('ZYC_ZENYY', 'ZYC_ZENYY', 0, 2, now()),
  ('TabMarsh', 'TabMarsh', 0, 3, now()),
  ('Galaabored12', 'Galaabored12', 0, 4, now()),
  ('idregalka', 'idregalka', 0, 5, now()),
  ('NigthFurry', 'NigthFurry', 0, 6, now()),
  ('Dante', 'Dante', 0, 7, now()),
  ('plum', 'plum', 0, 8, now()),
  ('TtpFive', 'TtpFive', 0, 9, now()),
  ('Otakibn', 'Otakibn', 0, 10, now())
;

-- If you want to avoid duplicates when re-running, use:
-- insert into players (username, display_name, points, rank, created_at)
-- select * from (
--   values
--     ('Synixa1','Synixa1',0,1,now()),
--     ('ZYC_ZENYY','ZYC_ZENYY',0,2,now())
-- ) as v(username, display_name, points, rank, created_at)
-- on conflict (username) do nothing;
