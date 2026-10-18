import * as pdfjs from './pdf.min.mjs';

pdfjs.GlobalWorkerOptions.workerSrc = './pdf.worker.min.mjs';

const dialog = document.getElementById('scoreDialog');
const title = document.getElementById('scoreTitle');
const openPdf = document.getElementById('scoreOpenPdf');
const canvas = document.getElementById('scoreCanvas');
const pages = document.getElementById('scorePages');
const status = document.getElementById('scoreStatus');
const label = document.getElementById('scorePageLabel');
const prev = document.getElementById('scorePrev');
const next = document.getElementById('scoreNext');
const zoomOut = document.getElementById('scoreZoomOut');
const zoomIn = document.getElementById('scoreZoomIn');

let documentTask = null;
let documentPdf = null;
let renderTask = null;
let pageNumber = 1;
let zoom = 1;
let sequence = 0;
let previousOverflow = '';
let trigger = null;

function showStatus(message) {
  status.textContent = message;
  status.hidden = false;
  canvas.hidden = true;
}

function updateButtons(busy = false) {
  prev.disabled = busy || !documentPdf || pageNumber <= 1;
  next.disabled = busy || !documentPdf || pageNumber >= documentPdf.numPages;
  zoomOut.disabled = busy || !documentPdf || zoom <= 0.75;
  zoomIn.disabled = busy || !documentPdf || zoom >= 2.25;
  label.textContent = documentPdf ? `${pageNumber} / ${documentPdf.numPages}` : '불러오는 중';
}

async function renderPage() {
  if (!documentPdf) return;
  const turn = ++sequence;
  if (renderTask) {
    renderTask.cancel();
    try { await renderTask.promise; } catch (_) { /* Expected after cancel. */ }
  }
  if (turn !== sequence || !documentPdf) return;
  updateButtons(true);
  showStatus('악보 페이지를 그리는 중…');
  try {
    const page = await documentPdf.getPage(pageNumber);
    if (turn !== sequence) return;
    const base = page.getViewport({ scale: 1 });
    const width = Math.min(950, Math.max(280, pages.clientWidth - 32)) * zoom;
    const viewport = page.getViewport({ scale: width / base.width });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(viewport.width * pixelRatio);
    canvas.height = Math.floor(viewport.height * pixelRatio);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;
    const context = canvas.getContext('2d', { alpha: false });
    renderTask = page.render({
      canvas,
      canvasContext: context,
      viewport,
      transform: pixelRatio === 1 ? null : [pixelRatio, 0, 0, pixelRatio, 0, 0],
    });
    await renderTask.promise;
    if (turn !== sequence) return;
    status.hidden = true;
    canvas.hidden = false;
    pages.scrollTo({ top: 0, left: 0 });
  } catch (error) {
    if (turn === sequence && error?.name !== 'RenderingCancelledException') {
      showStatus('미리보기 오류. OPEN PDF ↗로 원본 열기.');
    }
  } finally {
    if (turn === sequence) {
      renderTask = null;
      updateButtons();
    }
  }
}

async function openScorePreview(path, scoreTitle, opener, initialPage = 1) {
  if (!path || typeof dialog.showModal !== 'function') return;
    const turn = ++sequence;
    trigger = opener;
    title.textContent = scoreTitle || 'Score Preview';
    openPdf.href = path;
    pageNumber = 1;
    zoom = 1;
    documentPdf = null;
    updateButtons(true);
    showStatus('악보를 불러오는 중…');
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    try {
      documentTask = pdfjs.getDocument({ url: path, wasmUrl: './' });
      const loaded = await documentTask.promise;
      if (turn !== sequence || !dialog.open) {
        await loaded.destroy();
        return;
      }
      documentPdf = loaded;
      pageNumber = Math.max(1, Math.min(loaded.numPages, Math.trunc(Number(initialPage)) || 1));
      await renderPage();
    } catch (_) {
      if (turn === sequence && dialog.open) {
        showStatus('미리보기 오류. OPEN PDF ↗로 원본 열기.');
        label.textContent = '열기 실패';
      }
    }
}

document.querySelectorAll('a.score-preview:not(.external-score)').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const path = link.getAttribute('href');
    if (!path || !/\.pdf(?:[?#]|$)/i.test(path)) return;
    event.preventDefault();
    openScorePreview(path, link.dataset.scoreTitle || 'Score Preview', link, link.dataset.scorePage);
  });
});
document.addEventListener('pianomoda:open-score', event => {
  const {path, title, opener} = event.detail || {};
  openScorePreview(path, title, opener);
});

prev.addEventListener('click', () => { if (documentPdf && pageNumber > 1) { pageNumber--; renderPage(); } });
next.addEventListener('click', () => { if (documentPdf && pageNumber < documentPdf.numPages) { pageNumber++; renderPage(); } });
zoomOut.addEventListener('click', () => { zoom = Math.max(0.75, zoom - 0.25); renderPage(); });
zoomIn.addEventListener('click', () => { zoom = Math.min(2.25, zoom + 0.25); renderPage(); });
document.getElementById('scoreClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  ++sequence;
  if (renderTask) renderTask.cancel();
  renderTask = null;
  documentTask?.destroy();
  documentTask = null;
  documentPdf = null;
  canvas.width = 0;
  canvas.height = 0;
  canvas.hidden = true;
  document.body.style.overflow = previousOverflow;
  trigger?.focus({ preventScroll: true });
});

let resizeTimer;
window.addEventListener('resize', () => {
  if (!dialog.open || !documentPdf) return;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderPage, 180);
});
