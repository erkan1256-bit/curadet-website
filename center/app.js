const refreshBtn=document.querySelector('#refreshBtn');
refreshBtn?.addEventListener('click',()=>{
  document.querySelectorAll('.mailbox').forEach(card=>{
    card.classList.remove('flash');
    void card.offsetWidth;
    card.classList.add('flash');
  });
  refreshBtn.textContent='Prototip durumu yenilendi';
  setTimeout(()=>{refreshBtn.textContent='Durumu yenile';},1400);
});
