
import { saring } from "./data.js";

function ambilElemen(selector) {
    const elemen = document.querySelector(selector);

    if (elemen === null) {
        throw new Error(
            `Elemen wajib dengan selector "${selector}" tidak ditemukan.`
        );
    }

    return elemen;
}

const wadah = ambilElemen("#daftar-lagu");
const galeri = ambilElemen("#galeri-musik");
const jumlah = ambilElemen("#jumlah-lagu");

const kosong = ambilElemen("#pesan-kosong");
const muat = ambilElemen("#muat");
export const form = ambilElemen("#form-musik");
export const tombolSimpan = ambilElemen(
    '#form-musik button[type="submit"]'
);
export const statusTambah = ambilElemen("#status-tambah");
export const kolomForm = Array.from(form.querySelectorAll("input"));

export function tampilkanGalat(pesan) {
    jumlah.textContent = pesan;
}

export function aturMemuat(sedangMemuat) {
    muat.hidden = !sedangMemuat;
}

function buatSel(teks) {
    const sel = document.createElement("td");
    sel.textContent = teks;
    return sel;
}

function buatSelFavorit(lagu, favorit) {
    const sel = document.createElement("td");

    const tombol = document.createElement("button");
    tombol.className = "favorit";
    tombol.dataset.id = lagu.id;
    tombol.textContent = favorit.includes(lagu.id) ? "★" : "☆";

    sel.append(tombol);
    return sel;
}

function buatBaris(lagu, favorit) {
    const baris = document.createElement("tr");

    baris.append(
        buatSel(lagu.judul),
        buatSel(lagu.artis),
        buatSel(lagu.genre),
        buatSel(String(lagu.tahun)),
        buatSelFavorit(lagu, favorit)
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

    isi.append(
        judul,
        document.createTextNode(lagu.artis)
    );

    const lencana = document.createElement("span");
    lencana.className = "lencana";
    lencana.textContent = `${lagu.genre} · ${lagu.tahun}`;

    keterangan.append(isi, lencana);
    kartu.append(gambar, keterangan);

    return kartu;
}

function tandaiTombolAktif(kategori) {
    document.querySelectorAll("#filter button").forEach((tombol) => {
        tombol.classList.toggle("aktif", tombol.dataset.kategori === kategori);
    });
}

export function render(state) {
    wadah.textContent = ""; 
    galeri.textContent = "";
    tandaiTombolAktif(state.kategoriAktif);

    const tampil = saring(state.daftarProyek, state.kategoriAktif);

    if (tampil.length === 0) { 
        jumlah.textContent = "0 lagu ditampilkan.";
        kosong.textContent = "Belum ada lagu.";
        kosong.hidden = false;
        return;
    }

    kosong.hidden = true;
    jumlah.textContent = `${tampil.length} lagu ditampilkan.`;

    const barisLagu = document.createDocumentFragment();
    const kartuLagu = document.createDocumentFragment();

    tampil.forEach((lagu) => { 
        barisLagu.append(buatBaris(lagu, state.favorit));

        const kartu = buatKartu(lagu);

        if (kartu !== null) {
            kartuLagu.append(kartu);
        }
    });

    wadah.append(barisLagu);
    galeri.append(kartuLagu);
}

const pesanKosong = {
    "judul-lagu":
        "Judul lagu belum diisi. Ketik judul lagunya, misalnya Photograph.",
    artis:
        "Nama artis belum diisi. Ketik nama penyanyinya, misalnya Ed Sheeran.",
    genre:
        "Genre belum diisi. Ketik genrenya, misalnya Pop.",
    tahun:
        "Tahun belum diisi. Ketik angka tahun rilis, misalnya 2014."
};

function cariPesanGalat(kolom) {
    const nilai = kolom.value.trim();

    if (nilai === "") {
        return pesanKosong[kolom.id];
    }

    if (kolom.type === "number") {
        const tahun = Number(nilai);

        if (
            !Number.isInteger(tahun) ||
            tahun < 1900 ||
            tahun > 2100
        ) {
            return "Tahun harus angka bulat antara 1900 dan 2100, misalnya 2014.";
        }
    }

    return "";
}

export function tampilkanGalatKolom(kolom) {
    const idPesan = kolom.getAttribute("aria-describedby");
    const elemenPesan = idPesan
        ? document.getElementById(idPesan)
        : null;

    const pesan = cariPesanGalat(kolom);

    if (elemenPesan) {
        elemenPesan.textContent = pesan;
    }

    if (pesan === "") {
        kolom.removeAttribute("aria-invalid");
    } else {
        kolom.setAttribute("aria-invalid", "true");
    }

    return pesan === "";
}

export function formSah() {
    return kolomForm.every(
        (kolom) => cariPesanGalat(kolom) === ""
    );
}
