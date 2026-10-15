// data.js — Zidan Fawaza Syahroni · Worksheet P11 (PABW SIF302)
// Data mentah dan fungsi murni. Tidak menyentuh halaman dan tidak menyimpan keadaan.

export const profil = {
  nama: "Zidan Fawaza Syahroni",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript", "Git"],
};

export const daftarProyek = [
  { judul: "Halaman Profil Responsif", tahun: 2026, selesai: true, kategori: "web" },
  { judul: "Profil Data Dinamis", tahun: 2026, selesai: true, kategori: "data" },
  { judul: "Aplikasi Catatan Kuliah", tahun: 2026, selesai: false, kategori: "web" },
];

// Kategori yang dikenal. Isinya sama persis dengan data-kategori pada tombol di profil.html.
export const daftarKategori = ["semua", "web", "data"];

// Dua fungsi murni dari Pertemuan 8.
export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}
export const formatKeahlian = (daftar) => daftar.join(" · ");

// Aturan isian form kontak: satu aturan per kolom, berisi pemeriksa murni
// dan pesan yang menyebut cara memperbaiki.
export const aturanKolom = [
  {
    id: "nama",
    sah: (nilai) => nilai.trim().length >= 3,
    pesan: "Isi nama lengkap Anda, minimal 3 huruf.",
  },
  {
    id: "email",
    sah: (nilai) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nilai.trim()),
    pesan: "Tulis email dengan format nama@contoh.com.",
  },
  {
    id: "nim",
    sah: (nilai) => /^[0-9]{8}$/.test(nilai.trim()),
    pesan: "NIM terdiri dari 8 digit angka, misalnya 25523152.",
  },
  {
    id: "pesan",
    sah: (nilai) => nilai.trim().length >= 10,
    pesan: "Tulis pesan minimal 10 karakter supaya jelas.",
  },
];
