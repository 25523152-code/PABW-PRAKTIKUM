// events.js — Zidan Fawaza Syahroni · Worksheet P11 (PABW SIF302)
// Pemasangan seluruh pendengar peristiwa. Berkas ini tidak mengubah state
// langsung: setiap pendengar memanggil fungsi pengubah di state.js.

import {
  barisFilter,
  tombolAturUlang,
  formKontak,
  bacaIsianForm,
  fokusKolom,
  kosongkanForm,
} from "./dom.js";
import { pilihKategori, aturUlangPilihan, periksaIsian, kirimForm } from "./state.js";

export function pasangPendengar() {
  // Satu pendengar di induk melayani semua tombol filter.
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return; // klik di luar tombol, abaikan
    pilihKategori(tombol.dataset.kategori);
  });

  // Tombol atur ulang: simpanan dihapus, lalu halaman digambar ulang.
  tombolAturUlang.addEventListener("click", () => aturUlangPilihan());

  // Satu pendengar input di form melayani semua kolom.
  formKontak.addEventListener("input", (event) => {
    periksaIsian(event.target.id, bacaIsianForm());
  });

  formKontak.addEventListener("submit", (event) => {
    event.preventDefault(); // baris pertama: halaman tidak dimuat ulang

    const isian = bacaIsianForm();
    const hasil = kirimForm(isian);
    if (!hasil.sah) {
      fokusKolom(hasil.pertama); // pandangan pindah ke kolom pertama yang perlu diperbaiki
      return;
    }

    // Arah nilai -> teks: isi form dijadikan badan JSON, siap dikirim ke peladen.
    console.log("badan JSON (simulasi kirim):", JSON.stringify(isian));
    kosongkanForm();
  });
}
