REPORT zedu_main_demo.

* 강사 슬롯 00의 완성 프로그램을 실행하는 고정 런처입니다.
* TP_ZEDU##_MAIN.abap의 ##를 00으로 바꿔 ZEDU00_MAIN을 먼저 생성하고,
* ZEDU00_ORDER/ZEDU00_S_LIST/ZEDU00_ORDER_CHECK/ZEDU00_MSG/PF-STATUS MAIN을 준비합니다.

SUBMIT zedu00_main VIA SELECTION-SCREEN AND RETURN.
