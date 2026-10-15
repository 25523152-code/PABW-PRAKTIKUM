// api.js — Zidan Fawaza Syahroni · Worksheet P10 (PABW SIF302)
// Lapisan data: hanya mengambil dan memeriksa. Tidak menyentuh halaman.

// Alamat ditulis satu kali di sini. Dipakai berkas lokal (lihat README),
// jadi halaman harus dibuka lewat server lokal, bukan file://.
const ALAMAT = "notisia.json";

export async function ambilNotisia() {
  try {
    const respons = await fetch(ALAMAT);
    console.log("status", respons.status, "ok", respons.ok);
    if (!respons.ok) throw new Error("status " + respons.status);
    const data = await respons.json();
    return data;
  } catch (galat) {
    console.error("gagal memuat", galat.message);
    throw galat;
  }
}
