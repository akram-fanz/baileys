# WhatsApp Bot (Pairing Code)

WhatsApp bot dengan autentikasi pairing code (lebih aman dari QR).

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Masukkan nomor WhatsApp kamu saat diminta. Bot akan memberikan pairing code yang bisa diisi di WhatsApp mobile.

## Keuntungan Pairing Code

- ✅ Lebih aman (tidak perlu scan QR)
- ✅ Multi-device support
- ✅ Tidak perlu WhatsApp Web

## Commands

| Command | Response |
|---------|----------|
| `ping` | `pong 🏓` |
| `!echo <text>` | Echoes your text |
| `!info` | Bot version info |
| `!help` | List commands |

## Struktur

- `index.js` — Bot entry point dengan pairing code flow
- `package.json` — Dependencies
