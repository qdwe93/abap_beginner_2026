REPORT zedu##_u15.

TYPE-POOLS: slis.

DATA: gt_list TYPE TABLE OF zedu##_s_list,
      gs_list TYPE zedu##_s_list.

START-OF-SELECTION.
  PERFORM get_data.
  PERFORM show_alv.

FORM get_data.
* TODO 1: 주문+고객+제품 JOIN 결과를 gt_list에 조회하세요.
* TODO 2: LOOP/MODIFY로 amount를 채우세요.
ENDFORM.

FORM show_alv.
  DATA ls_layout TYPE slis_layout_alv.
* TODO 3: zebra/컬럼폭을 설정하고 REUSE_ALV_GRID_DISPLAY를 호출하세요.
ENDFORM.
