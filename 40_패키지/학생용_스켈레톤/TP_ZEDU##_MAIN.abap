REPORT zedu##_main.

TYPE-POOLS: slis.
DATA: gt_list TYPE TABLE OF zedu##_s_list,
      gs_list TYPE zedu##_s_list,
      gs_order TYPE zedu##_order.

SELECT-OPTIONS: s_ordid FOR gs_order-order_id,
                s_cust  FOR gs_order-cust_id,
                s_date  FOR gs_order-order_date.
PARAMETERS p_stat TYPE zedu##_status.

INITIALIZATION.
  CLEAR s_date.
  s_date-sign = 'I'. s_date-option = 'BT'.
  s_date-low = sy-datum - 90. s_date-high = sy-datum.
  APPEND s_date.

START-OF-SELECTION.
  PERFORM get_data.
  PERFORM show_alv.

FORM get_data.
* TODO TP-1: JOIN 조회, 상태 필터, 금액 계산, 정렬을 작성하세요.
ENDFORM.

FORM show_alv.
* TODO TP-1: REUSE_ALV_GRID_DISPLAY와 두 콜백을 연결하세요.
ENDFORM.

FORM set_status USING pt_extab TYPE slis_t_extab.
  SET PF-STATUS 'MAIN' EXCLUDING pt_extab.
ENDFORM.

FORM user_command USING pv_ucomm LIKE sy-ucomm
                        ps_selfield TYPE slis_selfield.
  CASE pv_ucomm.
    WHEN 'FC_ADD'.  PERFORM create_order.
    WHEN 'FC_EDIT'. PERFORM change_order USING ps_selfield-tabindex.
    WHEN 'FC_DEL'.  PERFORM delete_order USING ps_selfield-tabindex.
  ENDCASE.
  PERFORM get_data.
  ps_selfield-refresh = 'X'.
ENDFORM.

FORM create_order.
* TODO TP-2: 팝업 → FM 검증 → MAX+1 → INSERT → 메시지를 작성하세요.
ENDFORM.

FORM change_order USING pv_index TYPE sytabix.
* TODO TP-3: 행 확인 → C/X 차단 → 팝업 → 검증 → UPDATE를 작성하세요.
ENDFORM.

FORM delete_order USING pv_index TYPE sytabix.
* TODO TP-4: 행 확인 → N 검사 → 확인 팝업 → DELETE를 작성하세요.
ENDFORM.
