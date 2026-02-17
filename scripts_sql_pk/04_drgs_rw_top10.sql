-- Table 4: transform_sync_drgs_rw_top10
-- New PK: hoscode, y, m, drgs_code
DELETE FROM transform_sync_drgs_rw_top10 WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_drgs_rw_top10 GROUP BY hoscode, y, m, drgs_code
);
ALTER TABLE transform_sync_drgs_rw_top10 DROP CONSTRAINT pk_transform_sync_drgs_rw_top10;
ALTER TABLE transform_sync_drgs_rw_top10 ADD CONSTRAINT pk_transform_sync_drgs_rw_top10 PRIMARY KEY (hoscode, y, m, drgs_code);
