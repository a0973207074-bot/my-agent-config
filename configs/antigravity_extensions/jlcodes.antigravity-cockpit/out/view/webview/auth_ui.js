"use strict";(()=>{(function(){"use strict";let h=window.__i18n||{},t=l=>h[l]||l;class m{constructor(a){this.vscode=a,this.state={authorization:null,antigravityToolsSyncEnabled:!1,antigravityToolsAutoSwitchEnabled:!0},this.elements={}}updateState(a,c,n){this.state.authorization=a,c!==void 0&&(this.state.antigravityToolsSyncEnabled=c),n!==void 0&&(this.state.antigravityToolsAutoSwitchEnabled=n)}renderAuthRow(a,c={}){if(!a)return;let{authorization:n,antigravityToolsSyncEnabled:o}=this.state,e=n?.accounts||[],i=e.length>0,s=n?.activeAccount||(i?e[0].email:null),r=n?.isAuthorized||i,v=`<button class="quota-account-overview-btn" title="${t("accountsOverview.openBtn")||"Accounts Overview"}">\u{1F4CA} ${t("accountsOverview.openBtn")||"Accounts Overview"}</button>`,d="";if(c.showSyncToggleInline?d=`
                    <label class="antigravityTools-sync-toggle">
                        <input type="checkbox" class="at-sync-checkbox" ${o?"checked":""}>
                        <span>${t("autoTrigger.antigravityToolsSync")}</span>
                    </label>
                    <button class="at-btn at-btn-secondary at-import-btn">${t("autoTrigger.importFromAntigravityTools")}</button>
                `:d=`
                    <button class="at-btn at-btn-primary at-sync-config-btn" title="${t("atSyncConfig.title")||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}">
                        \u2699 ${t("atSyncConfig.btnText")||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}
                    </button>
                `,r&&s){let g=Math.max(e.length-1,0),y=g>0?`<span class="account-count-badge" title="${t("autoTrigger.manageAccounts")}">+${g}</span>`:"",p=`<button class="quota-account-manage-btn at-switch-to-client-btn" title="${t("autoTrigger.switchToClientAccount")}">${t("autoTrigger.switchToClientAccount")}</button>`;a.innerHTML=`
                    <div class="quota-auth-info quota-auth-info-clickable" title="${t("autoTrigger.manageAccounts")}">
                        <span class="quota-auth-icon">\u2705</span>
                        <span class="quota-auth-text">${t("autoTrigger.authorized")}</span>
                        <span class="quota-auth-email">${s}</span>
                        ${y}
                        ${v}
                        ${p}
                    </div>
                    <div class="quota-auth-actions">
                        ${d}
                    </div>
                 `}else a.innerHTML=`
                    <div class="quota-auth-info">
                        <span class="quota-auth-icon">\u26A0\uFE0F</span>
                        <span class="quota-auth-text">${t("autoTrigger.unauthorized")||"Unauthorized"}</span>
                    </div>
                    <div class="quota-auth-actions">
                        ${d}
                        <button class="at-btn at-btn-primary at-authorize-btn">${t("autoTrigger.authorizeBtn")||"Authorize"}</button>
                    </div>
                `;this._bindEvents(a)}_bindEvents(a){let c=n=>this.vscode.postMessage(n);a.querySelector(".quota-auth-info-clickable")?.addEventListener("click",()=>{this.openAccountManageModal()}),a.querySelector(".quota-account-overview-btn")?.addEventListener("click",n=>{n.stopPropagation();let o=document.querySelector('.tab-btn[data-tab="accounts"]');o?o.click():this.vscode.postMessage({command:"executeCommand",commandId:"agCockpit.openAccountsOverview"})}),a.querySelector(".at-authorize-btn")?.addEventListener("click",()=>{this.openLoginChoiceModal()}),a.querySelector(".at-sync-config-btn")?.addEventListener("click",()=>{this.openSyncConfigModal()}),a.querySelector(".at-sync-checkbox")?.addEventListener("change",n=>{let o=n.target.checked;this.state.antigravityToolsSyncEnabled=o,c({command:"antigravityToolsSync.toggle",enabled:o})}),a.querySelector(".at-import-btn")?.addEventListener("click",()=>{c({command:"antigravityToolsSync.import"})}),a.querySelector(".at-switch-to-client-btn")?.addEventListener("click",n=>{n.stopPropagation(),c({command:"antigravityToolsSync.switchToClient"})})}openAccountManageModal(){let a=document.getElementById("account-manage-modal");a||(a=this._createModal("account-manage-modal",`
                    <div class="modal-content account-manage-content">
                        <div class="modal-header">
                            <h3>${t("autoTrigger.manageAccounts")||"Manage Accounts"}</h3>
                            <button class="close-btn" id="close-account-manage-modal">\xD7</button>
                        </div>
                        <div class="modal-hint" style="padding: 8px 16px; font-size: 12px; color: var(--text-muted); background: var(--bg-secondary); border-bottom: 1px solid var(--border-color);">
                            <span style="margin-right: 12px;">\u{1F4A1} ${t("autoTrigger.manageAccountsHintClick")||"\u70B9\u51FB\u90AE\u7BB1\u53EF\u5207\u6362\u67E5\u770B\u914D\u989D"}</span>
                            <span>\u{1F504} ${t("autoTrigger.manageAccountsHintSwitch")||'\u70B9\u51FB"\u5207\u6362\u767B\u5F55"\u53EF\u5207\u6362\u5BA2\u6237\u7AEF\u767B\u5F55\u8D26\u6237'}</span>
                        </div>
                        <div class="modal-body" id="account-manage-body"></div>
                        <div class="modal-footer" style="display: flex; gap: 10px; justify-content: flex-end;">
                            <button id="add-new-account-btn" class="at-btn at-btn-primary">
                                \u2795 ${t("autoTrigger.addAccount")||"Add Account"}
                            </button>
                        </div>
                    </div>
                `),document.getElementById("close-account-manage-modal")?.addEventListener("click",()=>a.classList.add("hidden")),document.getElementById("add-new-account-btn")?.addEventListener("click",()=>{this.vscode.postMessage({command:"autoTrigger.addAccount"})})),this.renderAccountManageList(),a.classList.remove("hidden")}renderAccountManageList(){let a=document.getElementById("account-manage-body");if(!a)return;let c=this.state.authorization?.accounts||[],n=this.state.authorization?.activeAccount;if(c.length===0){a.innerHTML=`<div class="account-manage-empty">${t("autoTrigger.noAccounts")||"No accounts authorized"}</div>`;return}a.innerHTML=`<div class="account-manage-list">${c.map(o=>{let e=o.email===n,i=o.isInvalid===!0,u=i?"\u26A0\uFE0F":e?"\u2705":"\u{1F464}",s=[e&&!i?`<span class="account-manage-badge">${t("autoTrigger.accountActive")}</span>`:"",i?`<span class="account-manage-badge expired">${t("autoTrigger.tokenExpired")}</span>`:""].join(""),r=`<button class="at-btn at-btn-small at-btn-primary account-switch-login-btn" data-email="${o.email}">${t("autoTrigger.switchLoginBtn")||"\u5207\u6362\u767B\u5F55"}</button>`;return`
                    <div class="account-manage-item ${e?"active":""} ${i?"expired":""}" data-email="${o.email}">
                        <div class="account-manage-info">
                            <span class="account-manage-icon">${u}</span>
                            <span class="account-manage-email">${o.email}</span>
                            ${s}
                        </div>
                        <div class="account-manage-actions">
                            ${r}
                            <button class="at-btn at-btn-small at-btn-danger account-remove-btn" data-email="${o.email}">${t("autoTrigger.deleteBtn")||"\u5220\u9664"}</button>
                        </div>
                    </div>
                `}).join("")}</div>`,a.querySelectorAll(".account-manage-item").forEach(o=>{o.addEventListener("click",e=>{if(e.target.tagName==="BUTTON"||e.target.closest("button")||o.classList.contains("active"))return;let i=o.dataset.email;i&&(this.vscode.postMessage({command:"autoTrigger.switchAccount",email:i}),document.getElementById("account-manage-modal")?.classList.add("hidden"))})}),a.querySelectorAll(".account-switch-login-btn").forEach(o=>o.addEventListener("click",e=>{e.stopPropagation();let i=o.dataset.email;i&&this.showSwitchLoginConfirmModal(i)})),a.querySelectorAll(".account-remove-btn").forEach(o=>o.addEventListener("click",e=>{e.stopPropagation(),typeof window.openRevokeModalForEmail=="function"?window.openRevokeModalForEmail(o.dataset.email):this.vscode.postMessage({command:"autoTrigger.removeAccount",email:o.dataset.email})}))}showSwitchLoginConfirmModal(a){let c=document.getElementById("switch-login-confirm-modal");c||(c=this._createModal("switch-login-confirm-modal",`
                    <div class="modal-content" style="max-width: 400px;">
                        <div class="modal-header">
                            <h3>${t("autoTrigger.switchLoginTitle")||"\u5207\u6362\u767B\u5F55\u8D26\u6237"}</h3>
                            <button class="close-btn" id="switch-login-confirm-close">\xD7</button>
                        </div>
                        <div class="modal-body" style="padding: 20px;">
                            <p style="margin-bottom: 10px;">${t("autoTrigger.switchLoginConfirmText")||"\u786E\u5B9A\u8981\u5207\u6362\u5230\u4EE5\u4E0B\u8D26\u6237\u5417\uFF1F"}</p>
                            <p style="font-weight: bold; color: var(--accent-color); margin-bottom: 15px;" id="switch-login-target-email"></p>
                            <p style="color: var(--warning-color); font-size: 0.9em;">\u26A0\uFE0F ${t("autoTrigger.switchLoginWarning")||"\u6B64\u64CD\u4F5C\u5C06\u91CD\u542F Antigravity \u5BA2\u6237\u7AEF\u4EE5\u5B8C\u6210\u8D26\u6237\u5207\u6362\u3002"}</p>
                        </div>
                        <div class="modal-footer" style="display: flex; gap: 10px; justify-content: flex-end; padding: 15px 20px;">
                            <button class="at-btn at-btn-secondary" id="switch-login-confirm-cancel">${t("common.cancel")||"\u53D6\u6D88"}</button>
                            <button class="at-btn at-btn-primary" id="switch-login-confirm-ok">${t("common.confirm")||"\u786E\u8BA4"}</button>
                        </div>
                    </div>
                `),document.getElementById("switch-login-confirm-close")?.addEventListener("click",()=>c.classList.add("hidden")),document.getElementById("switch-login-confirm-cancel")?.addEventListener("click",()=>c.classList.add("hidden"))),document.getElementById("switch-login-target-email").textContent=a;let n=document.getElementById("switch-login-confirm-ok"),o=n.cloneNode(!0);n.parentNode.replaceChild(o,n),o.addEventListener("click",()=>{c.classList.add("hidden"),this.vscode.postMessage({command:"autoTrigger.switchLoginAccount",email:a}),document.getElementById("account-manage-modal")?.classList.add("hidden")}),c.classList.remove("hidden")}openSyncConfigModal(){let a=document.getElementById("at-sync-config-modal");a||(a=this._createModal("at-sync-config-modal",`
                    <div class="modal-content at-sync-config-content">
                        <div class="modal-header">
                        <h3>\u2699 ${t("atSyncConfig.title")||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}</h3>
                            <button class="close-btn" id="close-at-sync-config-modal">\xD7</button>
                        </div>
                        <div class="modal-body at-sync-config-body">
                            <div class="at-sync-section at-sync-info-section">
                                <details class="at-sync-details at-sync-info-details">
                                    <summary class="at-sync-details-summary">
                                        <div class="at-sync-section-title-row">
                                            <div class="at-sync-section-title">\u2139\uFE0F ${t("atSyncConfig.featureTitle")||"\u529F\u80FD\u8BF4\u660E"}</div>
                                            <span class="at-sync-details-link">
                                                ${t("atSyncConfig.dataAccessDetails")||"\u5C55\u5F00\u8BE6\u60C5\u8BF4\u660E"}
                                            </span>
                                        </div>
                                        <div class="at-sync-description at-sync-info-summary">${t("atSyncConfig.featureSummary")||"\u67E5\u770B\u6570\u636E\u8BBF\u95EE\u4E0E\u540C\u6B65/\u5BFC\u5165\u89C4\u5219\u3002"}</div>
                                    </summary>
                                    <div class="at-sync-details-body">
                                        <div class="at-sync-info-block">
                                            <div class="at-sync-info-subtitle">\u{1F6E1}\uFE0F ${t("atSyncConfig.dataAccessTitle")||"\u6570\u636E\u8BBF\u95EE\u8BF4\u660E"}</div>
                                            <div class="at-sync-description">${t("atSyncConfig.dataAccessDesc")||"\u672C\u529F\u80FD\u4F1A\u8BFB\u53D6\u60A8\u672C\u5730 Antigravity Tools \u4E0E Antigravity \u5BA2\u6237\u7AEF\u7684\u8D26\u6237\u4FE1\u606F\uFF0C\u4EC5\u7528\u4E8E\u672C\u63D2\u4EF6\u6388\u6743/\u5207\u6362\u3002"}</div>
                                            <div class="at-sync-path-info">
                                                <span class="at-sync-path-label">${t("atSyncConfig.readPathTools")||"Antigravity Tools \u8DEF\u5F84"}:</span>
                                                <code class="at-sync-path">~/.antigravity_tools/</code>
                                            </div>
                                            <div class="at-sync-path-info">
                                                <span class="at-sync-path-label">${t("atSyncConfig.readPathLocal")||"Antigravity \u5BA2\u6237\u7AEF\u8DEF\u5F84"}:</span>
                                                <code class="at-sync-path">.../Antigravity/User/globalStorage/state.vscdb</code>
                                            </div>
                                            <div class="at-sync-data-list">
                                                <span class="at-sync-data-label">${t("atSyncConfig.readData")||"\u8BFB\u53D6\u5185\u5BB9"}:</span>
                                                <span class="at-sync-data-items">${t("atSyncConfig.readDataItems")||"\u8D26\u6237\u90AE\u7BB1\u3001Refresh Token\uFF08\u672C\u5730\u8BFB\u53D6\uFF09"}</span>
                                            </div>
                                        </div>
                                        <div class="at-sync-info-block">
                                            <div class="at-sync-info-line">
                                                <span class="at-sync-info-label">${t("atSyncConfig.autoSyncTitle")||"\u81EA\u52A8\u540C\u6B65"}\uFF1A</span>
                                                <span class="at-sync-info-text">${t("atSyncConfig.autoSyncDesc")||"\u542F\u7528\u540E\u68C0\u6D4B\u5230 Antigravity Tools \u65B0\u8D26\u53F7\u65F6\u81EA\u52A8\u5BFC\u5165\u3002"}</span>
                                            </div>
                                            <div class="at-sync-info-line">
                                                <span class="at-sync-info-label">${t("atSyncConfig.manualImportTitle")||"\u624B\u52A8\u5BFC\u5165"}\uFF1A</span>
                                                <span class="at-sync-info-text">${t("atSyncConfig.manualImportDesc")||"\u5206\u522B\u5BFC\u5165\u672C\u5730\u8D26\u6237\u6216 Antigravity Tools \u8D26\u6237\uFF0C\u4EC5\u6267\u884C\u4E00\u6B21\u3002"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                        </div>
                        <div class="at-sync-section">
                            <div class="at-sync-toggle-grid">
                                <div class="at-sync-toggle-card">
                                    <label class="at-sync-toggle-label">
                                        <input type="checkbox" id="at-sync-modal-checkbox">
                                        <span>${t("atSyncConfig.enableAutoSync")||"\u81EA\u52A8\u540C\u6B65Antigravity Tools\u8D26\u6237"}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                            <div class="at-sync-section">
                                <div class="at-sync-section-title">\u{1F4E5} ${t("atSyncConfig.manualImportTitle")||"\u624B\u52A8\u5BFC\u5165"}</div>
                                <div class="at-sync-import-actions">
                                    <button id="at-sync-modal-import-local-btn" class="at-btn at-btn-primary at-sync-import-btn">${t("atSyncConfig.importLocal")||"\u5BFC\u5165\u672C\u5730\u8D26\u6237"}</button>
                                    <button id="at-sync-modal-import-tools-btn" class="at-btn at-btn-primary at-sync-import-btn">${t("atSyncConfig.importTools")||"\u5BFC\u5165 Antigravity Tools \u8D26\u6237"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `),document.getElementById("close-at-sync-config-modal")?.addEventListener("click",()=>a.classList.add("hidden")),a.querySelector("#at-sync-modal-checkbox")?.addEventListener("change",n=>{this.state.antigravityToolsSyncEnabled=n.target.checked,this.vscode.postMessage({command:"antigravityToolsSync.toggle",enabled:n.target.checked})}),a.querySelector("#at-sync-modal-import-local-btn")?.addEventListener("click",()=>{typeof window.showLocalAuthImportLoading=="function"&&window.showLocalAuthImportLoading(),this.vscode.postMessage({command:"autoTrigger.importLocal"}),a.classList.add("hidden")}),a.querySelector("#at-sync-modal-import-tools-btn")?.addEventListener("click",()=>{this.vscode.postMessage({command:"antigravityToolsSync.import"}),a.classList.add("hidden")}));let c=a.querySelector("#at-sync-modal-checkbox");c&&(c.checked=this.state.antigravityToolsSyncEnabled),a.querySelectorAll(".at-sync-details").forEach(n=>{n.removeAttribute("open")}),a.classList.remove("hidden")}openLoginChoiceModal(){let a=document.getElementById("auth-choice-modal");a||(a=this._createModal("auth-choice-modal",`
                    <div class="modal-content auth-choice-content">
                        <div class="modal-header">
                            <h3>${t("authChoice.title")||"\u9009\u62E9\u767B\u5F55\u65B9\u5F0F"}</h3>
                            <button class="close-btn" id="close-auth-choice-modal">\xD7</button>
                        </div>
                        <div class="modal-body auth-choice-body">
                            <div class="auth-choice-info">
                                <div class="auth-choice-desc">${t("authChoice.desc")||"\u8BF7\u9009\u62E9\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7\u6216\u6388\u6743\u767B\u5F55\u3002"}</div>
                                <div class="auth-choice-tip">${t("authChoice.tip")||"\u6388\u6743\u767B\u5F55\u9002\u7528\u4E8E\u65E0\u5BA2\u6237\u7AEF\uFF1B\u672C\u5730\u8BFB\u53D6\u4EC5\u5BF9\u5F53\u524D\u673A\u5668\u751F\u6548\u3002"}</div>
                            </div>
                            <div class="auth-choice-grid">
                                <div class="auth-choice-card">
                                    <div class="auth-choice-header">
                                        <span class="auth-choice-icon">\u{1F5A5}\uFE0F</span>
                                        <div>
                                            <div class="auth-choice-title">${t("authChoice.localTitle")||"\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7"}</div>
                                            <div class="auth-choice-text">${t("authChoice.localDesc")||"\u8BFB\u53D6\u672C\u673A Antigravity \u5BA2\u6237\u7AEF\u5DF2\u6388\u6743\u8D26\u53F7\uFF0C\u4E0D\u91CD\u65B0\u6388\u6743\uFF0C\u4EC5\u590D\u7528\u73B0\u6709\u6388\u6743\u3002"}</div>
                                        </div>
                                    </div>
                                    <button id="auth-choice-local-btn" class="at-btn at-btn-primary auth-choice-btn">
                                        ${t("authChoice.localBtn")||"\u8BFB\u53D6\u672C\u5730\u6388\u6743"}
                                    </button>
                                </div>
                                <div class="auth-choice-card">
                                    <div class="auth-choice-header">
                                        <span class="auth-choice-icon">\u{1F510}</span>
                                        <div>
                                            <div class="auth-choice-title">${t("authChoice.oauthTitle")||"\u6388\u6743\u767B\u5F55\uFF08\u4E91\u7AEF\u6388\u6743\uFF09"}</div>
                                            <div class="auth-choice-text">${t("authChoice.oauthDesc")||"\u901A\u8FC7 Google OAuth \u65B0\u6388\u6743\uFF0C\u9002\u7528\u4E8E\u65E0\u5BA2\u6237\u7AEF\u573A\u666F\uFF0C\u53EF\u64A4\u9500\u3002"}</div>
                                        </div>
                                    </div>
                                    <button id="auth-choice-oauth-btn" class="at-btn at-btn-primary auth-choice-btn">
                                        ${t("authChoice.oauthBtn")||"\u53BB\u6388\u6743\u767B\u5F55"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `),document.getElementById("close-auth-choice-modal")?.addEventListener("click",()=>a.classList.add("hidden")),a.querySelector("#auth-choice-oauth-btn")?.addEventListener("click",()=>{this.vscode.postMessage({command:"autoTrigger.authorize"}),a.classList.add("hidden")}),a.querySelector("#auth-choice-local-btn")?.addEventListener("click",()=>{typeof window.showLocalAuthImportLoading=="function"&&window.showLocalAuthImportLoading(),this.vscode.postMessage({command:"autoTrigger.importLocal"}),a.classList.add("hidden")})),a.classList.remove("hidden")}_createModal(a,c){let n=document.createElement("div");return n.id=a,n.className="modal hidden",n.innerHTML=c,document.body.appendChild(n),n.addEventListener("click",o=>{o.target===n&&n.classList.add("hidden")}),n}}window.AntigravityAuthUI=m})();})();
