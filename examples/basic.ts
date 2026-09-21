import { VibersmoonClient } from '../src/index.js';

async function main() {
  const client = new VibersmoonClient({
    authFolder: '.baileys_auth',
    printQRInTerminal: true,
  });

  client.on('connected', () => console.log('✅ Connected to WhatsApp'));
  client.on('disconnected', () => console.log('❌ Disconnected from WhatsApp'));
  client.on('message:sent', ({ jid, text }) => console.log(`📤 Sent to ${jid}: ${text}`));

  await client.connect();

  // Replace with your target phone number
  const target = '6281234567890@s.whatsapp.net';
  await client.sendMessage(target, 'Hello from @vibersmoon/baileys!');

  // Graceful shutdown after 5 seconds
  setTimeout(() => client.disconnect(), 5000);
}

main().catch(console.error);
