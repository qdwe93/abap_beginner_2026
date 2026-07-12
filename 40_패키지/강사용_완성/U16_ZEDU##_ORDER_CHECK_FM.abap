FUNCTION zedu##_order_check.

  DATA lv_cust TYPE zedu_custid.

* 1) 고객 존재 확인
  SELECT SINGLE cust_id FROM zedu_cust INTO lv_cust
    WHERE cust_id = iv_cust_id.
  IF sy-subrc <> 0.
    RAISE invalid_cust.        " 예외를 발생시키고 즉시 복귀
  ENDIF.

* 2) 제품 존재 확인 + 단가 반환
  SELECT SINGLE price FROM zedu_prod INTO ev_price
    WHERE prod_id = iv_prod_id.
  IF sy-subrc <> 0.
    RAISE invalid_prod.
  ENDIF.

* 3) 수량 검증
  IF iv_quantity <= 0.
    RAISE invalid_qty.
  ENDIF.

ENDFUNCTION.
