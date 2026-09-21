import makeWASocket, {
  Browsers,
  type ConnectionState,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { EventEmitter } from 'node:events';
import pino from 'pino';
import type { VibersmoonClientOptions, WhatsAppClient } from './types.js';

const logger = pino({ level: 'silent' });

export class VibersmoonClient extends EventEmitter {
  private socket!: WhatsAppClient;
  private readonly authFolder: string;
  private readonly printQRInTerminal: boolean;
  private readonly browser: VibersmoonClientOptions['browser'];

  constructor(options: VibersmoonClientOptions = {}) {
    super();
    this.authFolder = options.authFolder ?? '.baileys_auth';
    this.printQRInTerminal = options.printQRInTerminal ?? false;
    this.browser = options.browser ?? Browsers.macOS('Desktop');
  }

  async connect(): Promise<WhatsAppClient> {
    const { state, saveCreds } = await useMultiFileAuthState(this.authFolder);

    this.socket = makeWASocket({
      auth: state,
      browser: this.browser,
      printQRInTerminal: this.printQRInTerminal,
      logger,
    });

    this.socket.ev.on('creds.update', saveCreds);
    this.socket.ev.on('connection.update', (update: Partial<ConnectionState>) => {
      if (update.connection === 'open') {
        this.emit('connected', this.socket);
      }
      if (update.connection === 'close') {
        this.emit('disconnected');
      }
    });

    await this.socket.waitForConnectionUpdate(
      async (update) => update.connection === 'open'
    );

    this.emit('ready', this.socket);
    return this.socket;
  }

  async disconnect(): Promise<void> {
    if (this.socket) {
      await this.socket.logout();
      this.emit('disconnected');
    }
  }

  async sendMessage(jid: string, text: string): Promise<void> {
    await this.socket.sendMessage(jid, { text });
    this.emit('message:sent', { jid, text });
  }

  getSocket(): WhatsAppClient {
    if (!this.socket) {
      throw new Error('Client is not connected. Call connect() first.');
    }
    return this.socket;
  }
}
