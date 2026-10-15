// dom.js — Zidan Fawaza Syahroni · Worksheet P11 (PABW SIF302)
// Seluruh sentuhan ke halaman: pemilih, render, dan perubahan kelas.
// Berkas ini tidak menyimpan keadaan; ia hanya menggambar state yang diberikan.

// ===== Elemen yang dipilih =====
const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");
const wadahNotisia = document.querySelector("#daftar-notisia");
const statusNotisia = document.querySelector("#status-notisia");
const tombolKirim = document.querySelector("#form-kontak button[type='submit']");
const statusForm = document.querySelector("#status-form");

// Dipakai events.js untuk memasang pendengar.
export const barisFilter = document.querySelector("#filter");
export const tombolAturUlang = document.querySelector("#atur-ulang");
export const formKontak = document.querySelector("#form-kontak");

formKontak.noValidate = true; // pesan galat dipegang JavaScript, bukan gelembung bawaan peramban

// ===== Kartu: semua isi dimasukkan dengan textContent, bukan innerHTML =====
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

function buatKartuNotisia(n) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const judul = document.createElement("h3");
  judul.className = "kartu__judul";
  judul.textContent = n.judul;
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

  return kartu;
}

// ===== Penyaring: kategori dibaca dari state, bukan dari tombol yang diklik =====
function saring(state) {
  return state.daftarProyek.filter(
    (proyek) => state.kategoriAktif === "semua" || proyek.kategori === state.kategoriAktif
  );
}

function tandaiTombolAktif(kategoriAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategoriAktif;
    tombol.classList.toggle("aktif", aktif); // gayanya ada di komponen.css
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

function tampilkanStatusNotisia(teks, galat = false) {
  statusNotisia.textContent = teks;
  statusNotisia.classList.toggle("galat", galat);
  statusNotisia.hidden = false;
}

function gambarNotisia(notisia) {
  wadahNotisia.textContent = "";

  if (notisia.status === "memuat") {
    tampilkanStatusNotisia("Memuat...");
  } else if (notisia.status === "gagal") {
    tampilkanStatusNotisia("Gagal memuat data: " + notisia.pesan, true);
  } else if (notisia.butir.length === 0) {
    tampilkanStatusNotisia("Belum ada notisia");
  } else {
    statusNotisia.hidden = true;
    const fragmen = document.createDocumentFragment();
    notisia.butir.forEach((n) => fragmen.append(buatKartuNotisia(n)));
    wadahNotisia.append(fragmen);
  }
}

function gambarForm(keadaan) {
  Object.entries(keadaan.galat).forEach(([id, pesan]) => {
    const kolom = formKontak.querySelector(`#${id}`);
    const tempatGalat = formKontak.querySelector(`#galat-${id}`);
    tempatGalat.textContent = pesan;
    tempatGalat.hidden = pesan === "";
    if (pesan === "") {
      kolom.removeAttribute("aria-invalid");
    } else {
      kolom.setAttribute("aria-invalid", "true");
    }
  });
  tombolKirim.disabled = keadaan.tombolNonaktif;
  statusForm.textContent = keadaan.status;
  statusForm.hidden = keadaan.status === "";
}

// ===== render(state): tampilan adalah fungsi dari keadaan =====
// Tiga pekerjaan tetap untuk daftar proyek, urutannya tidak boleh ditukar:
// kosongkan, periksa keadaan kosong, lalu isi ulang dari state.
export function render(state) {
  wadah.textContent = ""; // 1. kosongkan lebih dulu, supaya kartu tidak berlipat

  const tampil = saring(state); // dari state, bukan argumen
  if (tampil.length === 0) { // 2. keadaan kosong
    kosong.hidden = false;
  } else {
    kosong.hidden = true;
    const fragmen = document.createDocumentFragment(); // halaman digambar sekali
    tampil.forEach((proyek) => fragmen.append(buatKartu(proyek))); // 3. isi ulang
    wadah.append(fragmen);
  }

  tandaiTombolAktif(state.kategoriAktif);
  gambarNotisia(state.notisia);
  gambarForm(state.form);
}

// ===== Pembantu untuk events.js: membaca masukan dan mengatur form =====
export function bacaIsianForm() {
  return Object.fromEntries(new FormData(formKontak));
}

export function fokusKolom(id) {
  formKontak.querySelector(`#${id}`).focus();
}

export function kosongkanForm() {
  formKontak.reset();
}
