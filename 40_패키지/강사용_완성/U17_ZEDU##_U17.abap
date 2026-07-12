REPORT zedu##_u17.

DATA gs_order TYPE zedu##_order.

START-OF-SELECTION.
* 1) INSERT (라운드 1)
  CLEAR gs_order.
  gs_order-order_id = 9000000001. gs_order-cust_id = 'C00002'.
  gs_order-prod_id = 'P0000005'. gs_order-quantity = 2.
  gs_order-status = 'N'. gs_order-order_date = sy-datum.
  gs_order-remark = 'CRUD 실습'. gs_order-ernam = sy-uname.
  INSERT zedu##_order FROM gs_order.
  WRITE: / '1) INSERT sy-subrc =', sy-subrc.
  COMMIT WORK.

* 2) UPDATE 방법 A: 구조로 (라운드 2)
  SELECT SINGLE * FROM zedu##_order INTO gs_order
    WHERE order_id = 9000000001.
  IF sy-subrc <> 0.
    MESSAGE '수정할 주문이 없습니다. INSERT부터 실행하세요.' TYPE 'S' DISPLAY LIKE 'E'.
    RETURN.
  ENDIF.
  gs_order-quantity = 99.
  UPDATE zedu##_order FROM gs_order.
  WRITE: / '2) UPDATE sy-subrc =', sy-subrc.
  COMMIT WORK.

* 3) UPDATE 방법 B: SET ... WHERE
  UPDATE zedu##_order SET status = 'C'
    WHERE order_id = 9000000001.
  WRITE: / '3) UPDATE SET 처리 건수 =', sy-dbcnt.
  COMMIT WORK.

* 4) MODIFY: 없으면 INSERT, 있으면 UPDATE (라운드 3)
  CLEAR gs_order.
  gs_order-order_id = 9000000002. gs_order-cust_id = 'C00001'.
  gs_order-prod_id = 'P0000001'. gs_order-quantity = 1.
  gs_order-status = 'N'. gs_order-order_date = sy-datum.
  gs_order-ernam = sy-uname.
  MODIFY zedu##_order FROM gs_order.
  WRITE: / '4) MODIFY sy-subrc =', sy-subrc.
  COMMIT WORK.

* 5) ROLLBACK 체험: 갱신했다가 무르기
  UPDATE zedu##_order SET quantity = 777
    WHERE order_id = 9000000002.
  WRITE: / '5) UPDATE(커밋 전) sy-subrc =', sy-subrc.
  ROLLBACK WORK.                    " 확정 전이므로 취소됨
  " -> SE16N: 9000000002의 수량은 여전히 1

* 6) DELETE
  DELETE FROM zedu##_order WHERE order_id = 9000000001.
  WRITE: / '6) DELETE 처리 건수 =', sy-dbcnt.
  COMMIT WORK.
  " 남은 9000000002는 Q17에서 정리한다
