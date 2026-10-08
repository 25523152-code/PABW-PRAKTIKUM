# Pertemuan 9 — DOM, Event, dan Interaktivitas

**Nama:** Zidan Fawaza Syahroni  
**NIM:** 25523152  
**Kelas:** E  
**Mata kuliah:** Pengembangan Aplikasi Berbasis Web (SIF302)

## Dasar pekerjaan
P9 melanjutkan hasil P8. Struktur HTML/CSS mempertahankan hasil P5–P6. Perubahan utama ada pada `js/dom.js` dan bagian proyek/form di `profil.html`.

## Yang dikerjakan
- `#daftar`, `#filter`, `data-kategori`, dan `#pesan-kosong` ditambahkan sesuai Lembar A.
- `js/dom.js` dibuat dan `js/app.js` mengekspor `daftarProyek`.
- Kategori `web`/`data` ditambahkan ke data proyek P8 agar filter P9 dapat bekerja.
- Render memakai `createElement`, `textContent`, dan `append`.
- `render()` selalu mengosongkan wadah lebih dulu dan menangani daftar kosong.
- Filter memakai satu pendengar pada induk dengan `event.target.closest("button")`.
- Form memakai `preventDefault()`, validasi per kolom, `trim()`, `aria-invalid`, `focus()`, dan tombol kirim yang menunggu sampai valid.

## Deklarasi penggunaan AI
**Dibantu AI:** penyesuaian kode P8 ke instruksi P9, penyusunan `js/dom.js`, perubahan `profil.html`, CSS filter/validasi, dan draf jawaban tiket keluar.

**Saya kerjakan/periksa sendiri:** menjalankan lewat server lokal, memeriksa Console/Elements, menguji filter/form/keadaan kosong, mengambil screenshot bukti, dan memastikan dapat menjelaskan kode.

> Screenshot bukti harus diambil dari pengujian nyata di perangkat sendiri; jangan menggunakan screenshot contoh.
