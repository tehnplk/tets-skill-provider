-- Table 7: transform_sync_icu_ward_death
-- New PK: hoscode, y, pdx
DELETE FROM transform_sync_icu_ward_death WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_icu_ward_death GROUP BY hoscode, y, pdx
);
ALTER TABLE transform_sync_icu_ward_death DROP CONSTRAINT pk_transform_sync_icu_ward_death;
ALTER TABLE transform_sync_icu_ward_death ADD CONSTRAINT pk_transform_sync_icu_ward_death PRIMARY KEY (hoscode, y, pdx);
