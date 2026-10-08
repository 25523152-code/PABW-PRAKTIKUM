// app.js — Zidan Fawaza Syahroni · Worksheet P9 (PABW SIF302)
const profil = {
  nama: "Zidan Fawaza Syahroni",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript", "Git"],
};
const jumlahProyek = 3;

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;
console.log(kalimat);

const kota = profil.alamat?.kota ?? "belum diisi";
console.log(kota);

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}
const formatKeahlian = (daftar) => daftar.join(" · ");
console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

// Data dari Pertemuan 8. Kategori ditambahkan untuk filter Pertemuan 9.
const daftarProyek = [
  { judul: "Halaman Profil Responsif", tahun: 2026, selesai: true, kategori: "web" },
  { judul: "Profil Data Dinamis", tahun: 2026, selesai: true, kategori: "data" },
  { judul: "Aplikasi Catatan Kuliah", tahun: 2026, selesai: false, kategori: "data" },
];

console.table(profil.keahlian);
console.table(daftarProyek);
const selesai = daftarProyek.filter((proyek) => proyek.selesai);
console.table(selesai);
const catatan = daftarProyek.find((proyek) => proyek.judul === "Aplikasi Catatan Kuliah");
console.log(catatan);
const daftarJudul = daftarProyek.map((proyek) => proyek.judul);
console.log(daftarJudul.length, daftarProyek.length);

let pilihanAktif = "semua";
console.log(pilihanAktif, daftarProyek.length);
pilihanAktif = "selesai";
console.log(pilihanAktif, selesai.length);

const urut = [...daftarProyek].sort((a, b) => a.judul.localeCompare(b.judul));
console.log(urut.map((p) => p.judul));
console.log(daftarProyek.map((p) => p.judul));
console.log(jumlahProyek === daftarProyek.length);

export { daftarProyek };
