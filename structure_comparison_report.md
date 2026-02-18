# Comparison Report: Database Structure Tables

> **Generated:** 2026-02-17
> **Source 1 (Plan):** `structure_transform.md` (Local Plan)
> **Source 2 (Actual):** `remote_structure_db.md` (Remote Database State)

This report compares the **Column Count** and **Primary Key (PK) definitions** between the planned structure and the actual structure on the remote database.

## Summary

| Table                                            | Column Count Match? | PK Definition Match? | Discrepancies |
| ------------------------------------------------ | ------------------- | -------------------- | ------------- |
| **0. transform_sync_test**                       | ✅ YES              | ✅ YES               | -             |
| **1. transform_sync_bed_an_occupancy**           | ✅ YES              | ✅ YES               | -             |
| **2. transform_sync_bed_type_all**               | ✅ YES              | ✅ YES               | -             |
| **3. transform_sync_critical_wait_bed**          | ✅ YES              | ✅ YES               | -             |
| **4. transform_sync_drgs_rw_top10**              | ✅ YES              | ✅ YES               | -             |
| **5. transform_sync_drgs_sum**                   | ✅ YES              | ✅ YES               | -             |
| **6. transform_sync_icu_semi_icu_case_realtime** | ✅ YES              | ✅ YES               | -             |
| **7. transform_sync_icu_ward_death**             | ✅ YES              | ✅ YES               | -             |
| **8. transform_sync_mortality_ami**              | ✅ YES              | ✅ YES               | -             |
| **9. transform_sync_mortality_sepsis**           | ✅ YES              | ✅ YES               | -             |
| **10. transform_sync_normal_ward_death**         | ✅ YES              | ✅ YES               | -             |
| **11. transform_sync_or_utilization_rate**       | ✅ YES              | ✅ YES               | -             |
| **12. transform_sync_refer_paperless**           | ✅ YES              | ✅ YES               | -             |
| **13. transform_sync_refer_top10**               | ✅ YES              | ✅ YES               | -             |
| **14. transform_sync_waiting_time_cataract**     | ✅ YES              | ✅ YES               | -             |
| **15. transform_sync_waiting_time_hernia**       | ✅ YES              | ✅ YES               | -             |

## Detailed Comparison

### 1. Column Count Verified

All 16 tables have the exact same columns in both files. No missing or extra columns found.

### 2. Primary Key Verified

The `new composite key(Y/n)` in `structure_transform.md` perfectly matches the `PK` column in `remote_structure_db.md` for all tables.

- **Table 0:** PK = `hoscode`
- **Table 1:** PK = `hoscode, an_censored, bedno, export_code, regdate, dchdate`
- **Table 2:** PK = `hoscode, export_code, bedno, bedtype, roomno`
- **Table 3:** PK = `hoscode, yr`
- **Table 4:** PK = `hoscode, y, m, drgs_code`
- **Table 5:** PK = `hoscode, y, m`
- **Table 6:** PK = `hoscode`
- **Table 7:** PK = `hoscode, y, pdx`
- **Table 8:** PK = `hoscode, discharge_year`
- **Table 9:** PK = `hoscode, discharge_year`
- **Table 10:** PK = `hoscode, y, pdx`
- **Table 11:** PK = `hoscode, op_year`
- **Table 12:** PK = `hoscode, y, m`
- **Table 13:** PK = `hoscode, icd10`
- **Table 14:** PK = `hoscode, visit_year`
- **Table 15:** PK = `hoscode, visit_year`

## Conclusion

The remote database structure is **100% synchronized** with the transformation plan.
