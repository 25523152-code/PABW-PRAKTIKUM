## Pertemuan 11 — Modul, State, dan Penyimpanan Klien

Nama: Zidan Fawaza Syahroni · NIM: 25523152 · Kelas: E · Tanggal: 15 Oktober 2026

Folder: `worksheet-p11/` (berisi `profil.html`, enam berkas CSS, lima modul JavaScript di `js/`, `js/api.js` dan `notisia.json` dari Pertemuan 10).

### Cara menjalankan
Buka lewat server lokal, bukan klik dua kali: Live Server di VS Code, atau `python3 -m http.server 8000` lalu `http://localhost:8000/profil.html`. Pakai satu nomor port tetap, karena simpanan terikat pada alamat termasuk portnya.

### Lima modul, satu tanggung jawab masing-masing
| Berkas | Tanggung jawab |
| --- | --- |
| `js/data.js` | Data mentah (`profil`, `daftarProyek`, `daftarKategori`, `aturanKolom`) dan fungsi murni (`buatPerkenalan`, `formatKeahlian`). |
| `js/state.js` | Objek `state` tunggal, fungsi pengubahnya (`pilihKategori`, `aturUlangPilihan`, `muatNotisia`, `periksaIsian`, `kirimForm`), dan ingatannya di localStorage (`simpan`, `muat`, `aturUlang`). |
| `js/dom.js` | Seluruh sentuhan ke halaman: pemilih, `render(state)`, `saring(state)`, dan perubahan kelas. |
| `js/events.js` | Pemasangan seluruh pendengar peristiwa (`pasangPendengar`). |
| `js/app.js` | Perakit: mengimpor semuanya dan menjalankan aplikasi. Tanpa logika. |

`js/api.js` dari Pertemuan 10 dibawa apa adanya dan dihitung terpisah. Pertemuan ini tidak menambah fitur; hanya tombol "Atur ulang pilihan" yang baru, sesuai lembar D.

### Keadaan dan penyimpanan
- Seluruh keadaan yang bisa berubah ada di `state`: `daftarProyek`, `kategoriAktif`, `notisia` (memuat, berhasil, gagal), dan `form` (pesan galat, status tombol kirim, pesan sukses). Tampilan digambar dari `state` lewat `render(state)`, dan hanya fungsi pengubah di `state.js` yang memanggil `render`.
- Yang disimpan di `localStorage` (kunci `pabw-p11`, versi 2): hanya `kategoriAktif`, sebagai JSON `{ "versi": 2, "kategoriAktif": "..." }`. Nilai bawaan `"semua"`.
- Simpanan rusak, versi lama, atau kategori asing dibuang dan halaman memakai nilai bawaan. Penyimpanan yang diblokir peramban tidak menghentikan halaman.
- Sengaja tidak disimpan: token dan kata sandi (tidak terenkripsi), isian form kontak (data pribadi), dan data catatan belajar dari jaringan (dimuat ulang setiap kunjungan).
- Pengecualian yang disengaja: skrip kecil pengalih tema gelap di `profil.html` (kunci `tema` sendiri) tidak dipindah ke `state`, supaya fungsi tema yang sudah benar tidak ikut berubah.

### Bukti
`bukti-simpanan-rusak.png` dan `bukti-pulih-nilai-bawaan.png`.

### Pekerjaan rumah Node.js LTS (sebelum Pertemuan 12)
Isi sendiri dari terminal di laptop Anda:
- `node -v`: <!-- ISI SENDIRI, contoh bentuknya v22.x.x -->
- `npm -v`: <!-- ISI SENDIRI -->

### Deklarasi penggunaan AI
**Dibantu AI (Claude, Anthropic):**
- Draf kelima modul, perubahan `profil.html` dan `css/komponen.css`.
- Draf isian worksheet (lembar A sampai F dan Lampiran B).
- Dua tangkapan layar bukti dirakit dari data nyata (gambar halaman dan hasil perintah yang dijalankan di halaman itu), bukan dari jendela DevTools asli.

**Saya kerjakan sendiri:**
- <!-- ISI SENDIRI, tulis apa adanya. Contoh: menjalankan lewat Live Server, merusak simpanan sendiri dari Console lalu mengambil tangkapan layar asli, menutup tab dan membukanya lagi, memasang Node.js LTS, mempelajari dan bisa menjelaskan setiap baris kode, commit dan push ke GitHub. -->

**Catatan:** Saya sudah membaca seluruh kode di `js/` dan bisa menjelaskan setiap barisnya.
<!-- Hapus kalimat di atas kalau belum benar. -->
