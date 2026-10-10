(() => {
  const base='/ginx';
  const physical=href=>{
    const u=new URL(href,location.origin);
    if(u.origin===location.origin && !u.pathname.startsWith(base+'/') && u.pathname!==base)u.pathname=base+u.pathname;
    return u;
  };
  const rewrite=()=>{
    document.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href');
      if(href===base){a.setAttribute('href',base+'/');return;}
      if(href && href.startsWith('/') && !href.startsWith('//') && !href.startsWith(base+'/'))a.setAttribute('href',base+href);
    });
  };
  document.addEventListener('DOMContentLoaded',()=>{
    rewrite();new MutationObserver(rewrite).observe(document.body,{subtree:true,childList:true});
  });
  document.addEventListener('click',event=>{
    const a=event.target.closest?.('a[href]');
    if(!a || a.target==='_blank' || a.hasAttribute('download') || event.ctrlKey || event.metaKey || event.shiftKey || event.button!==0)return;
    const u=physical(a.href);
    if(u.origin!==location.origin || !u.pathname.startsWith(base+'/'))return;
    event.preventDefault();event.stopImmediatePropagation();
    const logical=u.pathname.slice(base.length);
    if(/^\/(trading|trade|login|signup|register|user|auth|payment)(\/|$)/.test(logical)) {location.assign(base+'/upgrade/');return;}
    if(u.pathname===location.pathname && u.hash){location.hash=u.hash;return;}
    location.assign(u.href);
  },true);
})();
