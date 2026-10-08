import { daftarProyek } from "./app.js";

const wadah = document.querySelector("#daftar");
const barisFilter = document.querySelector("#filter");
const kosong = document.querySelector("#pesan-kosong");
const form = document.querySelector("form");
const nama = document.querySelector("#nama");
const email = document.querySelector("#email");
const nim = document.querySelector("#nim");
const pesan = document.querySelector("#pesan");
const tombolKirim = document.querySelector('button[type="submit"]');
const galatNama = document.querySelector("#galat-nama");
const galatEmail = document.querySelector("#galat-email");
const galatNim = document.querySelector("#galat-nim");
const galatPesan = document.querySelector("#galat-pesan");

function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";
  li.textContent = `${proyek.judul} — ${proyek.tahun}`;
  return li;
}

function render(daftar) {
  wadah.textContent = "";
  if (daftar.length === 0) {
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
  daftar.forEach((proyek) => wadah.append(buatKartu(proyek)));
}

function tandaiTombolAktif(tombolAktif) {
  document.querySelectorAll("#filter button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
  });
}

barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;
  const kategori = tombol.dataset.kategori;
  const terpilih = daftarProyek.filter(
    (proyek) => kategori === "semua" || proyek.kategori === kategori
  );
  tandaiTombolAktif(tombol);
  render(terpilih);
});

function setGalat(input, elemenGalat, pesanGalat) {
  const salah = pesanGalat !== "";
  elemenGalat.textContent = pesanGalat;
  input.setAttribute("aria-invalid", salah ? "true" : "false");
  return !salah;
}

function periksaNama() {
  const nilai = nama.value.trim();
  return nilai === ""
    ? setGalat(nama, galatNama, "Isi nama lengkap Anda.")
    : setGalat(nama, galatNama, "");
}

function periksaEmail() {
  const nilai = email.value.trim();
  if (nilai === "") return setGalat(email, galatEmail, "Isi alamat email Anda.");
  if (!email.validity.valid) {
    return setGalat(email, galatEmail, "Masukkan email dengan format yang benar, contoh nama@email.com.");
  }
  return setGalat(email, galatEmail, "");
}

function periksaNim() {
  const nilai = nim.value.trim();
  if (nilai === "") return setGalat(nim, galatNim, "Isi NIM Anda.");
  if (!/^\d{8}$/.test(nilai)) {
    return setGalat(nim, galatNim, "Masukkan NIM berupa tepat 8 digit angka.");
  }
  return setGalat(nim, galatNim, "");
}

function periksaPesan() {
  const nilai = pesan.value.trim();
  return nilai === ""
    ? setGalat(pesan, galatPesan, "Isi pesan sebelum mengirim.")
    : setGalat(pesan, galatPesan, "");
}

function periksaForm() {
  const sah = periksaNama() && periksaEmail() && periksaNim() && periksaPesan();
  tombolKirim.disabled = !sah;
  return sah;
}

[nama, email, nim, pesan].forEach((input) => {
  input.addEventListener("input", periksaForm);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!periksaForm()) {
    const kolomPertama = [
      { input: nama, sah: periksaNama },
      { input: email, sah: periksaEmail },
      { input: nim, sah: periksaNim },
      { input: pesan, sah: periksaPesan },
    ].find((kolom) => !kolom.sah());
    if (kolomPertama) kolomPertama.input.focus();
    return;
  }
  alert("Form berhasil diperiksa. Data tidak dikirim ulang ke halaman.");
});

render(daftarProyek);
periksaForm();
