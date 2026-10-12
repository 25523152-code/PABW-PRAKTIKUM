// dom.js — Zidan Fawaza Syahroni · Worksheet P9 (PABW SIF302)
// app.js menyimpan data dan fungsi murni; dom.js yang menyentuh halaman.

import { daftarProyek } from "./app.js";
import { ambilNotisia } from "./api.js";

// ===== Lembar A: elemen yang dipilih (lihat tabel A.3 di worksheet) =====
const wadah = document.querySelector("#daftar");
const barisFilter = document.querySelector("#filter");
const kosong = document.querySelector("#pesan-kosong");
const form = document.querySelector("#form-kontak");

// ===== Lembar B: satu isi array, satu kartu =====
// Semua isi dimasukkan dengan textContent, bukan innerHTML, jadi
// teks apa pun tampil sebagai teks dan tidak dijalankan sebagai HTML.
function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";

  const isi = document.createElement("div");
  isi.className = "kartu__isi";
  const judul = document.createElement("h3");
  judul.className = "kartu__judul";
  judul.textContent = proyek.judul;
  isi.append(judul);

  const keterangan = document.createElement("p");
  keterangan.className = "kartu__teks";
  keterangan.textContent = `Tahun ${proyek.tahun}`;

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";
  const labelKategori = document.createElement("span");
  labelKategori.className = "label";
  labelKategori.textContent = proyek.kategori;
  const labelStatus = document.createElement("span");
  labelStatus.className = "label";
  labelStatus.textContent = proyek.selesai ? "Selesai" : "Dalam pengerjaan";
  kaki.append(labelKategori, labelStatus);

  li.append(isi, keterangan, kaki);
  return li;
}

// ===== Lembar D: satu fungsi render untuk satu bagian halaman =====
// Tiga pekerjaan tetap, urutannya tidak boleh ditukar:
// kosongkan, periksa keadaan kosong, lalu isi ulang.
function render(daftar) {
  wadah.textContent = ""; // 1. kosongkan lebih dulu, supaya kartu tidak berlipat

  if (daftar.length === 0) { // 2. periksa keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment(); // halaman digambar sekali
  daftar.forEach((proyek) => fragmen.append(buatKartu(proyek))); // 3. isi ulang
  wadah.append(fragmen);
}

render(daftarProyek);

// ===== Lembar C: satu pendengar di induk melayani semua tombol filter =====
function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("aktif", aktif); // gayanya ada di komponen.css
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

// Dipasang di luar render, sekali saja.
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return; // klik di luar tombol, abaikan

  const kategori = tombol.dataset.kategori;
  const terpilih = daftarProyek.filter(
    (proyek) => kategori === "semua" || proyek.kategori === kategori
  );

  tandaiTombolAktif(tombol);
  render(terpilih);
});

// ===== Lembar D: form tidak memuat ulang halaman, galat muncul per kolom =====
const tombolKirim = form.querySelector("button[type='submit']");
const statusForm = document.querySelector("#status-form");

// Satu aturan per kolom: pemeriksa, dan pesan yang menyebut cara memperbaiki.
const aturanKolom = [
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

form.noValidate = true; // pesan galat dipegang JavaScript, bukan gelembung bawaan peramban

// Memeriksa satu kolom. Bila tampilkan benar, pesannya ikut dipasang atau dilepas.
function periksaKolom(aturan, tampilkan) {
  const kolom = form.querySelector(`#${aturan.id}`);
  const galat = form.querySelector(`#galat-${aturan.id}`);
  const sah = aturan.sah(kolom.value);

  if (tampilkan) {
    galat.textContent = sah ? "" : aturan.pesan;
    galat.hidden = sah;
    if (sah) {
      kolom.removeAttribute("aria-invalid");
    } else {
      kolom.setAttribute("aria-invalid", "true");
    }
  }
  return sah;
}

function periksaSemua(tampilkan) {
  // map dulu supaya setiap kolom diperiksa, bukan berhenti di yang pertama gagal
  return aturanKolom.map((aturan) => periksaKolom(aturan, tampilkan)).every(Boolean);
}

// Satu pendengar input di form: kolom yang sedang diketik diperiksa,
// lalu tombol kirim menunggu sampai seluruh kolom layak.
form.addEventListener("input", (event) => {
  const aturan = aturanKolom.find((a) => a.id === event.target.id);
  if (aturan) periksaKolom(aturan, true);

  tombolKirim.disabled = !periksaSemua(false);
  statusForm.hidden = true;
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // baris pertama: halaman tidak dimuat ulang

  const sah = periksaSemua(true);
  tombolKirim.disabled = !sah;

  if (!sah) {
    // pandangan pindah ke kolom pertama yang perlu diperbaiki
    const pertama = aturanKolom.find((a) => !a.sah(form.querySelector(`#${a.id}`).value));
    form.querySelector(`#${pertama.id}`).focus();
    return;
  }

  // Arah nilai -> teks: isi form dijadikan badan JSON, siap dikirim ke peladen.
  const badan = JSON.stringify(Object.fromEntries(new FormData(form)));
  console.log("badan JSON (simulasi kirim):", badan);

  // Belum ada server: pesan hanya dicatat di halaman ini.
  statusForm.textContent = "Terima kasih, pesan Anda sudah dicatat. (Simulasi: belum dikirim ke server.)";
  statusForm.hidden = false;
  form.reset();
  aturanKolom.forEach((aturan) => {
    form.querySelector(`#${aturan.id}`).removeAttribute("aria-invalid");
    const galat = form.querySelector(`#galat-${aturan.id}`);
    galat.textContent = "";
    galat.hidden = true;
  });
  tombolKirim.disabled = false;
});

// ===== Pertemuan 10: data dari jaringan (lapisan data ada di api.js) =====
const wadahNotisia = document.querySelector("#daftar-notisia");
const statusNotisia = document.querySelector("#status-notisia");

function tampilkanStatus(teks, galat = false) {
  statusNotisia.textContent = teks;
  statusNotisia.classList.toggle("galat", galat);
  statusNotisia.hidden = false;
}

// Satu fungsi penggambar: kosongkan, periksa keadaan kosong, lalu isi ulang.
function gambar(daftar) {
  wadahNotisia.textContent = ""; // kosongkan lebih dulu, supaya kartu tidak berlipat

  if (daftar.length === 0) {
    tampilkanStatus("Belum ada notisia");
    return;
  }
  statusNotisia.hidden = true;

  const fragmen = document.createDocumentFragment();
  daftar.forEach((n) => {
    const kartu = document.createElement("article");
    kartu.className = "kartu";

    const judul = document.createElement("h3");
    judul.className = "kartu__judul";
    judul.textContent = n.judul; // isi dari jaringan: textContent, bukan innerHTML
    const ringkasan = document.createElement("p");
    ringkasan.className = "kartu__teks";
    ringkasan.textContent = n.ringkasan;
    kartu.append(judul, ringkasan);

    if (n.catatan) {
      const catatan = document.createElement("p");
      catatan.className = "kartu__teks";
      catatan.textContent = "Catatan: " + n.catatan;
      kartu.append(catatan);
    }

    const kaki = document.createElement("div");
    kaki.className = "kartu__kaki";
    const labelPertemuan = document.createElement("span");
    labelPertemuan.className = "label";
    labelPertemuan.textContent = "Pertemuan " + n.pertemuan;
    const labelStatus = document.createElement("span");
    labelStatus.className = "label";
    labelStatus.textContent = n.selesai ? "Selesai" : "Berjalan";
    kaki.append(labelPertemuan, labelStatus);
    kartu.append(kaki);

    fragmen.append(kartu);
  });
  wadahNotisia.append(fragmen);
}

// try/catch kedua: api.js melempar ulang galatnya, di sini pesannya sampai ke halaman.
async function tampilkan() {
  tampilkanStatus("Memuat...");
  try {
    const data = await ambilNotisia();
    if (!Array.isArray(data.butir)) {
      throw new Error("bentuk data tidak sesuai: kunci butir bukan larik");
    }
    gambar(data.butir);
  } catch (galat) {
    wadahNotisia.textContent = "";
    tampilkanStatus("Gagal memuat data: " + galat.message, true);
  }
}

window.gambar = gambar; // hanya untuk uji dari Console, mis. gambar([])
tampilkan();
