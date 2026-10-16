// Accessibility behavior for the existing menu and dialogs.
document.addEventListener('DOMContentLoaded', () => {
 const menu = document.querySelector('.nav-menu');
 const trigger = document.querySelector('.hamburger');
 const syncMenu = () => {
  const open = menu.classList.contains('active');
  menu.inert = !open;
  trigger.setAttribute('aria-expanded', String(open));
 };
 new MutationObserver(syncMenu).observe(menu, {attributes:true, attributeFilter:['class']});
 syncMenu();
 document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && menu.classList.contains('active')) { trigger.click(); trigger.focus(); }
 });
 document.querySelectorAll('i.fas, i.fab').forEach(icon => icon.setAttribute('aria-hidden','true'));
 const filters = document.querySelectorAll('.filter-chip');
 const syncFilters = () => filters.forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('active'))));
 filters.forEach(b => new MutationObserver(syncFilters).observe(b,{attributes:true,attributeFilter:['class']}));
 syncFilters();
 const dialogs = [...document.querySelectorAll('.modal')];
 let active = null;
 let previous = null;
 let inertState = [];
 const focusable = modal => [...modal.querySelectorAll('a[href],button,input,textarea,select,[tabindex="0"]')].filter(el=>!el.disabled && el.getClientRects().length);
 function syncDialogs() {
  const open = dialogs.find(m=>getComputedStyle(m).display !== 'none');
  if (open === active) return;
  if (active) {
   inertState.forEach(([el,value])=>{el.inert=value;});
   inertState=[];
   if(previous?.isConnected) previous.focus();
  }
  active=open || null;
  if(open) {
   previous=document.activeElement;
   const heading=open.querySelector('h2');
   if(heading) { heading.id ||= open.id+'-title'; open.setAttribute('aria-labelledby',heading.id); }
   inertState=[...document.body.children].filter(el=>el!==open && !['SCRIPT','STYLE'].includes(el.tagName)).map(el=>[el,el.inert]);
   inertState.forEach(([el])=>{el.inert=true;});
   (focusable(open)[0] || open).focus();
  }
 }
 dialogs.forEach(modal=>new MutationObserver(syncDialogs).observe(modal,{attributes:true,attributeFilter:['style']}));
 document.addEventListener('keydown', e=>{
  if(!active) return;
  if(e.key==='Escape') { e.preventDefault(); active.querySelector('.close')?.click(); }
  if(e.key==='Tab') {
   const controls=focusable(active), first=controls[0], last=controls.at(-1);
   if(!first) {e.preventDefault(); active.focus();}
   else if(e.shiftKey && (document.activeElement===first || document.activeElement===active)) {e.preventDefault();last.focus();}
   else if(!e.shiftKey && document.activeElement===last) {e.preventDefault();first.focus();}
  }
 });
});
