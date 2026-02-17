-- Table 8: transform_sync_mortality_ami
-- New PK: hoscode, discharge_year
DELETE FROM transform_sync_mortality_ami WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_mortality_ami GROUP BY hoscode, discharge_year
);
ALTER TABLE transform_sync_mortality_ami DROP CONSTRAINT pk_transform_sync_mortality_ami;
ALTER TABLE transform_sync_mortality_ami ADD CONSTRAINT pk_transform_sync_mortality_ami PRIMARY KEY (hoscode, discharge_year);
