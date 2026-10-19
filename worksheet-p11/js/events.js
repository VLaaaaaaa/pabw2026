
import {
    pilihKategori,
    tambahFavorit,
    tambahLagu,
    aturUlang
} from "./state.js";
import {
    form,
    kolomForm,
    tombolSimpan,
    statusTambah,
    tampilkanGalatKolom,
    formSah
} from "./dom.js";

export function pasangPendengar() {
    document.querySelector("#filter").addEventListener("click", (event) => {
        const tombol = event.target.closest("button");

        if (!tombol) {
            return;
        }

        pilihKategori(tombol.dataset.kategori);
    });

    document.querySelector("#daftar-lagu").addEventListener("click", (event) => {
        const tombol = event.target.closest(".favorit");

        if (!tombol) {
            return;
        }

        tambahFavorit(Number(tombol.dataset.id));
    });

    document.querySelector("#atur-ulang").addEventListener("click", aturUlang);

    form.addEventListener("input", (event) => {
        if (!kolomForm.includes(event.target)) {
            return;
        }

        tampilkanGalatKolom(event.target);
        tombolSimpan.disabled = !formSah();
        statusTambah.textContent = "";
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const kolomBermasalah = kolomForm.filter(
            (kolom) => !tampilkanGalatKolom(kolom)
        );

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

        tambahLagu(laguBaru);
        form.reset();

        statusTambah.textContent =
            `Lagu "${laguBaru.judul}" berhasil ditambahkan.`;
    });
}
