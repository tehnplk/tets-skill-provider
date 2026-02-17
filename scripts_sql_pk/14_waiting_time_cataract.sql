-- Table 14: transform_sync_waiting_time_cataract
-- New PK: hoscode, visit_year
DELETE FROM transform_sync_waiting_time_cataract WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_waiting_time_cataract GROUP BY hoscode, visit_year
);
ALTER TABLE transform_sync_waiting_time_cataract DROP CONSTRAINT pk_transform_sync_waiting_time_cataract;
ALTER TABLE transform_sync_waiting_time_cataract ADD CONSTRAINT pk_transform_sync_waiting_time_cataract PRIMARY KEY (hoscode, visit_year);
