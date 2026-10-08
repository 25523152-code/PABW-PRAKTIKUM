# Jawaban Lembar F — Pertemuan 9

1. **Elemen, pemilih, variabel:** daftar proyek — `document.querySelector("#daftar")` — `wadah`.

2. **Perbedaan:** `querySelector` mengambil satu elemen pertama yang cocok, sedangkan `querySelectorAll` mengambil semua elemen yang cocok sebagai NodeList. `map` tidak langsung tersedia pada NodeList, sehingga dapat diubah dengan `Array.from()`.

3. **Event delegation:** satu pendengar di induk cukup untuk semua tombol filter dan tidak dipasang ulang setiap render. Buktinya `barisFilter.addEventListener("click", ...)` dan `event.target.closest("button")`.

4. **Jika pengosongan dihapus:** kartu lama tidak dibuang sehingga setiap render menambah kartu baru dan daftar berlipat. Pencegahnya `wadah.textContent = ""` sebagai baris pertama `render()`.

5. **innerHTML:** isi pengguna tidak boleh dimasukkan sebagai HTML. P9 menggunakan `createElement()` dan `textContent` agar isi diperlakukan sebagai teks.

**Satu baris untuk diingat:** selalu kosongkan wadah di awal `render()` supaya hasil filter tidak menumpuk.
