-- Table 6: transform_sync_icu_semi_icu_case_realtime
-- New PK: hoscode
DELETE FROM transform_sync_icu_semi_icu_case_realtime WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_icu_semi_icu_case_realtime GROUP BY hoscode
);
ALTER TABLE transform_sync_icu_semi_icu_case_realtime DROP CONSTRAINT pk_transform_sync_icu_semi_icu_case_realtime;
ALTER TABLE transform_sync_icu_semi_icu_case_realtime ADD CONSTRAINT pk_transform_sync_icu_semi_icu_case_realtime PRIMARY KEY (hoscode);
