# PABW-PRAKTIKUM

## Pertemuan 6 — Responsif Mobile-First

**Nama:** Zidan Fawaza Syahroni
**NIM:** 25523152
**Kelas:** E
**Mata kuliah:** Pengembangan Aplikasi Berbasis Web (SIF302)

Lanjutan dari Pertemuan 5. Halaman dan kelima berkas CSS lama dipakai
kembali tanpa diubah isinya; satu berkas baru, `responsif.css`,
ditambahkan untuk menuliskan gaya dasar layar sempit dan dua titik henti.

### Yang ditambah atau diubah
- **`profil.html`:** baris `<meta name="viewport" ...>` dipastikan
  persis sesuai Lembar A, dan satu tautan baru ke `css/responsif.css`
  ditambahkan paling akhir.
- **`css/responsif.css`** (baru): gaya dasar satu kolom tanpa media
  query, lalu dua titik henti `min-width: 48rem` (galeri dua kolom,
  menu atas kembali tampil) dan `min-width: 60rem` (sidebar bersanding
  konten, galeri tiga kolom).
- **`css/layout.css`:** aturan lama `@media (max-width: 48rem)` pada
  `.isi` dan `.navbar nav` dipindahkan ke `responsif.css` sebagai
  `min-width`, sesuai catatan C.3 (aturan tambahan tidak boleh memakai
  `max-width`).
- **`css/komponen.css`:** jumlah kolom `.galeri` (sebelumnya
  `auto-fit`/`minmax`) dipindahkan ke `responsif.css` supaya tidak ada
  dua logika titik henti yang saling menimpa.
- Gambar dan tabel lebar sudah lolos tanpa perubahan lagi: `img` sudah
  `max-width: 100%` dan tabel kegiatan sudah dibungkus `.tabel-gulir`
  sejak Pertemuan 5.

### A.2 — elemen berlebar tetap
Proyek ini tidak memiliki elemen dengan lebar piksel tetap; sidebar,
kartu, dan gambar sudah memakai satuan relatif sejak Pertemuan 5.
Rinciannya ada di Lembar A.2 pada worksheet.

### Hasil uji tiga lebar
| Lebar | Kolom galeri | Catatan |
| --- | --- | --- |
| 360 px | 1 | satu kolom penuh, menu atas disembunyikan |
| 768 px | 2 | sidebar masih di atas konten (belum 60rem) |
| 1 280 px | 3 | sidebar bersanding dengan konten |

Tidak ada gulir mendatar pada ketiga lebar tersebut. Tangkapan layar
ada di `bukti-360px.png`, `bukti-768px.png`, dan `bukti-1280px.png`.

### Pengungkapan bantuan AI
AI digunakan untuk membantu menulis `responsif.css`, memindahkan
aturan lama ke pola mobile-first, menguji tiga lebar layar, dan
menyusun README ini. Isi profil dan keputusan akhir tampilan
diperiksa dan disesuaikan oleh mahasiswa.

### Struktur folder
```text
worksheet-p6/
├── profil.html
├── README.md
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── komponen.css
│   ├── tema.css
│   └── responsif.css
├── media/
│   └── foto-profil.jpg
├── bukti-360px.png
├── bukti-768px.png
└── bukti-1280px.png
```
