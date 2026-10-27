## Pertemuan 12 — Build Tooling, npm, dan Framework SPA

Nama: Zidan Fawaza Syahroni · NIM: 25523152 · Kelas: E · Tanggal: 19 Oktober 2026

Folder: `worksheet-p12/` (proyek Vue + Vite, berisi halaman profil P11 yang dipindahkan menjadi komponen).

### Versi perkakas
Isi sendiri dari terminal di laptop Anda:
- `node -v`: <!-- ISI SENDIRI, harus LTS: 20.19 ke atas atau 22.12 ke atas -->
- `npm -v`: <!-- ISI SENDIRI -->

### Cara menjalankan
```bash
npm install        # memasang paket; membuat node_modules/ dan package-lock.json (commit berkas kedua)
npm run dev        # server pengembangan; catat nomor port yang muncul
npm run build      # menghasilkan dist/
npm run preview    # menjalankan isi dist/ seperti situs sungguhan
```
`package-lock.json` belum ada di folder ini karena dibuat oleh `npm install`; commit berkas itu, jangan diabaikan.

### Susunan proyek
| Berkas | Isi |
| --- | --- |
| `index.html` | Hanya `div#app` dan satu `<script type="module" src="/src/main.js">`. |
| `src/main.js` | Mengimpor enam berkas CSS berurutan (tokens, base, layout, komponen, tema, responsif), lalu memasang `App`. |
| `src/App.vue` | Komponen induk: kerangka halaman, `onMounted` (membaca simpanan dan tema, memuat catatan belajar), `watch` (menyimpan pilihan), dan tombol atur ulang. |
| `src/components/KepalaProfil.vue` | Identitas di atas halaman; satu-satunya komponen yang menerima props (`profil`). |
| `src/components/TombolFilter.vue` | Tombol kategori, memakai state bersama. |
| `src/components/DaftarProyek.vue` | Daftar kartu proyek yang disaring dari state, memakai state bersama. |
| `src/components/FormKontak.vue` | Formulir kontak dengan validasi per kolom; isinya `ref` lokal. |
| `src/state.js` | `reactive()` untuk `state` dan `pilihKategori()`; tidak ada `render()` manual. |
| `src/simpanan.js` | `simpan`, `muat`, `aturUlang`, `KUNCI`, `VERSI` dari P11, kodenya sama. |
| `src/data.js` | Data dari P11; hanya ditambah `id` unik pada setiap proyek untuk `:key`. |
| `src/api.js`, `public/notisia.json` | Lapisan data P10, tidak diubah; `fetch` hanya ada di `api.js`. |
| `public/media/foto-profil.jpg` | Gambar yang dibaca lewat alamat `/media/foto-profil.jpg`. |

Keenam berkas CSS di `src/` identik dengan P11 (isinya tidak disentuh).

### Dua keputusan pemindahan
- Pengalih tema gelap/terang (skrip kecil di `profil.html` P11) kini ada di `App.vue` dengan kunci `tema` yang sama; perilakunya tidak diubah.
- Data jaringan (`notisia`) sengaja di objek reaktif terpisah dari `state`, supaya `watch(state)` hanya menyimpan pilihan tampilan.

### Ukuran sebelum dan sesudah build
Isi sendiri setelah `npm run build` (tab Network, muat ulang):
- Sebelum build (`npm run dev`): <!-- ISI SENDIRI: jumlah berkas dan ukuran yang dikirim -->
- Sesudah build (`npm run preview`): <!-- ISI SENDIRI: jumlah berkas dan ukuran yang dikirim -->

### Deklarasi penggunaan AI
**Dibantu AI (Claude, Anthropic):**
- Draf seluruh sumber proyek (`index.html`, `package.json`, `vite.config.js`, `.gitignore`, `src/`) dan draf isian worksheet (lembar A.2, C, D, E.3, F.5, G, dan Lampiran B).
- AI tidak dapat menjalankan `npm install`, `npm run dev`, `npm run build`, maupun `npm run preview` (tidak ada akses ke registry npm). Yang diperiksa AI: jalur impor (peka huruf besar-kecil), keseimbangan tag template, sintaks skrip, kesamaan CSS dengan P11, dan logika modul JavaScript di browser. Komponen Vue belum pernah dijalankan oleh AI.

**Saya kerjakan sendiri:**
- <!-- ISI SENDIRI, tulis apa adanya. Contoh: menjalankan npm install dan npm run dev, memeriksa Console, menjalankan build dan preview, mengisi hasil di worksheet, mengambil tangkapan layar preview, commit dan push ke GitHub. -->

**Catatan:** Saya sudah membaca seluruh kode di `src/` dan bisa menjelaskan setiap barisnya.
<!-- Hapus kalimat di atas kalau belum benar. -->
