-- Table 11: transform_sync_or_utilization_rate
-- New PK: hoscode, op_year
DELETE FROM transform_sync_or_utilization_rate WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_or_utilization_rate GROUP BY hoscode, op_year
);
ALTER TABLE transform_sync_or_utilization_rate DROP CONSTRAINT pk_transform_sync_or_utilization_rate;
ALTER TABLE transform_sync_or_utilization_rate ADD CONSTRAINT pk_transform_sync_or_utilization_rate PRIMARY KEY (hoscode, op_year);
