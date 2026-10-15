# PABW — Hafla Aqly — 25523191

Repo ini memuat pekerjaan mata kuliah Pengembangan Aplikasi
Berbasis Web, satu folder untuk setiap pertemuan.

## Pertemuan 3 — Halaman profil saya

Topik halaman saya: music yang pernah saya dengar.

- Judul halaman: Music yang Pernah Saya Dengar

- Deskripsi: berisi daftar musik yang pernah saya dengar beserta informasi tentang lagu tersebut.

- Tautan navigasi: Daftar Musik, Genre Musik, Tambah Musik

- Dua bagian utama: Daftar Musik, Tambah Musik

- Kolom tabel: judul lagu, artis, genre, tahun

- Kolom form: judul lagu, artis, genre

- Gambar: musik.jpg

## Pertemuan 4 - Design Token Halaman Profil
## Deskripsi
Website ini merupakan pengembangan dari halaman profil pada Pertemuan 3.
Website menampilkan daftar musik yang pernah saya dengar, informasi genre,
gambar yang berkaitan dengan musik, serta form untuk menambahkan musik.

Pada Pertemuan 4, halaman dikembangkan menggunakan CSS dengan pendekatan
Design Token, Flexbox, responsive layout, form state, dan dark theme.
## Struktur File

- profil.html — halaman utama website
- tokens.css — berisi design token seperti warna, spacing, radius, shadow, dan ukuran teks
- base.css — berisi reset CSS, box-sizing, typography, dan style dasar
- layout.css — mengatur layout header, navigasi, main, katalog, dan footer
- komponen.css — mengatur komponen seperti tabel, gambar, form, tombol, dan focus state
- tema.css — mengatur dark theme otomatis dan toggle tema manual
## Design Token

Design token dibagi menjadi dua lapisan:

1. Primitive Token
   Berisi nilai dasar seperti warna, spacing, radius, shadow, dan ukuran teks.

2. Semantic Token
   Berisi penggunaan warna berdasarkan fungsi, seperti:
   - background
   - foreground/text
   - surface
   - border
   - primary
   - danger
   - focus

Komponen menggunakan semantic token dengan var(--nama-token).

## Layout

Layout website menggunakan:
- Flexbox
- gap
- flex-wrap
- satuan rem
- responsive layout

Layout dibuat agar halaman tetap nyaman digunakan pada ukuran layar yang berbeda.

## Form

Form tambah musik menggunakan:
- label yang terhubung dengan input
- font: inherit
- :focus-visible untuk indikator fokus
- :user-invalid untuk validasi input
- pesan kesalahan menggunakan :has()

## Dark Theme

Website menyediakan dua cara untuk menggunakan tema gelap:

1. Mengikuti pengaturan tema sistem menggunakan prefers-color-scheme: dark.
2. Menggunakan toggle tema manual pada halaman.
## Penggunaan AI

AI digunakan sebagai alat bantu dalam proses pengerjaan, terutama untuk:
- memahami instruksi worksheet;
- membantu menemukan kesalahan dalam kode.

Kode dan desain akhir disesuaikan dan diperiksa kembali oleh saya.

# Worksheet P5 - Flexbox dan Grid

Hafla Aqly, 25523191, SIF302

Ini lanjutan halaman "Music yang Pernah Saya Dengar" dari P4. Isi, warna, dan token-nya tidak saya ubah. Yang saya ganti cuma cara halamannya disusun, dari yang tadinya mengalir biasa jadi pakai grid dan flex. Di HTML saya tambah satu pembungkus .page
 dan beberapa nama kelas.

Jadi halamannya tiga baris (auto 1fr auto di .page), dan baris tengahnya dibagi dua kolom (16rem 1fr di .isi). Blok di baris tengah saya tempatkan pakai area bernama, sisi dan utama, supaya tidak perlu hitung nomor garis.

## Yang pakai apa

Grid saya pakai untuk yang butuh dua arah: kerangka .page, isi dua kolom .isi, dan galeri. Flex saya pakai untuk yang cuma berderet: navbar, menu, dan baris kaki di tiap kartu (judul lagu di kiri, genre dan tahun di kanan).

Galeri pakai repeat(auto-fit, minmax(16rem, 1fr)), jadi jumlah kolomnya menyesuaikan sendiri tanpa media query. Di 1280 px jadi dua kolom, di 360 px jadi satu.

## Masalah yang ketemu

Pertama, tabel bikin kolom konten melebar dan halaman ikut meluber ke samping. Ternyata item grid tidak mau lebih kecil dari isinya, jadi .utama saya kasih min-width: 0.

Kedua, sidebar 16rem di layar 360 px memakan hampir seluruh lebar, sisa ruang untuk konten cuma sekitar 48 px. Karena itu saya tambah satu media query di bawah 48rem yang membuat .isi jadi satu kolom, konten dulu baru form. Ini di luar yang diminta worksheet, tapi tanpa ini halamannya tidak enak dibuka di HP.

Ketiga, tombol tema dari P4 tidak bisa balik ke terang kalau sistemnya sudah mode gelap. Sekarang tombolnya membalik pilihan sistem, jadi dari gelap bisa ke terang dan sebaliknya. Tulisannya saya ganti jadi "Ganti tema".

## Pertemuan 8 — JavaScript Modern ES6+, Struktur Data, dan Array Methods

Pertemuan 8 melanjutkan website musik dari P5. Jalankan `worksheet-p8/profil.html`
menggunakan Live Server agar modul JavaScript dan file CSS/gambar dimuat dari
folder project yang sama.

- Data profil disimpan dalam object `profil`, sedangkan musik disimpan dalam
  array of object `daftarLagu`.
- `const` digunakan untuk data dan referensi yang tidak ditunjuk ulang. `let`
  digunakan untuk hasil perhitungan yang nilainya diperbarui.
- Template literal digunakan untuk menyusun teks perkenalan, keterangan lagu,
  pesan status, dan footer.
- Nullish coalescing (`??`) menyediakan nilai bawaan, sedangkan optional
  chaining (`?.`) mengakses informasi sampul yang mungkin belum tersedia.
- `buatPerkenalan` dan `formatKeahlian` adalah pure function: keduanya hanya
  menggunakan argumen dan mengembalikan hasil tanpa mengubah data luar.
- `map()` mengambil judul lagu, `filter()` menyaring lagu bergenre Pop, dan
  `find()` mencari satu lagu berdasarkan judul.
- Spread operator membuat salinan object profil dan array musik. Lagu diurutkan
  pada salinan, lalu data awal diperiksa untuk memastikan tidak berubah.
- Tabel, jumlah lagu, dan galeri dibuat dari data JavaScript. Form menambahkan
  data baru ke array dan memperbarui tampilan.
- Contoh debugging di Console memperlihatkan property yang tidak tersedia
  (`undefined`), pemeriksaan hasil `querySelector` sebelum menggunakan elemen,
  dan konversi nilai input string menjadi number.

### Pernyataan penggunaan AI

AI membantu memindahkan implementasi JavaScript ke modul, menyusun contoh
object/array, pure function, array methods, dan pemeriksaan debugging. Topik,
identitas, dan data lagu mengikuti project P5. Sebelum mengumpulkan, saya perlu
membaca dan memahami setiap bagian kode serta memeriksa sendiri hasilnya di
Console; catatan ini harus disesuaikan bila ada bagian yang saya ubah atau
kerjakan sendiri.

## worksheet 9
## Deskripsi
Website sederhana untuk menampilkan koleksimusic favorit, menyaring berdasarkan kategori, dan memvalidasi formulir menggunakan JavaScript DOM.

## Penggunaan AI
AI digunakan sebagai bantuan untuk memahami konsep JavaScript DOM, event delegation, rendering daftar, dan validasi formulir, serta untuk membantu menemukan kesalahan kode.

Saya menguji halaman melalui browser dan menyesuaikan kode dengan proyek saya sendiri.

# Pertemuan 10: JavaScript Asinkron (fetch, Promise, JSON)
AI digunakan sebagai alat bantu dalam proses pengerjaan, terutama untuk:
- memahami instruksi worksheet;
- membantu menemukan kesalahan dalam kode.