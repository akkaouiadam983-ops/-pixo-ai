/*
 Pixo AI starter app.
 REAL AI: set API_ENDPOINT to your own secure backend endpoint.
 Never put secret API keys in this browser file.
*/
const API_ENDPOINT = ""; // Example: "https://your-domain.com/api/generate"

let credits = Number(localStorage.getItem("pixo_credits") || 10);
const creditsEl = document.getElementById("credits");
creditsEl.textContent = credits;

function toast(msg){
  const t=document.getElementById("toast"); t.textContent=msg; t.style.display="block";
  clearTimeout(window.__toast); window.__toast=setTimeout(()=>t.style.display="none",2600);
}
function setCredits(n){credits=Math.max(0,n);localStorage.setItem("pixo_credits",credits);creditsEl.textContent=credits}

async function generate(){
  const prompt=document.getElementById("prompt").value.trim();
  const ratio=document.getElementById("ratio").value;
  if(!prompt) return toast("Write a prompt first.");
  if(credits<1) return toast("You need more credits.");
  const result=document.getElementById("result");
  result.classList.remove("hidden");
  result.innerHTML='<div style="padding:70px;text-align:center;color:#aaa">Creating your image…</div>';

  if(!API_ENDPOINT){
    // Demo preview until a real backend is connected.
    await new Promise(r=>setTimeout(r,900));
    setCredits(credits-1);
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#241033"/><stop offset="1" stop-color="#5b21b6"/></linearGradient></defs><rect width="100%" height="100%" fill="#09070d"/><circle cx="700" cy="260" r="220" fill="url(#g)" opacity=".8"/><circle cx="300" cy="760" r="260" fill="#7c3aed" opacity=".25"/><text x="50%" y="48%" text-anchor="middle" fill="white" font-size="42" font-family="Arial">Pixo AI</text><text x="50%" y="54%" text-anchor="middle" fill="#c4b5fd" font-size="22" font-family="Arial">Connect your AI API to generate</text></svg>`;
    const src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
    result.innerHTML=`<img src="${src}" alt="Pixo AI preview"><div class="bar"><span>${escapeHtml(prompt)}</span><button onclick="downloadDemo('${src}')">Download</button></div>`;
    return;
  }

  try{
    const res=await fetch(API_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,ratio})});
    if(!res.ok) throw new Error("API error");
    const data=await res.json();
    const imageUrl=data.imageUrl || data.url;
    if(!imageUrl) throw new Error("No image URL returned");
    setCredits(credits-1);
    result.innerHTML=`<img src="${imageUrl}" alt="Generated image"><div class="bar"><span>Generated with Pixo AI</span><a class="result button" href="${imageUrl}" download>Download</a></div>`;
  }catch(e){
    result.innerHTML="";
    toast("Generation failed. Check your AI backend.");
  }
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function downloadDemo(src){const a=document.createElement("a");a.href=src;a.download="pixo-ai-preview.svg";a.click()}
function watchAd(){
  toast("Rewarded ads are not connected yet.");
  // Connect an approved rewarded-ad provider here.
  // Only call setCredits(credits + 2) after the provider confirms completion.
}
function buy(plan){
  toast(plan+" checkout is ready to connect to a payment provider.");
  // Connect a payment provider on your secure backend.
}