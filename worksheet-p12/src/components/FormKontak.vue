<script setup>
import { ref } from 'vue'
import { aturanKolom } from '../data.js'

// Isi form hanya dipakai di komponen ini, jadi cukup ref lokal (bukan state bersama).
const isian = ref({ nama: '', email: '', nim: '', pesan: '' })
const galat = ref({ nama: '', email: '', nim: '', pesan: '' })
const tombolNonaktif = ref(false)
const status = ref('')
const formEl = ref(null)

function semuaSah(nilai) {
  return aturanKolom.every((aturan) => aturan.sah(nilai[aturan.id]))
}

// Dipanggil saat pengguna mengetik. Nilai kolom yang sedang diketik diambil dari event,
// jadi hasilnya tidak bergantung pada urutan pembaruan v-model.
function periksa(id, event) {
  const nilai = { ...isian.value, [id]: event.target.value }
  const aturan = aturanKolom.find((a) => a.id === id)
  galat.value[id] = aturan.sah(nilai[id]) ? '' : aturan.pesan
  tombolNonaktif.value = !semuaSah(nilai)
  status.value = ''
}

// Dipanggil lewat @submit.prevent: halaman tidak dimuat ulang.
function kirim() {
  const nilai = isian.value
  const salah = aturanKolom.filter((a) => !a.sah(nilai[a.id]))
  aturanKolom.forEach((a) => {
    galat.value[a.id] = a.sah(nilai[a.id]) ? '' : a.pesan
  })

  if (salah.length > 0) {
    tombolNonaktif.value = true
    formEl.value.querySelector(`#${salah[0].id}`).focus() // pandangan ke kolom pertama yang salah
    return
  }

  // Arah nilai -> teks: isi form dijadikan badan JSON, siap dikirim ke peladen.
  console.log('badan JSON (simulasi kirim):', JSON.stringify(nilai))
  // Belum ada server: pesan hanya dicatat di halaman ini.
  status.value = 'Terima kasih, pesan Anda sudah dicatat. (Simulasi: belum dikirim ke server.)'
  isian.value = { nama: '', email: '', nim: '', pesan: '' }
  tombolNonaktif.value = false
}
</script>

<template>
  <form ref="formEl" action="#" method="post" id="form-kontak" novalidate @submit.prevent="kirim">
    <fieldset>
      <legend>Data pengirim</legend>

      <p>
        <label for="nama">Nama lengkap</label>
        <input
          id="nama"
          v-model="isian.nama"
          name="nama"
          type="text"
          autocomplete="name"
          aria-describedby="galat-nama"
          :aria-invalid="galat.nama ? 'true' : null"
          required
          @input="periksa('nama', $event)"
        />
        <span id="galat-nama" class="galat" :hidden="galat.nama === ''">{{ galat.nama }}</span>
      </p>

      <p>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="isian.email"
          name="email"
          type="email"
          autocomplete="email"
          aria-describedby="galat-email"
          :aria-invalid="galat.email ? 'true' : null"
          required
          @input="periksa('email', $event)"
        />
        <span id="galat-email" class="galat" :hidden="galat.email === ''">{{ galat.email }}</span>
      </p>

      <p>
        <label for="nim">NIM</label>
        <input
          id="nim"
          v-model="isian.nim"
          name="nim"
          type="text"
          inputmode="numeric"
          pattern="[0-9]{8}"
          aria-describedby="nim-bantuan galat-nim"
          :aria-invalid="galat.nim ? 'true' : null"
          required
          @input="periksa('nim', $event)"
        />
        <span id="nim-bantuan">Delapan digit angka, contoh 25523152.</span>
        <span id="galat-nim" class="galat" :hidden="galat.nim === ''">{{ galat.nim }}</span>
      </p>

      <p>
        <label for="pesan">Pesan</label>
        <textarea
          id="pesan"
          v-model="isian.pesan"
          name="pesan"
          rows="4"
          aria-describedby="galat-pesan"
          :aria-invalid="galat.pesan ? 'true' : null"
          required
          @input="periksa('pesan', $event)"
        ></textarea>
        <span id="galat-pesan" class="galat" :hidden="galat.pesan === ''">{{ galat.pesan }}</span>
      </p>

      <button type="submit" :disabled="tombolNonaktif">Kirim</button>
      <div id="status-form" class="status-form" role="status" :hidden="status === ''">{{ status }}</div>
    </fieldset>
  </form>
</template>
