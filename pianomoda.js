(() => {
  const dialog = document.getElementById('scoreDialog');
  const frame = document.getElementById('scoreFrame');
  const title = document.getElementById('scoreTitle');
  const openPdf = document.getElementById('scoreOpenPdf');
  let previousOverflow = '';
  let trigger = null;
  document.querySelectorAll('.score-preview').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      trigger = link;
      const pdf = link.getAttribute('href');
      title.textContent = link.dataset.scoreTitle || 'Score Preview';
      frame.title = title.textContent + ' · Full score preview';
      openPdf.href = pdf;
      frame.src = pdf + '#page=1&view=FitH';
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  });
  document.getElementById('scoreClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    frame.removeAttribute('src');
    document.body.style.overflow = previousOverflow;
    if (trigger) trigger.focus({preventScroll:true});
  });
})();
