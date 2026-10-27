// src/simpanan.js — ingatan di localStorage, dipindahkan dari Pertemuan 11 apa adanya.
// Hanya pilihan tampilan yang disimpan; token, kata sandi, dan isian form tidak pernah.

const KUNCI = "pabw-p11";
const VERSI = 2;

export function simpan(keadaan) {
  const isi = { versi: VERSI, kategoriAktif: keadaan.kategoriAktif };
  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch (galat) {
    console.warn("simpanan tidak dapat ditulis", galat.message); // halaman tetap berjalan
  }
}

function buang() {
  try {
    localStorage.removeItem(KUNCI);
  } catch {
    // penyimpanan tidak tersedia: tidak ada yang perlu dibuang
  }
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      buang(); // bentuk lama atau belum pernah disimpan: buang
      return null;
    }
    return isi;
  } catch {
    buang(); // isi rusak: buang
    return null;
  }
}

export function aturUlang() {
  buang();
}
