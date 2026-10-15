(() => {
  const messages = {
    en: {
      title: 'GinX | System Upgrade', language: 'Language', label: 'SYSTEM UPGRADE IN PROGRESS',
      headline: "We're upgrading.", stay: 'Stay tuned.', intro: "We're making a major upgrade to our systems.",
      paused: 'Trading services are temporarily suspended during the upgrade.', assets: 'All users’ existing assets remain unaffected.',
      withdrawBefore: 'If you need to withdraw funds during the upgrade, please contact our support team at ', withdrawAfter: ' from your ', registered: 'registered email address', withdrawEnd: '.',
      available: 'Our withdrawal channels will remain available throughout the upgrade.', thanks: 'Thank you for your patience. We look forward to welcoming you back.', footer: '© 2026 GinX. All rights reserved.'
    },
    'zh-cn': {
      title: 'GinX | 系统升级', language: '选择语言', label: '系统升级进行中',
      headline: '我们正在升级。', stay: '敬请期待。', intro: '我们正在对系统进行重大升级。',
      paused: '系统升级期间，交易服务暂时暂停。', assets: '所有用户的现有资产不受影响。',
      withdrawBefore: '如果您在系统升级期间需要出金，请使用您的', withdrawAfter: ' 联系我们的客服。', registered: '', withdrawEnd: '',
      available: '我们的出金通道将在整个升级期间保持畅通。', thanks: '感谢您的耐心等待，期待再次为您提供服务。', footer: '© 2026 GinX. 版权所有。'
    },
    'zh-tw': {
      title: 'GinX | 系統升級', language: '選擇語言', label: '系統升級進行中',
      headline: '我們正在升級。', stay: '敬請期待。', intro: '我們正在對系統進行重大升級。',
      paused: '系統升級期間，交易服務暫時暫停。', assets: '所有用戶的現有資產不受影響。',
      withdrawBefore: '如果您在系統升級期間需要出金，請使用您的', withdrawAfter: ' 聯絡我們的客服。', registered: '', withdrawEnd: '',
      available: '我們的出金通道將在整個升級期間保持暢通。', thanks: '感謝您的耐心等待，期待再次為您提供服務。', footer: '© 2026 GinX. 版權所有。'
    },
    ja: {
      title: 'GinX | システムアップグレード', language: '言語を選択', label: 'システムアップグレード中',
      headline: 'システム更新中。', stay: 'ご期待ください。', intro: '現在、システムの大規模なアップグレードを行っています。',
      paused: 'アップグレード期間中、取引サービスを一時停止しています。', assets: 'すべてのお客様の既存資産に影響はありません。',
      withdrawBefore: 'アップグレード期間中に出金をご希望の場合は、', withdrawAfter: ' 宛てに、', registered: 'ご登録のメールアドレス', withdrawEnd: 'からカスタマーサポートへご連絡ください。',
      available: 'アップグレード期間中も、出金窓口は引き続きご利用いただけます。', thanks: 'お待ちいただきありがとうございます。サービス再開を楽しみにお待ちください。', footer: '© 2026 GinX. 無断転載を禁じます。'
    },
    ru: {
      title: 'GinX | Обновление системы', language: 'Выбрать язык', label: 'ИДЁТ ОБНОВЛЕНИЕ СИСТЕМЫ',
      headline: 'Мы обновляем систему.', stay: 'Скоро вернёмся.', intro: 'Мы проводим масштабное обновление наших систем.',
      paused: 'На время обновления торговые сервисы временно приостановлены.', assets: 'Существующие активы всех пользователей остаются без изменений.',
      withdrawBefore: 'Если во время обновления вам необходимо вывести средства, напишите в службу поддержки на ', withdrawAfter: ' со своего ', registered: 'зарегистрированного адреса электронной почты', withdrawEnd: '.',
      available: 'Каналы вывода средств будут доступны в течение всего периода обновления.', thanks: 'Спасибо за ваше терпение. Будем рады снова приветствовать вас.', footer: '© 2026 GinX. Все права защищены.'
    },
    vi: {
      title: 'GinX | Nâng cấp hệ thống', language: 'Chọn ngôn ngữ', label: 'HỆ THỐNG ĐANG ĐƯỢC NÂNG CẤP',
      headline: 'Chúng tôi đang nâng cấp.', stay: 'Hãy đón chờ.', intro: 'Chúng tôi đang tiến hành nâng cấp lớn cho hệ thống.',
      paused: 'Dịch vụ giao dịch tạm thời bị đình chỉ trong thời gian nâng cấp.', assets: 'Tài sản hiện có của tất cả người dùng không bị ảnh hưởng.',
      withdrawBefore: 'Nếu cần rút tiền trong thời gian nâng cấp, vui lòng liên hệ bộ phận hỗ trợ tại ', withdrawAfter: ' bằng ', registered: 'địa chỉ email đã đăng ký', withdrawEnd: ' của bạn.',
      available: 'Các kênh rút tiền của chúng tôi sẽ luôn hoạt động trong suốt thời gian nâng cấp.', thanks: 'Cảm ơn bạn đã kiên nhẫn. Chúng tôi mong sớm được chào đón bạn trở lại.', footer: '© 2026 GinX. Bảo lưu mọi quyền.'
    }
  };
  const normalize = value => {
    const code = String(value || '').toLowerCase().replace(/_/g, '-');
    if (messages[code]) return code;
    if (/^zh-(tw|hk|hant)/.test(code)) return 'zh-tw';
    if (code.startsWith('zh')) return 'zh-cn';
    return messages[code.split('-')[0]] ? code.split('-')[0] : null;
  };
  const select = document.getElementById('upgrade-language');
  window.GinxUpgradeMessages = messages;
  window.ginxUpgradeLanguage = normalize;
  if (!select) return;
  const apply = code => {
    const text = messages[code];
    document.documentElement.lang = code;
    document.title = text.title;
    select.value = code;
    select.setAttribute('aria-label', text.language);
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = text[el.dataset.i18n]; });
    // Chinese places the registered address before the support email.
    const paragraph = document.querySelector('.asset-notice p:nth-child(2)');
    if (code.startsWith('zh')) {
      paragraph.replaceChildren();
      paragraph.append(text.withdrawBefore);
      const registered = document.createElement('strong');
      registered.textContent = code === 'zh-cn' ? '注册邮箱' : '註冊信箱';
      paragraph.append(registered, code === 'zh-cn' ? '，发送邮件至 ' : '，傳送郵件至 ');
      const email = document.createElement('a');
      email.href = 'mailto:info@ginx.io'; email.textContent = 'info@ginx.io';
      paragraph.append(email, text.withdrawAfter);
    } else {
      paragraph.replaceChildren();
      paragraph.append(text.withdrawBefore);
      const email = document.createElement('a'); email.href = 'mailto:info@ginx.io'; email.textContent = 'info@ginx.io';
      const registered = document.createElement('strong'); registered.textContent = text.registered;
      paragraph.append(email, text.withdrawAfter, registered, text.withdrawEnd);
    }
    document.querySelector('meta[name="description"]').content = text.intro + ' ' + text.assets;
    try { localStorage.setItem('mx-webtrade-locale', code); } catch {}
  };
  let saved;
  try { saved = localStorage.getItem('mx-webtrade-locale'); } catch {}
  apply(normalize(saved) || normalize(navigator.language) || 'en');
  select.addEventListener('change', () => apply(select.value));
})();
