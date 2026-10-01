# PABW-PRAKTIKUM

## Pertemuan 5 — Layout Modern: Flexbox dan Grid

**Nama:** Zidan Fawaza Syahroni  
**NIM:** 25523152  
**Kelas:** E  
**Mata kuliah:** Pengembangan Aplikasi Berbasis Web (SIF302)  
**Tanggal:** (isi tanggal pengerjaan)

Lanjutan dari Pertemuan 4. Isi halaman, design token, dan tema tidak diubah; yang berubah hanya CSS yang mengatur posisi.

### Sketsa kerangka

```text
+--------------------------------------------------------------+
| .navbar  (flex)  judul + tagline | menu | mode gelap          |  baris 1: auto
+----------------+---------------------------------------------+
| .sisi          | .utama                                      |
| menu samping   |   Tentang saya (kartu)                      |  baris 2: 1fr
| (flex kolom)   |   Karya saya   (galeri auto-fit)            |
| 16rem          |   FAQ | Lini masa | Dipelajari (galeri)     |
|                +---------------------------------------------+
|                | .bawah  Hubungi saya (form)                 |
+----------------+---------------------------------------------+
| .kaki  (identitas)                                           |  baris 3: auto
+--------------------------------------------------------------+
```

### Rencana kerangka

| Bagian halaman | Nilai yang dipakai |
| --- | --- |
| Baris pertama (kepala) | `auto` |
| Baris kedua (isi) | `1fr` |
| Baris ketiga (kaki) | `auto` |
| Kolom isi | `16rem 1fr` |

### Flex atau grid

| Bagian | Pilihan | Alasan |
| --- | --- | --- |
| Kepala halaman (`.navbar`) | flex | Deret satu arah, jarak lewat `gap`. |
| Isi dua kolom (`.isi`) | grid | Dua arah: sidebar tetap dan konten lentur. |
| Galeri kartu (`.galeri`) | grid | Jumlah kolom menyesuaikan lebar lewat `auto-fit` dan `minmax`. |
| Isi satu kartu (`.kartu__kaki`) | flex | Dua item sejajar dalam satu baris. |

### Penempatan
- Area bernama: `.sisi`, `.utama`, dan `.bawah` pada `.isi`.
- Span: `.sorotan { grid-column: span 2; }` pada kartu SIMPROM, hanya aktif di layar lebar (`min-width: 72rem`).

### Tiga kasus luberan yang diperiksa (360 px dan 1 280 px)
1. **Tabel kegiatan** melebarkan halaman sampai 417 px pada layar 360 px bila tidak dibungkus. Perbaikan: `div.tabel-gulir { overflow-x: auto; }`.
2. **`span 2` pada galeri satu jalur** membuat jalur tambahan dan melebarkan halaman sampai 478 px. Perbaikan: `span` hanya berlaku pada `min-width: 72rem`.
3. **Judul tanpa spasi pada kartu** ditahan oleh `min-width: 0` pada `.kartu__isi` dan `overflow-wrap: anywhere` pada `.kartu__judul`.

### Pengungkapan bantuan AI
AI digunakan untuk membantu menyesuaikan CSS dan HTML Pertemuan 4 ke susunan flexbox dan grid, serta menyusun README ini. Isi profil, data identitas, dan keputusan akhir tampilan diperiksa dan disesuaikan oleh mahasiswa.

### Struktur folder
```text
worksheet-p5/
├── profil.html
├── README.md
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── komponen.css
│   └── tema.css
└── media/
    └── foto-profil.jpg
```
