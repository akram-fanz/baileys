import { VibersmoonClient } from '@vibersmoon/baileys';
import {
  getContentType,
  normalizeMessageContent,
  isJidUser,
} from '@whiskeysockets/baileys';

const client = new VibersmoonClient({
  authFolder: '.auth_info',
  printQRInTerminal: true,
});

/**
 * Extract readable text from a Baileys message object.
 */
function getTextFromMessage(msg) {
  const type = getContentType(msg.message);
  if (!type) return null;

  const content = normalizeMessageContent(msg.message);
  const text =
    content?.[type]?.text ||
    content?.[type]?.caption ||
    content?.conversation;

  return text || null;
}

client.on('connected', () => {
  console.log('✅ Bot connected to WhatsApp');
});

client.on('disconnected', () => {
  console.log('❌ Bot disconnected from WhatsApp');
});

client.on('ready', (sock) => {
  console.log('🤖 Bot is ready');

  sock.ev.on('messages.upsert', async ({ messages }) => {
    for (const msg of messages) {
      if (msg.key.fromMe) continue;
      if (!isJidUser(msg.key.remoteJid)) continue;

      const text = getTextFromMessage(msg);
      if (!text) continue;

      const jid = msg.key.remoteJid;
      const body = text.toLowerCase().trim();

      console.log(`📩 ${jid}: ${text}`);

      try {
        if (body === 'ping') {
          await client.sendMessage(jid, 'pong 🏓');
        } else if (body.startsWith('!echo ')) {
          await client.sendMessage(jid, text.slice(6));
        } else if (body === '!info') {
          await client.sendMessage(
            jid,
            'Vibersmoon WhatsApp Bot v1.0.0\nBuilt with @vibersmoon/baileys'
          );
        } else if (body === '!help') {
          await client.sendMessage(
            jid,
            'Available commands:\n• ping\n• !echo <text>\n• !info\n• !help'
          );
        }
      } catch (err) {
        console.error('Failed to send message:', err.message);
      }
    }
  });
});

await client.connect();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down bot...');
  await client.disconnect();
  process.exit(0);
});
