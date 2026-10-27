<script setup>
import { onMounted, ref, watch } from 'vue'
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'
import { state, notisia, muatNotisia } from './state.js'
import { daftarKategori } from './data.js'
import { muat, simpan, aturUlang } from './simpanan.js'
import { ambilNotisia } from './api.js'

// Data untuk props KepalaProfil. Tulisannya sama dengan tagline di halaman P11.
const identitas = {
  nama: 'Zidan Fawaza Syahroni',
  peran: 'Mahasiswa Informatika yang sedang belajar membangun web dan aplikasi.',
}

// ----- Tema gelap dan terang (dari skrip kecil di profil.html P11) -----
const gelap = ref(false)

function terapkanTema(nilai) {
  document.documentElement.setAttribute('data-theme', nilai ? 'dark' : 'light')
}

function ubahTema(nilai) {
  gelap.value = nilai
  terapkanTema(nilai)
  try {
    localStorage.setItem('tema', nilai ? 'dark' : 'light')
  } catch {
    // penyimpanan tidak tersedia: pilihan hanya berlaku di sesi ini
  }
}

// ----- Keadaan dan simpanannya -----
// onMounted membaca simpanan satu kali, saat komponen pertama dipasang.
onMounted(() => {
  let tema = null
  try {
    tema = localStorage.getItem('tema')
  } catch {
    // diabaikan: ikut tema sistem
  }
  const sistemGelap = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  gelap.value = tema ? tema === 'dark' : Boolean(sistemGelap)
  terapkanTema(gelap.value)

  const isi = muat() // VERSI diperiksa di dalam muat(); bentuk lama atau rusak dibuang
  const kategori = isi?.kategoriAktif ?? 'semua'
  if (daftarKategori.includes(kategori)) {
    state.kategoriAktif = kategori
  } else {
    aturUlang() // kategori yang tidak dikenal: buang simpanannya, pakai nilai bawaan
  }

  muatNotisia(ambilNotisia) // data jaringan masuk ke state, tampilan mengikuti sendiri
})

// watch menulis simpanan setiap kali state berubah. Tidak ada pemanggilan penyimpanan di template.
watch(state, (nilai) => simpan(nilai), { deep: true })

function aturUlangPilihan() {
  aturUlang()
  state.kategoriAktif = 'semua'
  simpan(state) // simpanan ditulis ulang berisi nilai bawaan, bukan dibiarkan kosong
}
</script>

<template>
  <a class="lewati" href="#utama">Lewati ke konten utama</a>

  <div class="page">
    <header class="navbar">
      <KepalaProfil :profil="identitas" />

      <nav aria-label="Navigasi utama">
        <ul>
          <li><a href="#tentang">Tentang</a></li>
          <li><a href="#karya">Karya</a></li>
          <li><a href="#kontak">Kontak</a></li>
        </ul>
      </nav>

      <label class="pengalih-tema">
        <input id="tema-manual" type="checkbox" :checked="gelap" @change="ubahTema($event.target.checked)" />
        <span>Mode gelap</span>
      </label>
    </header>

    <div class="isi">
      <aside class="sisi">
        <nav aria-label="Menu halaman">
          <ul class="menu-samping">
            <li><a href="#tentang">Tentang saya</a></li>
            <li><a href="#karya">Karya saya</a></li>
            <li><a href="#notisia">Catatan belajar</a></li>
            <li><a href="#faq">Pertanyaan</a></li>
            <li><a href="#perjalanan">Lini masa belajar</a></li>
            <li><a href="#kemampuan">Hal yang dipelajari</a></li>
            <li><a href="#kontak">Hubungi saya</a></li>
          </ul>
        </nav>
      </aside>

      <main class="utama" id="utama">
        <section class="kartu" id="tentang">
          <h2>Tentang saya</h2>

          <figure class="foto">
            <img
              src="/media/foto-profil.jpg"
              alt="Foto diri Zidan Fawaza Syahroni."
              width="480"
              height="480"
              loading="lazy"
            />
            <figcaption>Foto profil Zidan Fawaza Syahroni.</figcaption>
          </figure>

          <p>
            Saya mahasiswa Program Studi Informatika Universitas Islam Indonesia.
            Saya tertarik pada pengembangan web dan aplikasi, terutama bagaimana
            tampilan yang sederhana dapat membuat sebuah sistem lebih mudah digunakan.
          </p>

          <div class="tabel-gulir">
            <table>
              <caption>Kegiatan yang saya ikuti semester ini</caption>
              <thead>
                <tr>
                  <th scope="col">Kegiatan</th>
                  <th scope="col">Peran</th>
                  <th scope="col">Waktu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Praktikum PABW</th>
                  <td>Peserta</td>
                  <td><time datetime="2026-09">September 2026</time></td>
                </tr>
                <tr>
                  <th scope="row">Algoritma &amp; Struktur Data</th>
                  <td>Mahasiswa</td>
                  <td><time datetime="2026">2026</time></td>
                </tr>
                <tr>
                  <th scope="row">Pengembangan aplikasi</th>
                  <td>Peserta</td>
                  <td><time datetime="2026">2026</time></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blok" id="karya">
          <h2>Karya saya</h2>
          <div class="baris-aksi">
            <TombolFilter />
            <button type="button" class="atur-ulang" id="atur-ulang" @click="aturUlangPilihan">
              Atur ulang pilihan
            </button>
          </div>
          <DaftarProyek />
        </section>

        <section class="blok" id="notisia">
          <h2>Catatan belajar terbaru</h2>
          <p v-if="notisia.status === 'memuat'" id="status-notisia" role="status">Memuat...</p>
          <p v-else-if="notisia.status === 'gagal'" id="status-notisia" class="galat" role="status">
            Gagal memuat data: {{ notisia.pesan }}
          </p>
          <p v-else-if="notisia.butir.length === 0" id="status-notisia" role="status">Belum ada notisia</p>
          <div class="galeri" id="daftar-notisia">
            <article v-for="n in notisia.butir" :key="n.id" class="kartu">
              <h3 class="kartu__judul">{{ n.judul }}</h3>
              <p class="kartu__teks">{{ n.ringkasan }}</p>
              <p v-if="n.catatan" class="kartu__teks">Catatan: {{ n.catatan }}</p>
              <div class="kartu__kaki">
                <span class="label">Pertemuan {{ n.pertemuan }}</span>
                <span class="label">{{ n.selesai ? 'Selesai' : 'Berjalan' }}</span>
              </div>
            </article>
          </div>
        </section>

        <div class="galeri">
          <section class="kartu" id="faq">
            <h2>Pertanyaan tentang saya</h2>
            <div class="daftar-tanya">
              <details>
                <summary>Apa yang sedang saya pelajari?</summary>
                <p>Saya sedang mempelajari pengembangan web, pemrograman, dan cara membuat antarmuka yang mudah digunakan.</p>
              </details>
              <details>
                <summary>Apa tujuan saya belajar web?</summary>
                <p>Saya ingin memahami proses membuat halaman web dari struktur HTML sampai tampilan CSS yang rapi dan responsif.</p>
              </details>
            </div>
          </section>

          <section class="kartu" id="perjalanan">
            <h2>Lini masa belajar</h2>
            <ol class="timeline">
              <li><strong>2026 — Dasar pemrograman:</strong> memperkuat konsep algoritma dan pemrograman.</li>
              <li><strong>2026 — Pengembangan web:</strong> belajar HTML, CSS, aksesibilitas, dan design token.</li>
              <li><strong>2026 — Pengembangan aplikasi:</strong> mengembangkan latihan aplikasi dan proyek kuliah.</li>
            </ol>
          </section>

          <section class="kartu" id="kemampuan">
            <h2>Hal yang sedang dipelajari</h2>
            <dl>
              <dt>HTML</dt>
              <dd>Menyusun struktur halaman yang semantik dan mudah diakses.</dd>
              <dt>CSS</dt>
              <dd>Membuat tampilan responsif dengan flexbox, grid, token, dan tema.</dd>
              <dt>Java</dt>
              <dd>Mempelajari pemrograman berorientasi objek dan pengembangan aplikasi.</dd>
            </dl>
          </section>
        </div>
      </main>

      <section class="kartu bawah" id="kontak">
        <h2>Hubungi saya</h2>
        <p>Isi formulir berikut. Semua kolom bertanda wajib harus diisi.</p>
        <FormKontak />
      </section>
    </div>

    <footer class="kaki">
      <p>Zidan Fawaza Syahroni · 25523152 · <time datetime="2026">2026</time></p>
    </footer>
  </div>
</template>
