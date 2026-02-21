import { html, nothing } from "lit";
import type { AppViewState } from "../app-view-state.ts";
import { t } from "../i18n/index.ts";

export function renderGatewayUrlConfirmation(state: AppViewState) {
  const { pendingGatewayUrl } = state;
  if (!pendingGatewayUrl) {
    return nothing;
  }

  return html`
    <div class="exec-approval-overlay" role="dialog" aria-modal="true" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">${t("gateway.confirm.title")}</div>
            <div class="exec-approval-sub">${t("gateway.confirm.sub")}</div>
          </div>
        </div>
        <div class="exec-approval-command mono">${pendingGatewayUrl}</div>
        <div class="callout danger" style="margin-top: 12px;">
          ${t("gateway.confirm.warning")}
        </div>
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            @click=${() => state.handleGatewayUrlConfirm()}
          >
            Confirm
          </button>
          <button
            class="btn"
            @click=${() => state.handleGatewayUrlCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  `;
}
