const PHONE1='7875114554', PHONE2='9511656946';
const pages=[['index.html','Home'],['about.html','About'],['membership.html','Membership'],['exercises.html','Exercises'],['diet.html','Diet Plans'],['reviews.html','Reviews'],['faq.html','FAQ'],['contact.html','Contact']];
const here=(location.pathname.split('/').pop()||'index.html');

document.getElementById('hdr').outerHTML=`
<header class="site"><div class="wrap nav">
  <a class="brand" href="index.html"><img src="img/logo.png" alt="Fitness Point Gym logo"><span>Fitness <b>Point</b></span></a>
  <button class="burger" aria-label="Menu" id="burger"><span></span><span></span><span></span></button>
  <nav class="menu" id="menu">${pages.map(p=>`<a href="${p[0]}" class="${p[0]===here?'on':''}">${p[1]}</a>`).join('')}</nav>
</div></header>`;

document.getElementById('ftr').outerHTML=`
<footer class="site"><div class="wrap">
  <div class="fgrid">
    <div><a class="brand" href="index.html"><img src="img/logo.png" alt=""><span>Fitness <b>Point</b></span></a>
      <p style="margin-top:14px">Unisex gym with certified trainers in Ponda, Goa. Come in, train hard, leave stronger.</p></div>
    <div><h4>Explore</h4>${pages.slice(1,5).map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('')}</div>
    <div><h4>More</h4>${pages.slice(5).map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('')}</div>
    <div><h4>Visit</h4>
      <p>Below Magson Supermarket,<br>Opp St Mary High School,<br>Ponda, Goa</p>
      <a href="tel:${PHONE1}">${PHONE1}</a><a href="tel:${PHONE2}">${PHONE2}</a>
      <a href="https://instagram.com/nazamsfitnesspoint" target="_blank" rel="noopener">@nazamsfitnesspoint</a></div>
  </div>
  <div class="legal"><span>© ${new Date().getFullYear()} Fitness Point Gym, Ponda.</span><span>Diet and workout content is general guidance, not medical advice.</span></div>
</div></footer>
<div class="callbar"><a href="tel:${PHONE1}">Call Now</a><a href="https://wa.me/91${PHONE1}" target="_blank" rel="noopener">WhatsApp</a></div>`;

document.getElementById('burger').onclick=()=>document.getElementById('menu').classList.toggle('open');

// tabs
document.querySelectorAll('[data-tabs]').forEach(g=>{
  const btns=g.querySelectorAll('.tabs button'), panes=g.querySelectorAll('.pane');
  btns.forEach((b,i)=>b.onclick=()=>{btns.forEach(x=>x.classList.remove('on'));panes.forEach(x=>x.classList.remove('on'));b.classList.add('on');panes[i].classList.add('on')});
});

// BMI
const bmi=document.getElementById('bmiForm');
if(bmi) bmi.onsubmit=e=>{e.preventDefault();
  const h=parseFloat(bmi.h.value)/100,w=parseFloat(bmi.w.value);if(!h||!w)return;
  const v=w/(h*h);const c=v<18.5?'Underweight':v<25?'Healthy range':v<30?'Overweight':'Obese range';
  document.getElementById('bmiOut').innerHTML=`BMI <b style="color:var(--gold)">${v.toFixed(1)}</b> — ${c}. A trainer can build a plan around this at the gym.`;
};

// Reviews: stored only in this browser until you connect a real backend or form service
const KEY='fp_reviews';
const rvForm=document.getElementById('rvForm'), rvList=document.getElementById('rvList');
if(rvList){
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}};
  const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const draw=()=>{const r=load();
    rvList.innerHTML=r.length?r.map(x=>`<div class="card rv"><div class="st">${'★'.repeat(x.s)}${'☆'.repeat(5-x.s)}</div><p>${esc(x.t)}</p><div class="who">${esc(x.n)}</div></div>`).join('')
    :`<div class="empty">No reviews yet. Be the first member to leave one.</div>`;};
  draw();
  rvForm.onsubmit=e=>{e.preventDefault();
    const s=+(rvForm.querySelector('input[name=s]:checked')||{}).value;
    if(!s){alert('Pick a star rating');return}
    const r=load();r.unshift({n:rvForm.n.value.trim(),s,t:rvForm.t.value.trim()});
    localStorage.setItem(KEY,JSON.stringify(r));rvForm.reset();draw();
    document.getElementById('rvMsg').textContent='Thanks! Your review is posted.';
  };
}

// contact form -> WhatsApp
const cf=document.getElementById('contactForm');
if(cf) cf.onsubmit=e=>{e.preventDefault();
  const m=`Hi Fitness Point, I'm ${cf.n.value}. Interested in: ${cf.i.value}. ${cf.m.value} (My number: ${cf.p.value})`;
  window.open(`https://wa.me/91${PHONE1}?text=${encodeURIComponent(m)}`,'_blank');
};
