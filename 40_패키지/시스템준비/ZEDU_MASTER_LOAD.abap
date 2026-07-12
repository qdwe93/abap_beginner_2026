REPORT zedu_master_load.

DATA: gt_cust TYPE TABLE OF zedu_cust,
      gs_cust TYPE zedu_cust,
      gt_prod TYPE TABLE OF zedu_prod,
      gs_prod TYPE zedu_prod.

START-OF-SELECTION.
  CLEAR gs_cust.
  gs_cust-cust_id = 'C00001'. gs_cust-cust_name = '한빛상사'.
  gs_cust-city = '서울'. gs_cust-phone = '02-1234-5678'. APPEND gs_cust TO gt_cust.
  CLEAR gs_cust.
  gs_cust-cust_id = 'C00002'. gs_cust-cust_name = '대한물산'.
  gs_cust-city = '부산'. gs_cust-phone = '051-987-6543'. APPEND gs_cust TO gt_cust.
  CLEAR gs_cust.
  gs_cust-cust_id = 'C00003'. gs_cust-cust_name = '미래유통'.
  gs_cust-city = '대전'. gs_cust-phone = '042-333-2222'. APPEND gs_cust TO gt_cust.
  CLEAR gs_cust.
  gs_cust-cust_id = 'C00004'. gs_cust-cust_name = '청담기획'.
  gs_cust-city = '서울'. gs_cust-phone = '02-555-7777'. APPEND gs_cust TO gt_cust.
  CLEAR gs_cust.
  gs_cust-cust_id = 'C00005'. gs_cust-cust_name = '동해상회'.
  gs_cust-city = '강릉'. gs_cust-phone = '033-111-2222'. APPEND gs_cust TO gt_cust.

  CLEAR gs_prod.
  gs_prod-prod_id = 'P0000001'. gs_prod-prod_name = '노트북 15인치'.
  gs_prod-price = '1200000.00'. APPEND gs_prod TO gt_prod.
  CLEAR gs_prod.
  gs_prod-prod_id = 'P0000002'. gs_prod-prod_name = '모니터 27인치'.
  gs_prod-price = '350000.00'. APPEND gs_prod TO gt_prod.
  CLEAR gs_prod.
  gs_prod-prod_id = 'P0000003'. gs_prod-prod_name = '기계식 키보드'.
  gs_prod-price = '45000.00'. APPEND gs_prod TO gt_prod.
  CLEAR gs_prod.
  gs_prod-prod_id = 'P0000004'. gs_prod-prod_name = '무선 마우스'.
  gs_prod-price = '25000.00'. APPEND gs_prod TO gt_prod.
  CLEAR gs_prod.
  gs_prod-prod_id = 'P0000005'. gs_prod-prod_name = 'USB-C 도킹스테이션'.
  gs_prod-price = '180000.00'. APPEND gs_prod TO gt_prod.
  CLEAR gs_prod.
  gs_prod-prod_id = 'P0000006'. gs_prod-prod_name = '웹캠 FHD'.
  gs_prod-price = '60000.00'. APPEND gs_prod TO gt_prod.
  CLEAR gs_prod.
  gs_prod-prod_id = 'P0000007'. gs_prod-prod_name = '사무용 의자'.
  gs_prod-price = '250000.00'. APPEND gs_prod TO gt_prod.
  CLEAR gs_prod.
  gs_prod-prod_id = 'P0000008'. gs_prod-prod_name = '화이트보드'.
  gs_prod-price = '90000.00'. APPEND gs_prod TO gt_prod.

  DELETE FROM zedu_cust.
  DELETE FROM zedu_prod.
  INSERT zedu_cust FROM TABLE gt_cust.
  IF sy-subrc <> 0. ROLLBACK WORK. MESSAGE '고객 적재 실패' TYPE 'E'. ENDIF.
  INSERT zedu_prod FROM TABLE gt_prod.
  IF sy-subrc <> 0. ROLLBACK WORK. MESSAGE '제품 적재 실패' TYPE 'E'. ENDIF.
  COMMIT WORK.
  MESSAGE '고객 5건/제품 8건 적재 완료' TYPE 'S'.
