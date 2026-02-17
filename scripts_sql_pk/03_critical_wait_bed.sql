-- Table 3: transform_sync_critical_wait_bed
-- New PK: hoscode, yr
DELETE FROM transform_sync_critical_wait_bed WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_critical_wait_bed GROUP BY hoscode, yr
);
ALTER TABLE transform_sync_critical_wait_bed DROP CONSTRAINT pk_transform_sync_critical_wait_bed;
ALTER TABLE transform_sync_critical_wait_bed ADD CONSTRAINT pk_transform_sync_critical_wait_bed PRIMARY KEY (hoscode, yr);
