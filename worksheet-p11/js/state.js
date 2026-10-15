// state.js — Zidan Fawaza Syahroni · Worksheet P11 (PABW SIF302)
// Satu objek state, fungsi pengubahnya, dan ingatannya di localStorage.
// Setiap perubahan lewat fungsi di sini, dan fungsi itulah yang memanggil render.

import { daftarProyek, daftarKategori, aturanKolom } from "./data.js";
import { render } from "./dom.js";

export const state = {
  daftarProyek,
  kategoriAktif: "semua",
  notisia: { status: "memuat", butir: [], pesan: "" }, // status: memuat, berhasil, gagal
  form: {
    galat: { nama: "", email: "", nim: "", pesan: "" },
    tombolNonaktif: false,
    status: "",
  },
};

// ===== Ingatan: hanya pilihan tampilan yang disimpan =====
const KUNCI = "pabw-p11";
const VERSI = 2;
const KATEGORI_BAWAAN = "semua";

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

// Dijalankan sekali saat halaman dibuka: simpanan, atau nilai bawaan bila null.
export function muatKeadaan() {
  const kategori = muat()?.kategoriAktif ?? KATEGORI_BAWAAN;
  if (!daftarKategori.includes(kategori)) {
    buang(); // kategori yang tidak dikenal: buang simpanannya, pakai nilai bawaan
    state.kategoriAktif = KATEGORI_BAWAAN;
    return;
  }
  state.kategoriAktif = kategori;
}

// ===== Fungsi pengubah =====
export function pilihKategori(nilai) {
  if (!daftarKategori.includes(nilai)) return;
  state.kategoriAktif = nilai;
  simpan(state); // sesudah keadaan berubah, sebelum render
  render(state);
}

export function aturUlangPilihan() {
  aturUlang();
  state.kategoriAktif = KATEGORI_BAWAAN;
  render(state);
}

// ambil adalah fungsi pengambil data dari api.js, diserahkan oleh app.js.
export async function muatNotisia(ambil) {
  state.notisia = { status: "memuat", butir: [], pesan: "" };
  render(state);
  try {
    const data = await ambil();
    if (!Array.isArray(data.butir)) {
      throw new Error("bentuk data tidak sesuai: kunci butir bukan larik");
    }
    state.notisia = { status: "berhasil", butir: data.butir, pesan: "" };
  } catch (galat) {
    state.notisia = { status: "gagal", butir: [], pesan: galat.message };
  }
  render(state);
}

// Dipanggil saat pengguna mengetik: periksa kolom itu, lalu tombol kirim menunggu semua kolom layak.
export function periksaIsian(id, isian) {
  const aturan = aturanKolom.find((a) => a.id === id);
  if (aturan) state.form.galat[id] = aturan.sah(isian[id]) ? "" : aturan.pesan;
  state.form.tombolNonaktif = !aturanKolom.every((a) => a.sah(isian[a.id]));
  state.form.status = "";
  render(state);
}

// Dipanggil saat form dikirim. Mengembalikan { sah, pertama }: pertama adalah kolom pertama yang salah.
export function kirimForm(isian) {
  const salah = aturanKolom.filter((a) => !a.sah(isian[a.id]));
  aturanKolom.forEach((a) => {
    state.form.galat[a.id] = a.sah(isian[a.id]) ? "" : a.pesan;
  });

  if (salah.length > 0) {
    state.form.tombolNonaktif = true;
    render(state);
    return { sah: false, pertama: salah[0].id };
  }

  // Belum ada server: pesan hanya dicatat di halaman ini.
  state.form.status = "Terima kasih, pesan Anda sudah dicatat. (Simulasi: belum dikirim ke server.)";
  state.form.tombolNonaktif = false;
  render(state);
  return { sah: true, pertama: null };
}
