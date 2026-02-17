-- Table 13: transform_sync_refer_top10
-- New PK: hoscode, icd10
DELETE FROM transform_sync_refer_top10 WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_refer_top10 GROUP BY hoscode, icd10
);
ALTER TABLE transform_sync_refer_top10 DROP CONSTRAINT pk_transform_sync_refer_top10;
ALTER TABLE transform_sync_refer_top10 ADD CONSTRAINT pk_transform_sync_refer_top10 PRIMARY KEY (hoscode, icd10);
