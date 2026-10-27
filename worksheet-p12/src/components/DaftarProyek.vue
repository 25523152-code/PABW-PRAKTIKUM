<script setup>
import { computed } from 'vue'
import { state } from '../state.js'

// Padanan saring(state) di P11: daftar terhitung dari state, bukan dari tombol yang diklik.
const tampil = computed(() =>
  state.daftarProyek.filter(
    (proyek) => state.kategoriAktif === 'semua' || proyek.kategori === state.kategoriAktif
  )
)
</script>

<template>
  <ul class="galeri" id="daftar">
    <li v-for="proyek in tampil" :key="proyek.id" class="kartu">
      <div class="kartu__isi">
        <h3 class="kartu__judul">{{ proyek.judul }}</h3>
      </div>
      <p class="kartu__teks">Tahun {{ proyek.tahun }}</p>
      <div class="kartu__kaki">
        <span class="label">{{ proyek.kategori }}</span>
        <span class="label">{{ proyek.selesai ? 'Selesai' : 'Dalam pengerjaan' }}</span>
      </div>
    </li>
  </ul>
  <p v-if="tampil.length === 0" id="pesan-kosong" role="status">Tidak ada proyek pada kategori itu.</p>
</template>
