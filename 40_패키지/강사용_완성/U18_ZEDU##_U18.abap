REPORT zedu##_u18.

PARAMETERS p_qty TYPE zedu_qty.

START-OF-SELECTION.
  IF p_qty <= 0.
    MESSAGE s012(zedu##_msg) DISPLAY LIKE 'E'.
    RETURN.
  ENDIF.
  MESSAGE '입력 가능한 수량입니다.' TYPE 'S'.
