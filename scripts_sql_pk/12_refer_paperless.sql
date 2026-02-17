-- Table 12: transform_sync_refer_paperless
-- New PK: hoscode, y, m
DELETE FROM transform_sync_refer_paperless WHERE ctid NOT IN (
  SELECT MIN(ctid) FROM transform_sync_refer_paperless GROUP BY hoscode, y, m
);
ALTER TABLE transform_sync_refer_paperless DROP CONSTRAINT pk_transform_sync_refer_paperless;
ALTER TABLE transform_sync_refer_paperless ADD CONSTRAINT pk_transform_sync_refer_paperless PRIMARY KEY (hoscode, y, m);
