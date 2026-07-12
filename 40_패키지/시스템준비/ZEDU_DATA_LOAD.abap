REPORT zedu_data_load.

PARAMETERS: p_no    TYPE n LENGTH 2 OBLIGATORY,
            p_reset AS CHECKBOX DEFAULT 'X'.

TYPES: BEGIN OF ty_seed,
         order_id TYPE n LENGTH 10,
         cust_id  TYPE c LENGTH 6,
         prod_id  TYPE c LENGTH 8,
         quantity TYPE i,
         status   TYPE c LENGTH 1,
         days     TYPE i,
         remark   TYPE c LENGTH 40,
       END OF ty_seed.

DATA: gt_seed TYPE TABLE OF ty_seed,
      gs_seed TYPE ty_seed,
      gv_tabname TYPE tabname,
      gr_table TYPE REF TO data.

FIELD-SYMBOLS: <gt_order> TYPE STANDARD TABLE,
               <gs_order> TYPE any,
               <gv_value> TYPE any.

DEFINE add_seed.
  CLEAR gs_seed.
  gs_seed-order_id = &1.
  gs_seed-cust_id  = &2.
  gs_seed-prod_id  = &3.
  gs_seed-quantity = &4.
  gs_seed-status   = &5.
  gs_seed-days     = &6.
  gs_seed-remark   = &7.
  APPEND gs_seed TO gt_seed.
END-OF-DEFINITION.

START-OF-SELECTION.
  CONCATENATE 'ZEDU' p_no '_ORDER' INTO gv_tabname.

  TRY.
      CREATE DATA gr_table TYPE STANDARD TABLE OF (gv_tabname).
    CATCH cx_sy_create_data_error.
      MESSAGE '학생 주문 테이블이 없거나 활성화되지 않았습니다.' TYPE 'E'.
  ENDTRY.
  ASSIGN gr_table->* TO <gt_order>.

  add_seed '0000000001' 'C00001' 'P0000001'  2 'N'  3 '긴급'.
  add_seed '0000000002' 'C00002' 'P0000002'  5 'C'  7 ''.
  add_seed '0000000003' 'C00003' 'P0000003' 10 'N' 10 ''.
  add_seed '0000000004' 'C00004' 'P0000004'  1 'X' 14 '취소 요청'.
  add_seed '0000000005' 'C00005' 'P0000005'  8 'N' 18 ''.
  add_seed '0000000006' 'C00001' 'P0000006' 15 'C' 22 '설치 포함'.
  add_seed '0000000007' 'C00002' 'P0000007'  3 'N' 26 ''.
  add_seed '0000000008' 'C00003' 'P0000008' 20 'X' 30 ''.
  add_seed '0000000009' 'C00004' 'P0000001'  4 'N' 34 ''.
  add_seed '0000000010' 'C00005' 'P0000002' 12 'C' 38 ''.
  add_seed '0000000011' 'C00001' 'P0000003' 30 'N' 42 '대량 주문'.
  add_seed '0000000012' 'C00002' 'P0000004'  6 'N' 46 ''.
  add_seed '0000000013' 'C00003' 'P0000005'  9 'C' 50 ''.
  add_seed '0000000014' 'C00004' 'P0000006'  2 'X' 54 ''.
  add_seed '0000000015' 'C00005' 'P0000007'  7 'N' 58 ''.
  add_seed '0000000016' 'C00001' 'P0000008' 18 'C' 63 '회의실 비품'.
  add_seed '0000000017' 'C00002' 'P0000001'  1 'N' 68 ''.
  add_seed '0000000018' 'C00003' 'P0000002' 25 'X' 73 '고객 취소'.
  add_seed '0000000019' 'C00004' 'P0000003' 11 'C' 79 ''.
  add_seed '0000000020' 'C00005' 'P0000004' 14 'N' 85 '빠른 배송'.

  LOOP AT gt_seed INTO gs_seed.
    APPEND INITIAL LINE TO <gt_order> ASSIGNING <gs_order>.
    ASSIGN COMPONENT 'MANDT' OF STRUCTURE <gs_order> TO <gv_value>.
    <gv_value> = sy-mandt.
    ASSIGN COMPONENT 'ORDER_ID' OF STRUCTURE <gs_order> TO <gv_value>.
    <gv_value> = gs_seed-order_id.
    ASSIGN COMPONENT 'CUST_ID' OF STRUCTURE <gs_order> TO <gv_value>.
    <gv_value> = gs_seed-cust_id.
    ASSIGN COMPONENT 'PROD_ID' OF STRUCTURE <gs_order> TO <gv_value>.
    <gv_value> = gs_seed-prod_id.
    ASSIGN COMPONENT 'QUANTITY' OF STRUCTURE <gs_order> TO <gv_value>.
    <gv_value> = gs_seed-quantity.
    ASSIGN COMPONENT 'STATUS' OF STRUCTURE <gs_order> TO <gv_value>.
    <gv_value> = gs_seed-status.
    ASSIGN COMPONENT 'ORDER_DATE' OF STRUCTURE <gs_order> TO <gv_value>.
    <gv_value> = sy-datum - gs_seed-days.
    ASSIGN COMPONENT 'REMARK' OF STRUCTURE <gs_order> TO <gv_value>.
    <gv_value> = gs_seed-remark.
    ASSIGN COMPONENT 'ERNAM' OF STRUCTURE <gs_order> TO <gv_value>.
    <gv_value> = sy-uname.
  ENDLOOP.

  IF p_reset = 'X'.
    DELETE FROM (gv_tabname).
  ENDIF.

  INSERT (gv_tabname) FROM TABLE <gt_order> ACCEPTING DUPLICATE KEYS.
  IF sy-subrc = 0 AND sy-dbcnt = 20.
    COMMIT WORK.
    MESSAGE '주문 20건 생성 완료' TYPE 'S'.
  ELSE.
    ROLLBACK WORK.
    MESSAGE '주문 적재 실패: 초기화 옵션과 기존 키를 확인하세요.' TYPE 'E'.
  ENDIF.
