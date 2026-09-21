import type { BaileysEventMap } from '@whiskeysockets/baileys';
import { EventEmitter } from 'node:events';

/**
 * Bind important Baileys events to a local EventEmitter.
 */
export function bindEvents(
  events: Partial<BaileysEventMap>,
  emitter: EventEmitter
): void {
  if (events['messages.upsert']) {
    emitter.emit('messages.upsert', events['messages.upsert']);
  }
  if (events['connection.update']) {
    emitter.emit('connection.update', events['connection.update']);
  }
  if (events['creds.update']) {
    emitter.emit('creds.update', events['creds.update']);
  }
}
