import { daftarLagu, profil } from "./app.js";


function ambilElemen(selector) {
    const elemen = document.querySelector(selector);
    if (elemen === null) {
        throw new Error(`Elemen wajib dengan selector "${selector}" tidak ditemukan.`);
    }
    return elemen;
}

const wadah = ambilElemen("#daftar-lagu");
const galeri = ambilElemen("#galeri-musik");
const jumlah = ambilElemen("#jumlah-lagu");
const barisFilter = ambilElemen("#filter");
const kosong = ambilElemen("#pesan-kosong");
const form = ambilElemen("#form-musik");
const tombolSimpan = ambilElemen('#form-musik button[type="submit"]');
const statusTambah = ambilElemen("#status-tambah");
const footerProfil = ambilElemen("#profil-footer");
const kolomForm = Array.from(form.querySelectorAll("input"));

footerProfil.textContent = `${profil.nama} · ${profil.nim} · 2026`;


function buatSel(teks) {
    const sel = document.createElement("td");
    sel.textContent = teks;
    return sel;
}

function buatBaris(lagu) {
    const baris = document.createElement("tr");
    baris.append(
        buatSel(lagu.judul),
        buatSel(lagu.artis),
        buatSel(lagu.genre),
        buatSel(String(lagu.tahun))
    );
    return baris;
}

function buatKartu(lagu) {
    const sumber = lagu.sampul?.src ?? "";
    if (sumber === "") {
        return null;
    }

    const kartu = document.createElement("figure");
    kartu.className = "kartu";

    const gambar = document.createElement("img");
    gambar.src = sumber;
    gambar.alt = lagu.sampul?.alt ?? `Sampul ${lagu.judul}`;
    gambar.width = 736;
    gambar.height = lagu.sampul?.tinggi ?? 1196;
    gambar.loading = "lazy";

    const keterangan = document.createElement("figcaption");
    keterangan.className = "kartu__kaki";

    const isi = document.createElement("span");
    isi.className = "kartu__isi";

    const judul = document.createElement("span");
    judul.className = "kartu__judul";
    judul.textContent = lagu.judul;
    isi.append(judul, document.createTextNode(lagu.artis));

    const lencana = document.createElement("span");
    lencana.className = "lencana";
    lencana.textContent = `${lagu.genre} · ${lagu.tahun}`;

    keterangan.append(isi, lencana);
    kartu.append(gambar, keterangan);
    return kartu;
}


function render(daftar) {
    wadah.textContent = "";                 
    galeri.textContent = "";
    jumlah.textContent = `${daftar.length} lagu ditampilkan.`;

    if (daftar.length === 0) {              
        kosong.hidden = false;
        return;
    }
    kosong.hidden = true;

    const barisLagu = document.createDocumentFragment();   
    const kartuLagu = document.createDocumentFragment();

    daftar.forEach((lagu) => {
        barisLagu.append(buatBaris(lagu));

        const kartu = buatKartu(lagu);
        if (kartu !== null) {
            kartuLagu.append(kartu);
        }
    });

    wadah.append(barisLagu);
    galeri.append(kartuLagu);
}


let kategoriAktif = "semua";

function saring() {
    return daftarLagu.filter(
        (lagu) => kategoriAktif === "semua" || lagu.genre.toLowerCase() === kategoriAktif
    );
}

function tandaiTombolAktif(tombolAktif) {
    document.querySelectorAll("#filter button").forEach((tombol) => {
        tombol.classList.toggle("aktif", tombol === tombolAktif);
    });
}

barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return;

    kategoriAktif = tombol.dataset.kategori;
    tandaiTombolAktif(tombol);
    render(saring());
});

// Lembar D: validasi form per kolom
const pesanKosong = {
    "judul-lagu": "Judul lagu belum diisi. Ketik judul lagunya, misalnya Photograph.",
    artis: "Nama artis belum diisi. Ketik nama penyanyinya, misalnya Ed Sheeran.",
    genre: "Genre belum diisi. Ketik genrenya, misalnya Pop.",
    tahun: "Tahun belum diisi. Ketik angka tahun rilis, misalnya 2014."
};

function cariPesanGalat(kolom) {
    const nilai = kolom.value.trim();
    if (nilai === "") {
        return pesanKosong[kolom.id];
    }
    if (kolom.type === "number") {
        const tahun = Number(nilai);
        if (!Number.isInteger(tahun) || tahun < 1900 || tahun > 2100) {
            return "Tahun harus angka bulat antara 1900 dan 2100, misalnya 2014.";
        }
    }
    return "";
}

function tampilkanGalat(kolom) {
    const pesan = cariPesanGalat(kolom);
    ambilElemen(`#${kolom.getAttribute("aria-describedby")}`).textContent = pesan;

    if (pesan === "") {
        kolom.removeAttribute("aria-invalid");
    } else {
        kolom.setAttribute("aria-invalid", "true");
    }
    return pesan === "";
}

function formSah() {
    return kolomForm.every((kolom) => cariPesanGalat(kolom) === "");
}

form.addEventListener("input", (event) => {
    tampilkanGalat(event.target);
    tombolSimpan.disabled = !formSah();
    statusTambah.textContent = "";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const kolomBermasalah = kolomForm.filter((kolom) => !tampilkanGalat(kolom));
    tombolSimpan.disabled = kolomBermasalah.length > 0;
    if (kolomBermasalah.length > 0) {
        kolomBermasalah[0].focus();
        return;
    }

    const dataForm = new FormData(form);
    const laguBaru = {
        judul: String(dataForm.get("judul-lagu")).trim(),
        artis: String(dataForm.get("artis")).trim(),
        genre: String(dataForm.get("genre")).trim(),
        tahun: Number(dataForm.get("tahun"))
    };

    daftarLagu.push(laguBaru);
    render(saring());
    form.reset();
    statusTambah.textContent = `Lagu "${laguBaru.judul}" berhasil ditambahkan.`;
});

render(saring());
