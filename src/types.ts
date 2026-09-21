import type { WASocket, WABrowserDescription } from '@whiskeysockets/baileys';

export interface VibersmoonClientOptions {
  /** Folder to store auth credentials */
  authFolder?: string;
  /** Deprecated in Baileys v7. Set to true to print QR code (if supported) */
  printQRInTerminal?: boolean;
  /** Custom browser description */
  browser?: WABrowserDescription;
}

export type WhatsAppClient = WASocket;
