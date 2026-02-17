-- Table 9: transform_sync_mortality_sepsis
-- New PK: hoscode, discharge_year
DELETE FROM transform_sync_mortality_sepsis WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_mortality_sepsis GROUP BY hoscode, discharge_year
);
ALTER TABLE transform_sync_mortality_sepsis DROP CONSTRAINT pk_transform_sync_mortality_sepsis;
ALTER TABLE transform_sync_mortality_sepsis ADD CONSTRAINT pk_transform_sync_mortality_sepsis PRIMARY KEY (hoscode, discharge_year);
