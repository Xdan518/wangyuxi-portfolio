const projects=[{id:1,name:'AfriKube',title:'为脆弱的新生命，提供温暖守护',full:'非洲地区便携自供早产儿保温箱设计',category:'health',tag:'医疗产品 / 产品设计',year:'2025',color:'#d89b51',description:'聚焦非洲地区早产儿保温需求，通过背景研究、用户分析、造型探索与结构设计，探索便携、自供的保温箱方案。',count:4},{id:2,name:'浮光伴灯',title:'让远洋的牵挂，在光中相遇',full:'面向远洋家庭情感联结的浮光陪伴灯',category:'interaction',tag:'情感交互 / 产品设计',year:'2025',color:'#8cb9cb',description:'围绕远洋家庭的情感联结，以灯光作为沟通媒介，将家庭陪伴的感受融入产品形态与交互体验。',count:4},{id:3,name:'知环 · AI 文献阅读',title:'从阅读文献，到理解知识',full:'辅助知识内化的 AI 文献阅读设计',category:'interaction',tag:'AI 体验 / 交互设计',year:'2026',color:'#b9a4dc',description:'从文献阅读中的知识理解与内化需求出发，结合用户研究、需求梳理、信息架构与界面设计，探索 AI 辅助阅读体验。',count:4},{id:4,name:'SoleGuard',title:'让康复关怀，融入日常步履',full:'面向糖尿病足缓解期随需型电子艾灸足踝外骨骼设计',category:'health',tag:'康复辅具 / 服务设计',year:'2026',color:'#83c2b8',description:'关注糖尿病足缓解期的康复需求，通过用户研究、足踝外骨骼产品探索与配套服务设计，构建贴近日常的康复关怀体验。',count:5}];
const grid=document.querySelector('#projects'),dialog=document.querySelector('#detail');let lastTrigger;
grid.innerHTML=projects.map(p=>`<button class="project" data-id="${p.id}" data-category="${p.category}" aria-label="查看${p.name}项目详情"><div class="project-head"><div><span class="project-kicker">PROJECT 0${p.id} / ${p.year}</span><h3>${p.name}</h3></div><span class="view" aria-hidden="true">↗</span></div><p>${p.title}</p><div class="project-image" style="--tone:${p.color}"><img src="assets/cover${p.id}.png" alt="${p.full}效果图" loading="lazy"><span class="image-label">查看项目 ↗</span></div><div class="project-meta"><span>${p.tag}</span><span>0${p.id} — 04</span></div></button>`).join('');
function openProject(id){const p=projects.find(p=>p.id===id);document.querySelector('#detail-content').innerHTML=`<div class="detail-intro"><span class="eyebrow">0${p.id} / ${p.tag} / ${p.year}</span><h2 id="detail-title">${p.full}</h2><p>${p.description}</p></div><div class="detail-images">${Array.from({length:p.count},(_,n)=>`<a href="assets/p${p.id}-${n}.webp" target="_blank" rel="noopener" aria-label="查看第${n+1}张展板大图"><img src="assets/p${p.id}-${n}.webp" alt="${p.name}设计展板 ${n+1}：${['设计概览','背景与用户研究','设计探索与方案','产品呈现与交互','视觉延展'][n]}" loading="lazy"></a>`).join('')}</div><button class="detail-next" data-next="${id===4?1:id+1}">下一个项目：${projects[id===4?0:id].name} →</button>`;if(!dialog.open){dialog.showModal();document.body.style.overflow='hidden'}dialog.scrollTop=0;document.querySelector('[data-next]').onclick=e=>openProject(Number(e.currentTarget.dataset.next));history.replaceState(null,'',`#project-${id}`)}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b){lastTrigger=b;openProject(Number(b.dataset.id))}});document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});grid.classList.toggle('is-filtered',b.dataset.filter!=='all');document.querySelectorAll('.project').forEach(p=>p.hidden=b.dataset.filter!=='all'&&p.dataset.category!==b.dataset.filter)});
document.querySelector('#close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>{document.body.style.overflow='';history.replaceState(null,'','#work');lastTrigger?.focus()});document.querySelector('#copy').onclick=async()=>{try{await navigator.clipboard.writeText('1281914471@qq.com');document.querySelector('#copy-status').textContent='邮箱已复制，期待与你交流。'}catch{document.querySelector('#copy-status').textContent='请长按或选中邮箱地址进行复制。'}};const match=location.hash.match(/^#project-([1-4])$/);if(match)openProject(Number(match[1]));

// Gentle scroll motion: one frame per scroll, no continuous animation loop.
(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const desktop = matchMedia('(min-width: 701px)');
 const targets = [...document.querySelectorAll('.section-heading,.project,.about-title,.about-copy,.contact')];
 const images = [...document.querySelectorAll('.project-image')];
 const ornament = document.querySelector('.hero-photo');
 const portrait = document.querySelector('.portrait-frame img');
 let observer, frame = 0, enabled = false;
 const clamp = (v, limit) => Math.max(-limit, Math.min(limit, v));
 function paint() {
  frame = 0;
  if (!enabled) return;
  const height = innerHeight;
  if (desktop.matches) {
   images.forEach(box => {
    if (box.closest('.project').hidden) return;
    const r = box.getBoundingClientRect();
    if (r.bottom >= -80 && r.top <= height + 80) {
     box.style.setProperty('--image-y', `${clamp((height / 2 - r.top - r.height / 2) * .045, 18)}px`);
    }
   });
   if (portrait) {
    const r = portrait.getBoundingClientRect();
    portrait.style.setProperty('--portrait-y', `${clamp((height / 2 - r.top - r.height / 2) * .025, 12)}px`);
   }
   if (ornament) {
    ornament.style.setProperty('--ornament-y', `${clamp(scrollY * .08, 35)}px`);
    ornament.style.setProperty('--ornament-turn', `${clamp(scrollY * .015, 12)}deg`);
   }
  } else {
   images.forEach(box => box.style.removeProperty('--image-y'));
   portrait?.style.removeProperty('--portrait-y');
   ornament?.style.removeProperty('--ornament-y');
   ornament?.style.removeProperty('--ornament-turn');
  }
 }
 function schedule() { if (enabled && !frame) frame = requestAnimationFrame(paint); }
 function configure() {
  enabled = !reduced.matches;
  observer?.disconnect();
  targets.forEach(el => el.classList.remove('reveal-pending','reveal-ready','is-visible'));
  if (!enabled) {
   cancelAnimationFrame(frame); frame = 0;
   images.forEach(box => box.style.removeProperty('--image-y'));
   portrait?.style.removeProperty('--portrait-y');
   ornament?.style.removeProperty('--ornament-y');
   ornament?.style.removeProperty('--ornament-turn');
   return;
  }
  if ('IntersectionObserver' in window) {
   observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
     entry.target.classList.add('is-visible');
     observer.unobserve(entry.target);
    }
   }), {threshold: .06});
   targets.forEach(el => {
    // Content already in view stays immediately readable.
    if (el.getBoundingClientRect().top > innerHeight) {
     el.classList.add('reveal-pending','reveal-ready'); observer.observe(el);
    }
   });
  }
  schedule();
 }
 addEventListener('scroll', schedule, {passive:true});
 addEventListener('resize', schedule, {passive:true});
 reduced.addEventListener('change', configure);
 desktop.addEventListener('change', schedule);
 document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',schedule));
 configure();
})();
