# @vibersmoon/baileys

Production-ready wrapper around [Baileys](https://github.com/WhiskeySockets/Baileys) for building WhatsApp bots with a clean, event-driven API.

## Install

```bash
npm install @vibersmoon/baileys
```

## Quick start

```ts
import { VibersmoonClient } from '@vibersmoon/baileys';

const client = new VibersmoonClient({
  authFolder: '.baileys_auth',
  printQRInTerminal: true,
});

client.on('connected', () => console.log('Connected to WhatsApp'));
client.on('message:sent', ({ jid, text }) => console.log(`Sent to ${jid}: ${text}`));

await client.connect();
await client.sendMessage('6281234567890@s.whatsapp.net', 'Hello!');
```

See [`examples/basic.ts`](examples/basic.ts) for a complete runnable example.

## API

### `new VibersmoonClient(options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `authFolder` | `string` | `.baileys_auth` | Folder for Baileys auth state |
| `printQRInTerminal` | `boolean` | `false` | Print QR code to terminal |
| `browser` | `WABrowserDescription` | macOS Desktop | Browser description sent to WhatsApp |

### Methods

- `connect(): Promise<WASocket>` — connect and return the underlying Baileys socket
- `disconnect(): Promise<void>` — logout and close the connection
- `sendMessage(jid, text): Promise<void>` — send a text message
- `getSocket(): WASocket` — get the underlying Baileys socket

### Events

- `connected` — emitted when the connection is open
- `disconnected` — emitted when the connection closes
- `message:sent` — emitted after a message is sent

## Development

```bash
npm install
npm run build
npm test
npm run dev
```

## License

MIT © Akram
