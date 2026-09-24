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