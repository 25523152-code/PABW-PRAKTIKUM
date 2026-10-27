<script setup>
import { state, pilihKategori } from '../state.js'
import { daftarKategori } from '../data.js'

function label(kategori) {
  return kategori.charAt(0).toUpperCase() + kategori.slice(1)
}
</script>

<template>
  <div class="filter" id="filter" role="group" aria-label="Saring proyek menurut kategori">
    <button
      v-for="kategori in daftarKategori"
      :key="kategori"
      type="button"
      :data-kategori="kategori"
      :class="{ aktif: state.kategoriAktif === kategori }"
      :aria-pressed="String(state.kategoriAktif === kategori)"
      @click="pilihKategori(kategori)"
    >
      {{ label(kategori) }}
    </button>
  </div>
</template>
