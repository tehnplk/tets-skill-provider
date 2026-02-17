SELECT
  t.table_name,
  c.ordinal_position AS col_num,
  c.column_name,
  c.data_type,
  c.character_maximum_length,
  c.is_nullable,
  CASE WHEN kcu.column_name IS NOT NULL THEN 'Y' ELSE 'N' END AS is_pk
FROM information_schema.tables t
JOIN information_schema.columns c
  ON t.table_name = c.table_name AND t.table_schema = c.table_schema
LEFT JOIN information_schema.table_constraints tc
  ON tc.table_name = t.table_name AND tc.table_schema = t.table_schema AND tc.constraint_type = 'PRIMARY KEY'
LEFT JOIN information_schema.key_column_usage kcu
  ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema AND kcu.column_name = c.column_name
WHERE t.table_schema = 'public'
  AND t.table_name LIKE 'transform_%'
ORDER BY t.table_name, c.ordinal_position;
