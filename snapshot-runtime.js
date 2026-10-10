(() => {
  'use strict';
  const data = window.GINX_SNAPSHOT;
  const blocked = /^(?:\/trading|\/trade|\/login|\/signup|\/register|\/user|\/auth|\/payment)(?:\/|$)/;
  window.ginxUpgradeHref = href => {
    try { const u = new URL(href, location.origin); return blocked.test(u.pathname.replace(/^\/ginx(?=\/|$)/,"")) || u.pathname.replace(/^\/ginx(?=\/|$)/,"")==="/upgrade/" ? '/upgrade/' : href; }
    catch { return href; }
  };
  if (blocked.test(location.pathname.replace(/^\/ginx(?=\/|$)/,""))) { location.replace('/ginx/upgrade/'); return; }
  window.ginxSnapshotRequest = async req => {
    if (req.method && req.method !== 'GET') return {is_succ:false,code:503,message:'System upgrade in progress'};
    const path = new URL(req.url, location.origin).pathname.replace(/^\//,'');
    const q = req.query || {};
    let key = path;
    if (path === 'api/article/info') key += '?id=' + q.id;
    if (path === 'api/position' && q.identifier) key += '?identifier='+q.identifier;
    if (['api/chart/trend','api/chart/price','api/source/status'].includes(path) && q.source) key += '?source=' + q.source;
    if (path.startsWith('api/copy_trading/master/') && q.master_user_code) key += '?master_user_code='+q.master_user_code+'&master_trade_account_id='+q.master_trade_account_id;
    const lang=String(req.snapshotLanguage||'en').toLowerCase().replace('_','-');
    const localized=data.language_snapshots?.[lang];
    let result = structuredClone(localized?.[key] || localized?.[path] || data[key] || data[path] || {is_succ:false,code:503,message:'Unavailable during the system upgrade'});
    if (path === 'api/article/list' && result.data) {
      let records = result.data.records;
      if (q.category) { const categories=String(q.category).split(','); records=records.filter(x=>categories.includes(String(x.category_id)) || categories.includes(String(x.category))); }
      if (q.keywords) records=records.filter(x=>JSON.stringify(x).toLowerCase().includes(String(q.keywords).toLowerCase()));
      result.data.total = records.length;
      result.data.records=records.slice(Number(q.offset)||0,(Number(q.offset)||0)+(Number(q.limit)||records.length));
    }
    if (path === 'api/copy_trading/masters' && result.data) {
      let records=result.data.records;
      if(q.keyword) records=records.filter(x=>x.nickname.toLowerCase().includes(String(q.keyword).toLowerCase()));
      const fields={total_profit_rate:'profit_rate',total_profit_amount:'total_profit_amount',win_rate:'win_rate',follower_count:'current_follower_count'};
      records.sort((a,b)=>(b[fields[q.sort_type]]||0)-(a[fields[q.sort_type]]||0));
      result.data.total=records.length;result.data.records=records.slice(Number(q.offset)||0,(Number(q.offset)||0)+(Number(q.limit)||records.length));
    }
    return result;
  };
  const push=history.pushState.bind(history), replace=history.replaceState.bind(history);
  history.pushState=function(state,title,url){if(url && window.ginxUpgradeHref(url)==='/upgrade/') {location.assign('/ginx/upgrade/');return;} return push(state,title,url);};
  history.replaceState=function(state,title,url){if(url && window.ginxUpgradeHref(url)==='/upgrade/') {location.replace('/ginx/upgrade/');return;} return replace(state,title,url);};
  document.addEventListener('click',e=>{const a=e.target.closest?.('a');if(a && window.ginxUpgradeHref(a.href)==='/upgrade/'){e.preventDefault();e.stopImmediatePropagation();location.assign('/ginx/upgrade/');}},true);
  const fetchLocal=window.fetch.bind(window);
  window.fetch=(input,init)=>{const url=new URL(typeof input==='string'?input:input.url,location.origin);if(url.origin!==location.origin)return Promise.reject(new Error('External requests disabled in static snapshot'));return fetchLocal(input,init);};
  document.addEventListener('DOMContentLoaded',()=>{
    const button=document.createElement('button');
    button.setAttribute('aria-label','Open support');
    button.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 13v-2a8 8 0 0 1 16 0v2M4 12H2v6h4v-6H4zm16 0h2v6h-4v-6h2zm0 6c0 3-4 3-7 3"/></svg>';
    button.style.cssText='position:fixed;right:22px;bottom:22px;width:46px;height:46px;border:0;border-radius:50%;background:linear-gradient(135deg,#ffbd63,#f58a0b);color:white;z-index:90;cursor:pointer;box-shadow:0 3px 16px #f7931a55;display:grid;place-items:center';
    const dialog=document.createElement('dialog');
    dialog.setAttribute('aria-label','Contact support');
    dialog.style.cssText='background:#111114;color:#fff;border:1px solid #9d6728;border-radius:20px;padding:28px;max-width:calc(100vw - 40px);font-family:Arial,sans-serif';
    dialog.innerHTML='<h2 style="margin-top:0">Contact support</h2><p>Trading services are temporarily suspended during the upgrade.</p><p><a style="color:#f7b44a" href="mailto:support@ginx.io">support@ginx.io</a></p><p><a style="color:#f7b44a" href="mailto:info@ginx.io">info@ginx.io</a></p><button style="padding:10px 24px;border:0;border-radius:20px;background:#f7b44a;color:#111;cursor:pointer">Close</button>';
    dialog.querySelector('button').onclick=()=>dialog.close();button.onclick=()=>dialog.showModal();
    document.body.append(dialog,button);
  });
})();
