-- Table 15: transform_sync_waiting_time_hernia
-- New PK: hoscode, visit_year
DELETE FROM transform_sync_waiting_time_hernia WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_waiting_time_hernia GROUP BY hoscode, visit_year
);
ALTER TABLE transform_sync_waiting_time_hernia DROP CONSTRAINT pk_transform_sync_waiting_time_hernia;
ALTER TABLE transform_sync_waiting_time_hernia ADD CONSTRAINT pk_transform_sync_waiting_time_hernia PRIMARY KEY (hoscode, visit_year);
