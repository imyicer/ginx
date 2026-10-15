(() => {
  if (!['/', '/ginx', '/ginx/'].includes(location.pathname)) return;
  const messages = window.GinxUpgradeMessages;
  if (!messages || document.getElementById('ginx-upgrade-popup')) return;
  let saved;
  try { saved = localStorage.getItem('mx-webtrade-locale'); } catch {}
  const lang = window.ginxUpgradeLanguage(saved) || window.ginxUpgradeLanguage(navigator.language) || 'en';
  const text = messages[lang];
  const dialog = document.createElement('dialog');
  dialog.id = 'ginx-upgrade-popup';
  dialog.lang = lang;
  dialog.setAttribute('aria-labelledby', 'gx-popup-title');
  dialog.innerHTML = '<div class="gx-close-row"><button type="button" class="gx-close" autofocus><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><div class="gx-content"><p class="gx-label"></p><h2 id="gx-popup-title"><span></span><span></span></h2><p class="gx-intro"></p><p class="gx-notice gx-paused"></p><div class="gx-notice"><p><strong class="gx-assets"></strong></p><p class="gx-withdraw"></p><p class="gx-available"></p></div><p class="gx-thanks"></p></div>';
  const put = (selector, value) => { dialog.querySelector(selector).textContent = value; };
  put('.gx-label', text.label); put('h2 span:first-child', text.headline); put('h2 span:last-child', text.stay);
  put('.gx-intro', text.intro); put('.gx-paused', text.paused); put('.gx-assets', text.assets);
  put('.gx-available', text.available); put('.gx-thanks', text.thanks);
  const closeLabels = {en:'Close announcement',ja:'お知らせを閉じる',ru:'Закрыть объявление',vi:'Đóng thông báo','zh-cn':'关闭公告','zh-tw':'關閉公告'};
  const close = dialog.querySelector('.gx-close');
  close.setAttribute('aria-label', closeLabels[lang]);
  close.title = closeLabels[lang];
  const paragraph = dialog.querySelector('.gx-withdraw');
  const email = document.createElement('a'); email.href = 'mailto:info@ginx.io'; email.textContent = 'info@ginx.io';
  const registered = document.createElement('strong');
  if (lang.startsWith('zh')) {
    registered.textContent = lang === 'zh-cn' ? '注册邮箱' : '註冊信箱';
    paragraph.append(text.withdrawBefore, registered, lang === 'zh-cn' ? '，发送邮件至 ' : '，傳送郵件至 ', email, text.withdrawAfter);
  } else {
    registered.textContent = text.registered;
    paragraph.append(text.withdrawBefore, email, text.withdrawAfter, registered, text.withdrawEnd);
  }
  document.body.append(dialog);
  const previousOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    document.querySelector('nav a, main a, main button')?.focus();
    dialog.remove();
  }, {once:true});
  close.addEventListener('click', () => dialog.close());
  dialog.showModal();
})();
