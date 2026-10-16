# PianoMoDa · Concert Prelude

## 2026.10.14 연주자 영상 추가

연주자 소개 아래에 1분클래식 「피아니스트는 악보를 보며 무슨 생각을 할까? :: 피아니스트 박종해」 삽입. 16:9 반응형 플레이어와 YouTube 바로가기 제공.

https://www.youtube.com/watch?v=X5oTOBecUCU

2026-10-03 · 박종해 페이지를 기준으로 통일한 공연 페이지 구성

## 공통 구성

- 공연 포스터와 기본 정보
- 작품별 이동 메뉴 · 공연 소개 · 연주자 정보
- 작품 해설 · 영상 · 악보 썸네일
- 썸네일 클릭 → 페이지 안의 전체 PDF 미리보기
- 원본 프로그램 이미지 → Encore & Postlude
- `pianomoda.css`와 `pianomoda.js`: 두 공연에 공통으로 적용한 디자인·미리보기 동작

## GitHub 업로드

1. ZIP 압축을 풉니다.
2. 해당 공연 저장소의 기존 `index.html`이 있는 위치를 엽니다.
3. **Add file → Upload files**에서 압축 안의 파일을 모두 올립니다.
4. **Commit changes**로 저장합니다.

ZIP 자체나 ZIP을 담은 상위 폴더를 올리는 것이 아니라, `index.html`을 포함한 내부 파일들을 저장소 최상위에 올립니다. 이번 버전은 CSS와 JavaScript가 별도 파일이므로 `index.html`만 교체하면 안 됩니다.

## 김원 독주회: 새 Cloudflare Pages 연결

권장 이름: `261006-liszt`. 기존 GitHub 저장소 `PianoMoDa/liszt-2026`은 **Settings → Repository name → Rename**으로 이름을 바꿔 사용할 수 있습니다. Private 상태에서도 Pages 연동이 가능합니다.

Cloudflare의 **Workers & Pages → Create application → Pages → Import an existing Git repository / Connect to Git**에서 김원 저장소를 선택합니다.

| 설정 | 입력 |
| --- | --- |
| Project name | `261006-liszt` 권장; 사용 가능 여부는 생성 화면에서 확인 |
| Production branch | 업로드한 브랜치, 통상 `main` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `.` — index.html이 있는 저장소 최상위 |
| Root directory | 비워두기 |

Save and Deploy 후 Cloudflare가 실제로 발급한 `.pages.dev` 주소에서 확인합니다. GitHub 저장소가 목록에 없다면 Cloudflare GitHub 앱의 접근 대상에 이 저장소를 추가합니다.

기존 Worker는 새 Pages의 이미지·영상·악보가 모두 정상임을 확인할 때까지 유지합니다. Worker 자체가 임시 사이트나 본인 전용 사이트라는 뜻은 아닙니다. 저장소의 Private/Public과 웹사이트의 공개 여부는 별개입니다.

## 박종해 페이지 업데이트

기존 `PianoMoDa/261016-schubert` 저장소에 박종해 ZIP의 내부 파일을 모두 올립니다. 기존 Pages 연결을 이용하므로 새 프로젝트를 만들 필요가 없습니다.

D.946과 D.935의 썸네일은 사용자가 제공한 자필악보 JPG를 그대로 사용합니다. 클릭 후 열리는 PDF는 기존 전체 인쇄 악보입니다. 고악보 원본 이미지와 인쇄 악보 PDF의 역할을 캡션에 구분했습니다.

## 공유 미리보기 주소

김원 `index.html`의 공유 이미지·canonical URL은 새 Pages 이름 `261006-liszt` 기준입니다. 실제 프로젝트 이름을 다르게 정하면 `https://261006-liszt.pages.dev`를 실제 발급된 주소로 바꿉니다. 박종해는 기존 `https://261016-schubert.pages.dev` 기준입니다.

## 확인 상태

- 실제 김원 Worker의 HTML과 작업 기준 파일의 일치 확인
- 김원 6개 표지/고악보 썸네일 및 기존 PDF 원본 유지
- 박종해 제공 JPG 2개를 원본 그대로 사용
- 두 공연의 CSS·뷰어 JavaScript 일치 확인
- 9개 악보 링크, PDF 연결, 미리보기 열기·닫기 로직, 초점/스크롤 복귀 점검
- ZIP 내부 자산 누락 없음; 모든 파일이 GitHub 웹 업로드 크기 한도 이내
- 새 패키지의 실제 브라우저 화면과 Cloudflare 배포 결과는 아직 미확인
- 이 패키지 작성 과정에서 GitHub 저장소 이름·공개 범위·Cloudflare 설정은 변경하지 않음

기기의 PDF 표시 지원에 따라 내장 미리보기가 제한되면 **OPEN PDF ↗**를 사용합니다.

## 공식 안내

- https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/workers/configuration/routing/workers-dev/

## 작품 정보 공통 업데이트 · 2026.10.06

- 작품명 아래에 예상 시간과 작곡·개작·출판 연도, 해당 시점의 작곡가 만 나이를 표시.
- 시간은 실제 공연 실측치가 아닌 참고 범위. 전체 공연 합계는 생략.
- 확인되지 않은 작곡 연도·편곡 판본·시간은 미확인으로 표시.
- 웹 본문은 한다체·니다체 없이 읽히는 요약체. 후기 사진은 1:1, 원본 보존.
- ZIP은 모든 파일이 최상위에 있는 구조.
- 본문 Pretendard Variable 파일과 SIL OFL 라이선스 포함, 제목·작품명 Georgia.
- 모바일·태블릿 악보 미리보기: 내장 PDF iframe을 PDF.js 캔버스 뷰어로 교체, 이전·다음·확대·축소 제공.

## PianoMoDa 공통 색상 규칙 · 2026.10.07

포스터 대표색을 선명하게 만든 외곽 배경·버튼 + 같은 계열의 옅은 설명 영역. ABOUT/CONTEXT는 동일한 색상 계열에서 명도 차이로 구분. 긴 본문은 짙은 차콜. 공통 규칙은 최종으로 로드되는 `pianomoda-theme.css`에 지정.

## 2026.10.14 공통 재정비

- 작품별 대략 시간(약 ○분)·작곡/개작 시기·만 나이·개인적 상황·출판/역사적 의미 보완.
- 현 소속과 과거 경력, 확인된 레퍼토리 및 공식 프로필 링크 구분.
- 제목 Georgia·본문 Pretendard, 기존 승인 색상 유지.
- ZIP 내부 하위 폴더 없음. index.html을 포함한 파일 전체를 저장소 루트에 교체.

## 2026.10.16 공연 후 업데이트

Concert Postlude로 전환. 동행 YJ Seo, 앵콜 3곡, 후기 4항목, 선정한 커튼콜 사진 및 영상 반영. 팸플릿 p.6–7의 곡 해설, p.9 프로필, pp.12–16 신예슬 인터뷰에서 내용 발췌·재서술. 10년 프로젝트는 2025년 시작한 계획으로 정정. 친필 인사말은 AI 재생성본을 채택하지 않고, 원본 사진을 SVG 뷰포트로 잘라 글씨와 서명을 그대로 표시. 흰 배경 유지. 영상 약 2.5 MB. 공개용 티켓 사진은 미포함. 모든 파일 ZIP 루트에 배치. 공개 사이트 반영에는 업로드 필요.

악보 모자 사진: 사용자가 선택한 image-edit-target-e788178c1b3e0a80.png를 imagegen으로 인쇄 질감·배경 광량 보정. 인사말: 재생성된 필체는 채택하지 않음. 원본을 표시하는 SVG를 PNG로 렌더링하여 글씨·서명 발췌본 제공.
