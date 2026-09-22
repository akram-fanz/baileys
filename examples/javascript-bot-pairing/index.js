import { VibersmoonClient } from '@vibersmoon/baileys';
import {
  getContentType,
  normalizeMessageContent,
  isJidUser,
  DisconnectReason,
} from '@whiskeysockets/baileys';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

const client = new VibersmoonClient({
  authFolder: '.auth_info_pairing',
  printQRInTerminal: false, // Tidak pakai QR
});

/**
 * Extract readable text dari Baileys message.
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

let pairingCode = null;

client.on('connected', () => {
  console.log('✅ Connected to WhatsApp');
});

client.on('disconnected', () => {
  console.log('❌ Disconnected from WhatsApp');
});

client.on('ready', async (sock) => {
  console.log('🤖 Bot is ready and listening for messages...\n');

  // Listen untuk messages
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
            'Vibersmoon WhatsApp Bot (Pairing Code)\nv1.0.0\nBuilt with @vibersmoon/baileys'
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

  // Listen connection updates
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if (
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut
      ) {
        console.log('Reconnecting...');
      } else {
        console.log('Logged out');
      }
    }
  });
});

/**
 * Request pairing code dari terminal
 */
async function requestPairingCode(sock) {
  const phoneNumber = await question(
    '\nEnter your WhatsApp phone number (e.g., 6281234567890): '
  );

  if (!phoneNumber.match(/^\d{10,15}$/)) {
    console.error('Invalid phone number format');
    process.exit(1);
  }

  console.log('Requesting pairing code...');
  try {
    const code = await sock.requestPairingCode(phoneNumber);
    console.log(
      '\n✅ Pairing code received: ' + code + '\n'
    );
    console.log('Enter this code in your WhatsApp app:');
    console.log('WhatsApp → Settings → Linked Devices → Link a Device\n');
    return code;
  } catch (err) {
    console.error('Failed to get pairing code:', err.message);
    process.exit(1);
  }
}

console.log('🤖 Starting WhatsApp Bot (Pairing Code Mode)\n');

// Connect dan minta pairing code
const sock = await client.connect();
pairingCode = await requestPairingCode(sock);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down bot...');
  rl.close();
  await client.disconnect();
  process.exit(0);
});
