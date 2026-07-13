/* SLIDES_Day1.pptx — SAP ABAP 기초교육 Day 1 (67장)
 * 원본: 10_교재_Day1.md / 30_강사가이드.md / 96_슬라이드_기획안.md */
const pptxgen = require("pptxgenjs");

const OUT = "C:\\Workspaces\\abap_beginner_2026\\50_슬라이드\\SLIDES_Day1.pptx";

// ---- palette / fonts ------------------------------------------------------
const NAVY = "1E2761";      // primary
const DEEP = "161D4A";      // dark slide bg
const ICE = "CADCFC";       // secondary on dark
const TINT = "EEF3FB";      // light card bg
const INK = "1B2340";       // body text
const MUTED = "5B6478";
const ACCENT = "E8A33D";    // amber: TODO / timer / highlight
const RED = "C4443C";
const GREEN = "3E7C4F";
const CODEBG = "151B33";
const CODEFG = "E8EEFF";
const CODEDIM = "8A96C2";
const LINEC = "D5DCEA";
const F = "Malgun Gothic";
const FC = "Courier New";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.author = "ABAP 기초교육";
pres.title = "SAP ABAP 기초교육 — Day 1";

pres.defineSlideMaster({
  title: "LIGHT",
  background: { color: "FFFFFF" },
  objects: [
    { text: { text: "SAP ABAP 기초교육 · Day 1 — ABAP 첫걸음과 데이터 딕셔너리", options: { x: 0.55, y: 7.14, w: 7.5, h: 0.26, fontFace: F, fontSize: 8.5, color: "9AA3B5", margin: 0 } } },
  ],
  slideNumber: { x: 12.65, y: 7.12, w: 0.5, h: 0.3, fontFace: F, fontSize: 9, color: "9AA3B5" },
});
pres.defineSlideMaster({
  title: "DARK",
  background: { color: DEEP },
  slideNumber: { x: 12.65, y: 7.12, w: 0.5, h: 0.3, fontFace: F, fontSize: 9, color: "7E89B8" },
});

// ---- helpers ---------------------------------------------------------------
function sourceFor(chip) {
  const tag = String(chip || "");
  const unit = tag.match(/^(OT|U\d{2})/);
  if (unit) return `10_교재_Day1.md > ${unit[1]}; 30_강사가이드.md > ${unit[1]}`;
  if (tag === "퀴즈①") return "10_교재_Day1.md > 미니 종합퀴즈 ①; 20_퀴즈집.md > U02; 30_강사가이드.md > 미니 종합퀴즈①";
  return "10_교재_Day1.md; 01_커리큘럼.md; 30_강사가이드.md; 96_슬라이드_기획안.md";
}

function slideWithSourcedNotes(masterName) {
  const s = pres.addSlide({ masterName });
  const addNotes = s.addNotes.bind(s);
  s.addNotes = (text) => {
    const body = String(text || "");
    const prefix = /출처\s*:/.test(body) ? "" : `출처: ${sourceFor(s._sourceChip)}.\n`;
    return addNotes(prefix + body);
  };
  return s;
}

function light() { return slideWithSourcedNotes("LIGHT"); }
function dark() { return slideWithSourcedNotes("DARK"); }

// content-slide header: unit chip + title (+kind tag right)
function header(s, chip, title, kind) {
  s._sourceChip = chip;
  s.addShape("roundRect", { x: 0.55, y: 0.42, w: 1.05, h: 0.46, fill: { color: NAVY }, rectRadius: 0.09 });
  s.addText(chip, { x: 0.55, y: 0.42, w: 1.05, h: 0.46, align: "center", valign: "middle", fontFace: F, fontSize: 15, bold: true, color: "FFFFFF", margin: 0 });
  s.addText(title, { x: 1.8, y: 0.36, w: 9.0, h: 0.6, fontFace: F, fontSize: 23, bold: true, color: INK, margin: 0, valign: "middle" });
  if (kind) s.addText(kind, { x: 10.9, y: 0.47, w: 1.9, h: 0.4, align: "right", fontFace: F, fontSize: 12, bold: true, color: MUTED, margin: 0, valign: "middle" });
}

// dark unit-title slide
function unitTitle(chip, time, title, goals, prog, noteTxt) {
  const s = dark();
  s._sourceChip = chip;
  s.addText(chip, { x: 0.9, y: 1.15, w: 4.0, h: 0.7, fontFace: F, fontSize: 30, bold: true, color: ACCENT, margin: 0 });
  s.addText(time, { x: 0.9, y: 1.82, w: 5.0, h: 0.42, fontFace: F, fontSize: 15, color: ICE, margin: 0 });
  s.addText(title, { x: 0.9, y: 2.45, w: 11.5, h: 1.15, fontFace: F, fontSize: 38, bold: true, color: "FFFFFF", margin: 0 });
  const runs = [];
  goals.forEach((g, i) => runs.push({ text: g, options: { bullet: { code: "25AA", indent: 14 }, color: ICE, breakLine: i < goals.length - 1, paraSpaceAfter: 8 } }));
  s.addText(runs, { x: 0.95, y: 3.9, w: 8.6, h: 1.6, fontFace: F, fontSize: 16, margin: 0, valign: "top" });
  s.addText([{ text: "이 시간이 끝나면 할 수 있는 것", options: {} }], { x: 0.95, y: 3.5, w: 6, h: 0.35, fontFace: F, fontSize: 11.5, bold: true, color: "8FA2D9", margin: 0 });
  if (prog) {
    s.addShape("roundRect", { x: 0.9, y: 5.85, w: 5.3, h: 0.62, fill: { color: "232C63" }, rectRadius: 0.09 });
    s.addText([{ text: "오늘 만드는 프로그램  ", options: { color: "8FA2D9", fontSize: 11.5 } }, { text: prog, options: { color: "FFFFFF", fontSize: 14, bold: true, fontFace: FC } }],
      { x: 1.15, y: 5.85, w: 5.0, h: 0.62, fontFace: F, margin: 0, valign: "middle" });
  }
  if (noteTxt) s.addNotes(noteTxt);
  return s;
}

// code block (dark card). code = array of lines; inline `"` comments dimmed
function codeBlock(s, o) {
  const { x, y, w, h, code, title } = o;
  const fs = o.fontSize || 11.5;
  s.addShape("roundRect", { x, y, w, h, fill: { color: CODEBG }, rectRadius: 0.07 });
  let ty = y + 0.14;
  if (title) {
    s.addText(title, { x: x + 0.26, y: ty, w: w - 0.5, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: CODEDIM, margin: 0 });
    ty += 0.34;
  }
  const runs = [];
  code.forEach((ln, i) => {
    const last = i === code.length - 1;
    if (ln.trim() === "") { runs.push({ text: " ", options: { color: CODEFG, breakLine: !last } }); return; }
    const t = ln.trimStart();
    if (t.startsWith("*") || t.startsWith('"')) { runs.push({ text: ln, options: { color: CODEDIM, breakLine: !last } }); return; }
    const qi = ln.indexOf('"');
    if (qi >= 0) {
      runs.push({ text: ln.slice(0, qi), options: { color: CODEFG, breakLine: false } });
      runs.push({ text: ln.slice(qi), options: { color: CODEDIM, breakLine: !last } });
    } else {
      runs.push({ text: ln, options: { color: CODEFG, breakLine: !last } });
    }
  });
  s.addText(runs, { x: x + 0.26, y: ty, w: w - 0.5, h: h - (ty - y) - 0.12, fontFace: FC, fontSize: fs, margin: 0, valign: "top", lineSpacingMultiple: 1.04 });
}

// screenshot placeholder
function shot(s, o) {
  const { x, y, w, h, id, cap } = o;
  s.addShape("roundRect", { x, y, w, h, fill: { color: "F3F6FB" }, line: { color: "9FB0D0", width: 1, dashType: "dash" }, rectRadius: 0.08 });
  s.addText([{ text: "📷 " + id, options: { fontSize: 13, bold: true, color: NAVY, breakLine: true } },
             { text: cap, options: { fontSize: 11, color: MUTED, breakLine: true } },
             { text: " ", options: { fontSize: 4, breakLine: true } },
             { text: "캡처 전 자리표시자 · 50_슬라이드/스크린샷_캡처목록.md", options: { fontSize: 8.5, color: "9AA3B5" } }],
    { x: x + 0.2, y: y, w: w - 0.4, h: h, align: "center", valign: "middle", fontFace: F, margin: 0 });
}

// bullet list. items: {t, b(old), sub, gap}
function bullets(s, items, o) {
  const runs = [];
  items.forEach((it, i) => {
    const last = i === items.length - 1;
    if (it.sub) runs.push({ text: it.t, options: { bullet: { code: "2013", indent: 12 }, indentLevel: 1, color: MUTED, fontSize: (o.fontSize || 15) - 1.5, breakLine: !last, paraSpaceAfter: it.gap != null ? it.gap : 5 } });
    else runs.push({ text: it.t, options: { bullet: { code: "25AA", indent: 14 }, color: it.color || INK, bold: !!it.b, breakLine: !last, paraSpaceAfter: it.gap != null ? it.gap : 8 } });
  });
  s.addText(runs, { x: o.x, y: o.y, w: o.w, h: o.h, fontFace: F, fontSize: o.fontSize || 15, margin: 0, valign: "top" });
}

// standard table
function tbl(s, rows, o) {
  const trows = rows.map((r, ri) => r.map(c => {
    const base = typeof c === "object" ? c : { text: String(c) };
    const opt = Object.assign({ fontFace: F, fontSize: o.fontSize || 12, color: ri === 0 ? "FFFFFF" : INK, bold: ri === 0 || !!base.b, fill: { color: ri === 0 ? NAVY : (base.fill || (ri % 2 === 0 ? "F7F9FD" : "FFFFFF")) }, valign: "middle", align: base.align || "left" }, base.opts || {});
    return { text: base.text, options: opt };
  }));
  s.addTable(trows, { x: o.x, y: o.y, w: o.w, colW: o.colW, rowH: o.rowH || 0.32, border: { pt: 0.5, color: LINEC }, margin: 0.06 });
}

// amber info/timer banner (chip, not full-width stripe)
function banner(s, x, y, w, txt, opts) {
  const color = (opts && opts.color) || ACCENT;
  const tcolor = (opts && opts.tcolor) || "3A2B08";
  s.addShape("roundRect", { x, y, w, h: 0.5, fill: { color }, rectRadius: 0.1 });
  s.addText(txt, { x: x + 0.22, y, w: w - 0.44, h: 0.5, fontFace: F, fontSize: 12.5, bold: true, color: tcolor, margin: 0, valign: "middle" });
}

// simple card
function card(s, x, y, w, h, title, body, o) {
  o = o || {};
  s.addShape("roundRect", { x, y, w, h, fill: { color: o.fill || TINT }, rectRadius: 0.09 });
  s.addText(title, { x: x + 0.24, y: y + 0.14, w: w - 0.48, h: 0.36, fontFace: F, fontSize: o.tSize || 13.5, bold: true, color: o.tColor || NAVY, margin: 0 });
  if (body) s.addText(body, { x: x + 0.24, y: y + 0.52, w: w - 0.48, h: h - 0.64, fontFace: F, fontSize: o.bSize || 11.5, color: o.bColor || INK, margin: 0, valign: "top", lineSpacingMultiple: 1.08 });
}

/* ===========================================================================
 * 1. 표지
 * ======================================================================== */
let s = dark();
s.addText("SAP ABAP 3일 기초교육", { x: 0.9, y: 2.0, w: 8, h: 0.5, fontFace: F, fontSize: 18, bold: true, color: ACCENT, margin: 0 });
s.addText("Day 1", { x: 0.9, y: 2.55, w: 8, h: 1.0, fontFace: F, fontSize: 60, bold: true, color: "FFFFFF", margin: 0 });
s.addText("ABAP 첫걸음과 데이터 딕셔너리", { x: 0.9, y: 3.75, w: 11.4, h: 0.7, fontFace: F, fontSize: 28, color: ICE, margin: 0 });
s.addText("SE38 첫 프로그램 · 변수 · 조건 · 반복 · 디버거 · SE11 테이블 설계", { x: 0.9, y: 4.55, w: 11.4, h: 0.45, fontFace: F, fontSize: 14, color: "8FA2D9", margin: 0 });
s.addText("일시 ____________     강사 ____________", { x: 0.9, y: 6.3, w: 8, h: 0.4, fontFace: F, fontSize: 12, color: "7E89B8", margin: 0 });
s.addNotes("OT 시작 전 표지. 학생 입장 시 띄워 둔다. 오늘 결승선: 문법 기초 + 주문 테이블 생성(U07)까지.");

/* 2. 3일 뒤 우리가 만들 것 */
s = light();
header(s, "인트로", "3일 뒤 우리가 만들 것", "스토리");
s.addText([{ text: "여러분은 작은 회사의 신입 ABAP 개발자입니다. ", options: { bold: true } },
           { text: "3일 뒤까지 주문 관리 프로그램을 완성해야 합니다. 고객·제품 마스터는 선배가 만들어 뒀고, 여러분은 주문 테이블을 직접 설계하고 조회·등록·수정·삭제 프로그램을 만듭니다.", options: {} }],
  { x: 0.55, y: 1.15, w: 7.1, h: 1.05, fontFace: F, fontSize: 14.5, color: INK, margin: 0, valign: "top", lineSpacingMultiple: 1.12 });
card(s, 0.55, 2.4, 7.1, 1.25, "Day 1 — 오늘", "문법 기초(변수·조건·반복·디버거)\n+ 주문 테이블을 SE11에서 직접 생성", { fill: TINT });
card(s, 0.55, 3.8, 7.1, 1.25, "Day 2", "내부 테이블 · Open SQL · 선택화면 · ALV\n→ 조회 화면(ZEDU##_LIST) 완성", {});
card(s, 0.55, 5.2, 7.1, 1.25, "Day 3", "검증 FM · DB CRUD · 버튼 이벤트\n→ 등록/수정/삭제 붙여서 완성 (ZEDU##_MAIN)", {});
shot(s, { x: 7.95, y: 2.4, w: 4.85, h: 4.05, id: "D1-01", cap: "완성본 주문 관리 프로그램 실행 화면\n(ALV 목록 + [등록][수정][삭제] 버튼)" });
s.addNotes("과정 목표 동기 부여 10분 중 앞부분. '3일 뒤 여러분 화면에서 이게 돌아갑니다'라고 말하며 완성본을 잠깐 시연(또는 스크린샷).");

/* 3. 오늘의 지도 + 교재 표기법 */
s = light();
header(s, "인트로", "오늘의 지도 · 교재 사용법", "안내");
tbl(s, [
  ["시간", "유닛", "내용"],
  ["09:00~09:40", "OT", "시스템 접속과 SAP 기초"],
  ["09:40~11:35", "U01·U02", "첫 프로그램 · 변수와 타입 (+미니퀴즈①)"],
  ["13:00~14:50", "U03·U04", "조건문 · 반복문"],
  ["15:05~15:45", "U05", "디버거 기초"],
  ["15:55~17:45", "U06·U07", "SE11: 도메인·DE · 테이블·스트럭처"],
  ["17:45~18:00", "U08", "SE16N 확인 + 샘플 데이터 20건"],
], { x: 0.55, y: 1.2, w: 6.6, colW: [1.55, 1.35, 3.7], fontSize: 11, rowH: 0.34 });
tbl(s, [
  ["표기", "의미"],
  [{ text: "##", opts: { fontFace: FC, bold: true } }, "본인 번호 2자리로 바꿔 입력 (예: 7번 → ZEDU07_U01)"],
  ["💻 따라치기", "강사 시연을 보며 그대로 입력"],
  ["✍️ 퀴즈", "스스로 해결 — TODO만 작성 (정답은 교재 부록 A)"],
  ["✨ 모던 ABAP", "신문법 버전 — 시간 없으면 건너뛰고 자습"],
  ["📷", "강사 화면/스크린샷 확인 지점"],
], { x: 7.45, y: 1.2, w: 5.35, colW: [1.5, 3.85], fontSize: 10.5, rowH: 0.36 });
banner(s, 7.45, 3.75, 5.35, "저장할 때는 항상: 저장 → [Local Object] 클릭 ($TMP)", {});
s.addText("오늘의 목표", { x: 0.55, y: 4.9, w: 3, h: 0.35, fontFace: F, fontSize: 13, bold: true, color: NAVY, margin: 0 });
bullets(s, [
  { t: "SE38에서 프로그램을 만들어 실행한다" },
  { t: "기본 문법(변수·조건·반복)을 구사하고 디버거로 코드를 들여다본다" },
  { t: "SE11에서 내 주문 테이블을 직접 만든다", b: true },
], { x: 0.55, y: 5.3, w: 6.6, h: 1.6, fontSize: 13.5 });
s.addNotes("교재 표기법은 여기서 한 번만 설명하고 넘어간다. ## 규칙과 Local Object 저장은 3일 내내 반복되므로 각인시킬 것.");

/* ===========================================================================
 * OT (4~8)
 * ======================================================================== */
s = unitTitle("OT", "09:00 ~ 09:40", "시스템 접속과 SAP 기초",
  ["실습 시스템에 접속하고 내 번호(##)를 확인한다", "T-code로 화면을 이동할 수 있다"], null,
  "시간 배분: 10분 과정 목표/완성 시연 이미지 → 10분 SAP GUI·트랜잭션·클라이언트·사용자 → 10분 학생 번호·##·Z 네임스페이스·$TMP → 10분 접속 및 /nSE38, /oSE16N 확인.");

/* 5. SAP & ABAP */
s = light();
header(s, "OT", "SAP은 무엇이고, ABAP은 무엇인가", "개념");
card(s, 0.55, 1.3, 6.0, 2.5, "SAP = 통합 업무 시스템(ERP)", "회계(FI) · 영업(SD) · 구매(MM) 같은 회사 업무를\n하나의 데이터로 통합해 처리하는 시스템입니다.\n\n\"화면 묶음\"이 아니라 업무 데이터와 프로세스의 통합이 핵심.", { bSize: 13 });
card(s, 6.8, 1.3, 6.0, 2.5, "ABAP = 그 위에서 도는 언어", "SAP 서버 안에서 실행되는 프로그램을 만드는 언어.\n우리가 3일간 만드는 것은 전부 서버에서 실행되고\nGUI는 입력과 표시만 담당합니다.", { bSize: 13 });
bullets(s, [
  { t: "이름 앞의 Z = 고객(우리)이 만든 객체라는 표시 — 표준과 구분되는 고객 네임스페이스", b: true },
  { t: "이 과정의 접두어는 ZEDU (교육용)", sub: true },
  { t: "모듈(FI/SD/MM) 이야기는 쉬는 시간마다 조금씩 소개합니다" },
], { x: 0.6, y: 4.15, w: 12.1, h: 1.6, fontSize: 14 });
s.addNotes("예상 질문 — Q. GUI와 서버는 같은 것? A. GUI는 클라이언트, 처리와 데이터는 서버. Q. 왜 Z? A. 표준/고객 객체 구분용 네임스페이스.");

/* 6. 내 실습 정보 */
s = light();
header(s, "OT", "내 실습 정보 — 받아 적기", "실습");
tbl(s, [
  ["항목", "값"],
  ["서버 / 시스템 ID", "________________________"],
  ["Client", "________________________"],
  ["사용자 ID / 초기 비밀번호", "________________________"],
  [{ text: "내 번호 (##)", b: true }, { text: "________________________", b: true }],
], { x: 0.55, y: 1.35, w: 7.2, colW: [3.1, 4.1], fontSize: 14, rowH: 0.62 });
card(s, 8.1, 1.35, 4.7, 3.0, "## 규칙 (3일 내내!)", "교재의 ##는 전부 내 번호 2자리로 바꿔 입력합니다.\n\n예) 7번 수강생:\nZEDU##_U01 → ZEDU07_U01\n\n객체가 안 만들어지면 가장 먼저 ##부터 확인!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
s.addText("클라이언트(Client) = 한 시스템 안의 독립된 회사 공간. 옆 반 Client에 접속하면 같은 계정이라도 데이터가 다릅니다 — 접속 정보를 정확히!",
  { x: 0.55, y: 4.85, w: 12.2, h: 0.7, fontFace: F, fontSize: 13, color: MUTED, margin: 0 });
s.addNotes("자주 막힘: 다른 클라이언트 접속(데이터가 다름), 사용자 메뉴에서 T-code 못 찾음 → 명령창 직접 입력을 먼저 가르친다.");

/* 7. SAP GUI 조작 */
s = light();
header(s, "OT", "SAP GUI 기본 조작 — T-code와 키", "개념");
bullets(s, [
  { t: "T-code(트랜잭션 코드) = 화면 바로가기. 좌상단 명령창에 입력", b: true },
  { t: "오늘 쓸 것: SE38(프로그램) · SE11(딕셔너리) · SE16N(데이터 조회)", sub: true },
  { t: "/n + T-code = 현재 창에서 이동  ·  /o + T-code = 새 창(세션, 최대 6개)" },
], { x: 0.55, y: 1.25, w: 7.0, h: 1.7, fontSize: 14 });
tbl(s, [
  ["키", "기능"],
  [{ text: "F8", b: true }, "실행 (3일간 가장 많이 누를 키)"],
  ["F3", "뒤로"],
  ["F1", "도움말 (커서 위치 기준)"],
  ["F4", "입력 가능한 값 목록"],
], { x: 0.55, y: 3.1, w: 5.6, colW: [1.2, 4.4], fontSize: 12, rowH: 0.4 });
shot(s, { x: 6.6, y: 3.0, w: 6.2, h: 3.6, id: "D1-02", cap: "SAP 로그온 후 초기 화면 — 명령창에 /nSE38 입력" });
s.addNotes("자주 막힘: /n과 /o 혼동. /n은 현재 세션 이동, /o는 새 세션. F1/F4 차이는 커서를 올려 시연.");

/* 8. 접속 실습 */
s = light();
header(s, "OT", "지금 해보기 — 접속과 화면 이동", "실습");
bullets(s, [
  { t: "1)  받은 계정으로 로그온 (초기 비밀번호 변경)", b: true },
  { t: "2)  명령창에 /nSE38 → ABAP 편집기 초기 화면 확인", b: true },
  { t: "3)  명령창에 /oSE16N → 새 창으로 데이터 브라우저 열림 확인", b: true },
  { t: "4)  창 두 개를 오가며 화면 전환에 익숙해지기" },
], { x: 0.55, y: 1.3, w: 8.0, h: 2.4, fontSize: 15 });
card(s, 0.55, 4.0, 7.6, 2.3, "저장 규칙 — 3일 내내 동일", "무언가를 저장하면 패키지 입력 창이 뜹니다.\n\n항상 [Local Object] 버튼 클릭 → $TMP 패키지 (운송 없음)\n\n다른 걸 누르면 운송 요청 화면이 떠서 당황하게 됩니다.", { bSize: 13.5 });
banner(s, 8.5, 4.0, 4.3, "전원 접속 완료 확인 후 U01 시작", { color: "DDE7F8", tcolor: NAVY });
s.addNotes("전원이 SE38 화면까지 열리는지 순회 확인. 3분 이상 전원이 같은 화면에서 막히면 개인 문제가 아니라 환경 문제로 간주하고 전체를 멈춘다.");

/* ===========================================================================
 * U01 (9~15)
 * ======================================================================== */
s = unitTitle("U01", "09:40 ~ 10:30", "SE38 첫 프로그램과 WRITE",
  ["리포트 프로그램을 생성·저장·활성화·실행할 수 있다", "ABAP 문장의 기본 규칙(마침표·주석·체인)을 안다"],
  "ZEDU##_U01",
  "시간 배분: 10분 프로그램 객체/편집기/저장·활성·실행 구분 → 20분 따라치기 → 10분 오류 체험(마침표·따옴표) → 10분 Q01(또는 퀴즈집 E01).");

/* 10. 개발 사이클 */
s = light();
header(s, "U01", "개발 사이클 — 저장·활성화·실행은 다르다", "개념");
s.addText("리포트 프로그램 = 실행하면 로직을 수행해 결과 목록을 보여주는 가장 기본의 ABAP 프로그램. 3일간 만드는 것은 전부 리포트입니다.",
  { x: 0.55, y: 1.2, w: 12.2, h: 0.6, fontFace: F, fontSize: 13.5, color: INK, margin: 0 });
const cyc = [["저장", "Ctrl+S", "소스 코드를 저장"], ["활성화", "Ctrl+F3", "문법검사 + 실행 가능한\n활성 버전 생성"], ["실행", "F8", "마지막 활성 버전을 실행"]];
cyc.forEach((c, i) => {
  const x = 0.8 + i * 4.15;
  s.addShape("roundRect", { x, y: 2.2, w: 3.3, h: 1.7, fill: { color: i === 1 ? NAVY : TINT }, rectRadius: 0.1 });
  s.addText([{ text: c[0] + "  ", options: { fontSize: 20, bold: true, color: i === 1 ? "FFFFFF" : NAVY } }, { text: c[1], options: { fontSize: 13, color: i === 1 ? ICE : MUTED, fontFace: FC } }],
    { x: x + 0.25, y: 2.38, w: 2.9, h: 0.5, fontFace: F, margin: 0 });
  s.addText(c[2], { x: x + 0.25, y: 2.95, w: 2.9, h: 0.8, fontFace: F, fontSize: 11.5, color: i === 1 ? ICE : INK, margin: 0 });
  if (i < 2) s.addText("→", { x: x + 3.32, y: 2.75, w: 0.85, h: 0.6, align: "center", fontFace: F, fontSize: 26, bold: true, color: MUTED, margin: 0 });
});
banner(s, 0.8, 4.4, 11.7, "\"저장했는데 왜 반영이 안 되죠?\" → 활성화를 안 했기 때문. 3일 내내 쓸 리듬입니다.", {});
s.addText("실행은 항상 마지막 '활성' 버전을 사용합니다 — 저장 중인 소스와 활성 런타임 버전은 분리되어 있습니다.",
  { x: 0.8, y: 5.25, w: 11.7, h: 0.5, fontFace: F, fontSize: 12.5, color: MUTED, margin: 0 });
s.addNotes("강조: 저장=소스 저장, 활성화=실행 가능한 버전 생성. '실행해도 옛 결과' 증상은 활성화 누락.");

/* 11. 문장 규칙 */
s = light();
header(s, "U01", "ABAP 문장 규칙 3가지", "개념");
card(s, 0.55, 1.3, 3.95, 1.55, "1. 마침표", "모든 문장은 마침표(.)로\n끝난다", { bSize: 13 });
card(s, 4.7, 1.3, 3.95, 1.55, "2. 대소문자", "키워드는 구분 없음\n단, 따옴표 안 문자열은 구분!", { bSize: 13 });
card(s, 8.85, 1.3, 3.95, 1.55, "3. 주석", "줄 맨 앞 * = 그 줄 전체\n문장 중 \" = 그 뒤부터", { bSize: 13 });
codeBlock(s, { x: 0.55, y: 3.2, w: 8.2, h: 2.9, title: "체인 문장 — 콜론(:)으로 같은 명령 반복 줄이기", code: [
  "WRITE 'Hello ABAP!'.",
  "",
  "WRITE / '이 줄은 새 줄에 출력됩니다.'.   \" /  = 줄바꿈",
  "",
  "* 콜론(:) 체인 문장",
  "WRITE: / '3일 뒤에는',",
  "       / '주문 관리 프로그램을',",
  "       / '완성합니다'.",
] });
card(s, 9.0, 3.2, 3.8, 2.9, "에디터 팁 (습관!)", "Ctrl+Space 자동완성\nCtrl+F2 문법검사\nShift+F1 Pretty Printer\n(자동 정렬)", { bSize: 13 });
s.addNotes("마침표 누락이 첫날 오류의 대부분. 오류 목록 첫 줄을 더블클릭해 '앞 문장'의 마침표를 확인하는 습관을 시연.");

/* 12. 따라치기 절차 */
s = light();
header(s, "U01", "따라치기 — 프로그램 생성", "💻 시연");
bullets(s, [
  { t: "1)  명령창 SE38 → Enter", b: true },
  { t: "2)  프로그램 이름 ZEDU##_U01 → [Create]", b: true },
  { t: "3)  Title '첫 프로그램' · Type 'Executable Program' → [Save]" },
  { t: "4)  패키지 창 → [Local Object] 클릭" },
  { t: "5)  코드 입력 → 저장 → 활성화 → 실행(F8)" },
], { x: 0.55, y: 1.35, w: 5.9, h: 3.2, fontSize: 14.5 });
banner(s, 0.55, 4.9, 5.9, "교재 U01 💻 절을 펴고 같이 진행합니다", { color: "DDE7F8", tcolor: NAVY });
shot(s, { x: 6.8, y: 1.3, w: 6.0, h: 4.6, id: "D1-03", cap: "SE38 프로그램 생성 — 속성 창\n(Title / Type: Executable Program)" });
s.addNotes("강사 규칙: 완성 코드를 길게 타이핑하지 않는다. 한 덩어리 입력 → 저장 → 활성화 → 실행 리듬을 그대로 보여준다.");

/* 13. 첫 실행 결과 */
s = light();
header(s, "U01", "첫 프로그램 — 입력과 결과", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 7.3, h: 3.6, title: "ZEDU##_U01", code: [
  "REPORT zedu##_u01.",
  "",
  "WRITE 'Hello ABAP!'.",
  "",
  "WRITE / '이 줄은 새 줄에 출력됩니다.'.",
  "",
  "WRITE: / '3일 뒤에는',",
  "       / '주문 관리 프로그램을',",
  "       / '완성합니다'.",
] });
s.addShape("roundRect", { x: 8.15, y: 1.25, w: 4.65, h: 3.6, fill: { color: "F4F6F4" }, line: { color: "BCC8BC", width: 0.75 }, rectRadius: 0.07 });
s.addText([{ text: "[실행 결과 F8]", options: { fontSize: 10.5, bold: true, color: GREEN, breakLine: true } },
           { text: " ", options: { fontSize: 5, breakLine: true } },
           { text: "Hello ABAP!\n이 줄은 새 줄에 출력됩니다.\n3일 뒤에는\n주문 관리 프로그램을\n완성합니다", options: { fontSize: 12, color: INK, fontFace: FC } }],
  { x: 8.4, y: 1.45, w: 4.2, h: 3.2, fontFace: F, margin: 0, valign: "top" });
bullets(s, [
  { t: "한 줄 지우고 실행해 보기: 마침표를 빼면? 따옴표를 하나 지우면? — 오류 화면과 친해지기", b: true },
  { t: "오류 목록의 첫 줄을 더블클릭 → 문제 위치로 이동", sub: true },
], { x: 0.6, y: 5.15, w: 12.1, h: 1.2, fontSize: 13.5 });
s.addNotes("10분 오류 체험: 마침표 제거, 따옴표 제거를 직접 해보게 한다. '빨간 화면=정상적인 학습 과정'이라는 심리적 안전감을 만든다.");

/* 14. 흔한 에러 */
s = light();
header(s, "U01", "여기서 자주 막힙니다", "⚠️ 점검");
tbl(s, [
  ["증상", "확인 순서"],
  ["실행해도 옛 결과가 나옴", "활성화(Ctrl+F3) 했는지 확인"],
  ["빨간 문법 오류", "오류 목록 첫 줄 더블클릭 → 앞 문장의 마침표 확인"],
  ["객체가 생성되지 않음", "ZEDU##_... 의 ##를 실제 내 번호로 바꿨는지 확인"],
], { x: 0.55, y: 1.4, w: 12.2, colW: [4.6, 7.6], fontSize: 13.5, rowH: 0.62 });
banner(s, 0.55, 4.1, 12.2, "막히면 이 순서: 오류 첫 줄 → 객체명(##) → 마침표·따옴표 → 그래도 안 되면 손 들기", {});
s.addNotes("표의 3가지가 Day 1 오전 질문의 90%. 학생 자리에 갈 때도 이 순서로 본다(## 먼저!).");

/* 15. Q01 */
s = light();
header(s, "U01", "퀴즈 Q01 — 자기소개 카드", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U01Q", options: { fontFace: FC, bold: true, color: NAVY } }, { text: " 를 새로 만들고, 체인 문장(WRITE:)으로 다음 3줄을 출력하세요.", options: {} }],
  { x: 0.55, y: 1.3, w: 12.2, h: 0.5, fontFace: F, fontSize: 15, color: INK, margin: 0 });
s.addShape("roundRect", { x: 0.55, y: 2.0, w: 7.0, h: 1.9, fill: { color: "F4F6F4" }, line: { color: "BCC8BC", width: 0.75 }, rectRadius: 0.07 });
s.addText("이름: (본인 이름)\n과정: ABAP 기초교육\n목표: 주문 관리 프로그램 완성", { x: 0.85, y: 2.2, w: 6.4, h: 1.5, fontFace: FC, fontSize: 13, color: INK, margin: 0, valign: "top" });
bullets(s, [
  { t: "새 프로그램 생성 절차부터 혼자서 (Local Object 저장 잊지 말기)" },
  { t: "완료 판정: 실행 결과 3줄이 각각 새 줄에", b: true },
], { x: 0.55, y: 4.25, w: 7.2, h: 1.2, fontSize: 13.5 });
card(s, 8.0, 2.0, 4.8, 3.4, "다 풀었다면", "퀴즈집 U01-D (심화)\n\n따라오기 어려웠다면\n퀴즈집 U01-E (쉬운 변형)\n\n※ 정답은 교재 부록 A — 지금은 보지 않기!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
s.addNotes("10분. 순회하며 ##·마침표만 봐 준다. 빠른 학생이 옆 학생 키보드를 잡지 않게 — 설명만 허용.");

/* ===========================================================================
 * U02 (16~23)
 * ======================================================================== */
s = unitTitle("U02", "10:45 ~ 11:35", "변수와 데이터 타입",
  ["DATA/CONSTANTS/TYPES로 변수·상수·타입을 선언할 수 있다", "기본 타입을 구분하고 산술 연산을 할 수 있다"],
  "ZEDU##_U02",
  "시간 배분: 15분 DATA/CONSTANTS·기본 타입 → 20분 선언·대입·계산 따라치기 → 10분 P 타입·소수·CLEAR → 5분 Q02 진입. 강조: C/N은 문자 성격, 계산은 I/P. 돈은 P(소수 자릿수 예측 가능).");

/* 17. 타입 표 */
s = light();
header(s, "U02", "기본 데이터 타입", "개념");
s.addText([{ text: "DATA 변수명 TYPE 타입.", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  — ABAP은 선언하지 않은 변수를 쓸 수 없습니다.", options: {} }],
  { x: 0.55, y: 1.18, w: 12.2, h: 0.42, fontFace: F, fontSize: 14, color: INK, margin: 0 });
tbl(s, [
  ["타입", "의미", "예"],
  [{ text: "c LENGTH n", opts: { fontFace: FC } }, "고정 길이 문자", "이름, 코드"],
  [{ text: "string", opts: { fontFace: FC } }, "가변 길이 문자열", "긴 텍스트"],
  [{ text: "n LENGTH n", opts: { fontFace: FC } }, "숫자 문자 (0패딩)", "사번 '00123'"],
  [{ text: "i", opts: { fontFace: FC } }, "정수", "수량"],
  [{ text: "p LENGTH n DECIMALS m", opts: { fontFace: FC } }, "소수점 있는 수(팩형)", "금액, 단가"],
  [{ text: "d", opts: { fontFace: FC } }, "날짜 (YYYYMMDD 8자리)", "주문일"],
  [{ text: "t", opts: { fontFace: FC } }, "시간 (HHMMSS 6자리)", "등록시각"],
], { x: 0.55, y: 1.75, w: 9.2, colW: [3.3, 3.3, 2.6], fontSize: 12, rowH: 0.42 });
card(s, 10.0, 1.75, 2.8, 3.4, "기억할 것", "C와 N은 숫자처럼\n보여도 문자!\n\n계산에는 I / P\n돈에는 P", { bSize: 13 });
s.addText("실무 통화 필드는 DDIC의 CURR + 통화키로 설계합니다 — 오늘은 교육용으로 P를 씁니다.", { x: 0.55, y: 5.45, w: 12.2, h: 0.4, fontFace: F, fontSize: 11.5, color: MUTED, margin: 0 });
s.addNotes("예상 질문 — Q. 금액은 왜 I가 아닌가? A. 소수와 더 큰 범위 필요. 실무는 CURR+통화키.");

/* 18. 관례 + 시스템 필드 */
s = light();
header(s, "U02", "이름 짓는 관례 · 시스템 필드", "개념");
tbl(s, [
  ["접두어", "의미", "예"],
  [{ text: "gv_", opts: { fontFace: FC, b: true } }, "전역 변수", { text: "gv_amount", opts: { fontFace: FC } }],
  [{ text: "lv_", opts: { fontFace: FC, b: true } }, "로컬 변수 (Day 3 FM부터)", { text: "lv_price", opts: { fontFace: FC } }],
  [{ text: "gc_", opts: { fontFace: FC, b: true } }, "상수 (실행 중 안 바뀜)", { text: "gc_vat_rate", opts: { fontFace: FC } }],
], { x: 0.55, y: 1.4, w: 7.0, colW: [1.4, 3.3, 2.3], fontSize: 12.5, rowH: 0.46 });
card(s, 8.0, 1.4, 4.8, 2.0, "시스템 필드 (SAP이 항상 채움)", "sy-datum  오늘 날짜\nsy-uname  내 사용자 ID\n\n(sy-subrc·sy-tabix·sy-index는\n나올 때마다 소개)", { bSize: 12.5 });
s.addText("3일간 이 관례를 그대로 따릅니다 — 남의 코드를 읽을 때도 접두어가 힌트가 됩니다.", { x: 0.55, y: 3.75, w: 12, h: 0.45, fontFace: F, fontSize: 13, color: MUTED, margin: 0 });
s.addNotes("관례는 규칙이 아니라 팀의 약속임을 언급. 실무 프로젝트마다 네이밍 규칙 문서가 따로 있다.");

/* 19. 따라치기 코드 1 */
s = light();
header(s, "U02", "따라치기 ① — 선언·대입·계산", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 9.4, h: 4.4, title: "ZEDU##_U02 (앞부분)", code: [
  "DATA: gv_prod_name TYPE c LENGTH 20,             \" 제품명",
  "      gv_qty       TYPE i,                       \" 수량",
  "      gv_price     TYPE p LENGTH 8 DECIMALS 2,   \" 단가",
  "      gv_amount    TYPE p LENGTH 10 DECIMALS 2,  \" 금액",
  "      gv_vat       TYPE p LENGTH 10 DECIMALS 2.  \" 부가세",
  "",
  "CONSTANTS: gc_vat_rate TYPE p LENGTH 3 DECIMALS 2 VALUE '0.10'.",
  "",
  "gv_prod_name = '기계식 키보드'.",
  "gv_qty       = 3.",
  "gv_price     = '45000.00'.        \" 소수 리터럴은 따옴표로",
  "gv_amount    = gv_qty * gv_price.",
] });
card(s, 10.2, 1.25, 2.6, 4.4, "주의", "소수 리터럴은\n따옴표 필수\n'45000.00'\n\n천 단위 쉼표\n1,200,000 은\n입력 금지!", { fill: "FBEBE9", tColor: RED, bSize: 12.5 });
s.addNotes("자주 막힘: 쉼표 넣은 숫자, 소수 리터럴 따옴표 누락. 각 덩어리 입력 후 바로 활성화 리듬 유지.");

/* 20. WRITE 수식 금지 */
s = light();
header(s, "U02", "WRITE에는 수식을 쓸 수 없다", "핵심 규칙");
s.addShape("roundRect", { x: 0.55, y: 1.3, w: 6.0, h: 2.5, fill: { color: "FBEBE9" }, rectRadius: 0.09 });
s.addText("❌ 활성화 실패", { x: 0.85, y: 1.5, w: 5.4, h: 0.4, fontFace: F, fontSize: 14, bold: true, color: RED, margin: 0 });
s.addText("WRITE: / '부가세:', gv_amount * gc_vat_rate.", { x: 0.85, y: 2.05, w: 5.5, h: 0.9, fontFace: FC, fontSize: 12, color: INK, margin: 0 });
s.addText("출력 목록에는 변수(데이터 객체)만!", { x: 0.85, y: 3.15, w: 5.4, h: 0.4, fontFace: F, fontSize: 11.5, color: RED, margin: 0 });
s.addShape("roundRect", { x: 6.85, y: 1.3, w: 6.0, h: 2.5, fill: { color: "EAF3EC" }, rectRadius: 0.09 });
s.addText("✅ 변수에 먼저 계산", { x: 7.15, y: 1.5, w: 5.4, h: 0.4, fontFace: F, fontSize: 14, bold: true, color: GREEN, margin: 0 });
s.addText("gv_vat = gv_amount * gc_vat_rate.\nWRITE: / '부가세:', gv_vat.", { x: 7.15, y: 2.05, w: 5.5, h: 0.9, fontFace: FC, fontSize: 12, color: INK, margin: 0 });
s.addText("계산 → 변수 → 출력. 항상 이 순서!", { x: 7.15, y: 3.15, w: 5.4, h: 0.4, fontFace: F, fontSize: 11.5, color: GREEN, margin: 0 });
banner(s, 0.55, 4.3, 12.3, "오늘 Q02·Q03을 포함해 3일 내내 적용되는 규칙입니다 — \"계산은 변수에, WRITE에는 변수만\"", {});
s.addNotes("93 검토에서 확정된 교육 포인트. Q02(결제금액)와 Q03(부가세 확장), Day 2 D10에서도 같은 패턴이 반복된다.");

/* 21. 따라치기 코드 2 */
s = light();
header(s, "U02", "따라치기 ② — 출력·CLEAR·TYPES", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 7.6, h: 4.2, title: "ZEDU##_U02 (뒷부분)", code: [
  "gv_vat   = gv_amount * gc_vat_rate.",
  "gv_today = sy-datum.          \" 시스템 필드: 오늘 날짜",
  "",
  "WRITE: / '제품명:', gv_prod_name,",
  "       / '금액  :', gv_amount,",
  "       / '부가세:', gv_vat,",
  "       / '날짜  :', gv_today.",
  "",
  "CLEAR gv_qty.                 \" 변수를 초기값으로",
  "WRITE: / 'CLEAR 후 수량:', gv_qty.   \" 0",
] });
codeBlock(s, { x: 8.4, y: 1.25, w: 4.4, h: 1.9, title: "TYPES — 나만의 타입 (내일 본격 활용)", code: [
  "TYPES: ty_price TYPE p",
  "  LENGTH 8 DECIMALS 2.",
  "DATA: gv_price2 TYPE ty_price.",
], fontSize: 10.5 });
card(s, 8.4, 3.45, 4.4, 2.0, "CLEAR = 초기값으로", "숫자 → 0\n문자 → 공백\n\n\"변수 재사용 전 청소\" 습관", { bSize: 12.5 });
s.addNotes("필드가 잘려 보인다는 질문 → 타입 길이와 출력 포맷은 별개임을 설명.");

/* 22. 모던 ABAP */
s = light();
header(s, "U02", "모던 ABAP으로는 이렇게", "✨ 참고");
codeBlock(s, { x: 0.55, y: 1.35, w: 9.6, h: 2.2, title: "인라인 선언 + 문자열 템플릿", code: [
  "DATA(lv_amount) = gv_qty * gv_price.        \" 타입을 우변에서 추론",
  "",
  "WRITE / |{ gv_prod_name } { gv_qty }개 = { lv_amount }원|.",
] });
bullets(s, [
  { t: "인라인 선언: \"처음 값이 정해지는 그 자리\"에서 변수를 만든다 — 실무 신규 코드의 표준", b: true },
  { t: "오늘 실습 본문은 classic 문법으로 갑니다. ✨는 \"미래에 만날 모습\" 소개용", color: MUTED },
], { x: 0.6, y: 3.9, w: 12.1, h: 1.4, fontSize: 14 });
s.addNotes("시간이 밀리면 이 슬라이드는 건너뛴다(교재에 있음). 신문법 질문이 길어지면 '보조·확장 영역'임을 안내하고 진행.");

/* 23. Q02 */
s = light();
header(s, "U02", "퀴즈 Q02 — 할인가 계산", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U02Q", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  (스켈레톤 제공 — 교재의 코드를 입력한 뒤 TODO만 작성)", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
codeBlock(s, { x: 0.55, y: 1.8, w: 7.9, h: 3.3, title: "TODO 3개", code: [
  "* TODO 1: 금액(gv_amount) = 단가 x 수량",
  "",
  "* TODO 2: 할인금액(gv_discount) = 금액의 10%",
  "",
  "* TODO 3: 결제금액(gv_payment) = 금액 - 할인금액",
  "*         (WRITE에는 수식 불가 -> 변수에 먼저 계산)",
] });
s.addShape("roundRect", { x: 8.75, y: 1.8, w: 4.05, h: 1.6, fill: { color: "F4F6F4" }, line: { color: "BCC8BC", width: 0.75 }, rectRadius: 0.07 });
s.addText([{ text: "[기대 결과]", options: { fontSize: 10.5, bold: true, color: GREEN, breakLine: true } },
           { text: "금액 1,400,000.00\n할인 140,000.00\n결제금액 1,260,000.00", options: { fontSize: 11.5, color: INK, fontFace: FC } }],
  { x: 8.95, y: 1.95, w: 3.6, h: 1.3, fontFace: F, margin: 0, valign: "top" });
card(s, 8.75, 3.6, 4.05, 1.5, "다 풀었다면", "퀴즈집 U02-D\n(어려웠다면 U02-E)", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12 });
banner(s, 0.55, 5.4, 12.25, "TODO 3이 바로 앞에서 배운 규칙 — 결제금액을 변수에 계산한 뒤 WRITE에는 gv_payment만!", {});
s.addNotes("5분 진입 후 11:35 미니퀴즈①로 연결. 스켈레톤은 교재에 있음(패키지 배포본 아님).");

/* ===========================================================================
 * 미니 종합퀴즈① (24~25)
 * ======================================================================== */
s = dark();
s.addText("미니 종합퀴즈 ①", { x: 0.9, y: 1.5, w: 8, h: 0.7, fontFace: F, fontSize: 32, bold: true, color: ACCENT, margin: 0 });
s.addText("11:35 ~ 12:00", { x: 0.9, y: 2.2, w: 5, h: 0.4, fontFace: F, fontSize: 15, color: ICE, margin: 0 });
s.addText("Q03 — 견적서 출력기", { x: 0.9, y: 2.9, w: 11.5, h: 0.8, fontFace: F, fontSize: 34, bold: true, color: "FFFFFF", margin: 0 });
s.addText([{ text: "스켈레톤 없음 — 처음부터 백지 코딩!", options: { fontSize: 18, bold: true, color: "FFD9A0", breakLine: true, paraSpaceAfter: 10 } },
           { text: "U01(프로그램 생성)과 U02(선언·계산)를 스스로 연결하는 첫 종합 점검입니다.", options: { fontSize: 14, color: ICE } }],
  { x: 0.9, y: 4.0, w: 11.4, h: 1.4, fontFace: F, margin: 0 });
s.addNotes("의도적인 첫 백지 코딩. 8분 동안은 질문을 받되 코드를 대신 말해주지 않는다. 이후 힌트 순서만 공개: 1) REPORT 2) DATA 3) 값 대입 4) 계산 5) WRITE.");

/* 25. Q03 요구사항 */
s = light();
header(s, "퀴즈①", "Q03 요구사항 — ZEDU##_Q03", "✍️ 백지 코딩");
bullets(s, [
  { t: "변수: 제품명(문자) · 수량(정수) · 단가(소수 2자리) 선언", b: true },
  { t: "값: '노트북 15인치' · 2 · 1200000", b: true },
  { t: "출력: 제품명/수량/단가/합계금액 각 줄 + 마지막 줄에 오늘 날짜", b: true },
], { x: 0.55, y: 1.4, w: 12.0, h: 1.9, fontSize: 16 });
card(s, 0.55, 3.5, 5.9, 2.6, "막히면", "U01 — 프로그램 생성 절차\nU02 — 선언·계산 페이지\n\n(8분 후 강사가 순서 힌트 공개)", { bSize: 13 });
card(s, 6.75, 3.5, 6.05, 2.6, "수준별 다음 문제", "빨리 끝났다면: 부가세 10% 줄 추가 또는 퀴즈집 D02\n— 부가세도 변수에 계산한 뒤 출력!\n\n어려웠다면: 퀴즈집 E02\n(WRITE에는 수식을 쓸 수 없습니다)", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
s.addNotes("완료 학생은 부가세 확장 또는 퀴즈집 D02. 점심 전 마무리 — 완성 못 해도 점심 후 U03에 지장 없음을 안내.");

/* ===========================================================================
 * U03 (26~32)
 * ======================================================================== */
s = unitTitle("U03", "13:00 ~ 13:50", "조건문 IF / CASE",
  ["IF/ELSEIF/ELSE 와 CASE/WHEN으로 분기할 수 있다", "비교·논리 연산자를 쓸 수 있다"],
  "ZEDU##_U03",
  "점심 직후 3분: 상태 N/C/X를 손으로 말하게 한다. 진행 팁: IF=조건식, CASE=한 값의 여러 갈래 기준 반복. 조건 순서가 결과를 바꾸는 예(VIP를 일반보다 먼저) 시연.");

/* 27. IF vs CASE */
s = light();
header(s, "U03", "IF와 CASE — 구조 비교", "개념");
codeBlock(s, { x: 0.55, y: 1.3, w: 5.95, h: 3.3, title: "IF — 조건식이 복잡할 때", code: [
  "IF 조건.",
  "  ...",
  "ELSEIF 조건.",
  "  ...",
  "ELSE.",
  "  ...",
  "ENDIF.",
] });
codeBlock(s, { x: 6.85, y: 1.3, w: 5.95, h: 3.3, title: "CASE — 하나의 값으로 여러 갈래", code: [
  "CASE 변수.",
  "  WHEN 값1.",
  "    ...",
  "  WHEN 값2.",
  "    ...",
  "  WHEN OTHERS.",
  "ENDCASE.",
] });
banner(s, 0.55, 4.95, 12.25, "선택 기준: 하나의 값으로 여러 갈래 → CASE  /  조건식이 복잡 → IF", {});
s.addNotes("ENDIF./ENDCASE. 누락이 단골 오류. 블록을 열면 닫는 문장부터 쓰는 습관을 시연.");

/* 28. 연산자 + N/C/X */
s = light();
header(s, "U03", "연산자 · 그리고 주문 상태 N/C/X", "개념");
tbl(s, [
  ["구분", "연산자"],
  ["비교", "=   <>   >   <   >=   <="],
  ["(옛 표기)", "EQ  NE  GT  LT  GE  LE — 옛 코드에서 자주 만남"],
  ["논리", "AND   OR   NOT"],
], { x: 0.55, y: 1.35, w: 7.3, colW: [1.7, 5.6], fontSize: 13, rowH: 0.5 });
card(s, 8.3, 1.35, 4.5, 2.9, "우리 주문의 상태", "N = 신규\nC = 완료\nX = 취소\n\n오늘 오후 SE11 도메인에 새겨 넣고,\n3일 내내 만나게 됩니다.", { bSize: 13.5 });
s.addText("다른 언어의 == 와 달리 ABAP 비교는 = 하나입니다 (대입도 = — 문맥으로 구분).", { x: 0.55, y: 3.6, w: 7.3, h: 0.6, fontFace: F, fontSize: 12.5, color: MUTED, margin: 0 });
s.addNotes("점심 직후라 가볍게. '=이 비교도 대입도 된다'는 혼동 포인트를 미리 짚는다.");

/* 29. 따라치기 코드 */
s = light();
header(s, "U03", "따라치기 — 상태 판정과 재고 확인", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 5.95, h: 4.6, title: "1) CASE: 상태 코드 → 상태명", code: [
  "gv_status = 'N'.",
  "",
  "CASE gv_status.",
  "  WHEN 'N'.",
  "    gv_text = '신규'.",
  "  WHEN 'C'.",
  "    gv_text = '완료'.",
  "  WHEN 'X'.",
  "    gv_text = '취소'.",
  "  WHEN OTHERS.",
  "    gv_text = '알수없음'.",
  "ENDCASE.",
] , fontSize: 10.5});
codeBlock(s, { x: 6.85, y: 1.25, w: 5.95, h: 4.6, title: "2) IF: 재고 확인 (+ AND)", code: [
  "gv_qty   = 5.",
  "gv_stock = 3.",
  "",
  "IF gv_qty <= 0.",
  "  WRITE / '오류: 수량은 1 이상'.",
  "ELSEIF gv_qty > gv_stock.",
  "  WRITE: / '재고 부족!', gv_qty.",
  "ELSE.",
  "  WRITE / '주문 가능합니다.'.",
  "ENDIF.",
  "",
  "IF gv_qty > 0 AND gv_qty <= gv_stock.",
], fontSize: 10.5 });
s.addNotes("교재 U03 💻 절 전체를 입력. 조건 순서를 바꾸면(재고 부족을 먼저) 결과가 어떻게 달라지는지 물어본다.");

/* 30. 소문자 실험 */
s = light();
header(s, "U03", "실험 — 'n' 을 넣으면?", "함께 해보기");
codeBlock(s, { x: 0.55, y: 1.4, w: 6.4, h: 1.4, code: ["gv_status = 'n'.        \" 소문자로 바꿔 실행!"] });
s.addText("결과: '알수없음'", { x: 0.55, y: 3.1, w: 5, h: 0.5, fontFace: F, fontSize: 18, bold: true, color: RED, margin: 0 });
card(s, 0.55, 3.8, 12.25, 1.7, "왜?", "키워드는 대소문자를 구분하지 않지만, 따옴표 안 문자열은 구분합니다. 'N' ≠ 'n'\n→ 데이터 값 비교에서 대소문자는 항상 의식할 것 (Day 3 상태 검증에서 다시 만납니다)", { bSize: 14 });
s.addNotes("U01 문장 규칙 2번의 복습. 소문자 'n'을 넣고 왜 N 분기로 안 가는지 질문이 반드시 나온다 — 이 슬라이드로 선제 대응.");

/* 31. COND */
s = light();
header(s, "U03", "모던 ABAP — COND", "✨ 참고");
codeBlock(s, { x: 0.55, y: 1.35, w: 9.6, h: 2.4, code: [
  "gv_text = COND #( WHEN gv_status = 'N' THEN '신규'",
  "                  WHEN gv_status = 'C' THEN '완료'",
  "                  WHEN gv_status = 'X' THEN '취소'",
  "                  ELSE '알수없음' ).",
] });
s.addText("COND는 \"값을 돌려주는 IF\" — 대입 한 줄로 끝납니다.", { x: 0.6, y: 4.1, w: 11, h: 0.5, fontFace: F, fontSize: 15, color: INK, margin: 0 });
s.addNotes("시간이 없으면 건너뛴다. CASE 범위 조건 질문이 나오면: 이 과정에서 CASE는 고정 분기용, 범위·복합 조건은 IF가 명확하다고 답한다.");

/* 32. Q04 */
s = light();
header(s, "U03", "퀴즈 Q04 — 주문 등급 판정", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U03Q", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  (스켈레톤 제공 — IF ~ ELSEIF ~ ELSE ~ ENDIF 사용)", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 14, color: INK, margin: 0 });
tbl(s, [
  ["금액", "등급"],
  ["100만원 이상", "'VIP'"],
  ["10만원 이상 ~ 100만원 미만", "'일반'"],
  ["10만원 미만", "'소액'"],
], { x: 0.55, y: 1.85, w: 6.6, colW: [4.2, 2.4], fontSize: 13, rowH: 0.48 });
bullets(s, [
  { t: "값을 바꿔가며(50000, 500000) 세 등급이 모두 나오는지 확인", b: true },
  { t: "조건 순서에 주의 — VIP 판정을 일반보다 먼저!", color: RED },
], { x: 0.55, y: 4.3, w: 7.0, h: 1.3, fontSize: 13.5 });
card(s, 7.6, 1.85, 5.2, 2.4, "다 풀었다면", "퀴즈집 U03-D (심화)\n어려웠다면 U03-E", { fill: "FDF3E3", tColor: "9A6A12", bSize: 12.5 });
s.addNotes("조건 순서가 결과를 바꾸는 체험이 목적. >= 100만 조건을 뒤에 두면 어떻게 되는지 발문.");

/* ===========================================================================
 * U04 (33~39)
 * ======================================================================== */
s = unitTitle("U04", "14:00 ~ 14:50", "반복문 DO / WHILE",
  ["DO/WHILE로 반복하고 sy-index를 읽을 수 있다", "EXIT/CONTINUE/CHECK로 반복을 제어할 수 있다"],
  "ZEDU##_U04",
  "진행 팁: 먼저 5회 반복의 sy-index를 전원이 예측하게 한다. EXIT/CONTINUE/CHECK를 같은 예제로 비교. 무한 루프 종료 방법은 실행 전에 미리 말한다.");

/* 34. DO/WHILE 구조 */
s = light();
header(s, "U04", "반복 구조 3가지", "개념");
codeBlock(s, { x: 0.55, y: 1.35, w: 3.95, h: 2.0, title: "횟수 지정", code: ["DO 5 TIMES.", "  ...", "ENDDO."] });
codeBlock(s, { x: 4.7, y: 1.35, w: 3.95, h: 2.0, title: "무한 + 탈출", code: ["DO.", "  IF 조건. EXIT. ENDIF.", "ENDDO."] });
codeBlock(s, { x: 8.85, y: 1.35, w: 3.95, h: 2.0, title: "조건 반복", code: ["WHILE 조건.", "  ...", "ENDWHILE."] });
card(s, 0.55, 3.75, 6.0, 1.8, "sy-index", "지금 몇 번째 반복인지 (1부터 시작)\nDO 5 TIMES 안에서: 1, 2, 3, 4, 5", { bSize: 13.5 });
s.addText("퀴즈 미리보기: DO 5 TIMES 안에서 sy-index를 출력하면 어떤 값이 몇 개 나올까요?", { x: 6.9, y: 3.85, w: 5.9, h: 1.2, fontFace: F, fontSize: 13, color: MUTED, margin: 0 });
s.addNotes("전원이 sy-index 값을 예측하게 한 뒤 실행으로 확인 — 예측→실행→확인 리듬.");

/* 35. 제어 + 무한루프 */
s = light();
header(s, "U04", "반복 제어 — EXIT · CONTINUE · CHECK", "개념");
tbl(s, [
  ["명령", "효과"],
  [{ text: "EXIT", opts: { fontFace: FC, b: true } }, "반복 즉시 탈출"],
  [{ text: "CONTINUE", opts: { fontFace: FC, b: true } }, "이번 회차 건너뜀"],
  [{ text: "CHECK 조건", opts: { fontFace: FC, b: true } }, "조건이 거짓이면 건너뜀 (CONTINUE와 동일 효과)"],
], { x: 0.55, y: 1.35, w: 8.2, colW: [2.0, 6.2], fontSize: 13, rowH: 0.5 });
s.addShape("roundRect", { x: 0.55, y: 3.65, w: 12.25, h: 1.9, fill: { color: "FBEBE9" }, rectRadius: 0.09 });
s.addText([{ text: "⚠️ 무한 루프 주의", options: { fontSize: 15, bold: true, color: RED, breakLine: true, paraSpaceAfter: 6 } },
           { text: "DO.(횟수 없음)나 WHILE에서 조건 변수를 갱신하지 않으면 프로그램이 멈추지 않습니다.\n화면이 멎으면 강사를 부르세요 → 메뉴에서 트랜잭션 중단으로 종료합니다.", options: { fontSize: 13, color: INK } }],
  { x: 0.85, y: 3.85, w: 11.6, h: 1.5, fontFace: F, margin: 0, valign: "top" });
s.addNotes("CHECK를 루프 밖에서 쓰려는 시도가 나옴 — 루프 제어 맥락으로 한정해 소개.");

/* 36. 코드 1 */
s = light();
header(s, "U04", "따라치기 ① — DO와 누적합", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 7.4, h: 4.4, title: "ZEDU##_U04 (앞부분)", code: [
  "* 1) DO n TIMES + sy-index",
  "DO 5 TIMES.",
  "  WRITE: / sy-index, '번째 반복입니다'.",
  "ENDDO.",
  "",
  "* 2) 1~10 누적합",
  "CLEAR gv_sum.",
  "DO 10 TIMES.",
  "  gv_sum = gv_sum + sy-index.",
  "ENDDO.",
  "WRITE: / '1~10 합계:', gv_sum.        \" 55",
] });
card(s, 8.2, 1.25, 4.6, 2.6, "누적 패턴", "초기화(CLEAR)는 루프 밖!\n루프 안에서 초기화하면\n매번 0부터 다시 시작\n\n→ 이따 Q06 버그의 정체", { bSize: 13 });
s.addNotes("'누적 변수 초기화를 루프 안에 둠'이 단골 실수 — U05 디버거 퀴즈(Q06)와 그대로 연결된다고 예고.");

/* 37. 코드 2 */
s = light();
header(s, "U04", "따라치기 ② — WHILE과 제어", "💻 시연");
codeBlock(s, { x: 0.55, y: 1.25, w: 7.4, h: 4.6, title: "ZEDU##_U04 (뒷부분)", code: [
  "* 3) WHILE",
  "CLEAR gv_cnt.",
  "WHILE gv_cnt < 3.",
  "  gv_cnt = gv_cnt + 1.     \" 이 줄을 지우면? -> 무한 루프!",
  "  WRITE: / 'WHILE 반복:', gv_cnt.",
  "ENDWHILE.",
  "",
  "* 4) CONTINUE / EXIT",
  "DO 10 TIMES.",
  "  IF sy-index MOD 2 = 1. CONTINUE. ENDIF.  \" 홀수 건너뛰기",
  "  IF sy-index > 8.       EXIT.     ENDIF.  \" 8 초과면 종료",
  "  WRITE: / '짝수:', sy-index.       \" 2 4 6 8",
  "ENDDO.",
], fontSize: 10.5 });
card(s, 8.2, 1.25, 4.6, 2.2, "실행 전 예측!", "4)의 출력은?\n\n→ 2, 4, 6, 8\n(홀수는 CONTINUE,\n10은 EXIT에 걸림)", { bSize: 13 });
s.addNotes("MOD 연산이 Q05의 힌트. 실행 전 출력 예측을 받고 실행으로 확인.");

/* 38. Q05 */
s = light();
header(s, "U04", "퀴즈 Q05 — 3의 배수 합", "✍️ 백지 코딩");
s.addText([{ text: "ZEDU##_U04Q", options: { fontFace: FC, bold: true, color: NAVY } }, { text: " : 1부터 100까지 중 3의 배수만 모두 더해 출력하세요.", options: {} }],
  { x: 0.55, y: 1.35, w: 12.2, h: 0.5, fontFace: F, fontSize: 15.5, color: INK, margin: 0 });
card(s, 0.55, 2.1, 5.9, 2.2, "힌트 / 판정", "힌트: MOD\n\n기대 결과: 1683", { bSize: 15 });
card(s, 6.75, 2.1, 6.05, 2.2, "스켈레톤 없음", "Q03에 이어 두 번째 백지 코딩.\nREPORT부터 스스로!", { fill: "FDF3E3", tColor: "9A6A12", bSize: 13.5 });
banner(s, 0.55, 4.65, 12.25, "빨리 끝났다면 퀴즈집 D04 · 어려웠다면 E04 · 정답은 교재 부록 A", { color: "FDF3E3", tcolor: "9A6A12" });
s.addNotes("완료자는 퀴즈집 U04-D. 남은 10분 내 미완료여도 U05 진행에 지장 없음.");

/* 39. 브릿지 */
s = light();
header(s, "쉬는시간", "기초 문법 4종 세트 — 완료!", "정리");
const done1 = [["U01", "프로그램 생성 · WRITE"], ["U02", "변수 · 타입 · 계산"], ["U03", "조건 IF/CASE"], ["U04", "반복 DO/WHILE"]];
done1.forEach((d, i) => {
  const x = 0.7 + i * 3.1;
  s.addShape("roundRect", { x, y: 1.6, w: 2.8, h: 1.5, fill: { color: TINT }, rectRadius: 0.1 });
  s.addText([{ text: "✔ " + d[0], options: { fontSize: 16, bold: true, color: GREEN, breakLine: true, paraSpaceAfter: 4 } }, { text: d[1], options: { fontSize: 11.5, color: INK } }],
    { x: x + 0.2, y: 1.75, w: 2.4, h: 1.2, fontFace: F, margin: 0, valign: "top" });
});
s.addText([{ text: "다음: 에러를 스스로 찾는 무기 — 디버거", options: { fontSize: 20, bold: true, color: NAVY, breakLine: true, paraSpaceAfter: 8 } },
           { text: "오늘부터 여러분의 1차 질문 상대는 강사가 아니라 디버거입니다.", options: { fontSize: 14, color: MUTED } }],
  { x: 0.7, y: 3.9, w: 12, h: 1.3, fontFace: F, margin: 0 });
s.addNotes("15:05까지 휴식. U05는 '절대 줄이지 않을 구간' — 이후 강사 병목을 줄이는 투자.");

/* ===========================================================================
 * U05 (40~45)
 * ======================================================================== */
s = unitTitle("U05", "15:05 ~ 15:45", "디버거 기초",
  ["브레이크포인트를 걸고 한 줄씩 실행하며 변수값을 확인할 수 있다", "\"에러가 나면 디버거로 먼저 확인\" 습관을 들인다"],
  null,
  "시간 배분: 5분 목적/중단점 → 15분 /h·F5/F6/F8·변수창 → 10분 값 변경 체험 → 10분 Q06. 이 유닛은 절대 줄이지 않는다.");

/* 41. 조작 표 */
s = light();
header(s, "U05", "디버거 조작법", "개념");
tbl(s, [
  ["조작", "방법"],
  ["브레이크포인트", "에디터에서 해당 줄 클릭 → [세션 브레이크포인트] (줄 왼쪽 아이콘)"],
  ["디버거 시작", "브레이크포인트 상태로 F8 (또는 명령창 /h 입력 후 실행)"],
  [{ text: "F5", b: true }, "한 줄 실행 — 호출 안으로 들어감 (Step Into)"],
  [{ text: "F6", b: true }, "한 줄 실행 — 호출 안으로 안 들어감 (Step Over)"],
  [{ text: "F7", b: true }, "현재 블록 끝까지 실행하고 복귀"],
  [{ text: "F8", b: true }, "다음 브레이크포인트까지 계속 (없으면 끝까지)"],
  ["변수 보기", "변수명 더블클릭 → 우측 값 표시 (연필 아이콘 = 값 변경)"],
], { x: 0.55, y: 1.3, w: 7.4, colW: [1.9, 5.5], fontSize: 11, rowH: 0.42 });
shot(s, { x: 8.2, y: 1.3, w: 4.6, h: 4.4, id: "D1-04", cap: "디버거 — 현재 실행 줄 + 변수값 감시\n(gv_sum · sy-index)" });
s.addNotes("F5/F6 차이는 Day 3 함수 호출부터 체감된다고 예고. 디버거는 '코드 바라보기'가 아니라 실행 중 값이 언제 달라지는지 찾는 도구.");

/* 42. 관찰 실습 */
s = light();
header(s, "U05", "따라치기 — 누적합을 눈으로 보기", "💻 시연");
bullets(s, [
  { t: "1)  ZEDU##_U04 열기 → gv_sum 누적 줄에 브레이크포인트 설정", b: true },
  { t: "     (gv_sum = gv_sum + sy-index. 줄)", sub: true },
  { t: "2)  F8 실행 → 디버거가 열림" },
  { t: "3)  gv_sum, sy-index 더블클릭으로 감시하며 F8 반복", b: true },
  { t: "     → 루프 안 브레이크포인트라 매 회전마다 멈춤 — 합이 쌓이는 과정 관찰", sub: true },
  { t: "4)  브레이크포인트 해제 (다시 클릭)" },
], { x: 0.55, y: 1.35, w: 6.9, h: 3.4, fontSize: 13.5 });
shot(s, { x: 7.7, y: 1.3, w: 5.1, h: 4.4, id: "D1-05", cap: "gv_sum = gv_sum + sy-index. 줄의\n브레이크포인트 아이콘" });
s.addNotes("자주 막힘: 중단점이 안 걸림 → 활성 버전·실행 프로그램 이름 확인. 너무 깊이 들어감 → F6/F7로 복귀.");

/* 43. 값 변경 */
s = light();
header(s, "U05", "값 변경 체험 — 디버거는 읽기 전용이 아니다", "💻 시연");
bullets(s, [
  { t: "디버거에서 gv_sum 값을 직접 100으로 바꾸고 끝까지 실행(F8)", b: true },
  { t: "→ 출력이 바뀐다: 코드 수정 없이 \"이 값이면 어떻게 되지?\"를 실험 가능" },
], { x: 0.55, y: 1.4, w: 12.2, h: 1.4, fontSize: 15 });
card(s, 0.55, 3.1, 12.25, 1.9, "⚠️ 운영 시스템에서는", "값 변경 디버깅은 권한·감사 이슈가 있는 민감한 행위입니다. 교육 시스템에서만 자유롭게 실험하세요.\n(실무에서는 긴급 분석에 제한적으로, 절차를 갖춰 사용)", { fill: "FBEBE9", tColor: RED, bSize: 13.5 });
s.addNotes("예상 질문 — Q. 운영에서도 디버깅? A. 제한적으로 하지만 권한·절차·감사 필요, 값 변경은 특히 엄격.");

/* 44. Q06 */
s = light();
header(s, "U05", "퀴즈 Q06 — 버그를 찾아라", "✍️ 퀴즈");
s.addText([{ text: "ZEDU##_U05Q", options: { fontFace: FC, bold: true, color: NAVY } }, { text: "  아래 코드를 그대로 입력. 1~10의 합 55가 나와야 하는데 10이 나옵니다!", options: {} }],
  { x: 0.55, y: 1.2, w: 12.2, h: 0.5, fontFace: F, fontSize: 14, color: INK, margin: 0 });
codeBlock(s, { x: 0.55, y: 1.85, w: 6.9, h: 3.4, code: [
  "REPORT zedu##_u05q.",
  "",
  "DATA gv_sum TYPE i.",
  "",
  "DO 10 TIMES.",
  "  gv_sum = 0.",
  "  gv_sum = gv_sum + sy-index.",
  "ENDDO.",
  "",
  "WRITE: / '1~10 합계:', gv_sum.",
] });
card(s, 7.75, 1.85, 5.05, 3.4, "규칙", "눈으로 찾지 말 것!\n\n반드시 디버거로 gv_sum이\n언제 0으로 돌아가는지 관찰\n— 그게 오늘의 목적입니다.\n\n원인 줄을 찾고, 고치세요.", { fill: "FDF3E3", tColor: "9A6A12", bSize: 13.5 });
banner(s, 0.55, 5.55, 12.25, "빨리 끝났다면 퀴즈집 D05 · 어려웠다면 E05 · 정답은 교재 부록 A", { color: "FDF3E3", tcolor: "9A6A12" });
s.addNotes("U04에서 예고한 '초기화를 루프 안에 둔' 버그. 디버거 사용 자체가 목적이므로 눈으로 찾은 학생도 디버거로 재확인하게 한다.");

/* 45. 브릿지 → DDIC */
s = light();
header(s, "쉬는시간", "여기부터는 데이터의 세계", "브릿지");
s.addText([{ text: "지금까지: 프로그램 안의 변수 — 실행이 끝나면 사라진다", options: { fontSize: 16, color: MUTED, breakLine: true, paraSpaceAfter: 10 } },
           { text: "지금부터: 시스템에 남는 데이터 — DB 테이블을 직접 설계한다", options: { fontSize: 18, bold: true, color: NAVY } }],
  { x: 0.7, y: 1.5, w: 12, h: 1.5, fontFace: F, margin: 0 });
card(s, 0.7, 3.2, 5.9, 2.4, "U06 (15:55~)", "도메인과 데이터 엘리먼트\n— 필드의 '재료' 만들기", { bSize: 14 });
card(s, 6.9, 3.2, 5.9, 2.4, "U07 (16:55~)", "주문 테이블 ZEDU##_ORDER 생성\n— 오늘의 최종 결과물!", { bSize: 14 });
s.addNotes("스토리 환기: '신입 개발자의 첫 임무 = 주문 테이블 설계'. U07 활성 테이블이 Day 2·3 전체의 전제다.");

/* ===========================================================================
 * U06 (46~53)
 * ======================================================================== */
s = unitTitle("U06", "15:55 ~ 16:45", "SE11 ① 도메인과 데이터 엘리먼트",
  ["도메인 → 데이터 엘리먼트 → 필드 3계층을 이해한다", "고정값을 가진 도메인과 DE를 만들 수 있다"],
  null,
  "진행 팁: 칠판에 '도메인→DE→필드' 세 칸을 끝까지 남겨둔다. 도메인=기술, DE=의미, 필드=사용처 반복. 고정값은 F4·화면 기준일 뿐 Open SQL 변경을 자동 차단하지 않음을 분명히.");

/* 47. 3계층 */
s = light();
header(s, "U06", "DDIC 3계층 — 도메인 · DE · 필드", "개념 ★");
s.addText("데이터 딕셔너리(DDIC) = 시스템 전체가 공유하는 \"데이터 정의 창고\" (SE11에서 관리)", { x: 0.55, y: 1.2, w: 12.2, h: 0.45, fontFace: F, fontSize: 13.5, color: INK, margin: 0 });
const layers = [
  ["도메인", "기술 속성", "CHAR 1\n고정값 N / C / X", TINT, NAVY],
  ["데이터 엘리먼트", "의미 (라벨·문서)", "\"주문상태\" 라는 이름표", "E4ECFA", NAVY],
  ["테이블 필드", "실제 사용처", "ZEDU##_ORDER-STATUS", NAVY, "FFFFFF"],
];
layers.forEach((l, i) => {
  const x = 0.75 + i * 4.25;
  s.addShape("roundRect", { x, y: 2.1, w: 3.55, h: 2.5, fill: { color: l[3] }, rectRadius: 0.1 });
  s.addText([{ text: l[0], options: { fontSize: 17, bold: true, color: l[4], breakLine: true, paraSpaceAfter: 4 } },
             { text: l[1], options: { fontSize: 11.5, color: i === 2 ? ICE : MUTED, breakLine: true, paraSpaceAfter: 10 } },
             { text: l[2], options: { fontSize: 12.5, color: l[4], fontFace: i === 2 ? FC : F } }],
    { x: x + 0.25, y: 2.3, w: 3.05, h: 2.1, fontFace: F, margin: 0, valign: "top" });
  if (i < 2) s.addText("→", { x: x + 3.55, y: 3.0, w: 0.72, h: 0.6, align: "center", fontFace: F, fontSize: 24, bold: true, color: MUTED, margin: 0 });
});
banner(s, 0.75, 5.0, 11.8, "도메인 = 기술  ·  DE = 의미  ·  필드 = 사용처  — 오늘 이 세 단어만 기억하면 성공", {});
s.addNotes("이 다이어그램을 칠판에도 그려 U07까지 남겨둔다. 학생이 어느 계층을 만들고 있는지 계속 가리킨다.");

/* 48. 왜 나누나 */
s = light();
header(s, "U06", "왜 나눠서 만들까?", "개념");
bullets(s, [
  { t: "\"주문상태\"와 \"배송상태\"는 의미(DE)는 달라도 기술 속성(CHAR 1 도메인)은 같을 수 있다", b: true },
  { t: "→ 도메인 하나를 여러 DE가 재사용, DE 하나를 여러 테이블 필드가 재사용", sub: true },
  { t: "재사용 = 일관성: 길이·허용값을 한 곳에서 관리" },
], { x: 0.55, y: 1.35, w: 12.2, h: 1.9, fontSize: 14.5 });
card(s, 0.55, 3.5, 12.25, 1.9, "미리보기 — DE 라벨의 위력", "DE에 입력하는 필드 라벨은 화면(ALV 컬럼 제목, 팝업 라벨)에 자동으로 나타납니다.\n내일 ALV에서 한글 컬럼 제목을 공짜로 얻는 이유가 오늘의 라벨 입력입니다 — 라벨 탭을 비우지 마세요!", { bSize: 13.5 });
s.addNotes("'라벨 탭 미입력 → Day 2 ALV 제목이 빈다'가 실제 단골 사고. 여기서 한 번, DE 만들 때 또 한 번 강조.");

/* 49. 도메인 ORDID */
s = light();
header(s, "U06", "따라치기 ① — 도메인 ZEDU##_ORDID", "💻 시연");
bullets(s, [
  { t: "1)  SE11 → Domain 란에 ZEDU##_ORDID → [Create]", b: true },
  { t: "2)  Short Description: 주문번호" },
  { t: "3)  Definition 탭: Data Type NUMC · No. Characters 10", b: true },
  { t: "4)  저장([Local Object]) → 활성화(Ctrl+F3)", b: true },
], { x: 0.55, y: 1.35, w: 6.6, h: 2.6, fontSize: 14 });
banner(s, 0.55, 4.2, 6.6, "DDIC 객체도 활성화해야 쓸 수 있습니다!", {});
shot(s, { x: 7.45, y: 1.3, w: 5.35, h: 4.4, id: "D1-06", cap: "SE11 도메인 Definition 탭\n(NUMC / 10) + 활성화 상태 표시" });
s.addNotes("자주 막힘: 저장 후 활성화 누락. 상태 표시(활성)를 확인하는 습관을 만든다.");

/* 50. 도메인 STATUS */
s = light();
header(s, "U06", "따라치기 ② — 도메인 ZEDU##_STATUS + 고정값", "💻 시연");
bullets(s, [
  { t: "1)  ZEDU##_STATUS → [Create] · 설명 '주문상태' · CHAR 1", b: true },
  { t: "2)  Value Range 탭 → Single Values 입력:", b: true },
], { x: 0.55, y: 1.3, w: 6.6, h: 1.2, fontSize: 14 });
tbl(s, [
  ["Fixed Value", "Description"],
  ["N", "신규"], ["C", "완료"], ["X", "취소"],
], { x: 0.85, y: 2.6, w: 4.4, colW: [1.9, 2.5], fontSize: 13, rowH: 0.42 });
bullets(s, [
  { t: "3)  저장 → 활성화 — 이 도메인을 쓰는 필드에 F4 목록이 공짜로 생깁니다", b: true },
], { x: 0.55, y: 4.6, w: 6.8, h: 0.8, fontSize: 14 });
shot(s, { x: 7.45, y: 1.3, w: 5.35, h: 4.4, id: "D1-07", cap: "Value Range — N 신규 / C 완료 / X 취소\n고정값 3행" });
s.addNotes("N/C/X는 U03에서 이미 만난 값 — '아까 조건문으로 판정한 그 상태를 이제 시스템에 새긴다'로 연결.");

/* 51. 고정값의 한계 */
s = light();
header(s, "U06", "고정값이 해주는 것 / 안 해주는 것", "주의");
card(s, 0.55, 1.4, 6.0, 3.2, "✅ 해주는 것", "화면 입력 검사의 기준\n\nF4 도움말 목록 자동 생성\n\n\"정의상 N/C/X 외에는 없다\"는 문서화", { fill: "EAF3EC", tColor: GREEN, bSize: 14 });
card(s, 6.85, 1.4, 6.0, 3.2, "❌ 안 해주는 것", "프로그램의 INSERT/UPDATE까지\n자동으로 막지는 않습니다!\n\n→ 그래서 Day 3에서\n검증 FM을 직접 만듭니다", { fill: "FBEBE9", tColor: RED, bSize: 14 });
s.addNotes("예상 질문 — Q. 고정값 넣으면 Z를 INSERT 못 하나? A. 화면 검증용일 뿐 DB 제약조건이 아니다. 검증 로직이 필요한 이유.");

/* 52. DE 2개 */
s = light();
header(s, "U06", "따라치기 ③ — 데이터 엘리먼트 2개", "💻 시연");
bullets(s, [
  { t: "1)  SE11 → Data type 란에 ZEDU##_ORDID → [Create] → Data Element 선택", b: true },
  { t: "2)  Data Type 탭: Domain 란에 ZEDU##_ORDID", b: true },
  { t: "     (도메인과 같은 이름 — SAP에서 흔한 관례. 객체 종류가 달라 충돌 없음)", sub: true },
  { t: "3)  Field Label 탭: Short/Medium/Long/Heading 전부 '주문번호'", b: true },
  { t: "4)  저장 → 활성화" },
  { t: "5)  같은 방법으로 DE ZEDU##_STATUS (도메인 ZEDU##_STATUS · 라벨 '주문상태')" },
], { x: 0.55, y: 1.35, w: 6.9, h: 3.6, fontSize: 13 });
shot(s, { x: 7.7, y: 1.3, w: 5.1, h: 4.4, id: "D1-08", cap: "Field Label — Short/Medium/Long/Heading\n'주문번호' 입력" });
s.addNotes("같은 이름의 도메인/DE를 어느 칸에 넣는지 혼동 — Domain 란(도메인)과 Data type 란(DE) 위치를 화면에서 명확히 가리킨다.");

/* 53. Q07 */
s = light();
header(s, "U06", "퀴즈 Q07 — 배송방법 도메인·DE", "✍️ 퀴즈");
s.addText([{ text: "도메인 + DE  ", options: {} }, { text: "ZEDU##_DELIV", options: { fontFace: FC, bold: true, color: NAVY } }, { text: " 를 만드세요.", options: {} }],
  { x: 0.55, y: 1.3, w: 12, h: 0.5, fontFace: F, fontSize: 15, color: INK, margin: 0 });
tbl(s, [
  ["대상", "요구사항"],
  ["도메인", "CHAR 1 · 고정값  P 택배 / Q 퀵 / V 방문수령"],
  ["DE", "위 도메인 참조 · 라벨 '배송방법'"],
], { x: 0.55, y: 2.0, w: 8.6, colW: [1.7, 6.9], fontSize: 13, rowH: 0.52 });
bullets(s, [
  { t: "Day 3 확장 과제에서 주문 테이블에 이 필드를 직접 추가해볼 수 있습니다", color: MUTED },
], { x: 0.55, y: 3.6, w: 8.8, h: 0.6, fontSize: 12.5 });
card(s, 9.5, 2.0, 3.3, 2.2, "판정", "도메인·DE 모두\n'활성' 상태", { bSize: 13 });
banner(s, 0.55, 4.65, 12.25, "빨리 끝났다면 퀴즈집 D06 · 어려웠다면 E06 · 정답은 교재 부록 A", { color: "FDF3E3", tcolor: "9A6A12" });
s.addNotes("방금 한 것의 반복이라 대부분 완주 가능. 완료자는 퀴즈집 U06-D.");

/* ===========================================================================
 * U07 (54~62)
 * ======================================================================== */
s = unitTitle("U07", "16:55 ~ 17:45", "SE11 ② 스트럭처와 테이블",
  ["투명 테이블을 생성하고 활성화할 수 있다", "스트럭처와 테이블의 차이를 안다"],
  null,
  "시간 안전장치: 시작 후 25분 테이블 활성 마감 / 43분 스트럭처 활성 마감. 미달자는 기준 객체로 전환(전환 문장 사용). 진행: 9필드 표를 먼저 전부 읽고 → MANDT·ORDER_ID 키부터 입력.");
banner(s, 0.9, 6.6, 7.4, "⏰ 시작+25분 테이블 활성 · 시작+43분 스트럭처 활성 마감", {});

/* 55. 테이블 vs 스트럭처 */
s = light();
header(s, "U07", "투명 테이블 vs 스트럭처", "개념");
card(s, 0.55, 1.35, 6.0, 2.6, "투명 테이블", "DDIC 정의가 DB에 실제 테이블로 생성\n\n데이터가 저장됨\n\n오늘: ZEDU##_ORDER (주문)", { bSize: 13.5 });
card(s, 6.85, 1.35, 6.0, 2.6, "스트럭처", "필드 묶음의 '정의'일 뿐\n\n데이터 저장 안 됨 — 프로그램 변수·화면 구조로 사용\n\n오늘: ZEDU##_S_LIST (조회 화면용)", { bSize: 13.5 });
bullets(s, [
  { t: "MANDT(Client) = 한 시스템 안의 독립된 회사 공간 구분자 — 업무 테이블 1번 키는 관례적으로 MANDT", b: true },
  { t: "필드 타입 지정 3가지를 오늘 다 써봅니다: ① 내가 만든 DE  ② 공용/표준 DE  ③ 빌트인 타입 직접", }
], { x: 0.6, y: 4.3, w: 12.2, h: 1.5, fontSize: 13.5 });
s.addNotes("예상 질문 — Q. 스트럭처 데이터는 어디에? A. 자체 저장소 없음. Q. MANDT를 WHERE에 매번? A. Open SQL이 현재 클라이언트를 암묵 처리.");

/* 56. 테이블 생성 절차 */
s = light();
header(s, "U07", "따라치기 ① — 테이블 ZEDU##_ORDER 생성", "💻 시연");
bullets(s, [
  { t: "1)  SE11 → Database table 란에 ZEDU##_ORDER → [Create]", b: true },
  { t: "2)  Short Description '주문 (##번)'" },
  { t: "3)  Delivery and Maintenance 탭:", b: true },
  { t: "     Delivery Class A  ·  Data Browser/Table View Editing: Display/Maintenance Allowed", sub: true },
  { t: "4)  Fields 탭에 9개 필드 입력 (다음 슬라이드 표)", b: true },
], { x: 0.55, y: 1.4, w: 8.4, h: 3.0, fontSize: 14 });
banner(s, 0.55, 4.7, 8.4, "표를 끝까지 먼저 읽고 → 키 2개(MANDT·ORDER_ID)부터 입력합니다", {});
s.addNotes("행 수·순서를 강사 화면과 자주 대조시킨다. Delivery Class A(업무 데이터) 의미는 한 줄만.");

/* 57. 9필드 표 */
s = light();
header(s, "U07", "ZEDU##_ORDER — 9개 필드", "핵심 표 ★");
tbl(s, [
  ["Field", "Key", "Data element / 직접 타입", "뜻"],
  [{ text: "MANDT", opts: { fontFace: FC } }, { text: "✔", align: "center" }, "MANDT (표준)", "클라이언트"],
  [{ text: "ORDER_ID", opts: { fontFace: FC } }, { text: "✔", align: "center" }, { text: "ZEDU##_ORDID (내가 만든 것)", b: true }, "주문번호"],
  [{ text: "CUST_ID", opts: { fontFace: FC } }, "", "ZEDU_CUSTID (공용)", "고객 ID"],
  [{ text: "PROD_ID", opts: { fontFace: FC } }, "", "ZEDU_PRODID (공용)", "제품 ID"],
  [{ text: "QUANTITY", opts: { fontFace: FC } }, "", { text: "직접 타입: INT4", opts: { fill: "FDF3E3" } }, "수량"],
  [{ text: "STATUS", opts: { fontFace: FC } }, "", { text: "ZEDU##_STATUS (내 것)", b: true }, "상태"],
  [{ text: "ORDER_DATE", opts: { fontFace: FC } }, "", { text: "직접 타입: DATS", opts: { fill: "FDF3E3" } }, "주문일"],
  [{ text: "REMARK", opts: { fontFace: FC } }, "", { text: "직접 타입: CHAR 40", opts: { fill: "FDF3E3" } }, "비고"],
  [{ text: "ERNAM", opts: { fontFace: FC } }, "", "ERNAM (표준)", "등록자"],
], { x: 0.55, y: 1.25, w: 8.0, colW: [1.7, 0.6, 3.9, 1.8], fontSize: 10.5, rowH: 0.37 });
bullets(s, [
  { t: "키 필드 2개는 Key + Initial Values 체크", b: true },
  { t: "직접 타입(음영)은 해당 행에서 Predefined Type 버튼", sub: true },
], { x: 0.55, y: 5.35, w: 8.0, h: 0.9, fontSize: 12 });
shot(s, { x: 8.85, y: 1.25, w: 3.95, h: 4.6, id: "D1-09", cap: "ZEDU##_ORDER Fields — 9필드 완료\n키 2개 체크" });
s.addNotes("타입 지정 3방식(내 DE/공용 DE/직접)이 이 표 안에 다 있음을 가리킨다. 통화/수량 경고가 나오면 교재의 지정 타입과 대조.");

/* 58. 기술설정/활성화 */
s = light();
header(s, "U07", "기술설정 → 활성화", "💻 시연");
bullets(s, [
  { t: "5)  [Technical Settings]: Data Class APPL0 · Size Category 0 → 저장, 뒤로", b: true },
  { t: "6)  메뉴 Extras → Enhancement Category → 'Cannot Be Enhanced' (교육용 단순화)", b: true },
  { t: "7)  저장 → 활성화!", b: true },
], { x: 0.55, y: 1.4, w: 12.0, h: 2.0, fontSize: 15 });
s.addShape("roundRect", { x: 0.55, y: 3.7, w: 12.25, h: 1.6, fill: { color: "EAF3EC" }, rectRadius: 0.09 });
s.addText([{ text: "🎉 활성화 성공 = DB에 실제 테이블이 생긴 것", options: { fontSize: 17, bold: true, color: GREEN, breakLine: true, paraSpaceAfter: 5 } },
           { text: "여러분이 방금 이 시스템에 업무 테이블 하나를 만들었습니다 — 오늘의 최종 결과물입니다.", options: { fontSize: 13, color: INK } }],
  { x: 0.85, y: 3.9, w: 11.6, h: 1.2, fontFace: F, margin: 0, valign: "top" });
s.addNotes("활성화 실패 시: 오류 로그 첫 줄 → 키 → 기술설정 → Enhancement Category 순서로 확인.");

/* 59. 체크포인트 */
s = light();
header(s, "U07", "⏰ 체크포인트 — 시작 후 25분", "안전장치");
banner(s, 0.55, 1.35, 12.25, "지금 ZEDU##_ORDER 9필드 + 기술설정 + 활성 상태여야 합니다", {});
bullets(s, [
  { t: "완료 → 그대로 스트럭처로 진행" },
  { t: "미완료 → 필드 대조표로 3분 재확인 후, 안 되면 기준 객체로 전환", b: true },
], { x: 0.55, y: 2.2, w: 12.0, h: 1.3, fontSize: 15 });
card(s, 0.55, 3.7, 12.25, 2.2, "기준본 전환은 실패가 아닙니다", "\"지금은 개인 평가가 아니라 전체 흐름을 연결하는 실습입니다. 이 단계의 환경·오타 문제는 기준본으로 넘기고,\n다음 단계에서 다시 직접 작성하겠습니다.\"\n\n전환 후에도: 코드를 한 번 읽고 → 내 번호로 바꾸고 → 활성화 → 실행은 반드시 직접!", { bSize: 13 });
s.addNotes("강사가이드 2-2의 전환 문장 그대로. 43분에 스트럭처 마감이 한 번 더 있다.");

/* 60. 스트럭처 12필드 */
s = light();
header(s, "U07", "따라치기 ② — 스트럭처 ZEDU##_S_LIST (12필드)", "💻 시연");
s.addText("내일 조회 화면(ALV)에 뿌릴 \"주문 + 고객명 + 제품명 + 금액\" 구조를 미리 만들어 둡니다. SE11 → Data type → [Create] → Structure.",
  { x: 0.55, y: 1.15, w: 12.2, h: 0.55, fontFace: F, fontSize: 12.5, color: INK, margin: 0 });
tbl(s, [
  ["Component", "Component Type", "Component", "Component Type"],
  [{ text: "ORDER_ID", opts: { fontFace: FC } }, "ZEDU##_ORDID", { text: "PRICE", opts: { fontFace: FC } }, "ZEDU_PRICE"],
  [{ text: "CUST_ID", opts: { fontFace: FC } }, "ZEDU_CUSTID", { text: "AMOUNT", opts: { fontFace: FC } }, "ZEDU_AMOUNT"],
  [{ text: "CUST_NAME", opts: { fontFace: FC } }, "ZEDU_CUSTNAME", { text: "STATUS", opts: { fontFace: FC } }, "ZEDU##_STATUS"],
  [{ text: "PROD_ID", opts: { fontFace: FC } }, "ZEDU_PRODID", { text: "ORDER_DATE", opts: { fontFace: FC } }, "ZEDU_ORDDATE"],
  [{ text: "PROD_NAME", opts: { fontFace: FC } }, "ZEDU_PRODNAME", { text: "REMARK", opts: { fontFace: FC } }, "ZEDU_REMARK"],
  [{ text: "QUANTITY", opts: { fontFace: FC } }, "ZEDU_QTY", { text: "ERNAM", opts: { fontFace: FC } }, "ERNAM"],
], { x: 0.55, y: 1.85, w: 9.6, colW: [1.9, 2.9, 1.9, 2.9], fontSize: 10.5, rowH: 0.4 });
bullets(s, [
  { t: "전부 DE 참조 — ALV 컬럼 제목이 DE 라벨에서 나오기 때문!", b: true },
  { t: "Enhancement Category 'Cannot Be Enhanced' → 저장 → 활성화", }
], { x: 0.55, y: 4.6, w: 9.6, h: 1.1, fontSize: 12.5 });
card(s, 10.4, 1.85, 2.4, 2.7, "순서 주의", "ALV에 보일\n순서대로\n입력!", { bSize: 12.5 });
s.addNotes("모든 표시 필드가 지정 DE를 참조하는지 확인 — 하나라도 빌트인이면 그 컬럼 제목이 빈다.");

/* 61. 흔한 에러 */
s = light();
header(s, "U07", "여기서 자주 막힙니다", "⚠️ 점검");
tbl(s, [
  ["증상", "원인 / 대처"],
  ["MANDT 관련 키 오류", "MANDT가 첫 필드·키인지 확인"],
  ["데이터 엘리먼트가 없다고 함", "U06 객체가 '활성'인지 + 학생 번호(##) 확인"],
  ["통화/수량 경고", "교재의 지정 DE/Predefined Type과 대조"],
  ["테이블 활성 실패", "오류 로그 첫 줄 → 키 → 기술설정 → Enhancement Category 순"],
  ["(내일) ALV 컬럼 제목 누락", "스트럭처 필드가 DE를 참조하는지 확인"],
], { x: 0.55, y: 1.35, w: 12.2, colW: [4.2, 8.0], fontSize: 12.5, rowH: 0.52 });
s.addNotes("이 표가 U07 순회 지원의 체크리스트. 활성 실패 로그는 첫 줄만 읽어도 대부분 원인이 나온다.");

/* 62. Q08 + 마감 */
s = light();
header(s, "U07", "퀴즈 Q08 — 개념 확인 (말/글로)", "✍️ 퀴즈");
bullets(s, [
  { t: "1)  도메인 ↔ 데이터 엘리먼트 ↔ 테이블 필드의 역할을 한 줄씩 설명하면?", b: true },
  { t: "2)  ZEDU##_ORDER와 ZEDU##_S_LIST의 결정적 차이는?  (힌트: 데이터)", b: true },
  { t: "3)  \"저장\"만 하고 \"활성화\"를 안 한 테이블은 프로그램에서 쓸 수 있을까?", b: true },
], { x: 0.55, y: 1.4, w: 12.1, h: 2.2, fontSize: 15 });
banner(s, 0.55, 4.0, 12.25, "⏰ 시작 후 43분 — ZEDU##_S_LIST 12필드 활성 마감. 미완료 시 기준본 전환 후 U08로!", {});
banner(s, 0.55, 4.75, 12.25, "빨리 끝났다면 퀴즈집 D07 · 어려웠다면 E07 · 정답은 교재 부록 A", { color: "FDF3E3", tcolor: "9A6A12" });
s.addNotes("Q08은 짝과 서로 설명(1분씩). 세 질문 모두 오늘 칠판의 3계층 그림으로 답할 수 있다.");

/* ===========================================================================
 * U08 (63~65)
 * ======================================================================== */
s = unitTitle("U08", "17:45 ~ 18:00", "SE16N 데이터 확인 + 샘플 데이터",
  ["SE16N으로 테이블 데이터를 조회할 수 있다", "내 주문 테이블에 실습 데이터 20건을 채운다"],
  null,
  "15분 운영 루틴(새 개념 없음): 3분 고객5·제품8 → 3분 내 테이블 0건 → 5분 로더 실행·20건 → 2분 상태 N10/C6/X4 → 2분 Day 2 준비물. 설명을 늘리지 않는다.");

/* 64. SE16N 루틴 */
s = light();
header(s, "U08", "15분 루틴 — 조회하고, 채우고, 확인한다", "💻 시연");
bullets(s, [
  { t: "1)  SE16N → ZEDU_CUST → 실행(F8) → 고객 5건 (교재 부록 B와 대조)", b: true },
  { t: "2)  ZEDU_PROD → 제품 8건" },
  { t: "3)  ZEDU##_ORDER (내 것) → 0건. 당연합니다, 방금 만들었으니까" },
  { t: "4)  SE38 → ZEDU_DATA_LOAD 실행 → 학생 번호 ## 입력 → \"20건 생성\" 메시지", b: true },
  { t: "5)  다시 SE16N → ZEDU##_ORDER → 주문 20건! 🎉", b: true },
], { x: 0.55, y: 1.35, w: 7.0, h: 3.6, fontSize: 13.5 });
shot(s, { x: 7.8, y: 1.3, w: 5.0, h: 4.4, id: "D1-10", cap: "SE16N — ZEDU##_ORDER 20건 조회 결과\n(상태 N/C/X 혼재)" });
s.addNotes("확인 질문: '내 테이블의 신규(N) 주문은 몇 건?' 정답 10건. 실패 시: 테이블명·학생 번호 → 로더 입력값 → 같은 클라이언트인지 → 초기화 재실행.");

/* 65. 리셋 버튼 */
s = light();
header(s, "U08", "ZEDU_DATA_LOAD = 리셋 버튼", "기억!");
card(s, 0.55, 1.4, 12.25, 2.2, "데이터가 엉망이 되면 언제든", "ZEDU_DATA_LOAD 재실행 (초기화 옵션 체크) → 전체 삭제 후 20건 재투입\n\n그러니 내일부터 데이터를 마음껏 지지고 볶으세요 — 망가뜨려도 됩니다!", { bSize: 14.5 });
card(s, 0.55, 3.9, 6.0, 2.1, "SE16N 습관", "\"DB에 뭐가 들었지?\" 궁금하면 SE16N.\nDay 3 CRUD에서는 /o SE16N으로\n창 하나를 항상 띄워 둡니다.", { bSize: 13 });
card(s, 6.85, 3.9, 5.95, 2.1, "확인 질문", "내 테이블의 신규(N) 주문은 몇 건?\n\n(SE16N에서 STATUS = N 조건으로 → 10건)", { fill: "FDF3E3", tColor: "9A6A12", bSize: 13 });
s.addNotes("'망가뜨려도 된다'는 심리적 안전장치가 Day 2·3 실습 참여도를 좌우한다. 꼭 말로 강조.");

/* ===========================================================================
 * 마무리 (66~67)
 * ======================================================================== */
s = light();
header(s, "공통", "막혔을 때 — 복구 루틴", "3일 공통");
const steps = [["1", "오류 목록 첫 줄", "더블클릭 → 문제 위치로"], ["2", "객체명 · ##", "내 번호로 바꿨는지"], ["3", "마침표 · 따옴표", "앞 문장부터 확인"], ["4", "디버거", "값이 언제 달라지는지"], ["5", "손 들기", "3분 넘게 막히면!"]];
steps.forEach((st, i) => {
  const x = 0.6 + i * 2.5;
  s.addShape("roundRect", { x, y: 1.7, w: 2.3, h: 2.2, fill: { color: i === 4 ? NAVY : TINT }, rectRadius: 0.1 });
  s.addText([{ text: st[0], options: { fontSize: 22, bold: true, color: i === 4 ? ACCENT : NAVY, breakLine: true, paraSpaceAfter: 5 } },
             { text: st[1], options: { fontSize: 12.5, bold: true, color: i === 4 ? "FFFFFF" : INK, breakLine: true, paraSpaceAfter: 4 } },
             { text: st[2], options: { fontSize: 10, color: i === 4 ? ICE : MUTED } }],
    { x: x + 0.18, y: 1.9, w: 1.94, h: 1.9, fontFace: F, margin: 0, valign: "top" });
});
s.addText("내일부터 DB가 등장하면: 덤프 화면은 ST22, 권한 오류는 SU53, 데이터 확인은 SE16N — 나올 때 다시 소개합니다.",
  { x: 0.6, y: 4.4, w: 12.1, h: 0.6, fontFace: F, fontSize: 12.5, color: MUTED, margin: 0 });
s.addNotes("이 카드 5개는 Day 2·3에도 같은 순서로 반복 노출된다. '1차 질문 상대는 디버거' 정신의 실행 버전.");

/* 67. Day 1 체크리스트 */
s = light();
header(s, "Day 1", "체크리스트 — 전부 있어야 Day 2가 가능합니다", "마무리");
tbl(s, [
  ["구분", "오늘 만든 것"],
  ["프로그램", "ZEDU##_U01, U01Q, U02, U02Q, Q03, U03, U03Q, U04, U04Q, U05Q"],
  ["도메인", "ZEDU##_ORDID · ZEDU##_STATUS (고정값 N/C/X) · (퀴즈) ZEDU##_DELIV"],
  ["데이터 엘리먼트", "ZEDU##_ORDID · ZEDU##_STATUS · (퀴즈) ZEDU##_DELIV"],
  [{ text: "테이블", b: true }, { text: "ZEDU##_ORDER — 활성 + 주문 20건", b: true }],
  [{ text: "스트럭처", b: true }, { text: "ZEDU##_S_LIST — 활성", b: true }],
], { x: 0.55, y: 1.35, w: 12.2, colW: [2.3, 9.9], fontSize: 12.5, rowH: 0.52 });
banner(s, 0.55, 4.9, 12.25, "내일 예고 — 이 테이블의 20건을 내부 테이블 · Open SQL · ALV로 조회 화면까지 완성합니다", { color: "DDE7F8", tcolor: NAVY });
s.addText("수고하셨습니다! 🎉", { x: 0.55, y: 5.8, w: 6, h: 0.6, fontFace: F, fontSize: 20, bold: true, color: NAVY, margin: 0 });
s.addNotes("체크리스트 미달 항목은 Day 2 아침 09:00 전 개별 복구(기준 객체). 특히 테이블·스트럭처 활성은 필수 전제.");

/* --------------------------------------------------------------------------- */
pres.writeFile({ fileName: OUT }).then(() => console.log("OK: " + OUT));
