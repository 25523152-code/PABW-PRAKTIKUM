// src/state.js — keadaan reaktif. Tidak ada penggambaran manual: Vue yang menggambar ulang.
import { reactive } from 'vue'
import { daftarProyek, daftarKategori } from './data.js'

export const state = reactive({
  daftarProyek: daftarProyek,
  kategoriAktif: 'semua',
})

export function pilihKategori(nilai) {
  if (!daftarKategori.includes(nilai)) return // kategori yang tidak dikenal diabaikan
  state.kategoriAktif = nilai // hanya mengubah state; tampilan mengikuti sendiri
}

// Data dari jaringan (js/api.js, Pertemuan 10) sengaja di objek terpisah:
// watch(state) di App.vue hanya perlu menyimpan pilihan tampilan, bukan data jaringan.
export const notisia = reactive({ status: 'memuat', butir: [], pesan: '' })

// ambil adalah fungsi pengambil data dari api.js, diserahkan oleh App.vue.
export async function muatNotisia(ambil) {
  notisia.status = 'memuat'
  notisia.butir = []
  notisia.pesan = ''
  try {
    const data = await ambil()
    if (!Array.isArray(data.butir)) {
      throw new Error('bentuk data tidak sesuai: kunci butir bukan larik')
    }
    notisia.butir = data.butir
    notisia.status = 'berhasil'
  } catch (galat) {
    notisia.butir = []
    notisia.pesan = galat.message
    notisia.status = 'gagal'
  }
}
