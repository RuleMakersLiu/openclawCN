import { html, nothing } from "lit";
import type { WhatsAppStatus } from "../types.ts";
import type { ChannelsProps } from "./channels.types.ts";
import { formatRelativeTimestamp, formatDurationHuman } from "../format.ts";
import { t } from "../i18n/index.ts";
import { renderChannelConfigSection } from "./channels.config.ts";

export function renderWhatsAppCard(params: {
  props: ChannelsProps;
  whatsapp?: WhatsAppStatus;
  accountCountLabel: unknown;
}) {
  const { props, whatsapp, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${t("channels.whatsapp.title")}</div>
      <div class="card-sub">${t("channels.whatsapp.sub")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${t("channels.label.configured")}</span>
          <span>${whatsapp?.configured ? "Yes" : "No"}</span>
        </div>
        <div>
          <span class="label">${t("channels.label.linked")}</span>
          <span>${whatsapp?.linked ? "Yes" : "No"}</span>
        </div>
        <div>
          <span class="label">${t("channels.label.running")}</span>
          <span>${whatsapp?.running ? "Yes" : "No"}</span>
        </div>
        <div>
          <span class="label">${t("channels.label.connected")}</span>
          <span>${whatsapp?.connected ? "Yes" : "No"}</span>
        </div>
        <div>
          <span class="label">${t("channels.label.lastConnect")}</span>
          <span>
            ${whatsapp?.lastConnectedAt ? formatRelativeTimestamp(whatsapp.lastConnectedAt) : "n/a"}
          </span>
        </div>
        <div>
          <span class="label">${t("channels.label.lastMessage")}</span>
          <span>
            ${whatsapp?.lastMessageAt ? formatRelativeTimestamp(whatsapp.lastMessageAt) : "n/a"}
          </span>
        </div>
        <div>
          <span class="label">${t("channels.label.authAge")}</span>
          <span>
            ${whatsapp?.authAgeMs != null ? formatDurationHuman(whatsapp.authAgeMs) : "n/a"}
          </span>
        </div>
      </div>

      ${
        whatsapp?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${whatsapp.lastError}
          </div>`
          : nothing
      }

      ${
        props.whatsappMessage
          ? html`<div class="callout" style="margin-top: 12px;">
            ${props.whatsappMessage}
          </div>`
          : nothing
      }

      ${
        props.whatsappQrDataUrl
          ? html`<div class="qr-wrap">
            <img src=${props.whatsappQrDataUrl} alt="WhatsApp QR" />
          </div>`
          : nothing
      }

      <div class="row" style="margin-top: 14px; flex-wrap: wrap;">
        <button
          class="btn primary"
          ?disabled=${props.whatsappBusy}
          @click=${() => props.onWhatsAppStart(false)}
        >
          ${props.whatsappBusy ? t("channels.whatsapp.working") : t("channels.whatsapp.showQr")}
        </button>
        <button
          class="btn"
          ?disabled=${props.whatsappBusy}
          @click=${() => props.onWhatsAppStart(true)}
        >
          Relink
        </button>
        <button
          class="btn"
          ?disabled=${props.whatsappBusy}
          @click=${() => props.onWhatsAppWait()}
        >
          Wait for scan
        </button>
        <button
          class="btn danger"
          ?disabled=${props.whatsappBusy}
          @click=${() => props.onWhatsAppLogout()}
        >
          Logout
        </button>
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Refresh
        </button>
      </div>

      ${renderChannelConfigSection({ channelId: "whatsapp", props })}
    </div>
  `;
}
