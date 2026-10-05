// app.js — Zidan Fawaza Syahroni · Worksheet P8 (PABW SIF302)

// ===== Lembar B: data halaman sebagai variabel =====
const profil = {
  nama: "Zidan Fawaza Syahroni",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript", "Git"],
};
const jumlahProyek = 3;

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;
console.log(kalimat);

// ?. dan ?? : alamat belum ada di data, jadi tidak melempar galat
const kota = profil.alamat?.kota ?? "belum diisi";
console.log(kota);

// ===== Lembar C: dua fungsi murni =====
function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}
const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

// ===== Lembar D: array of object, map, filter, find =====
const daftarProyek = [
  { judul: "Halaman Profil Responsif", tahun: 2026, selesai: true },
  { judul: "Profil Data Dinamis", tahun: 2026, selesai: true },
  { judul: "Aplikasi Catatan Kuliah", tahun: 2026, selesai: false },
];

console.table(profil.keahlian);
console.table(daftarProyek);

const selesai = daftarProyek.filter((proyek) => proyek.selesai);
console.table(selesai);

const catatan = daftarProyek.find((proyek) => proyek.judul === "Aplikasi Catatan Kuliah");
console.log(catatan);

const daftarJudul = daftarProyek.map((proyek) => proyek.judul);
console.log(daftarJudul.length, daftarProyek.length);

// let dipakai karena nilainya memang berubah
let pilihanAktif = "semua";
console.log(pilihanAktif, daftarProyek.length);
pilihanAktif = "selesai";
console.log(pilihanAktif, selesai.length);

// salinan: sort mengubah array aslinya, jadi urutkan salinannya
const urut = [...daftarProyek].sort((a, b) => a.judul.localeCompare(b.judul));
console.log(urut.map((p) => p.judul));
console.log(daftarProyek.map((p) => p.judul));
console.log(jumlahProyek === daftarProyek.length);
