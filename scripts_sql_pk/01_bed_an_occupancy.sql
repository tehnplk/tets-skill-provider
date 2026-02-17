-- Table 1: transform_sync_bed_an_occupancy
-- New PK: hoscode, an_censored, bedno, export_code, regdate, dchdate
DELETE FROM transform_sync_bed_an_occupancy WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_bed_an_occupancy GROUP BY hoscode, an_censored, bedno, export_code, regdate, dchdate
);
ALTER TABLE transform_sync_bed_an_occupancy DROP CONSTRAINT pk_transform_sync_bed_an_occupancy;
ALTER TABLE transform_sync_bed_an_occupancy ADD CONSTRAINT pk_transform_sync_bed_an_occupancy PRIMARY KEY (hoscode, an_censored, bedno, export_code, regdate, dchdate);
