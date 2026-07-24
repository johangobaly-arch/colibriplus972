document.querySelectorAll('input[type="datetime-local"]').forEach(input=>{
  const now=new Date();
  now.setMinutes(now.getMinutes()-now.getTimezoneOffset());
  input.min=now.toISOString().slice(0,16);
});

function buildMessage(form){
  const data=new FormData(form);
  const fields=["Nom","Téléphone","Email","Service","Date et heure","Message"];
  return ["Bonjour Colibri Plus, je souhaite effectuer une réservation.","",
    ...fields.filter(k=>data.get(k)).map(k=>`${k} : ${data.get(k)}`)
  ].join("\\n");
}

document.querySelectorAll('#booking-form,#mobile-form').forEach(form=>{
  form.addEventListener('submit',event=>{
    if(!form.checkValidity()){
      event.preventDefault();
      form.reportValidity();
      return;
    }
    const message=buildMessage(form);
    const summary=form.querySelector('#summary,.mobile-summary');
    if(summary)summary.value=message;
    window.open(`https://wa.me/596696041050?text=${encodeURIComponent(message)}`,'_blank','noopener');
    const status=form.querySelector('.status,.mobile-status');
    if(status)status.textContent="Demande envoyée par e-mail et message WhatsApp préparé.";
    setTimeout(()=>form.reset(),1200);
  });
});

document.querySelectorAll('[data-panel]').forEach(btn=>btn.addEventListener('click',()=>{
  const panel=document.getElementById(btn.dataset.panel);
  if(panel)panel.hidden=false;
}));
document.querySelectorAll('.close-panel').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.info-panel').hidden=true));
document.querySelectorAll('.info-panel').forEach(panel=>panel.addEventListener('click',e=>{if(e.target===panel)panel.hidden=true}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.info-panel:not([hidden])').forEach(panel=>panel.hidden=true)});
document.querySelector('[data-focus="booking-form"]')?.addEventListener('click',()=>{
  document.querySelector('#booking-form input[name="Nom"]')?.focus();
});