<script setup>
// Satu-satunya komponen yang menerima props. Anak hanya membaca, tidak mengubahnya.
const props = defineProps({
  profil: { type: Object, required: true },
})
</script>

<template>
  <div class="navbar__judul">
    <h1>{{ props.profil.nama }}</h1>
    <p class="tagline">{{ props.profil.peran }}</p>
  </div>
</template>
