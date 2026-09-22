# Panduan Publish @vibersmoon/baileys

## Status saat ini (2026-09-21)
✅ Build berhasil (tsup → CJS + ESM + DTS)  
✅ Test lulus (vitest 2 tests passed)  
✅ Git repository initialized (branch: main, commit: e441139)  
✅ Package name `@vibersmoon/baileys` tersedia di npm registry  

---

## Langkah besok pagi

### 1. Login ke npm
```bash
cd /root/baileys
npm login
```
Masukkan:
- Username npm kamu
- Password npm kamu
- OTP dari email atau authenticator app

### 2. Publish ke npm
```bash
npm publish --access public
```

Verifikasi:
```bash
npm view @vibersmoon/baileys
```

### 3. Buat repository GitHub
- Buka https://github.com/new
- Repository name: `baileys`
- Owner: `vibersmoon` (atau `akram`)
- Public
- Jangan centang "Initialize with README" (sudah ada)
- Create repository

### 4. Push ke GitHub
```bash
cd /root/baileys
git remote add origin https://github.com/vibersmoon/baileys.git
git push -u origin main
```

Atau kalau pakai akun pribadi:
```bash
git remote add origin https://github.com/akram/baileys.git
git push -u origin main
```

### 5. Verifikasi final
- npm: https://npmjs.com/package/@vibersmoon/baileys
- GitHub: https://github.com/vibersmoon/baileys (atau akram/baileys)

---

## Struktur project
```
/root/baileys/
├── dist/              # Build output (CJS + ESM + types)
├── examples/          # basic.ts - contoh penggunaan
├── src/              # Source TypeScript
│   ├── client.ts     # VibersmoonClient class
│   ├── types.ts      # TypeScript definitions
│   ├── events.ts     # Event helpers
│   └── index.ts      # Public exports
├── tests/            # Vitest unit tests
├── README.md         # Dokumentasi npm
├── package.json      # npm metadata
└── .git/            # Git repository

Git identity: Akram <akram@vibersmoon.dev>
Branch: main
Commit: e441139
```

---

## Troubleshooting

### npm login gagal
- Pastikan punya akun npm di https://npmjs.com
- Cek email untuk OTP
- Gunakan `npm adduser` kalau belum pernah login

### npm publish 403
- Cek `npm whoami` (harus sudah login)
- Cek nama package belum dipakai: `npm view @vibersmoon/baileys`

### git push gagal
- Set GitHub personal access token jika diminta password
- Atau gunakan SSH: `git remote set-url origin git@github.com:vibersmoon/baileys.git`

---

Selamat tidur, Akram! 🌙
