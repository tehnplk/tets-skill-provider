-- Table 5: transform_sync_drgs_sum
-- New PK: hoscode, y, m
DELETE FROM transform_sync_drgs_sum WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_drgs_sum GROUP BY hoscode, y, m
);
ALTER TABLE transform_sync_drgs_sum DROP CONSTRAINT pk_transform_sync_drgs_sum;
ALTER TABLE transform_sync_drgs_sum ADD CONSTRAINT pk_transform_sync_drgs_sum PRIMARY KEY (hoscode, y, m);
