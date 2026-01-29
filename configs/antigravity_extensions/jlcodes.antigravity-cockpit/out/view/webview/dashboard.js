"use strict";(()=>{var ot=["Claude Opus 4.5 (Thinking)","Claude Sonnet 4.5","Claude Sonnet 4.5 (Thinking)","Gemini 3 Flash","Gemini 3 Pro (High)","Gemini 3 Pro (Low)","Gemini 3 Pro Image","GPT-OSS 120B (Medium)"],at=["MODEL_PLACEHOLDER_M12","MODEL_CLAUDE_4_5_SONNET","MODEL_CLAUDE_4_5_SONNET_THINKING","MODEL_PLACEHOLDER_M18","MODEL_PLACEHOLDER_M7","MODEL_PLACEHOLDER_M8","MODEL_PLACEHOLDER_M9","MODEL_OPENAI_GPT_OSS_120B_MEDIUM"];function xt({vscode:p,i18n:v,dom:Me,historyState:u,authorizationStatusGetter:re}){let{historyAccountSelect:k,historyModelSelect:R,historyRangeButtons:ie,historyCanvas:ce,historyEmpty:ee,historyMetricLabel:fe,historySummary:ye,historyTableBody:Ie,historyTableEmpty:he,historyPrevBtn:ge,historyNextBtn:ve,historyPageInfo:le}=Me;function qe(){k&&k.addEventListener("change",()=>{u.selectedEmail=k.value||null,u.page=1,f()}),R&&R.addEventListener("change",()=>{u.selectedModelId=R.value||null,u.page=1,f()}),ie.forEach(b=>{b.addEventListener("click",()=>{let ae=be(parseInt(b.dataset.range||"",10));u.rangeDays!==ae&&(u.rangeDays=ae,S(),u.page=1,f())})});let d=document.getElementById("history-clear-btn"),l=document.getElementById("history-clear-modal"),y=document.getElementById("history-clear-this-btn"),I=document.getElementById("history-clear-all-btn"),_=document.getElementById("history-clear-cancel"),F=document.getElementById("history-clear-close");d&&l&&d.addEventListener("click",()=>{if(u.selectedEmail){let b=document.getElementById("history-clear-message");b&&(b.textContent=(v["history.clearConfirm"]||"Are you sure you want to clear quota history for {email}?").replace("{email}",u.selectedEmail)),y&&(y.textContent=`\u{1F5D1}\uFE0F ${v["history.clearThis"]||"Clear This Account"}`),l.classList.remove("hidden")}});let z=()=>{l&&l.classList.add("hidden")};F&&F.addEventListener("click",z),_&&_.addEventListener("click",z),y&&y.addEventListener("click",()=>{u.selectedEmail&&(p.postMessage({command:"clearHistorySingle",email:u.selectedEmail}),z())}),I&&I.addEventListener("click",()=>{p.postMessage({command:"clearHistoryAll"}),z()}),ge&&ge.addEventListener("click",()=>{u.page>1&&(u.page-=1,X())}),ve&&ve.addEventListener("click",()=>{u.page+=1,X()}),S()}function Ne(){if(!Ee()){u.needsRender=!0;return}V()}function be(d){return typeof d!="number"||!Number.isFinite(d)||d<=0?7:d<=1?1:d<=7?7:30}function Ee(){let d=document.getElementById("tab-history");return!!(d&&d.classList.contains("active"))}function Ae(){let d=re?.()?.activeAccount;d&&(u.selectedEmail=d),S(),T(),x(),f(),u.needsRender&&(V(),X())}function f(){if(!ce||!Ee())return;let d=be(u.rangeDays);u.rangeDays=d,p.postMessage({command:"quotaHistory.get",email:u.selectedEmail||void 0,modelId:u.selectedModelId||void 0,rangeDays:d})}function A(){f()}function n(d){let l=d||{},y=Array.isArray(l.accounts)?l.accounts:[];u.accounts=y,u.models=Array.isArray(l.models)?l.models:[],typeof l.rangeDays=="number"&&(u.rangeDays=be(l.rangeDays)),typeof l.email=="string"&&l.email.includes("@")&&(u.selectedEmail=l.email),typeof l.modelId=="string"&&(u.selectedModelId=l.modelId),u.points=Array.isArray(l.points)?l.points:[],u.page=1,T(),x(),S(),K(),Ee()?(V(),X()):u.needsRender=!0}function T(){if(!k)return;k.innerHTML="";let d=Array.isArray(u.accounts)?u.accounts:[];if(d.length===0){let y=document.createElement("option");y.value="",y.textContent=v["history.noAccounts"]||"No accounts",k.appendChild(y),k.disabled=!0,u.selectedEmail=null;return}let l=re?.()?.activeAccount;k.disabled=!1,d.forEach(y=>{let I=document.createElement("option");I.value=y;let _=l&&y===l;I.textContent=_?`\u2705 ${y}`:y,k.appendChild(I)}),u.selectedEmail&&d.includes(u.selectedEmail)?k.value=u.selectedEmail:l&&d.includes(l)?(k.value=l,u.selectedEmail=l):(u.selectedEmail=d[0],k.value=d[0])}function x(){if(!R)return;R.innerHTML="";let d=Array.isArray(u.models)?u.models:[];if(d.length===0){let y=document.createElement("option");y.value="",y.textContent=v["history.noModels"]||v["models.empty"]||"No models",R.appendChild(y),R.disabled=!0,u.selectedModelId=null;return}R.disabled=!1,d.forEach(y=>{let I=document.createElement("option");I.value=y.modelId,I.textContent=y.label||y.modelId,R.appendChild(I)});let l=d.map(y=>y.modelId);(!u.selectedModelId||!l.includes(u.selectedModelId))&&(u.selectedModelId=d[0].modelId),R.value=u.selectedModelId||""}function S(){ie.forEach(d=>{be(parseInt(d.dataset.range||"",10))===u.rangeDays?d.classList.add("active"):d.classList.remove("active")})}function M(){let l=(Array.isArray(u.models)?u.models:[]).find(y=>y.modelId===u.selectedModelId);return l?.label||l?.modelId||""}function H(){return Array.isArray(u.points)?u.points.filter(d=>d&&typeof d.timestamp=="number"&&Number.isFinite(d.timestamp)&&typeof d.remainingPercentage=="number"&&Number.isFinite(d.remainingPercentage)).sort((d,l)=>d.timestamp-l.timestamp):[]}function K(){if(!fe||!ye)return;let d=M();d?fe.textContent=`${v["history.modelLabel"]||"Model"}: ${d}`:fe.textContent="";let l=H();if(l.length===0){ye.textContent="";return}let y=l[l.length-1],I=[];I.push(`${v["history.currentValue"]||"Current"}: ${te(y.remainingPercentage)}`),typeof y.resetTime=="number"&&Number.isFinite(y.resetTime)&&I.push(`${v["history.resetTime"]||"Reset"}: ${de(y.resetTime)}`),typeof y.countdownSeconds=="number"&&Number.isFinite(y.countdownSeconds)&&I.push(`${v["history.countdown"]||"Countdown"}: ${U(y.countdownSeconds)}`),I.push(`${v["history.updatedAt"]||"Updated"}: ${de(y.timestamp)}`),ye.textContent=I.join(" \xB7 ")}function V(){if(!ce)return;if(!Ee()){u.needsRender=!0;return}let d=ce.getBoundingClientRect();if(d.width<=0||d.height<=0){u.needsRender=!0;return}u.needsRender=!1;let l=ce.getContext("2d");if(!l)return;let y=window.devicePixelRatio||1;ce.width=Math.max(1,Math.round(d.width*y)),ce.height=Math.max(1,Math.round(d.height*y)),l.setTransform(y,0,0,y,0,0),l.clearRect(0,0,d.width,d.height);let I=H(),_=I.length>0;if(ee){let L=u.accounts.length===0?v["history.noAccounts"]||"No accounts":u.models.length===0?v["history.noModels"]||"No models":v["history.noData"]||"No history yet.";ee.textContent=L,ee.classList.toggle("hidden",_)}if(!_)return;let F=d.width,z=d.height,b={left:52,right:20,top:20,bottom:42},ae=Math.max(1,F-b.left-b.right),O=Math.max(1,z-b.top-b.bottom),ue=Date.now(),Se=be(u.rangeDays)*24*60*60*1e3,me=ue-Se,De=ue,$e=oe("--accent","#2f81f7"),Ke=oe("--border-color","rgba(255,255,255,0.08)"),ze=oe("--text-secondary","#8b949e");l.save(),l.strokeStyle=Ke,l.lineWidth=1,l.setLineDash([4,4]);for(let L=0;L<=5;L++){let Y=b.top+O/5*L;l.beginPath(),l.moveTo(b.left,Y),l.lineTo(F-b.right,Y),l.stroke()}l.setLineDash([]),l.restore(),l.save(),l.fillStyle=ze,l.font=`11px ${oe("--font-family","sans-serif")}`,l.textAlign="right",l.textBaseline="middle";let we=Math.max(12,b.left-8);for(let L=0;L<=5;L++){let Y=100-L*20,Ce=b.top+O/5*L;l.fillText(`${Y}%`,we,Ce)}l.restore(),l.save(),l.fillStyle=ze,l.font=`11px ${oe("--font-family","sans-serif")}`,l.textBaseline="top",l.textAlign="center";let w=b.top+O+12,Ve=60,Pe=-1;[...I.map(L=>{let Y=(L.timestamp-me)/(De-me);return{x:b.left+Math.min(1,Math.max(0,Y))*ae,timestamp:L.timestamp}})].reverse().forEach((L,Y)=>{let Ce=Y===0,He=Pe===-1||Pe-L.x>=Ve;if(Ce||He){let Le=new Date(L.timestamp),Be=[];u.rangeDays<=1?Be=[String(Le.getHours()).padStart(2,"0")+":"+String(Le.getMinutes()).padStart(2,"0")]:Be=[String(Le.getMonth()+1).padStart(2,"0")+"-"+String(Le.getDate()).padStart(2,"0")];let Fe=Be.join(" ");l.globalAlpha=.5,l.beginPath(),l.moveTo(L.x,b.top+O),l.lineTo(L.x,b.top+O+5),l.stroke(),l.globalAlpha=1,l.fillText(Fe,L.x,w),Pe=L.x}}),l.restore();let W=I.map(L=>{let Y=Math.min(100,Math.max(0,L.remainingPercentage)),Ce=(L.timestamp-me)/(De-me),He=b.left+Math.min(1,Math.max(0,Ce))*ae,Le=b.top+(1-Y/100)*O;return{x:He,y:Le,raw:L}});if(W.length===1){l.fillStyle=$e,l.beginPath(),l.arc(W[0].x,W[0].y,3,0,Math.PI*2),l.fill();return}l.save(),l.globalAlpha=.18,l.fillStyle=$e,l.beginPath(),l.moveTo(W[0].x,W[0].y),W.forEach(L=>l.lineTo(L.x,L.y)),l.lineTo(W[W.length-1].x,b.top+O),l.lineTo(W[0].x,b.top+O),l.closePath(),l.fill(),l.restore(),l.strokeStyle=$e,l.lineWidth=2,l.beginPath(),W.forEach((L,Y)=>{Y===0?l.moveTo(L.x,L.y):l.lineTo(L.x,L.y)}),l.stroke(),l.fillStyle=$e,W.forEach(L=>{l.beginPath(),l.arc(L.x,L.y,2,0,Math.PI*2),l.fill()});let je=W[W.length-1];l.beginPath(),l.arc(je.x,je.y,3.5,0,Math.PI*2),l.fill()}function X(){if(!Ie||!le||!ge||!ve)return;let d=H().slice().sort((b,ae)=>ae.timestamp-b.timestamp),l=d.length,y=u.pageSize,I=l>0?Math.ceil(l/y):0;if(l===0){Ie.innerHTML="",he&&(he.textContent=v["history.tableEmpty"]||v["history.noData"]||"No data",he.classList.remove("hidden")),le.textContent="",ge.disabled=!0,ve.disabled=!0;return}he&&he.classList.add("hidden"),u.page=Math.min(Math.max(u.page,1),I);let _=(u.page-1)*y,F=d.slice(_,_+y);Ie.innerHTML=F.map((b,ae)=>{let O=d[_+ae+1],ue=O?b.remainingPercentage-O.remainingPercentage:null,Se=ue===null?"--":N(ue),me=ue===null?"neutral":ue>0?"positive":ue<0?"negative":"neutral";return`
                <tr>
                    <td>${de(b.timestamp)}</td>
                    <td>${te(b.remainingPercentage)}</td>
                    <td class="history-delta ${me}">${Se}</td>
                    <td>${de(b.resetTime)}</td>
                    <td>${ne(b.countdownSeconds,b.isStart,b.isReset)}</td>
                </tr>
            `}).join("");let z=v["history.pageInfo"]||"Page {current} / {total}";le.textContent=z.replace("{current}",String(u.page)).replace("{total}",String(I)),ge.disabled=u.page<=1,ve.disabled=u.page>=I}function te(d){return typeof d!="number"||!Number.isFinite(d)?"--":`${Math.round(d*10)/10}%`}function N(d){if(typeof d!="number"||!Number.isFinite(d))return"--";let l=Math.round(d*10)/10;return`${l>0?"+":""}${l}%`}function U(d){if(typeof d!="number"||!Number.isFinite(d))return"--";if(d<=0)return v["dashboard.online"]||"Restoring Soon";let l=Math.ceil(d/60);if(l<60)return`${l}m`;let y=Math.floor(l/60),I=l%60;if(y<24)return`${y}h ${I}m`;let _=Math.floor(y/24),F=y%24;return`${_}d ${F}h ${I}m`}function ne(d,l,y){let I=U(d);if(!l&&!y)return I;let _="";return l&&(_+='<span class="tag-start">START</span>'),y&&(_+='<span class="tag-reset">RESET</span>'),I==="--"?_:`${I} ${_}`}function de(d){return typeof d!="number"||!Number.isFinite(d)?"--":new Date(d).toLocaleString()}function oe(d,l){let y=getComputedStyle(document.documentElement).getPropertyValue(d);return(y?y.trim():"")||l}return{initHistoryTab:qe,handleHistoryResize:Ne,activateHistoryTab:Ae,handleQuotaHistoryData:n,handleQuotaHistoryCleared:A,requestQuotaHistory:f,isHistoryTabActive:Ee}}function kt({vscode:p,i18n:v,showToast:Me,switchToTab:u,escapeHtml:re}){let k={announcements:[],unreadIds:[],popupAnnouncement:null},R=null,ie=new Set;function ce(){let f=document.getElementById("announcement-btn");f&&f.addEventListener("click",fe);let A=document.getElementById("announcement-list-close");A&&A.addEventListener("click",ye);let n=document.getElementById("announcement-mark-all-read");n&&n.addEventListener("click",be);let T=document.getElementById("announcement-popup-later");T&&T.addEventListener("click",le);let x=document.getElementById("announcement-popup-got-it");x&&x.addEventListener("click",qe);let S=document.getElementById("announcement-popup-action");S&&S.addEventListener("click",Ne),window.showImagePreview=Ae}function ee(){let f=document.getElementById("announcement-badge");if(f){let A=k.unreadIds.length;A>0?(f.textContent=A>9?"9+":A,f.classList.remove("hidden")):f.classList.add("hidden")}}function fe(){p.postMessage({command:"announcement.getState"});let f=document.getElementById("announcement-list-modal");f&&f.classList.remove("hidden")}function ye(){let f=document.getElementById("announcement-list-modal");f&&f.classList.add("hidden")}function Ie(){let f=document.getElementById("announcement-list");if(!f)return;let A=k.announcements||[];if(A.length===0){f.innerHTML=`<div class="announcement-empty">${v["announcement.empty"]||"No notifications"}</div>`;return}let n={feature:"\u2728",warning:"\u26A0\uFE0F",info:"\u2139\uFE0F",urgent:"\u{1F6A8}"};f.innerHTML=A.map(T=>{let x=k.unreadIds.includes(T.id),S=n[T.type]||"\u2139\uFE0F",M=he(T.createdAt);return`
                <div class="announcement-item ${x?"unread":""}" data-id="${T.id}">
                    <span class="announcement-icon">${S}</span>
                    <div class="announcement-info">
                        <div class="announcement-title">
                            ${x?'<span class="announcement-unread-dot"></span>':""}
                            <span>${T.title}</span>
                        </div>
                        <div class="announcement-summary">${T.summary}</div>
                        <div class="announcement-time">${M}</div>
                    </div>
                </div>
            `}).join(""),f.querySelectorAll(".announcement-item").forEach(T=>{T.addEventListener("click",()=>{let x=T.dataset.id,S=A.find(M=>M.id===x);if(S){if(k.unreadIds.includes(x)){p.postMessage({command:"announcement.markAsRead",id:x}),k.unreadIds=k.unreadIds.filter(H=>H!==x),ee(),T.classList.remove("unread");let M=T.querySelector(".announcement-unread-dot");M&&M.remove()}ge(S,!0),ye()}})})}function he(f){let A=new Date(f),T=new Date-A,x=Math.floor(T/6e4),S=Math.floor(T/36e5),M=Math.floor(T/864e5);return x<1?v["announcement.timeAgo.justNow"]||"Just now":x<60?(v["announcement.timeAgo.minutesAgo"]||"{count}m ago").replace("{count}",x):S<24?(v["announcement.timeAgo.hoursAgo"]||"{count}h ago").replace("{count}",S):(v["announcement.timeAgo.daysAgo"]||"{count}d ago").replace("{count}",M)}function ge(f,A=!1){R=f;let n={feature:v["announcement.type.feature"]||"\u2728 New Feature",warning:v["announcement.type.warning"]||"\u26A0\uFE0F Warning",info:v["announcement.type.info"]||"\u2139\uFE0F Info",urgent:v["announcement.type.urgent"]||"\u{1F6A8} Urgent"},T=document.getElementById("announcement-popup-type"),x=document.getElementById("announcement-popup-title"),S=document.getElementById("announcement-popup-content"),M=document.getElementById("announcement-popup-action"),H=document.getElementById("announcement-popup-got-it"),K=document.getElementById("announcement-popup-back"),V=document.getElementById("announcement-popup-close");if(T&&(T.textContent=n[f.type]||n.info,T.className=`announcement-type-badge ${f.type}`),x&&(x.textContent=f.title),S){let te=`<div class="announcement-text">${re(f.content).replace(/\n/g,"<br>")}</div>`;if(f.images&&f.images.length>0){te+='<div class="announcement-images">';for(let N of f.images)te+=`
                        <div class="announcement-image-item">
                            <img src="${re(N.url)}" 
                                 alt="${re(N.alt||N.label||"")}" 
                                 class="announcement-image"
                                 data-preview-url="${re(N.url)}"
                                 title="${v["announcement.clickToEnlarge"]||"Click to enlarge"}" />
                            <div class="image-skeleton"></div>
                            ${N.label?`<div class="announcement-image-label">${re(N.label)}</div>`:""}
                        </div>
                    `;te+="</div>"}S.innerHTML=te,S.querySelectorAll(".announcement-image").forEach(N=>{N.addEventListener("load",()=>{N.classList.add("loaded")}),N.addEventListener("error",()=>{let U=N.closest(".announcement-image-item");if(U){let ne=U.querySelector(".image-skeleton");ne&&ne.remove(),N.style.display="none";let de=document.createElement("div");de.className="image-load-error",de.innerHTML=`
                            <span class="icon">\u{1F5BC}\uFE0F</span>
                            <span>${v["announcement.imageLoadFailed"]||"Image failed to load"}</span>
                        `,U.insertBefore(de,U.firstChild)}}),N.addEventListener("click",()=>{let U=N.getAttribute("data-preview-url");U&&Ae(U)})})}f.action&&f.action.label?(M&&(M.textContent=f.action.label,M.classList.remove("hidden")),H&&H.classList.add("hidden")):(M&&M.classList.add("hidden"),H&&H.classList.remove("hidden")),A?(K&&(K.classList.remove("hidden"),K.onclick=()=>{le(!0),fe()}),V&&(V.onclick=()=>{le(!0)})):(K&&K.classList.add("hidden"),V&&(V.onclick=()=>{le()}));let X=document.getElementById("announcement-popup-modal");X&&X.classList.remove("hidden")}function ve(){if(!R)return;let f=R.id;p.postMessage({command:"announcement.markAsRead",id:f}),k.unreadIds.includes(f)&&(k.unreadIds=k.unreadIds.filter(A=>A!==f),ee())}function le(f=!1){ve();let A=document.getElementById("announcement-popup-modal"),n=A?.querySelector(".announcement-popup-content"),T=document.getElementById("announcement-btn");if(A&&n&&T&&!f){let x=T.getBoundingClientRect(),S=n.getBoundingClientRect(),M=x.left+x.width/2-(S.left+S.width/2),H=x.top+x.height/2-(S.top+S.height/2);n.style.transition="transform 0.4s ease-in, opacity 0.4s ease-in",n.style.transform=`translate(${M}px, ${H}px) scale(0.1)`,n.style.opacity="0",T.classList.add("bell-shake"),setTimeout(()=>{A.classList.add("hidden"),n.style.transition="",n.style.transform="",n.style.opacity="",T.classList.remove("bell-shake")},400)}else A&&A.classList.add("hidden");R=null}function qe(){le()}function Ne(){if(R&&R.action){let f=R.action;f.type==="tab"?u(f.target):f.type==="url"?p.postMessage({command:"openUrl",url:f.target}):f.type==="command"&&p.postMessage({command:"executeCommand",commandId:f.target,commandArgs:f.arguments||[]})}le()}function be(){p.postMessage({command:"announcement.markAllAsRead"}),Me(v["announcement.markAllRead"]||"All marked as read","success")}function Ee(f){k=f,ee(),Ie(),f.popupAnnouncement&&!ie.has(f.popupAnnouncement.id)&&(ie.add(f.popupAnnouncement.id),setTimeout(()=>{ge(f.popupAnnouncement)},600))}function Ae(f){let A=document.createElement("div");A.className="image-preview-overlay",A.innerHTML=`
            <div class="image-preview-container">
                <img src="${f}" class="image-preview-img" />
                <div class="image-preview-hint">${v["announcement.clickToClose"]||"Click to close"}</div>
            </div>
        `,A.addEventListener("click",()=>{A.classList.add("closing"),setTimeout(()=>A.remove(),200)}),document.body.appendChild(A),requestAnimationFrame(()=>A.classList.add("visible"))}return{initAnnouncementEvents:ce,handleAnnouncementState:Ee}}(function(){"use strict";let p=window.__vscodeApi||(window.__vscodeApi=acquireVsCodeApi()),v=document.getElementById("dashboard"),Me=document.getElementById("status"),u=document.getElementById("refresh-btn"),re=document.getElementById("reset-order-btn"),k=document.getElementById("toast"),R=document.getElementById("settings-modal"),ie=document.getElementById("rename-modal"),ce=document.getElementById("model-manager-modal"),ee=document.getElementById("model-manager-list"),fe=document.getElementById("model-manager-count"),ye=document.getElementById("quota-source-info"),Ie=document.getElementById("history-account-select"),he=document.getElementById("history-model-select"),ge=document.querySelectorAll(".history-range-btn"),ve=document.getElementById("history-chart"),le=document.getElementById("history-empty"),qe=document.getElementById("history-metric-label"),Ne=document.getElementById("history-summary"),be=document.getElementById("history-table-body"),Ee=document.getElementById("history-table-empty"),Ae=document.getElementById("history-prev"),f=document.getElementById("history-next"),A=document.getElementById("history-page-info"),n=window.__i18n||{},T=window.AntigravityAuthUI?window.__authUi||(window.__authUi=new window.AntigravityAuthUI(p)):null,x=!1,S=null,M={},H=null,K=null,V=[],X=null,te=!1,N="local",U=!1,ne=null,de=!1,oe=null,d=!1,l=!0,y=[],I="",_=!1,F=!1,z=new Set,b=[],ae={rangeDays:7,selectedEmail:null,selectedModelId:null,accounts:[],models:[],points:[],page:1,pageSize:20,needsRender:!1},O=xt({vscode:p,i18n:n,dom:{historyAccountSelect:Ie,historyModelSelect:he,historyRangeButtons:ge,historyCanvas:ve,historyEmpty:le,historyMetricLabel:qe,historySummary:Ne,historyTableBody:be,historyTableEmpty:Ee,historyPrevBtn:Ae,historyNextBtn:f,historyPageInfo:A},historyState:ae,authorizationStatusGetter:()=>oe}),ue=kt({vscode:p,i18n:n,showToast:J,switchToTab:ft,escapeHtml:St}),Se=10,me=e=>(e||"").toLowerCase().replace(/[^a-z0-9]/g,""),De=new Map(ot.map((e,t)=>[e,t])),$e=new Map(at.map((e,t)=>[e,t])),Ke=new Map(ot.map((e,t)=>[me(e),t])),ze=new Map(at.map((e,t)=>[me(e),t])),we=document.getElementById("custom-grouping-modal"),w={groups:[],allModels:[],groupMappings:{}};function Ve(){let e=p.getState()||{};if(e.lastRefresh&&e.refreshCooldown){let C=Date.now(),B=Math.floor((C-e.lastRefresh)/1e3);B<e.refreshCooldown&&ht(e.refreshCooldown-B)}e.quotaSource&&(N=e.quotaSource),u.addEventListener("click",ct),En(),re&&re.addEventListener("click",_t);let t=document.getElementById("manage-models-btn");t&&t.addEventListener("click",Xt);let o=document.getElementById("toggle-profile-btn");o&&o.addEventListener("click",Dt);let a=document.getElementById("toggle-grouping-btn");a&&a.addEventListener("click",Ht);let s=document.getElementById("settings-btn");s&&s.addEventListener("click",st),document.querySelectorAll(".quota-source-btn").forEach(C=>{C.addEventListener("click",()=>{let B=C.dataset.source;Re(B)})});let r=document.getElementById("close-settings-btn");r&&r.addEventListener("click",Ce);let c=document.getElementById("close-rename-btn");c&&c.addEventListener("click",Be);let g=document.getElementById("save-rename-btn");g&&g.addEventListener("click",Fe);let m=document.getElementById("rename-input");m&&m.addEventListener("keydown",C=>{C.key==="Enter"&&Fe()}),document.getElementById("model-manager-close")?.addEventListener("click",tt),document.getElementById("model-manager-cancel")?.addEventListener("click",tt),document.getElementById("model-manager-save")?.addEventListener("click",tn),document.getElementById("model-manager-select-all")?.addEventListener("click",()=>{pt("all")}),document.getElementById("model-manager-clear")?.addEventListener("click",()=>{pt("none")});let $=document.getElementById("reset-name-btn");$&&$.addEventListener("click",Nt);let D=document.getElementById("close-custom-grouping-btn");D&&D.addEventListener("click",nt);let G=document.getElementById("cancel-custom-grouping-btn");G&&G.addEventListener("click",nt);let q=document.getElementById("save-custom-grouping-btn");q&&q.addEventListener("click",hn);let h=document.getElementById("smart-group-btn");h&&h.addEventListener("click",yn);let E=document.getElementById("add-group-btn");E&&E.addEventListener("click",rn),ue.initAnnouncementEvents(),v.addEventListener("change",C=>{if(C.target.classList.contains("pin-toggle")){let B=C.target.getAttribute("data-model-id");B&&nn(B)}}),window.addEventListener("message",Ot),Pe(),O.initHistoryTab(),window.addEventListener("resize",O.handleHistoryResize),mt(N),p.postMessage({command:"init"})}function Pe(){let e=document.querySelectorAll(".tab-btn"),t=document.querySelectorAll(".tab-content");e.forEach(o=>{o.addEventListener("click",()=>{let a=o.getAttribute("data-tab");e.forEach(s=>s.classList.remove("active")),o.classList.add("active"),t.forEach(s=>{s.id===`tab-${a}`?s.classList.add("active"):s.classList.remove("active")}),p.postMessage({command:"tabChanged",tab:a}),a==="history"&&O.activateHistoryTab()})})}function st(){if(R){let e=document.getElementById("notification-enabled"),t=document.getElementById("warning-threshold"),o=document.getElementById("critical-threshold");e&&(e.checked=M.notificationEnabled!==!1),t&&(t.value=M.warningThreshold||30),o&&(o.value=M.criticalThreshold||10);let a=document.getElementById("display-mode-select");if(a){let s=M.displayMode||"webview";a.value=s,a.onchange=()=>{a.value==="quickpick"&&p.postMessage({command:"updateDisplayMode",displayMode:"quickpick"})}}W(),it(),je(),R.classList.remove("hidden")}}function it(){let e=document.getElementById("statusbar-format");if(!e)return;let t=M.statusBarFormat||"standard";e.value=t,e.onchange=null,e.addEventListener("change",()=>{let o=e.value;p.postMessage({command:"updateStatusBarFormat",statusBarFormat:o})})}function W(){let e=document.getElementById("language-select");if(!e)return;let t=M.language||"auto";e.value=t,e.onchange=null,e.addEventListener("change",()=>{let o=e.value;p.postMessage({command:"updateLanguage",language:o}),J(n["language.changed"]||"Language changed. Reopen panel to apply.","info")})}function je(){let e=document.getElementById("notification-enabled"),t=document.getElementById("warning-threshold"),o=document.getElementById("critical-threshold");e&&(e.onchange=null,e.addEventListener("change",()=>{p.postMessage({command:"updateNotificationEnabled",notificationEnabled:e.checked})})),t&&(t.onblur=null,t.addEventListener("blur",()=>{L()})),o&&(o.onblur=null,o.addEventListener("blur",()=>{L()}))}function L(){let e=document.getElementById("warning-threshold"),t=document.getElementById("critical-threshold"),o=parseInt(e?.value,10)||30,a=parseInt(t?.value,10)||10;o<5&&(o=5),o>80&&(o=80),a<1&&(a=1),a>50&&(a=50),a>=o&&(a=o-1,a<1&&(a=1)),e&&(e.value=o),t&&(t.value=a),Y()}function Y(){let e=document.getElementById("notification-enabled"),t=document.getElementById("warning-threshold"),o=document.getElementById("critical-threshold"),a=e?.checked??!0,s=parseInt(t?.value,10)||30,i=parseInt(o?.value,10)||10;p.postMessage({command:"updateThresholds",notificationEnabled:a,warningThreshold:s,criticalThreshold:i})}function Ce(){R&&R.classList.add("hidden")}function He(e,t,o){if(ie){K=e,V=o||[],te=!1,X=null;let a=document.getElementById("rename-input");a&&(a.value=t||"",a.focus(),a.select()),ie.classList.remove("hidden")}}function Le(e,t,o){if(ie){te=!0,X=e,K=null,V=[],I=o||t||"";let a=document.getElementById("rename-input");a&&(a.value=t||"",a.focus(),a.select()),ie.classList.remove("hidden")}}function Be(){ie&&(ie.classList.add("hidden"),K=null,V=[],X=null,te=!1,I="")}function Fe(){let t=document.getElementById("rename-input")?.value?.trim();if(!t){J(n["model.nameEmpty"]||n["grouping.nameEmpty"]||"Name cannot be empty","error");return}te&&X?(p.postMessage({command:"renameModel",modelId:X,groupName:t}),J((n["model.renamed"]||"Model renamed to {name}").replace("{name}",t),"success")):K&&V.length>0&&(qt(K,t),p.postMessage({command:"renameGroup",groupId:K,groupName:t,modelIds:V}),J((n["grouping.renamed"]||"Renamed to {name}").replace("{name}",t),"success")),Be()}function qt(e,t){let o=document.querySelector(`.group-card[data-group-id="${e}"]`);if(o){let a=o.querySelector(".group-name");a&&(a.textContent=t)}if(H&&H.groups){let a=H.groups.find(s=>s.groupId===e);a&&(a.groupName=t)}}function Nt(){let e=document.getElementById("rename-input");e&&te&&X&&I&&(e.value=I,e.focus())}function Dt(){p.postMessage({command:"toggleProfile"})}function Pt(){let e=document.getElementById("toggle-profile-btn");e&&(_?(e.textContent=(n["profile.planDetails"]||"Plan")+" \u25BC",e.classList.add("toggle-off")):(e.textContent=(n["profile.planDetails"]||"Plan")+" \u25B2",e.classList.remove("toggle-off")))}function Ht(){p.postMessage({command:"toggleGrouping"})}function Rt(e){let t=document.getElementById("toggle-grouping-btn");t&&(e?(t.textContent=(n["grouping.title"]||"Groups")+" \u25B2",t.classList.remove("toggle-off")):(t.textContent=(n["grouping.title"]||"Groups")+" \u25BC",t.classList.add("toggle-off")))}function ct(){if(u.disabled)return;x=!0,yt(),J(n["notify.refreshing"]||"Refreshing quota data...","info"),p.postMessage({command:"refresh"});let e=Date.now();p.setState({...p.getState(),lastRefresh:e,refreshCooldown:Se}),ht(Se)}function _t(){p.postMessage({command:"resetOrder"}),J(n["dashboard.resetOrder"]||"Reset Order","success")}function Ot(e){let t=e.data;if(t.type==="switchTab"&&t.tab){ft(t.tab);return}if(t.type==="telemetry_update"){if(x=!1,yt(),t.config&&(M=t.config,t.config.profileHidden!==void 0&&(_=t.config.profileHidden,Pt()),t.config.quotaSource&&(!U||t.config.quotaSource===ne)&&(N=t.config.quotaSource,p.setState({...p.getState(),quotaSource:N})),t.config.authorizedAvailable!==void 0&&(de=t.config.authorizedAvailable),t.config.authorizationStatus!==void 0&&(oe=t.config.authorizationStatus),Array.isArray(t.config.visibleModels)&&(y=t.config.visibleModels),t.config.dataMasked!==void 0&&(F=t.config.dataMasked),t.config.antigravityToolsSyncEnabled!==void 0&&(d=t.config.antigravityToolsSyncEnabled),t.config.antigravityToolsAutoSwitchEnabled!==void 0&&(l=t.config.antigravityToolsAutoSwitchEnabled)),U){if(t.config?.quotaSource!==ne){Je(t.data?.isConnected);return}Xe(!1)}an(t.data,t.config),H=t.data,Je(t.data?.isConnected),O.isHistoryTabActive()&&O.requestQuotaHistory()}if(t.type==="quotaHistoryData"&&O.handleQuotaHistoryData(t.data),t.type==="quotaHistoryCleared"&&O.handleQuotaHistoryCleared(),t.type==="quotaHistoryUpdated"){let o=t.data?.email;if(O.isHistoryTabActive()){if(o&&ae.selectedEmail&&o!==ae.selectedEmail)return;O.requestQuotaHistory()}}if(t.type==="autoTriggerState"&&t.data?.authorization!==void 0){oe=t.data.authorization,de=!!t.data.authorization?.isAuthorized,Ze();let o=document.getElementById("account-manage-modal");o&&!o.classList.contains("hidden")&&((oe?.accounts||[]).length===0?T?o.classList.add("hidden"):Oe():T?T.renderAccountManageList():ut())}if(t.type==="announcementState"&&ue.handleAnnouncementState(t.data),t.type==="quotaSourceError"&&(U&&(Xe(!1),Je(H?.isConnected)),J(t.message||n["quotaSource.authorizedMissing"]||"Authorize auto wake-up first","warning")),t.type==="antigravityToolsSyncStatus"&&(t.data?.enabled!==void 0&&(d=t.data.enabled),t.data?.autoSyncEnabled!==void 0&&(d=t.data.autoSyncEnabled),t.data?.autoSwitchEnabled!==void 0&&(l=t.data.autoSwitchEnabled),Ze()),t.type==="antigravityToolsSyncPrompt"){let o=t.data||{};jt(o)}if(t.type==="localAuthImportPrompt"){let o=t.data||{};zt(o)}if(t.type==="localAuthImportError"&&_e(),t.type==="antigravityToolsSyncProgress"){let{current:o,total:a,email:s}=t.data||{};Ut(o,a,s)}t.type==="antigravityToolsSyncComplete"&&Jt(t.data?.success,t.data?.error),t.type==="refreshAccounts"&&(p.postMessage({command:"getAutoTriggerState"}),J(n["cockpitTools.dataChanged"]||"\u8D26\u53F7\u6570\u636E\u5DF2\u66F4\u65B0","info")),t.type==="accountSwitched"&&(p.postMessage({command:"getAutoTriggerState"}),J((n["cockpitTools.accountSwitched"]||"\u5DF2\u5207\u6362\u81F3 {email}").replace("{email}",t.email||""),"success"))}function Xe(e,t){U=e,e?(ne=t||ne,mt(ne)):(ne=null,Me.style.display="none"),document.querySelectorAll(".quota-source-btn").forEach(a=>{let s=a.dataset.source;a.disabled=e&&s===ne})}function Re(e,t={}){if(!e||!(t.force===!0)&&(!U&&e===N||U&&e===ne))return;let a=t.command||"updateQuotaSource";Xe(!0,e),N=e,Je(H?.isConnected),p.postMessage({command:a,quotaSource:e})}function In(){let e=document.getElementById("antigravityTools-sync-checkbox"),t=document.getElementById("antigravityTools-import-btn");e?.addEventListener("change",o=>{let a=o.target.checked;d=a,p.postMessage({command:"antigravityToolsSync.toggle",enabled:a})}),t?.addEventListener("click",()=>{p.postMessage({command:"antigravityToolsSync.import"})})}function lt(){let e=document.getElementById("at-sync-config-modal");e||(e=document.createElement("div"),e.id="at-sync-config-modal",e.className="modal hidden",e.innerHTML=`
                <div class="modal-content at-sync-config-content">
                    <div class="modal-header">
                        <h3>\u2699 ${n["atSyncConfig.title"]||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}</h3>
                        <button class="close-btn" id="close-at-sync-config-modal">\xD7</button>
                    </div>
                    <div class="modal-body at-sync-config-body">
                        <!-- \u6570\u636E\u8BBF\u95EE\u8BF4\u660E -->
                        <div class="at-sync-section at-sync-info-section">
                            <details class="at-sync-details at-sync-info-details">
                                <summary class="at-sync-details-summary">
                                    <div class="at-sync-section-title-row">
                                        <div class="at-sync-section-title">\u2139\uFE0F ${n["atSyncConfig.featureTitle"]||"\u529F\u80FD\u8BF4\u660E"}</div>
                                        <span class="at-sync-details-link">
                                            ${n["atSyncConfig.dataAccessDetails"]||"\u5C55\u5F00\u8BE6\u60C5\u8BF4\u660E"}
                                        </span>
                                    </div>
                                    <div class="at-sync-description at-sync-info-summary">
                                        ${n["atSyncConfig.featureSummary"]||"\u67E5\u770B\u6570\u636E\u8BBF\u95EE\u4E0E\u540C\u6B65/\u5BFC\u5165\u89C4\u5219\u3002"}
                                    </div>
                                </summary>
                                <div class="at-sync-details-body">
                                    <div class="at-sync-info-block">
                                        <div class="at-sync-info-subtitle">\u{1F6E1}\uFE0F ${n["atSyncConfig.dataAccessTitle"]||"\u6570\u636E\u8BBF\u95EE\u8BF4\u660E"}</div>
                                        <div class="at-sync-description">
                                            ${n["atSyncConfig.dataAccessDesc"]||"\u672C\u529F\u80FD\u4F1A\u8BFB\u53D6\u60A8\u672C\u5730 Antigravity Tools \u4E0E Antigravity \u5BA2\u6237\u7AEF\u7684\u8D26\u6237\u4FE1\u606F\uFF0C\u4EC5\u7528\u4E8E\u672C\u63D2\u4EF6\u6388\u6743/\u5207\u6362\u3002"}
                                        </div>
                                        <div class="at-sync-path-info">
                                            <span class="at-sync-path-label">${n["atSyncConfig.readPathTools"]||"Antigravity Tools \u8DEF\u5F84"}:</span>
                                            <code class="at-sync-path">~/.antigravity_tools/</code>
                                        </div>
                                        <div class="at-sync-path-info">
                                            <span class="at-sync-path-label">${n["atSyncConfig.readPathLocal"]||"Antigravity \u5BA2\u6237\u7AEF\u8DEF\u5F84"}:</span>
                                            <code class="at-sync-path">.../Antigravity/User/globalStorage/state.vscdb</code>
                                        </div>
                                        <div class="at-sync-data-list">
                                            <span class="at-sync-data-label">${n["atSyncConfig.readData"]||"\u8BFB\u53D6\u5185\u5BB9"}:</span>
                                            <span class="at-sync-data-items">${n["atSyncConfig.readDataItems"]||"\u8D26\u6237\u90AE\u7BB1\u3001Refresh Token\uFF08\u672C\u5730\u8BFB\u53D6\uFF09"}</span>
                                        </div>
                                    </div>
                                    <div class="at-sync-info-block">
                                        <div class="at-sync-info-line">
                                            <span class="at-sync-info-label">${n["atSyncConfig.autoSyncTitle"]||"\u81EA\u52A8\u540C\u6B65"}\uFF1A</span>
                                            <span class="at-sync-info-text">${n["atSyncConfig.autoSyncDesc"]||"\u542F\u7528\u540E\u68C0\u6D4B\u5230 Antigravity Tools \u65B0\u8D26\u53F7\u65F6\u81EA\u52A8\u5BFC\u5165\uFF08\u662F\u5426\u5207\u6362\u7531\u201C\u81EA\u52A8\u5207\u6362\u201D\u63A7\u5236\uFF09\u3002"}</span>
                                        </div>
                                        <div class="at-sync-info-line">
                                            <span class="at-sync-info-label">${n["atSyncConfig.manualImportTitle"]||"\u624B\u52A8\u5BFC\u5165"}\uFF1A</span>
                                            <span class="at-sync-info-text">${n["atSyncConfig.manualImportDesc"]||"\u5206\u522B\u5BFC\u5165\u672C\u5730\u8D26\u6237\u6216 Antigravity Tools \u8D26\u6237\uFF0C\u4EC5\u6267\u884C\u4E00\u6B21\u3002"}</span>
                                        </div>
                                    </div>
                                </div>
                            </details>
                        </div>
                        
                        <!-- \u81EA\u52A8\u540C\u6B65 / \u81EA\u52A8\u5207\u6362 -->
                        <div class="at-sync-section">
                            <div class="at-sync-toggle-grid">
                                <div class="at-sync-toggle-card">
                                    <label class="at-sync-toggle-label">
                                        <input type="checkbox" id="at-sync-modal-checkbox" ${d?"checked":""}>
                                        <span>${n["atSyncConfig.enableAutoSync"]||"\u81EA\u52A8\u540C\u6B65Antigravity Tools\u8D26\u6237"}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u624B\u52A8\u5BFC\u5165 -->
                        <div class="at-sync-section">
                            <div class="at-sync-section-title">\u{1F4E5} ${n["atSyncConfig.manualImportTitle"]||"\u624B\u52A8\u5BFC\u5165"}</div>
                            <div class="at-sync-import-actions">
                                <button id="at-sync-modal-import-local-btn" class="at-btn at-btn-primary at-sync-import-btn">
                                    ${n["atSyncConfig.importLocal"]||"\u5BFC\u5165\u672C\u5730\u8D26\u6237"}
                                </button>
                                <button id="at-sync-modal-import-tools-btn" class="at-btn at-btn-primary at-sync-import-btn">
                                    ${n["atSyncConfig.importTools"]||"\u5BFC\u5165 Antigravity Tools \u8D26\u6237"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,document.body.appendChild(e),document.getElementById("close-at-sync-config-modal")?.addEventListener("click",Ue),e.addEventListener("click",g=>{g.target===e&&Ue()}));let t=e.querySelector("#at-sync-modal-checkbox");t&&(t.checked=d),e.querySelectorAll(".at-sync-details").forEach(g=>{g.removeAttribute("open")});let o=e.querySelector("#at-sync-modal-checkbox"),a=e.querySelector("#at-sync-modal-import-local-btn"),s=e.querySelector("#at-sync-modal-import-tools-btn"),i=o.cloneNode(!0);o.parentNode.replaceChild(i,o);let r=a.cloneNode(!0);a.parentNode.replaceChild(r,a);let c=s.cloneNode(!0);s.parentNode.replaceChild(c,s),e.querySelector("#at-sync-modal-checkbox")?.addEventListener("change",g=>{let m=g.target.checked;d=m,p.postMessage({command:"antigravityToolsSync.toggle",enabled:m})}),e.querySelector("#at-sync-modal-import-local-btn")?.addEventListener("click",()=>{Ye(),p.postMessage({command:"autoTrigger.importLocal"}),Ue()}),e.querySelector("#at-sync-modal-import-tools-btn")?.addEventListener("click",()=>{p.postMessage({command:"antigravityToolsSync.import"}),Ue()}),e.classList.remove("hidden")}function Ue(){let e=document.getElementById("at-sync-config-modal");e&&e.classList.add("hidden")}function Gt(e){return!e||typeof e!="string"?"":e}function dt(){let e=document.getElementById("local-auth-import-modal");return e||(e=document.createElement("div"),e.id="local-auth-import-modal",e.className="modal hidden",document.body.appendChild(e)),e}function rt(e){e.onclick=t=>{t.target===e&&_e()},e.querySelector("#close-local-import-modal")?.addEventListener("click",_e)}function Ye(){let e=dt();e.innerHTML=`
            <div class="modal-content local-import-content">
                <div class="modal-header">
                    <h3>${n["localImportPrompt.loadingTitle"]||"\u6B63\u5728\u68C0\u6D4B\u672C\u5730\u6388\u6743"}</h3>
                    <button class="close-btn" id="close-local-import-modal">\xD7</button>
                </div>
                <div class="modal-body local-import-body">
                    <div class="local-import-panel">
                        <div class="local-import-desc">${n["localImportPrompt.loadingDesc"]||"\u6B63\u5728\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7\u4FE1\u606F\uFF0C\u8BF7\u7A0D\u5019\u2026"}</div>
                        <div class="local-import-loading">
                            <span class="local-import-spinner"></span>
                            <span>${n["localImportPrompt.loadingHint"]||"\u6B63\u5728\u68C0\u6D4B\u672C\u5730\u6388\u6743\u8D26\u53F7"}</span>
                        </div>
                    </div>
                </div>
            </div>
        `,rt(e),e.classList.remove("hidden")}function zt(e){let t=typeof e.email=="string"?e.email:"",o=e.exists===!0,a=Gt(t),s=dt();s.innerHTML=`
            <div class="modal-content local-import-content">
                <div class="modal-header">
                    <h3>${n["localImportPrompt.title"]||"\u786E\u8BA4\u540C\u6B65\u672C\u5730\u6388\u6743"}</h3>
                    <button class="close-btn" id="close-local-import-modal">\xD7</button>
                </div>
                <div class="modal-body local-import-body">
                    <div class="local-import-panel">
                        <div class="local-import-desc">${n["localImportPrompt.desc"]||"\u5DF2\u68C0\u6D4B\u5230\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7\uFF0C\u662F\u5426\u540C\u6B65\u5230\u63D2\u4EF6\u4E2D\uFF1F"}</div>
                        <div class="local-import-summary">
                            <div class="local-import-label">${n["localImportPrompt.foundLabel"]||"\u68C0\u6D4B\u5230\u8D26\u53F7"}</div>
                            <div class="local-import-email" id="local-import-email"></div>
                            <span class="local-import-tag" id="local-import-tag">${n["localImportPrompt.existsTag"]||"\u5DF2\u5B58\u5728"}</span>
                        </div>
                        <div class="local-import-note" id="local-import-note"></div>
                    </div>
                    <div class="local-import-actions">
                        <button id="local-import-cancel-btn" class="at-btn at-btn-outline">${n["localImportPrompt.cancel"]||"\u53D6\u6D88"}</button>
                        <button id="local-import-confirm-btn" class="at-btn at-btn-primary"></button>
                    </div>
                </div>
            </div>
        `,rt(s);let i=s.querySelector("#local-import-email"),r=s.querySelector("#local-import-tag"),c=s.querySelector("#local-import-note"),g=s.querySelector("#local-import-confirm-btn"),m=s.querySelector("#local-import-cancel-btn");i&&(i.textContent=a||n["localImportPrompt.unknownEmail"]||"\u672A\u77E5\u8D26\u53F7"),r&&(r.style.display=o?"inline-flex":"none"),c&&(c.textContent=o?n["localImportPrompt.existsDesc"]||"\u8BE5\u8D26\u53F7\u5DF2\u5B58\u5728\uFF0C\u7EE7\u7EED\u5C06\u8986\u76D6\u672C\u5730\u4FDD\u5B58\u7684\u6388\u6743\u4FE1\u606F\u3002":n["localImportPrompt.newDesc"]||"\u5C06\u5BFC\u5165\u5E76\u5207\u6362\u4E3A\u8BE5\u8D26\u53F7\u3002");let $=o?n["localImportPrompt.overwrite"]||"\u8986\u76D6\u5E76\u540C\u6B65":n["localImportPrompt.confirm"]||"\u786E\u8BA4\u540C\u6B65";if(g&&(g.textContent=$),g&&g.parentNode&&m&&m.parentNode){let D=g.cloneNode(!0);g.parentNode.replaceChild(D,g);let G=m.cloneNode(!0);m.parentNode.replaceChild(G,m),s.querySelector("#local-import-confirm-btn")?.addEventListener("click",()=>{p.postMessage({command:"autoTrigger.importLocalConfirm",overwrite:o}),_e()}),s.querySelector("#local-import-cancel-btn")?.addEventListener("click",()=>{_e()})}s.classList.remove("hidden")}function _e(){let e=document.getElementById("local-auth-import-modal");e&&e.classList.add("hidden")}function jt(e){let t=e.promptType||"new_accounts",o=e.newEmails||[],a=e.currentEmail||"",s=e.localEmail||"",i=e.autoConfirm===!0,r=e.autoConfirmImportOnly===!0,c=document.getElementById("antigravityTools-sync-modal");if(c||(c=document.createElement("div"),c.id="antigravityTools-sync-modal",c.className="modal hidden",document.body.appendChild(c)),t==="not_found"){c.innerHTML=`
                <div class="modal-content antigravityTools-sync-content">
                    <div class="modal-header antigravityTools-sync-header">
                        <div class="antigravityTools-sync-title">
                            <h3>${n["antigravityToolsSync.notFoundTitle"]}</h3>
                        </div>
                        <button class="close-btn" id="antigravityTools-sync-close">\xD7</button>
                    </div>
                    <div class="modal-body antigravityTools-sync-body">
                        <div class="antigravityTools-sync-section">
                            <p class="antigravityTools-sync-notice">${n["antigravityToolsSync.notFoundDesc"]}</p>
                        </div>
                    </div>
                    <div class="modal-footer antigravityTools-sync-footer">
                        <button id="antigravityTools-sync-manual-import" class="at-btn at-btn-primary">
                            ${n["antigravityToolsSync.manualImportBtn"]||"\u624B\u52A8\u5BFC\u5165 JSON"}
                        </button>
                        <button id="antigravityTools-sync-ok" class="at-btn at-btn-secondary">${n["common.gotIt"]}</button>
                    </div>
                </div>
            `,c.classList.remove("hidden"),c.querySelector("#antigravityTools-sync-close")?.addEventListener("click",()=>{c.classList.add("hidden")}),c.querySelector("#antigravityTools-sync-ok")?.addEventListener("click",()=>{c.classList.add("hidden")}),c.querySelector("#antigravityTools-sync-manual-import")?.addEventListener("click",()=>{c.classList.add("hidden"),Ft()});return}if(t==="switch_only"){let se=function(){B&&(clearTimeout(B),B=null)},Te=function(){se(),j.disabled=!0,Z.disabled=!0,Q.disabled=!0,j.textContent=n["autoTrigger.switching"],p.postMessage({command:"antigravityToolsSync.importConfirm",importOnly:!1,switchOnly:!0,targetEmail:a})};c.innerHTML=`
                <div class="modal-content antigravityTools-sync-content">
                    <div class="modal-header antigravityTools-sync-header">
                        <div class="antigravityTools-sync-title">
                            <h3>${n["antigravityToolsSync.switchTitle"]}</h3>
                        </div>
                        <button class="close-btn" id="antigravityTools-sync-close">\xD7</button>
                    </div>
                    <div class="modal-body antigravityTools-sync-body">
                        <div class="antigravityTools-sync-section">
                            <div class="antigravityTools-sync-label">${n["antigravityToolsSync.localAccount"]}</div>
                             <div class="antigravityTools-sync-current">${s||n["common.none"]}</div>
                        </div>
                        <div class="antigravityTools-sync-section">
                            <div class="antigravityTools-sync-label">${n["autoTrigger.antigravityToolsSyncTarget"]}</div>
                            <div class="antigravityTools-sync-current antigravityTools-sync-highlight">${a}</div>
                        </div>
                    </div>
                    <div class="modal-footer antigravityTools-sync-footer">
                        <button id="antigravityTools-sync-cancel" class="at-btn at-btn-secondary">${n["common.cancel"]}</button>
                        <button id="antigravityTools-sync-switch" class="at-btn at-btn-primary">${n["antigravityToolsSync.switchBtn"]}</button>
                    </div>
                </div>
            `,c.classList.remove("hidden");let B=null,Q=c.querySelector("#antigravityTools-sync-close"),Z=c.querySelector("#antigravityTools-sync-cancel"),j=c.querySelector("#antigravityTools-sync-switch");Q?.addEventListener("click",()=>{se(),c.classList.add("hidden")}),Z?.addEventListener("click",()=>{se(),c.classList.add("hidden")}),j?.addEventListener("click",Te),i&&(B=setTimeout(()=>Te(),300));return}c.innerHTML=`
            <div class="modal-content antigravityTools-sync-content">
                <div class="modal-header antigravityTools-sync-header">
                    <div class="antigravityTools-sync-title">
                        <h3>${n["autoTrigger.antigravityToolsSyncTitle"]}</h3>
                        <span class="antigravityTools-sync-count" id="antigravityTools-sync-count">+${o.length}</span>
                    </div>
                    <button class="close-btn" id="antigravityTools-sync-close">\xD7</button>
                </div>
                <div class="modal-body antigravityTools-sync-body">
                    <div class="antigravityTools-sync-section">
                        <div class="antigravityTools-sync-label">${n["autoTrigger.antigravityToolsSyncNew"]}</div>
                        <div class="antigravityTools-sync-chips">${o.map(B=>`<span class="antigravityTools-sync-chip">${B}</span>`).join("")}</div>
                    </div>
                    <div class="antigravityTools-sync-section">
                        <div class="antigravityTools-sync-label">${n["autoTrigger.antigravityToolsSyncTarget"]}</div>
                        <div class="antigravityTools-sync-current">${a||n["common.unknown"]}</div>
                    </div>
                </div>
                <div class="modal-footer antigravityTools-sync-footer">
                    <button id="antigravityTools-sync-cancel" class="at-btn at-btn-secondary">${n["common.cancel"]}</button>
                    <div class="antigravityTools-sync-action-group">
                        <button id="antigravityTools-sync-import-only" class="at-btn at-btn-secondary">${n["autoTrigger.importOnly"]}</button>
                        <button id="antigravityTools-sync-import-switch" class="at-btn at-btn-primary">${n["autoTrigger.importAndSwitch"]}</button>
                    </div>
                </div>
            </div>
        `,c.classList.remove("hidden");let g=null,m=c.querySelector("#antigravityTools-sync-close"),$=c.querySelector("#antigravityTools-sync-cancel"),D=c.querySelector("#antigravityTools-sync-import-only"),G=c.querySelector("#antigravityTools-sync-import-switch");function q(){g&&(clearTimeout(g),g=null)}function h(B){q(),D&&(D.disabled=!0),G&&(G.disabled=!0),$&&($.disabled=!0),m&&(m.disabled=!0),B&&(B.textContent=n["autoTrigger.importing"])}function E(){h(D),p.postMessage({command:"antigravityToolsSync.importConfirm",importOnly:!0})}function C(){h(G),p.postMessage({command:"antigravityToolsSync.importConfirm",importOnly:!1})}m?.addEventListener("click",()=>{q(),c.classList.add("hidden")}),$?.addEventListener("click",()=>{q(),c.classList.add("hidden")}),D?.addEventListener("click",E),G?.addEventListener("click",C),i&&(g=setTimeout(()=>{r?E():C()},300))}function Ft(){let e=document.getElementById("antigravityTools-json-import-modal");e||(e=document.createElement("div"),e.id="antigravityTools-json-import-modal",e.className="modal hidden",document.body.appendChild(e)),e.innerHTML=`
            <div class="modal-content antigravityTools-json-content">
                <div class="modal-header antigravityTools-sync-header">
                    <div class="antigravityTools-sync-title">
                        <h3>${n["antigravityToolsSync.manualImportTitle"]||"\u624B\u52A8\u5BFC\u5165 JSON"}</h3>
                    </div>
                    <button class="close-btn" id="antigravityTools-json-close">\xD7</button>
                </div>
                <div class="modal-body antigravityTools-json-body">
                    <div class="antigravityTools-sync-section">
                        <p class="antigravityTools-sync-notice">
                            ${n["antigravityToolsSync.manualImportDesc"]||"\u672A\u68C0\u6D4B\u5230\u672C\u5730 Antigravity Tools \u8D26\u6237\uFF0C\u53EF\u901A\u8FC7 JSON \u6587\u4EF6\u6216\u7C98\u8D34\u5185\u5BB9\u5BFC\u5165\u3002"}
                        </p>
                    </div>
                    <div class="at-json-import-panel">
                        <div class="at-json-import-actions">
                            <input type="file" id="antigravityTools-json-file-input" accept=".json,application/json" class="hidden">
                            <button id="antigravityTools-json-file-btn" class="at-btn at-btn-secondary">
                                ${n["antigravityToolsSync.manualImportFile"]||"\u9009\u62E9 JSON \u6587\u4EF6"}
                            </button>
                            <span class="at-json-import-file-name" id="antigravityTools-json-file-name">
                                ${n["common.none"]||"\u672A\u9009\u62E9\u6587\u4EF6"}
                            </span>
                        </div>
                        <textarea id="antigravityTools-json-textarea" class="at-json-import-textarea" spellcheck="false" placeholder='${n["antigravityToolsSync.manualImportPlaceholder"]||'\u7C98\u8D34 JSON \u6570\u7EC4\uFF0C\u4F8B\u5982: [{"email":"a@b.com","refresh_token":"..."}]'}'></textarea>
                        <div class="at-json-import-status" id="antigravityTools-json-status"></div>
                        <div class="antigravityTools-sync-chips at-json-import-preview" id="antigravityTools-json-preview"></div>
                        <div class="antigravityTools-sync-note">
                            ${n["antigravityToolsSync.manualImportHint"]||"\u5185\u5BB9\u4EC5\u5728\u672C\u5730\u89E3\u6790\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\u3002"}
                        </div>
                    </div>
                </div>
                <div class="modal-footer antigravityTools-sync-footer">
                    <button id="antigravityTools-json-cancel" class="at-btn at-btn-secondary">${n["common.cancel"]}</button>
                    <button id="antigravityTools-json-import" class="at-btn at-btn-primary" disabled>
                        ${n["autoTrigger.importOnly"]||"\u4EC5\u5BFC\u5165"}
                    </button>
                </div>
            </div>
        `,e.classList.remove("hidden");let t=e.querySelector("#antigravityTools-json-file-input"),o=e.querySelector("#antigravityTools-json-file-btn"),a=e.querySelector("#antigravityTools-json-file-name"),s=e.querySelector("#antigravityTools-json-textarea"),i=e.querySelector("#antigravityTools-json-status"),r=e.querySelector("#antigravityTools-json-preview"),c=e.querySelector("#antigravityTools-json-import"),g=e.querySelector("#antigravityTools-json-close"),m=e.querySelector("#antigravityTools-json-cancel"),$="";function D(h){let E=(h||"").trim();if(!E)return{entries:[],invalid:0,error:""};let C;try{C=JSON.parse(E)}catch{return{entries:[],invalid:0,error:n["antigravityToolsSync.manualImportJsonError"]||"JSON \u89E3\u6790\u5931\u8D25"}}if(!Array.isArray(C))return{entries:[],invalid:0,error:n["antigravityToolsSync.manualImportJsonArray"]||"JSON must be an array"};let B=[],Q=0,Z=new Set;for(let j of C){if(!j||typeof j!="object"){Q+=1;continue}let se=typeof j.email=="string"?j.email.trim():"",Te=typeof j.refresh_token=="string"?j.refresh_token.trim():typeof j.refreshToken=="string"?j.refreshToken.trim():"";if(!se||!Te){Q+=1;continue}let pe=se.toLowerCase();if(Z.has(pe)){Q+=1;continue}Z.add(pe),B.push({email:se,refreshToken:Te})}return{entries:B,invalid:Q,error:""}}function G(h,E,C){if(i&&i.classList.toggle("is-error",!!C),C){i&&(i.textContent=C),r&&(r.innerHTML=""),c&&(c.disabled=!0);return}if(h.length===0){i&&(i.textContent=n["antigravityToolsSync.manualImportEmpty"]||"\u8BF7\u7C98\u8D34\u6216\u9009\u62E9 JSON \u6587\u4EF6"),r&&(r.innerHTML=""),c&&(c.disabled=!0);return}let B=E>0?` \xB7 ${n["antigravityToolsSync.manualImportInvalid"]||"\u65E0\u6548\u6761\u76EE"} ${E}`:"";if(i&&(i.textContent=`${n["antigravityToolsSync.manualImportPreview"]||"\u5C06\u5BFC\u5165"} ${h.length} ${n["antigravityToolsSync.manualImportCountSuffix"]||"\u4E2A\u8D26\u53F7"}${B}`),r){let Z=h.slice(0,6).map(j=>`<span class="antigravityTools-sync-chip">${St(j.email)}</span>`);h.length>6&&Z.push(`<span class="antigravityTools-sync-chip">+${h.length-6}</span>`),r.innerHTML=Z.join("")}c&&(c.disabled=!1)}function q(h){$=h;let E=D(h);G(E.entries,E.invalid,E.error)}o?.addEventListener("click",()=>{t?.click()}),t?.addEventListener("change",async()=>{let h=t.files&&t.files[0];if(!h)return;let E=await h.text();s&&(s.value=E),a&&(a.textContent=h.name),q(E)}),s?.addEventListener("input",h=>{a&&(a.textContent=n["antigravityToolsSync.manualImportPaste"]||"\u7C98\u8D34 JSON"),q(h.target.value)}),c?.addEventListener("click",()=>{let h=D($);if(h.error||h.entries.length===0){J(h.error||n["antigravityToolsSync.manualImportEmpty"]||"\u8BF7\u63D0\u4F9B\u6709\u6548 JSON","warning");return}c.disabled=!0,c.textContent=n["autoTrigger.importing"]||"Importing...",p.postMessage({command:"antigravityToolsSync.importJson",jsonText:$})}),g?.addEventListener("click",()=>e.classList.add("hidden")),m?.addEventListener("click",()=>e.classList.add("hidden")),G([],0,"")}function Ut(e,t,o){let a=n["common.cancel"]||"\u53D6\u6D88",s=`${n["autoTrigger.importing"]||"Importing..."} ${e}/${t}`,i=document.getElementById("antigravityTools-sync-modal");if(i){let c=i.querySelector("#antigravityTools-sync-import-only"),g=i.querySelector("#antigravityTools-sync-import-switch"),m=i.querySelector("#antigravityTools-sync-cancel");c&&c.disabled&&(c.textContent=s),g&&g.disabled&&(g.textContent=s),m&&(m.disabled=!1,m.textContent=a,m.onclick=()=>{p.postMessage({command:"antigravityToolsSync.cancel"}),m.disabled=!0,m.textContent=n["common.cancelling"]||"\u53D6\u6D88\u4E2D..."})}let r=document.getElementById("antigravityTools-json-import-modal");if(r){let c=r.querySelector("#antigravityTools-json-import"),g=r.querySelector("#antigravityTools-json-cancel");c&&c.disabled&&(c.textContent=s),g&&(g.disabled=!1,g.textContent=a,g.onclick=()=>{p.postMessage({command:"antigravityToolsSync.cancel"}),g.disabled=!0,g.textContent=n["common.cancelling"]||"\u53D6\u6D88\u4E2D..."})}console.log(`[AntigravityToolsSync] Progress: ${e}/${t} - ${o}`)}function Jt(e,t){let o=document.getElementById("antigravityTools-sync-modal");o&&o.classList.add("hidden");let a=document.getElementById("antigravityTools-json-import-modal");a&&a.classList.add("hidden")}function Je(e){let t=document.querySelector(".quota-source-status");if(document.querySelectorAll(".quota-source-btn").forEach(a=>{let s=a.dataset.source;a.classList.toggle("active",s===N)}),t){let s=e!==!1&&(N!=="authorized"||de);t.dataset.state=s?"ok":"error"}Ze(),Wt()}function Ze(){let e=document.getElementById("quota-auth-card"),t=document.getElementById("quota-auth-row");if(!e||!t)return;if(N!=="authorized"){let g=H?.localAccountEmail;if(g){e.classList.remove("hidden");let m=`<button class="quota-account-manage-btn at-switch-to-client-btn-local" title="${n["autoTrigger.switchToClientAccount"]||"\u5207\u6362\u81F3\u5F53\u524D\u767B\u5F55\u8D26\u6237"}">${n["autoTrigger.switchToClientAccount"]||"\u5207\u6362\u81F3\u5F53\u524D\u767B\u5F55\u8D26\u6237"}</button>`;t.innerHTML=`
                    <div class="quota-auth-info">
                        <span class="quota-auth-icon">\u{1F464}</span>
                        <span class="quota-auth-text">${n["quotaSource.localAccountLabel"]||"\u5F53\u524D\u8D26\u6237"}</span>
                        <span class="quota-auth-email">${g}</span>
                        ${m}
                    </div>
                `,t.querySelector(".at-switch-to-client-btn-local")?.addEventListener("click",$=>{$.stopPropagation(),p.postMessage({command:"antigravityToolsSync.switchToClient"})})}else e.classList.add("hidden");return}e.classList.remove("hidden");let o=oe,a=o?.accounts||[],s=a.length>0,r=o?.activeAccount||(a.length>0?a[0].email:null);if(T){T.updateState(o,d,l),T.renderAuthRow(t,{showSyncToggleInline:!1});return}let c=`<button id="at-sync-config-btn" class="at-btn at-btn-primary" title="${n["atSyncConfig.title"]||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}">\u2699 ${n["atSyncConfig.btnText"]||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}</button>`;if(s&&r){let g=a.length>1,m=Math.max(a.length-1,0),$=m>0?`<span class="account-count-badge" title="${n["autoTrigger.manageAccounts"]||"Manage Accounts"}">+${m}</span>`:"",D=`<button id="quota-account-manage-btn" class="quota-account-manage-btn" title="${n["autoTrigger.manageAccounts"]}">${n["autoTrigger.manageAccounts"]}</button>`;t.innerHTML=`
                <div class="quota-auth-info quota-auth-info-clickable" title="${n["autoTrigger.manageAccounts"]}">
                    <span class="quota-auth-icon">\u2705</span>
                    <span class="quota-auth-text">${n["autoTrigger.authorized"]}</span>
                    <span class="quota-auth-email">${r}</span>
                    ${$}
                    ${D}
                </div>
                <div class="quota-auth-actions">
                    ${c}
                </div>
            `,t.querySelector(".quota-auth-info")?.addEventListener("click",()=>{et()}),document.getElementById("quota-account-manage-btn")?.addEventListener("click",G=>{G.stopPropagation(),et()}),document.getElementById("at-sync-config-btn")?.addEventListener("click",()=>{lt()})}else t.innerHTML=`
                <div class="quota-auth-info">
                    <span class="quota-auth-icon">\u26A0\uFE0F</span>
                    <span class="quota-auth-text">${n["autoTrigger.unauthorized"]||"Unauthorized"}</span>
                </div>
                <div class="quota-auth-actions">
                    ${c}
                    <button id="quota-auth-btn" class="at-btn at-btn-primary">${n["autoTrigger.authorizeBtn"]||"Authorize"}</button>
                </div>
            `,document.getElementById("quota-auth-btn")?.addEventListener("click",()=>{At()}),document.getElementById("at-sync-config-btn")?.addEventListener("click",()=>{lt()})}function et(){let e=document.getElementById("account-manage-modal");e||(e=document.createElement("div"),e.id="account-manage-modal",e.className="modal hidden",e.innerHTML=`
                <div class="modal-content account-manage-content">
                    <div class="modal-header">
                        <h3>${n["autoTrigger.manageAccounts"]||"Manage Accounts"}</h3>
                        <button class="close-btn" id="close-account-manage-modal">\xD7</button>
                    </div>
                    <div class="modal-hint" style="padding: 8px 16px; font-size: 12px; color: var(--text-muted); background: var(--bg-secondary); border-bottom: 1px solid var(--border-color);">
                        <span style="margin-right: 12px;">\u{1F4A1} ${n["autoTrigger.manageAccountsHintClick"]||"\u70B9\u51FB\u90AE\u7BB1\u53EF\u5207\u6362\u67E5\u770B\u914D\u989D"}</span>
                        <span>\u{1F504} ${n["autoTrigger.manageAccountsHintSwitch"]||'\u70B9\u51FB"\u5207\u6362\u767B\u5F55"\u53EF\u5207\u6362\u5BA2\u6237\u7AEF\u767B\u5F55\u8D26\u6237'}</span>
                    </div>
                    <div class="modal-body" id="account-manage-body">
                        <!-- \u8D26\u53F7\u5217\u8868\u5C06\u5728\u8FD9\u91CC\u52A8\u6001\u6E32\u67D3 -->
                    </div>
                    <div class="modal-footer">
                        <button id="add-new-account-btn" class="at-btn at-btn-primary">\u2795 ${n["autoTrigger.addAccount"]||"Add Account"}</button>
                    </div>
                </div>
            `,document.body.appendChild(e),document.getElementById("close-account-manage-modal")?.addEventListener("click",Oe),e.addEventListener("click",t=>{t.target===e&&Oe()}),document.getElementById("add-new-account-btn")?.addEventListener("click",()=>{p.postMessage({command:"autoTrigger.addAccount"})})),ut(),e.classList.remove("hidden")}function Oe(){let e=document.getElementById("account-manage-modal");e&&e.classList.add("hidden")}function ut(){let e=document.getElementById("account-manage-body");if(!e)return;let t=oe,o=t?.accounts||[],a=t?.activeAccount;if(o.length===0){e.innerHTML=`<div class="account-manage-empty">${n["autoTrigger.noAccounts"]||"No accounts authorized"}</div>`;return}let s=o.map(i=>{let r=i.email===a,c=i.isInvalid===!0,g=c?" expired":"",m=c?"\u26A0\uFE0F":r?"\u2705":"\u{1F464}",$=c?`<span class="account-manage-badge expired">${n["autoTrigger.tokenExpired"]||"Expired"}</span>`:"",D=r&&!c?`<span class="account-manage-badge">${n["autoTrigger.accountActive"]||"Active"}</span>`:"",G=`<button class="at-btn at-btn-small at-btn-primary account-switch-login-btn" data-email="${i.email}">${n["autoTrigger.switchLoginBtn"]||"\u5207\u6362\u767B\u5F55"}</button>`;return`
                <div class="account-manage-item ${r?"active":""}${g}" data-email="${i.email}">
                    <div class="account-manage-info">
                        <span class="account-manage-icon">${m}</span>
                        <span class="account-manage-email">${i.email}</span>
                        ${D}${$}
                    </div>
                    <div class="account-manage-actions">
                        ${G}
                        <button class="at-btn at-btn-small at-btn-danger account-remove-btn" data-email="${i.email}">${n["autoTrigger.deleteBtn"]||"\u5220\u9664"}</button>
                    </div>
                </div>
            `}).join("");e.innerHTML=`<div class="account-manage-list">${s}</div>`,e.querySelectorAll(".account-manage-item").forEach(i=>{i.addEventListener("click",r=>{if(r.target.tagName==="BUTTON"||r.target.closest("button")||i.classList.contains("active"))return;let c=i.dataset.email;c&&(p.postMessage({command:"autoTrigger.switchAccount",email:c}),Oe())})}),e.querySelectorAll(".account-switch-login-btn").forEach(i=>{i.addEventListener("click",r=>{r.stopPropagation();let c=i.dataset.email;c&&Qt(c)})}),e.querySelectorAll(".account-remove-btn").forEach(i=>{i.addEventListener("click",r=>{r.stopPropagation();let c=i.dataset.email;c&&typeof window.openRevokeModalForEmail=="function"&&window.openRevokeModalForEmail(c)})})}function Qt(e){let t=document.getElementById("switch-login-confirm-modal");t||(t=document.createElement("div"),t.id="switch-login-confirm-modal",t.className="modal-overlay",t.innerHTML=`
                <div class="modal-content" style="max-width: 400px;">
                    <div class="modal-header">
                        <h3>${n["autoTrigger.switchLoginTitle"]||"\u5207\u6362\u767B\u5F55\u8D26\u6237"}</h3>
                        <button class="modal-close" id="switch-login-confirm-close">\xD7</button>
                    </div>
                    <div class="modal-body" style="padding: 20px;">
                        <p style="margin-bottom: 10px;">${n["autoTrigger.switchLoginConfirmText"]||"\u786E\u5B9A\u8981\u5207\u6362\u5230\u4EE5\u4E0B\u8D26\u6237\u5417\uFF1F"}</p>
                        <p style="font-weight: bold; color: var(--accent-color); margin-bottom: 15px;" id="switch-login-target-email"></p>
                        <p style="color: var(--warning-color); font-size: 0.9em;">\u26A0\uFE0F ${n["autoTrigger.switchLoginWarning"]||"\u6B64\u64CD\u4F5C\u5C06\u91CD\u542F Antigravity \u5BA2\u6237\u7AEF\u4EE5\u5B8C\u6210\u8D26\u6237\u5207\u6362\u3002"}</p>
                    </div>
                    <div class="modal-footer" style="display: flex; gap: 10px; justify-content: flex-end; padding: 15px 20px;">
                        <button class="at-btn at-btn-secondary" id="switch-login-confirm-cancel">${n["common.cancel"]||"\u53D6\u6D88"}</button>
                        <button class="at-btn at-btn-primary" id="switch-login-confirm-ok">${n["common.confirm"]||"\u786E\u8BA4"}</button>
                    </div>
                </div>
            `,document.body.appendChild(t),document.getElementById("switch-login-confirm-close").addEventListener("click",()=>{t.classList.add("hidden")}),document.getElementById("switch-login-confirm-cancel").addEventListener("click",()=>{t.classList.add("hidden")}),t.addEventListener("click",s=>{s.target===t&&t.classList.add("hidden")})),document.getElementById("switch-login-target-email").textContent=e;let o=document.getElementById("switch-login-confirm-ok"),a=o.cloneNode(!0);o.parentNode.replaceChild(a,o),a.addEventListener("click",()=>{t.classList.add("hidden"),p.postMessage({command:"autoTrigger.switchLoginAccount",email:e}),Oe()}),t.classList.remove("hidden")}function Wt(){ye&&ye.classList.add("hidden")}function mt(e){Me.style.display="none",v.innerHTML="",e==="authorized"?Vt():Kt()}function Kt(){let e=document.createElement("div");e.className="offline-card local-card",e.innerHTML=`
            <div class="icon offline-spinner"><span class="spinner"></span></div>
            <h2>${n["quotaSource.localLoadingTitle"]||"Detecting local Antigravity..."}</h2>
            <p>${n["quotaSource.localLoadingDesc"]||"Keep the Antigravity client running. You can switch to authorized monitoring anytime."}</p>
            <div class="offline-actions">
                <button class="btn-secondary" data-action="switch-authorized">
                    ${n["quotaSource.switchToAuthorized"]||"Switch to Authorized"}
                </button>
            </div>
        `,v.appendChild(e),e.querySelector('[data-action="switch-authorized"]')?.addEventListener("click",()=>{Re("authorized",{force:!0})})}function Vt(){let e=document.createElement("div");e.className="offline-card authorized-card",e.innerHTML=`
            <div class="icon offline-spinner"><span class="spinner"></span></div>
            <h2>${n["quotaSource.authorizedLoadingTitle"]||"Loading authorized quota..."}</h2>
            <p>${n["quotaSource.authorizedLoadingDesc"]||"Fetching quota data from the remote API."}</p>
            <div class="offline-actions">
                <button class="btn-secondary" data-action="switch-local">
                    ${n["quotaSource.switchToLocal"]||"Switch to Local"}
                </button>
            </div>
        `,v.appendChild(e),e.querySelector('[data-action="switch-local"]')?.addEventListener("click",()=>{Re("local",{force:!0})})}function xe(e){let t=e?.label||"",o=e?.modelId||"";if($e.has(o))return $e.get(o);if(De.has(t))return De.get(t);let a=me(o),s=me(t);return Math.min(ze.get(a)??Number.MAX_SAFE_INTEGER,Ke.get(s)??Number.MAX_SAFE_INTEGER)}function gt(e){return e.filter(t=>xe(t)<Number.MAX_SAFE_INTEGER).sort((t,o)=>xe(t)-xe(o)).map(t=>t.modelId)}function Xt(){ce&&(b=Yt(),z=new Set(Zt(b)),en(),ce.classList.remove("hidden"))}function tt(){ce?.classList.add("hidden")}function Yt(){return(H?.allModels||H?.models||[]).filter(o=>xe(o)<Number.MAX_SAFE_INTEGER).sort((o,a)=>{let s=xe(o),i=xe(a);return s!==i?s-i:(o.label||"").localeCompare(a.label||"")})}function Zt(e){let t=e.map(a=>a.modelId);if(Array.isArray(y)&&y.length>0)return y.filter(a=>t.includes(a));let o=gt(e).filter(a=>t.includes(a));return o.length>0?o:t}function en(){if(ee){if(b.length===0){ee.innerHTML=`<div class="model-manager-empty">${n["models.empty"]||"No models available."}</div>`,Qe();return}ee.innerHTML=b.map(e=>{let t=M.modelCustomNames?.[e.modelId]||e.label||e.modelId,o=z.has(e.modelId)?"checked":"";return`
                <label class="model-manager-item">
                    <input type="checkbox" data-model-id="${e.modelId}" ${o}>
                    <span>${t}</span>
                </label>
            `}).join(""),ee.querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("change",()=>{let t=e.getAttribute("data-model-id");t&&(e.checked?z.add(t):z.delete(t),Qe())})}),Qe()}}function pt(e){e==="all"?z=new Set(b.map(t=>t.modelId)):e==="recommended"?z=new Set(gt(b)):z=new Set,ee?.querySelectorAll('input[type="checkbox"]').forEach(t=>{let o=t.getAttribute("data-model-id");t.checked=o?z.has(o):!1}),Qe()}function Qe(){if(!fe)return;let e=b.length,t=z.size;fe.textContent=e>0?`${t}/${e}`:""}function tn(){let e=b.map(a=>a.modelId),t=Array.from(z),o=t.length===0||t.length===e.length?[]:t;y=o,M.visibleModels=o,p.postMessage({command:"updateVisibleModels",visibleModels:o}),J(n["models.saved"]||"Model visibility updated.","success"),tt()}function ft(e){let t=document.querySelectorAll(".tab-btn"),o=document.querySelectorAll(".tab-content"),a=document.querySelector(`.tab-btn[data-tab="${e}"]`);a&&(t.forEach(s=>s.classList.remove("active")),a.classList.add("active"),o.forEach(s=>{s.id===`tab-${e}`?s.classList.add("active"):s.classList.remove("active")}),p.postMessage({command:"tabChanged",tab:e}),e==="history"&&O.activateHistoryTab())}function yt(){x&&(u.innerHTML=`<span class="spinner"></span>${n["dashboard.refreshing"]||"Refreshing..."}`)}function ht(e){u.disabled=!0,u.innerHTML=e+"s";let t=e,o=setInterval(()=>{t--,t<=0?(clearInterval(o),u.disabled=!1,u.innerHTML=n["dashboard.refresh"]||"REFRESH"):u.innerHTML=t+"s"},1e3)}function J(e,t="info"){k&&(k.textContent=e,k.className=`toast ${t}`,setTimeout(()=>{k.classList.add("hidden")},3e3))}function vt(e){let t=M.warningThreshold||30,o=M.criticalThreshold||10;return e>t?"var(--success)":e>o?"var(--warning)":"var(--danger)"}function bt(e){let t=M.warningThreshold||30,o=M.criticalThreshold||10;return e>t?n["dashboard.active"]||"Healthy":e>o?n["dashboard.warning"]||"Warning":n["dashboard.danger"]||"Danger"}function nn(e){p.postMessage({command:"togglePin",modelId:e})}function Et(){p.postMessage({command:"retry"})}function on(){p.postMessage({command:"openLogs"})}window.retryConnection=Et,window.openLogs=on,window.showLocalAuthImportLoading=Ye,window.openAccountManageModal=()=>{T?T.openAccountManageModal():et()};function Tt(e){this.style.opacity="0.4",S=this,e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",this.getAttribute("data-id")),this.classList.add("dragging")}function Lt(e){return e.preventDefault&&e.preventDefault(),e.dataTransfer.dropEffect="move",!1}function Mt(){this.classList.add("over")}function It(){this.classList.remove("over")}function $t(e){if(e.stopPropagation&&e.stopPropagation(),S!==this){let t=S.classList.contains("card")?".card":"tr",o=S.parentElement,a=Array.from(o.querySelectorAll(t)),s=a.indexOf(S),i=a.indexOf(this);s<i?this.after(S):this.before(S);let r=Array.from(o.querySelectorAll(t));if(S.classList.contains("group-card")||S.classList.contains("list-group-row")){let g=r.map(m=>m.getAttribute("data-group-id")).filter(m=>m!==null);p.postMessage({command:"updateGroupOrder",order:g})}else{let g=r.map(m=>m.getAttribute("data-id")).filter(m=>m!==null);p.postMessage({command:"updateOrder",order:g})}}return!1}function Ct(){this.style.opacity="1",this.classList.remove("dragging"),document.querySelectorAll(".card, tr").forEach(e=>{e.classList.remove("over")})}function an(e,t){if(Me.style.display="none",v.innerHTML="",!e.isConnected){(t?.quotaSource||N)==="authorized"?cn(e.errorMessage):sn(e.errorMessage);return}if(e.userInfo&&!_&&vn(e.userInfo),Rt(t?.groupingEnabled),t?.groupingEnabled&&e.groups&&e.groups.length>0){ln();let a=[...e.groups];if(t?.groupOrder?.length>0){let s=new Map;t.groupOrder.forEach((i,r)=>s.set(i,r)),a.sort((i,r)=>{let c=s.has(i.groupId)?s.get(i.groupId):99999,g=s.has(r.groupId)?s.get(r.groupId):99999;return c!==g?c-g:i.remainingPercentage-r.remainingPercentage})}a.forEach(s=>{Tn(s,t?.pinnedGroups||[])});return}let o=[...e.models];if(t?.modelOrder?.length>0){let a=new Map;t.modelOrder.forEach((s,i)=>a.set(s,i)),o.sort((s,i)=>{let r=a.has(s.modelId)?a.get(s.modelId):99999,c=a.has(i.modelId)?a.get(i.modelId):99999;return r-c})}o.forEach(a=>{Ln(a,t?.pinnedModels||[],t?.modelCustomNames||{})})}function sn(e){let t=e||n["dashboard.offlineDesc"]||"Could not detect Antigravity process. Please ensure Antigravity is running.",o=document.createElement("div");o.className="offline-card local-card",o.innerHTML=`
            <div class="icon">\u{1F6F0}\uFE0F</div>
            <h2>${n["quotaSource.localOfflineTitle"]||"Local monitoring unavailable"}</h2>
            <p>${t}</p>
            <div class="offline-actions">
                <button class="btn-secondary" data-action="retry-local">
                    ${n["quotaSource.retryLocal"]||n["help.retry"]||"Retry"}
                </button>
                <button class="btn-primary" data-action="switch-authorized">
                    ${n["quotaSource.switchToAuthorized"]||"Switch to Authorized"}
                </button>
            </div>
        `,v.appendChild(o);let a=o.querySelector('[data-action="retry-local"]'),s=o.querySelector('[data-action="switch-authorized"]');a?.addEventListener("click",Et),s?.addEventListener("click",()=>{Re("authorized",{force:!0})})}function cn(e){let t=!!oe?.isAuthorized,o=t?n["quotaSource.authorizedOfflineTitle"]||"Authorized monitoring unavailable":n["quotaSource.authorizedMissingTitle"]||"Authorization required",a=t?n["quotaSource.authorizedOfflineDesc"]||"Failed to fetch quota from the remote API. Please check your network and try again.":n["quotaSource.authorizedMissingDesc"]||"Complete authorization to use authorized monitoring.",s=e?`<p class="offline-detail">${e}</p>`:"",i=document.createElement("div");i.className="offline-card authorized-card",i.innerHTML=`
            <div class="icon">\u{1F510}</div>
            <h2>${o}</h2>
            <p>${a}</p>
            ${s}
            <div class="offline-actions">
                <button class="btn-secondary" data-action="switch-local">
                    ${n["quotaSource.switchToLocal"]||"Switch to Local"}
                </button>
                <button class="btn-primary" data-action="authorized-primary">
                    ${t?n["dashboard.refresh"]||"Refresh":n["autoTrigger.authorizeBtn"]||"Authorize"}
                </button>
            </div>
        `,v.appendChild(i);let r=i.querySelector('[data-action="switch-local"]'),c=i.querySelector('[data-action="authorized-primary"]');r?.addEventListener("click",()=>{Re("local",{force:!0})}),t?c?.addEventListener("click",ct):c?.addEventListener("click",()=>{At()})}function At(){let e=document.getElementById("auth-choice-modal");e||(e=document.createElement("div"),e.id="auth-choice-modal",e.className="modal hidden",e.innerHTML=`
                <div class="modal-content auth-choice-content">
                    <div class="modal-header">
                        <h3>${n["authChoice.title"]||"\u9009\u62E9\u767B\u5F55\u65B9\u5F0F"}</h3>
                        <button class="close-btn" id="close-auth-choice-modal">\xD7</button>
                    </div>
                    <div class="modal-body auth-choice-body">
                        <div class="auth-choice-info">
                            <div class="auth-choice-desc">${n["authChoice.desc"]||"\u8BF7\u9009\u62E9\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7\u6216\u6388\u6743\u767B\u5F55\u3002"}</div>
                            <div class="auth-choice-tip">${n["authChoice.tip"]||"\u6388\u6743\u767B\u5F55\u9002\u7528\u4E8E\u65E0\u5BA2\u6237\u7AEF\uFF1B\u672C\u5730\u8BFB\u53D6\u4EC5\u5BF9\u5F53\u524D\u673A\u5668\u751F\u6548\u3002"}</div>
                        </div>
                        <div class="auth-choice-grid">
                            <div class="auth-choice-card">
                                <div class="auth-choice-header">
                                    <span class="auth-choice-icon">\u{1F5A5}\uFE0F</span>
                                    <div>
                                        <div class="auth-choice-title">${n["authChoice.localTitle"]||"\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7"}</div>
                                        <div class="auth-choice-text">${n["authChoice.localDesc"]||"\u8BFB\u53D6\u672C\u673A Antigravity \u5BA2\u6237\u7AEF\u5DF2\u6388\u6743\u8D26\u53F7\uFF0C\u4E0D\u91CD\u65B0\u6388\u6743\uFF0C\u4EC5\u590D\u7528\u73B0\u6709\u6388\u6743\u3002"}</div>
                                    </div>
                                </div>
                                <button id="auth-choice-local-btn" class="at-btn at-btn-primary auth-choice-btn">
                                    ${n["authChoice.localBtn"]||"\u8BFB\u53D6\u672C\u5730\u6388\u6743"}
                                </button>
                            </div>
                            <div class="auth-choice-card">
                                <div class="auth-choice-header">
                                    <span class="auth-choice-icon">\u{1F510}</span>
                                    <div>
                                        <div class="auth-choice-title">${n["authChoice.oauthTitle"]||"\u6388\u6743\u767B\u5F55\uFF08\u4E91\u7AEF\u6388\u6743\uFF09"}</div>
                                        <div class="auth-choice-text">${n["authChoice.oauthDesc"]||"\u901A\u8FC7 Google OAuth \u65B0\u6388\u6743\uFF0C\u9002\u7528\u4E8E\u65E0\u5BA2\u6237\u7AEF\u573A\u666F\uFF0C\u53EF\u64A4\u9500\u3002"}</div>
                                    </div>
                                </div>
                                <button id="auth-choice-oauth-btn" class="at-btn at-btn-primary auth-choice-btn">
                                    ${n["authChoice.oauthBtn"]||"\u53BB\u6388\u6743\u767B\u5F55"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,document.body.appendChild(e),document.getElementById("close-auth-choice-modal")?.addEventListener("click",We),e.addEventListener("click",i=>{i.target===e&&We()}));let t=e.querySelector("#auth-choice-oauth-btn"),o=e.querySelector("#auth-choice-local-btn"),a=t.cloneNode(!0);t.parentNode.replaceChild(a,t);let s=o.cloneNode(!0);o.parentNode.replaceChild(s,o),e.querySelector("#auth-choice-oauth-btn")?.addEventListener("click",()=>{p.postMessage({command:"autoTrigger.authorize"}),We()}),e.querySelector("#auth-choice-local-btn")?.addEventListener("click",()=>{Ye(),p.postMessage({command:"autoTrigger.importLocal"}),We()}),e.classList.remove("hidden")}function We(){let e=document.getElementById("auth-choice-modal");e&&e.classList.add("hidden")}function ln(){let e=document.createElement("div");e.className="auto-group-toolbar",e.innerHTML=`
            <span class="grouping-hint">
                ${n["grouping.description"]||'This mode aggregates models sharing the same quota. Supports renaming, sorting, and status bar sync. Click "Manage Groups" to customize, or toggle "Quota Groups" above to switch back.'}
            </span>
            <button id="manage-group-btn" class="auto-group-link" title="${n["customGrouping.title"]||"Manage Groups"}">
                <span class="icon">\u2699\uFE0F</span>
                ${n["customGrouping.title"]||"Manage Groups"}
            </button>
        `,v.appendChild(e);let t=e.querySelector("#manage-group-btn");t&&t.addEventListener("click",dn)}function dn(){if(!we||!H)return;let e=H.models||[];w.allModels=e,w.groupMappings={...M.groupMappings||{}};let t=new Map,o=M.groupCustomNames||{};for(let a of e){let s=w.groupMappings[a.modelId];if(s){if(!t.has(s)){let i="";for(let r of Object.keys(o))if(w.groupMappings[r]===s){i=o[r];break}t.set(s,{id:s,name:i||`Group ${t.size+1}`,modelIds:[]})}t.get(s).modelIds.push(a.modelId)}}w.groups=Array.from(t.values()),ke(),we.classList.remove("hidden")}function nt(){we&&we.classList.add("hidden")}function ke(){let e=document.getElementById("custom-groups-list"),t=document.getElementById("ungrouped-models-list");if(!e||!t)return;let o=new Set;w.groups.forEach(s=>s.modelIds.forEach(i=>o.add(i))),w.groups.length===0?e.innerHTML=`<div class="empty-groups-hint">${n["customGrouping.noModels"]||'No groups yet. Click "Add Group" to create one.'}</div>`:(e.innerHTML=w.groups.map((s,i)=>{let r=s.modelIds.map(c=>{let g=w.allModels.find($=>$.modelId===c),m=g?M.modelCustomNames?.[c]||g.label:c;return`
                        <span class="custom-model-tag" data-model-id="${c}">
                            ${m}
                            <button class="remove-model-btn" data-group-index="${i}" data-model-id="${c}" title="${n["customGrouping.removeModel"]||"Remove"}">\xD7</button>
                        </span>
                    `}).join("");return`
                    <div class="custom-group-item" data-group-index="${i}">
                        <div class="custom-group-header">
                            <div class="custom-group-name">
                                <span>\u{1F4E6}</span>
                                <input type="text" value="${s.name}" data-group-index="${i}" placeholder="Group name...">
                            </div>
                            <div class="custom-group-actions">
                                <button class="delete-group-btn" data-group-index="${i}" title="${n["customGrouping.deleteGroup"]||"Delete Group"}">\u{1F5D1}\uFE0F</button>
                            </div>
                        </div>
                        <div class="custom-group-models">
                            ${r}
                            <button class="add-model-btn" data-group-index="${i}">
                                \u2795 ${n["customGrouping.addModel"]||"Add Model"}
                            </button>
                        </div>
                    </div>
                `}).join(""),e.querySelectorAll(".remove-model-btn").forEach(s=>{s.addEventListener("click",mn)}),e.querySelectorAll(".delete-group-btn").forEach(s=>{s.addEventListener("click",un)}),e.querySelectorAll(".add-model-btn").forEach(s=>{s.addEventListener("click",pn)}),e.querySelectorAll(".custom-group-name input").forEach(s=>{s.addEventListener("change",gn)}));let a=w.allModels.filter(s=>!o.has(s.modelId));a.length===0?t.innerHTML=`<div style="color: var(--text-secondary); font-size: 12px;">${n["customGrouping.noModels"]||"All models are grouped"}</div>`:t.innerHTML=a.map(s=>{let i=M.modelCustomNames?.[s.modelId]||s.label,r=(s.remainingPercentage||0).toFixed(0);return`
                    <div class="ungrouped-model-item" data-model-id="${s.modelId}" title="${s.modelId}">
                        ${i}
                        <span class="quota-badge">${r}%</span>
                    </div>
                `}).join("")}function rn(){let e="custom_group_"+Date.now();w.groups.push({id:e,name:`Group ${w.groups.length+1}`,modelIds:[]}),ke()}function un(e){let t=parseInt(e.target.dataset.groupIndex,10);!isNaN(t)&&t>=0&&t<w.groups.length&&(w.groups.splice(t,1),ke())}function mn(e){e.stopPropagation();let t=parseInt(e.target.dataset.groupIndex,10),o=e.target.dataset.modelId;if(!isNaN(t)&&o){let a=w.groups[t];a&&(a.modelIds=a.modelIds.filter(s=>s!==o),ke())}}function gn(e){let t=parseInt(e.target.dataset.groupIndex,10);!isNaN(t)&&w.groups[t]&&(w.groups[t].name=e.target.value.trim()||`Group ${t+1}`)}function pn(e){let t=parseInt(e.target.dataset.groupIndex,10);if(isNaN(t))return;let o=w.groups[t];if(!o)return;let a=new Set;w.groups.forEach(r=>r.modelIds.forEach(c=>a.add(c)));let s=w.allModels.filter(r=>!a.has(r.modelId));if(s.length===0){J(n["customGrouping.noModels"]||"No available models","info");return}let i=null;if(o.modelIds.length>0){let r=o.modelIds[0],c=w.allModels.find(g=>g.modelId===r);c&&(i={remainingPercentage:c.remainingPercentage,resetTimeDisplay:c.resetTimeDisplay})}fn(e.target,s,i,r=>{o.modelIds.push(r),ke()})}function fn(e,t,o,a){let s=document.querySelector(".model-select-dropdown");s&&s.remove();let i=document.createElement("div");i.className="model-select-dropdown";let r=e.getBoundingClientRect();i.style.position="fixed",i.style.left=r.left+"px",i.style.top=r.bottom+4+"px";let c=t.map(h=>{let E=!0,C="";return o&&(h.remainingPercentage!==o.remainingPercentage?(E=!1,C=n["customGrouping.quotaMismatch"]||"Quota mismatch"):h.resetTimeDisplay!==o.resetTimeDisplay&&(E=!1,C=n["customGrouping.resetMismatch"]||"Reset time mismatch")),{model:h,isCompatible:E,incompatibleReason:C}});c.sort((h,E)=>h.isCompatible&&!E.isCompatible?-1:!h.isCompatible&&E.isCompatible?1:0);let g=c.some(h=>h.isCompatible);i.innerHTML=`
            <div class="model-select-list">
                ${c.map(({model:h,isCompatible:E,incompatibleReason:C})=>{let B=M.modelCustomNames?.[h.modelId]||h.label,Q=(h.remainingPercentage||0).toFixed(1);return`
                        <label class="model-select-item ${E?"":"disabled"}" 
                             data-model-id="${h.modelId}" 
                             data-compatible="${E}">
                            <input type="checkbox" class="model-checkbox" 
                                   value="${h.modelId}" 
                                   ${E?"":"disabled"}>
                            <span class="model-name">${B}</span>
                            <span class="model-quota">${Q}%</span>
                            ${E?"":`<span class="incompatible-reason">${C}</span>`}
                        </label>
                    `}).join("")}
            </div>
            ${g?`
                <div class="model-select-footer">
                    <button class="btn-confirm-add" disabled>
                        ${n["customGrouping.addModel"]||"Add"} (<span class="selected-count">0</span>)
                    </button>
                </div>
            `:""}
        `,document.body.appendChild(i);let m=i.querySelector(".btn-confirm-add"),$=i.querySelector(".selected-count"),D=i.querySelectorAll(".model-checkbox"),G=()=>{let h=i.querySelectorAll(".model-checkbox:checked"),E=h.length;$&&($.textContent=E),m&&(m.disabled=E===0);let C=o;if(!C&&E>0){let B=h[0].value,Q=c.find(Z=>Z.model.modelId===B);Q&&(C={remainingPercentage:Q.model.remainingPercentage,resetTimeDisplay:Q.model.resetTimeDisplay})}D.forEach(B=>{if(B.checked)return;let Q=B.value,Z=c.find(Mn=>Mn.model.modelId===Q);if(!Z)return;let j=B.closest(".model-select-item");if(!j)return;let se=!0,Te="";C&&(Z.model.remainingPercentage!==C.remainingPercentage?(se=!1,Te=n["customGrouping.quotaMismatch"]||"Quota mismatch"):Z.model.resetTimeDisplay!==C.resetTimeDisplay&&(se=!1,Te=n["customGrouping.resetMismatch"]||"Reset time mismatch")),B.disabled=!se,j.classList.toggle("disabled",!se);let pe=j.querySelector(".incompatible-reason");se?pe&&pe.remove():(pe||(pe=document.createElement("span"),pe.className="incompatible-reason",j.appendChild(pe)),pe.textContent=Te)})};D.forEach(h=>{h.disabled||h.addEventListener("change",G)}),m&&m.addEventListener("click",h=>{h.stopPropagation();let E=Array.from(i.querySelectorAll(".model-checkbox:checked")).map(C=>C.value);E.length>0&&(E.forEach(C=>a(C)),i.remove())});let q=h=>{!i.contains(h.target)&&h.target!==e&&(i.remove(),document.removeEventListener("click",q))};setTimeout(()=>{document.addEventListener("click",q)},10)}function yn(){let e=w.allModels;if(!e||e.length===0){J(n["customGrouping.noModels"]||"No models available","info");return}let t=[{id:"claude_45",name:"Claude 4.5",modelIds:["MODEL_PLACEHOLDER_M12","MODEL_CLAUDE_4_5_SONNET","MODEL_CLAUDE_4_5_SONNET_THINKING","MODEL_OPENAI_GPT_OSS_120B_MEDIUM"]},{id:"g3_pro",name:"G3-Pro",modelIds:["MODEL_PLACEHOLDER_M7","MODEL_PLACEHOLDER_M8"]},{id:"g3_flash",name:"G3-Flash",modelIds:["MODEL_PLACEHOLDER_M18"]},{id:"g3_image",name:"G3-Image",modelIds:["MODEL_PLACEHOLDER_M9"]}],o={};for(let c of w.groups)for(let g of c.modelIds)o[g]=c.name;let a=new Map,s=new Set;for(let c of t){let g=[];for(let m of e)c.modelIds.includes(m.modelId)&&(g.push(m.modelId),s.add(m.modelId));if(g.length>0){let m="";for(let $ of g)if(o[$]){m=o[$];break}a.set(c.id,{id:c.id,name:m||c.name,modelIds:g})}}let i=e.filter(c=>!s.has(c.modelId));i.length>0&&a.set("other",{id:"other",name:n["customGrouping.other"]||"\u5176\u4ED6",modelIds:i.map(c=>c.modelId)}),w.groups=Array.from(a.values()),ke();let r=(n["customGrouping.smartGroupCount"]||"Auto Group: {count} groups").replace("{count}",w.groups.length);J(r,"success")}function hn(){w.groups.filter(a=>a.modelIds.length===0).length>0&&(w.groups=w.groups.filter(a=>a.modelIds.length>0));let t={},o={};for(let a of w.groups){let s=a.modelIds.sort().join("_");for(let i of a.modelIds)t[i]=s,o[i]=a.name}p.postMessage({command:"saveCustomGrouping",customGroupMappings:t,customGroupNames:o}),J(n["customGrouping.saved"]||"Groups saved","success"),nt()}let Ge=!1;function vn(e){if(_)return;let t=document.createElement("div");t.className="card full-width profile-card";let o=D=>F?'<span class="tag masked">***</span>':D?`<span class="tag success">${n["feature.enabled"]||"Enabled"}</span>`:`<span class="tag disabled">${n["feature.disabled"]||"Disabled"}</span>`,a=D=>F?"***":D,s="";e.upgradeText&&e.upgradeUri&&!F&&(s=`
            <div class="upgrade-info">
                <div class="upgrade-text">${e.upgradeText}</div>
                <a href="${e.upgradeUri}" class="upgrade-link" target="_blank">Upgrade Now</a>
            </div>`);let i=Ge?"profile-details":"profile-details hidden",r=Ge?n["profile.less"]||"Show Less":n["profile.more"]||"Show More Details",c=Ge?"rotate(180deg)":"rotate(0deg)",g=F?n["profile.showData"]||"Show":n["profile.hideData"]||"Hide";t.innerHTML=`
            <div class="card-title">
                <span class="label">${n["profile.details"]||"Plan Details"}</span>
                <div class="profile-controls">
                    <button class="text-btn" id="profile-mask-btn">${g}</button>
                    <div class="tier-badge">${e.tier}</div>
                </div>
            </div>
            
            <div class="profile-grid">
                ${P(n["profile.email"]||"Email",a(e.email))}
                ${P(n["profile.description"]||"Description",a(e.tierDescription))}
                ${P(n["feature.webSearch"]||"Web Search",o(e.cascadeWebSearchEnabled))}
                ${P(n["feature.browser"]||"Browser Access",o(e.browserEnabled))}
                ${P(n["feature.knowledgeBase"]||"Knowledge Base",o(e.knowledgeBaseEnabled))}
                ${P(n["feature.mcp"]||"MCP Servers",o(e.allowMcpServers))}
                ${P(n["feature.gitCommit"]||"Git Commit",o(e.canGenerateCommitMessages))}
                ${P(n["feature.context"]||"Context Window",a(e.maxNumChatInputTokens))}
            </div>

            <div class="${i}" id="profile-more">
                <div class="profile-grid">
                    ${P(n["feature.fastMode"]||"Fast Mode",o(e.hasAutocompleteFastMode))}
                    ${P(n["feature.moreCredits"]||"Can Buy Credits",o(e.canBuyMoreCredits))}
                    
                    ${P(n["profile.teamsTier"]||"Teams Tier",a(e.teamsTier))}
                    ${P(n["profile.userId"]||"Tier ID",a(e.userTierId||"N/A"))}
                    ${P(n["profile.tabToJump"]||"Tab To Jump",o(e.hasTabToJump))}
                    ${P(n["profile.stickyModels"]||"Sticky Models",o(e.allowStickyPremiumModels))}
                    ${P(n["profile.commandModels"]||"Command Models",o(e.allowPremiumCommandModels))}
                    ${P(n["profile.maxPremiumMsgs"]||"Max Premium Msgs",a(e.maxNumPremiumChatMessages))}
                    ${P(n["profile.chatInstructionsCharLimit"]||"Chat Instructions Char Limit",a(e.maxCustomChatInstructionCharacters))}
                    ${P(n["profile.pinnedContextItems"]||"Pinned Context Items",a(e.maxNumPinnedContextItems))}
                    ${P(n["profile.localIndexSize"]||"Local Index Size",a(e.maxLocalIndexSize))}
                    ${P(n["profile.acceptedTos"]||"Accepted TOS",o(e.acceptedLatestTermsOfService))}
                    ${P(n["profile.customizeIcon"]||"Customize Icon",o(e.canCustomizeAppIcon))}
                    ${P(n["profile.cascadeAutoRun"]||"Cascade Auto Run",o(e.cascadeCanAutoRunCommands))}
                    ${P(n["profile.cascadeBackground"]||"Cascade Background",o(e.canAllowCascadeInBackground))}
                    ${P(n["profile.autoRunCommands"]||"Auto Run Commands",o(e.allowAutoRunCommands))}
                    ${P(n["profile.expBrowserFeatures"]||"Exp. Browser Features",o(e.allowBrowserExperimentalFeatures))}
                </div>
                ${s}
            </div>

            <div class="profile-toggle">
                <button class="btn-text" id="profile-toggle-btn">
                    <span id="profile-toggle-text">${r}</span> 
                    <span id="profile-toggle-icon" style="transform: ${c}">\u25BC</span>
                </button>
            </div>
        `,v.appendChild(t);let m=t.querySelector("#profile-toggle-btn");m&&m.addEventListener("click",bn);let $=t.querySelector("#profile-mask-btn");$&&$.addEventListener("click",()=>{F=!F,p.postMessage({command:"updateDataMasked",dataMasked:F})})}function bn(){let e=document.getElementById("profile-more"),t=document.getElementById("profile-toggle-text"),o=document.getElementById("profile-toggle-icon");e.classList.contains("hidden")?(e.classList.remove("hidden"),t.textContent=n["profile.less"]||"Show Less",o.style.transform="rotate(180deg)",Ge=!0):(e.classList.add("hidden"),t.textContent=n["profile.more"]||"Show More Details",o.style.transform="rotate(0deg)",Ge=!1)}function P(e,t){return`
            <div class="detail-item">
                <span class="detail-label">${e}</span>
                <span class="detail-value">${t}</span>
            </div>
        `}function En(){let e=document.createElement("div");e.className="rich-tooltip hidden",document.body.appendChild(e);let t=null;document.addEventListener("mouseover",o=>{let a=o.target.closest("[data-tooltip-html]");if(a&&a!==t){t=a;let s=a.getAttribute("data-tooltip-html"),i=decodeURIComponent(s);e.innerHTML=i,e.classList.remove("hidden");let r=a.getBoundingClientRect(),c=e.getBoundingClientRect(),g=r.bottom+8,m=r.left+(r.width-c.width)/2;g+c.height>window.innerHeight&&(g=r.top-c.height-8),m<10&&(m=10),m+c.width>window.innerWidth-10&&(m=window.innerWidth-c.width-10),e.style.top=g+"px",e.style.left=m+"px"}}),document.addEventListener("mouseout",o=>{let a=o.target.closest("[data-tooltip-html]");a&&a===t&&(t=null,e.classList.add("hidden"))}),window.addEventListener("scroll",()=>{t&&(t=null,e.classList.add("hidden"))},!0)}function St(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function wt(e){let t=[],o=e.supportedMimeTypes||{};return(e.supportsImages||Object.keys(o).some(a=>a.startsWith("image/")))&&t.push({icon:"\u{1F5BC}\uFE0F",text:n["capability.vision"]||"Vision"}),(o["application/pdf"]||o["text/plain"]||o["application/rtf"])&&t.push({icon:"\u{1F4C4}",text:n["capability.docs"]||"Documents"}),Object.keys(o).some(a=>a.startsWith("video/")||a.startsWith("audio/"))&&t.push({icon:"\u{1F3AC}",text:n["capability.media"]||"Media"}),t}function Bt(e){return e.map(t=>`<div class="rich-tooltip-item ${t.className||""}"><span class="icon">${t.icon}</span><span class="text">${t.text}</span></div>`).join("")}function Tn(e,t){let o=e.remainingPercentage||0,a=vt(o),s=t&&t.includes(e.groupId),i=document.createElement("div");i.className="card group-card draggable",i.setAttribute("data-id",e.groupId),i.setAttribute("data-group-id",e.groupId),i.setAttribute("draggable","true"),i.addEventListener("dragstart",Tt,!1),i.addEventListener("dragenter",Mt,!1),i.addEventListener("dragover",Lt,!1),i.addEventListener("dragleave",It,!1),i.addEventListener("drop",$t,!1),i.addEventListener("dragend",Ct,!1);let r=e.models.map(m=>{let $=wt(m),D=m.tagTitle?`<span class="tag-new">${m.tagTitle}</span>`:"",G=m.isRecommended?" recommended":"",q="",h="";return $.length>0&&(q=` data-tooltip-html="${encodeURIComponent(Bt($))}"`,h='<span class="caps-dot">\u2728</span>'),`<span class="group-model-tag${G}" title="${m.modelId}"${q}>${m.label}${D}${h}</span>`}).join("");i.innerHTML=`
            <div class="card-title">
                <span class="drag-handle" data-tooltip="${n["dashboard.dragHint"]||"Drag to reorder"}">\u22EE\u22EE</span>
                <span class="group-icon">\u{1F4E6}</span>
                <span class="label group-name">${e.groupName}</span>
                <div class="actions">
                    <button class="rename-group-btn icon-btn" data-group-id="${e.groupId}" data-tooltip-html="${encodeURIComponent('<div class="rich-tooltip-item"><span class="text">'+(n["grouping.rename"]||"Rename")+"</span></div>")}">\u270F\uFE0F</button>
                    <label class="switch" data-tooltip-html="${encodeURIComponent('<div class="rich-tooltip-item"><span class="text">'+(n["dashboard.pinHint"]||"Pin to Status Bar")+"</span></div>")}">
                        <input type="checkbox" class="group-pin-toggle" data-group-id="${e.groupId}" ${s?"checked":""}>
                        <span class="slider"></span>
                    </label>
                    <span class="status-dot" style="background-color: ${a}"></span>
                </div>
            </div>
            <div class="progress-circle" style="background: conic-gradient(${a} ${o}%, var(--border-color) ${o}%);">
                <div class="percentage">${o.toFixed(2)}%</div>
            </div>
            <div class="info-row">
                <span>${n["dashboard.resetIn"]||"Reset In"}</span>
                <span class="info-value">${e.timeUntilResetFormatted}</span>
            </div>
            <div class="info-row">
                <span>${n["dashboard.resetTime"]||"Reset Time"}</span>
                <span class="info-value small">${e.resetTimeDisplay||"N/A"}</span>
            </div>
            <div class="info-row">
                <span>${n["dashboard.status"]||"Status"}</span>
                <span class="info-value" style="color: ${a}">
                    ${bt(o)}
                </span>
            </div>
            <div class="group-models">
                <div class="group-models-label">${n["grouping.models"]||"Models"} (${e.models.length}):</div>
                <div class="group-models-list">${r}</div>
            </div>
        `;let c=i.querySelector(".rename-group-btn");c&&c.addEventListener("click",m=>{m.stopPropagation(),He(e.groupId,e.groupName,e.models.map($=>$.modelId))});let g=i.querySelector(".group-pin-toggle");g&&g.addEventListener("change",m=>{p.postMessage({command:"toggleGroupPin",groupId:e.groupId})}),v.appendChild(i)}function Ln(e,t,o){let a=e.remainingPercentage||0,s=vt(a),i=t.includes(e.modelId),r=o&&o[e.modelId]||e.label,c=e.label,g=wt(e),m="",$="";g.length>0&&($=` data-tooltip-html="${encodeURIComponent(Bt(g))}"`,m='<span class="title-caps-trigger">\u2728</span>');let D=e.tagTitle?`<span class="tag-new">${e.tagTitle}</span>`:"",G=e.isRecommended?" card-recommended":"",q=document.createElement("div");q.className=`card draggable${G}`,q.setAttribute("draggable","true"),q.setAttribute("data-id",e.modelId),q.addEventListener("dragstart",Tt,!1),q.addEventListener("dragenter",Mt,!1),q.addEventListener("dragover",Lt,!1),q.addEventListener("dragleave",It,!1),q.addEventListener("drop",$t,!1),q.addEventListener("dragend",Ct,!1),q.innerHTML=`
            <div class="card-title">
                <span class="drag-handle" data-tooltip="${n["dashboard.dragHint"]||"Drag to reorder"}">\u22EE\u22EE</span>
                <div class="title-wrapper"${$}>
                    <span class="label model-name" title="${e.modelId} (${c})">${r}</span>
                    ${D}
                    ${m}
                </div>
                <div class="actions">
                    <button class="rename-model-btn icon-btn" data-model-id="${e.modelId}" data-tooltip-html="${encodeURIComponent('<div class="rich-tooltip-item"><span class="text">'+(n["model.rename"]||"Rename")+"</span></div>")}">\u270F\uFE0F</button>
                    <label class="switch" data-tooltip-html="${encodeURIComponent('<div class="rich-tooltip-item"><span class="text">'+(n["dashboard.pinHint"]||"Pin to Status Bar")+"</span></div>")}">
                        <input type="checkbox" class="pin-toggle" data-model-id="${e.modelId}" ${i?"checked":""}>
                        <span class="slider"></span>
                    </label>
                    <span class="status-dot" style="background-color: ${s}"></span>
                </div>
            </div>
            <div class="progress-circle" style="background: conic-gradient(${s} ${a}%, var(--border-color) ${a}%);">
                <div class="percentage">${a.toFixed(2)}%</div>
            </div>
            <div class="info-row">
                <span>${n["dashboard.resetIn"]||"Reset In"}</span>
                <span class="info-value">${e.timeUntilResetFormatted}</span>
            </div>
            <div class="info-row">
                <span>${n["dashboard.resetTime"]||"Reset Time"}</span>
                <span class="info-value small">${e.resetTimeDisplay||"N/A"}</span>
            </div>
            <div class="info-row">
                <span>${n["dashboard.status"]||"Status"}</span>
                <span class="info-value" style="color: ${s}">
                    ${bt(a)}
                </span>
            </div>
        `;let h=q.querySelector(".rename-model-btn");h&&h.addEventListener("click",E=>{E.stopPropagation(),Le(e.modelId,r,c)}),v.appendChild(q)}Ve()})();})();
