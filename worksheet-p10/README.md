## Pertemuan 10 — JavaScript Asinkron: fetch, Promise, dan JSON

Nama: Zidan Fawaza Syahroni · NIM: 25523152 · Kelas: E · Tanggal: 12 Oktober 2026

Folder: `worksheet-p10/` (berisi `profil.html`, enam berkas CSS, `js/app.js` dan `js/dom.js` dari Pertemuan 9, `js/api.js` yang baru, dan `notisia.json`).

### Cara menjalankan
Halaman harus dibuka lewat server lokal, bukan klik dua kali (`file://` memblokir fetch): Live Server di VS Code, atau `python3 -m http.server 8000` lalu buka `http://localhost:8000/profil.html`.

### Pilihan sumber data
Saya memakai berkas lokal `notisia.json`, bukan API publik, sesuai aturan worksheet bila alamat publik tidak terjangkau. Alamat API publik tidak dapat dijangkau saat pekerjaan ini disusun, jadi tidak ada yang bisa diuji langsung. Karena itu cek "skema https" pada lembar A.2 tidak berlaku. Alamat ditulis satu kali di `js/api.js` (`const ALAMAT`); bila nanti diganti ke API publik, kunci data di `gambar()` perlu disesuaikan dengan bentuk balasannya.

### Isi singkat
- `js/api.js` (baru): lapisan data. `ambilNotisia()` memanggil `fetch(ALAMAT)`, memeriksa `respons.ok` sebelum membaca badan, membaca `json()`, mencatat galat lalu melemparnya ulang. Nama yang diekspor: `ambilNotisia` (dipakai di Pertemuan 11).
- `js/dom.js`: mengimpor `ambilNotisia`. `tampilkan()` menjadi pemanggil dengan try/catch kedua dan menampilkan empat keadaan di `#status-notisia`: memuat, berhasil, gagal, kosong. `gambar()` mengosongkan wadah, memeriksa keadaan kosong, lalu mengisi kartu dengan `createElement` dan `textContent`. `JSON.stringify` dipakai pada submit form untuk membentuk badan JSON (simulasi kirim).
- `profil.html`: ditambah bagian "Catatan belajar terbaru" (`#status-notisia`, `#daftar-notisia`) dan satu tautan menu samping.
- `js/app.js` tidak diubah. Pemanggil api.js adalah `dom.js`, bukan `app.js`, karena sejak P9 `app.js` hanya menyimpan data dan fungsi murni.
- Kata `fetch` hanya ada di `js/api.js`.

### Bukti empat keadaan
`bukti-berhasil.png`, `bukti-gagal.png`, `bukti-kosong.png`, `bukti-memuat.png`. Tiga kasus lembar E (status 404 tanpa pemeriksaan `respons.ok`, `await` di fungsi biasa, badan bukan JSON) dicatat di worksheet.

### Deklarasi penggunaan AI
**Dibantu AI (Claude, Anthropic):**
- Draf `js/api.js`, `notisia.json`, perubahan `js/dom.js` dan `profil.html`.
- Draf isian worksheet (lembar A.1, A.3, B.3, C.2, D.2, D.3, E.4, F, dan Lampiran B).
- Tangkapan layar empat keadaan diambil otomatis dari halaman yang berjalan, dengan balasan yang sengaja diubah (alamat salah, balasan kosong, balasan ditahan).

**Saya kerjakan sendiri:**
- <!-- ISI SENDIRI, tulis apa adanya. Contoh: menjalankan lewat Live Server, mengulang uji alamat salah, jaringan mati, dan data kosong di DevTools lalu memeriksa panel Network, mengambil tangkapan layar sendiri, mempelajari dan bisa menjelaskan setiap baris kode, commit dan push ke GitHub. -->

**Catatan:** Saya sudah membaca seluruh kode di `js/api.js` dan `js/dom.js` dan bisa menjelaskan setiap barisnya.
<!-- Hapus kalimat di atas kalau belum benar. -->
