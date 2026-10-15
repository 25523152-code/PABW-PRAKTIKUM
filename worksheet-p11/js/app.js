// app.js — Zidan Fawaza Syahroni · Worksheet P11 (PABW SIF302)
// Perakit: hanya mengimpor dan memanggil. Tidak ada logika di berkas ini.

import { state, muat, muatKeadaan, muatNotisia } from "./state.js";
import { pasangPendengar } from "./events.js";
import { render } from "./dom.js";
import { ambilNotisia } from "./api.js";

muatKeadaan(); // keadaan awal dari simpanan, atau nilai bawaan
pasangPendengar(); // semua pendengar dipasang sekali
render(state); // gambar pertama
muatNotisia(ambilNotisia); // data jaringan masuk ke state, lalu digambar

// Hanya untuk uji dari Console (console.log(state), console.log(muat())):
// nama di dalam modul tidak terbuka bila tidak dipasang ke window.
Object.assign(window, { state, muat });
