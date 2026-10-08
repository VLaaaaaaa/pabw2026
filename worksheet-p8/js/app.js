const profil = {
    nama: "Hafla Aqly",
    nim: "25523191",
    peran: "Mahasiswa Informatika",
    keahlian: ["HTML semantik", "CSS responsif", "JavaScript modern"]
};

const daftarLagu = [
    {
        judul: "Car's Outside",
        artis: "James Arthur",
        genre: "Pop",
        tahun: 2019,
        sampul: {
            src: "cars-outside.jpg",
            alt: "Tampilan pemutar musik yang memutar Car's Outside oleh James Arthur, dengan sampul album YOU",
            tinggi: 1196
        }
    },
    {
        judul: "Photograph",
        artis: "Ed Sheeran",
        genre: "Pop",
        tahun: 2014
    },
    {
        judul: "Teh Hijau",
        artis: "Tulus",
        genre: "Pop",
        tahun: 2026,
        sampul: {
            src: "teh-hijau.jpg",
            alt: "Tampilan pemutar musik yang memutar Teh Hijau oleh Tulus, dengan sampul hijau berisi siluet punggung seorang pria",
            tinggi: 1308
        }
    }
];

function buatPerkenalan({ nama, peran }) {
    return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

const peranProfil = profil.peran ?? "Peran belum diisi";
const keahlianProfil = profil.keahlian ?? [];
console.log(buatPerkenalan({ nama: profil.nama, peran: peranProfil }));
console.log(formatKeahlian(keahlianProfil));

console.log("Uji pure function dengan data lain:");
console.log(buatPerkenalan({ nama: "Contoh Mahasiswa", peran: "Pengembang Web" }));
console.log(formatKeahlian(["Membaca", "Menulis"]));

const judulLagu = daftarLagu.map((lagu) => lagu.judul);
const laguPop = daftarLagu.filter((lagu) => lagu.genre === "Pop");
const laguDicari = daftarLagu.find((lagu) => lagu.judul === "Photograph");

console.table(profil.keahlian);
console.table(daftarLagu);
console.table(laguPop);
console.log(laguDicari);
console.log("Judul lagu dari map:", judulLagu);

const salinanProfil = { ...profil };
salinanProfil.nama = "Nama pada salinan";
const salinanLagu = [...daftarLagu];
const dataAsliSebelumSort = daftarLagu.map(
    (lagu) => `${lagu.judul}|${lagu.tahun}`
);
const laguUrut = [...daftarLagu].sort((a, b) => a.tahun - b.tahun);
const dataAsliSesudahSort = daftarLagu.map(
    (lagu) => `${lagu.judul}|${lagu.tahun}`
);
const dataAsliTidakBerubah = dataAsliSebelumSort.every(
    (data, indeks) => data === dataAsliSesudahSort[indeks]
);

console.log("Salinan profil tidak mengubah profil asli:", profil.nama === "Hafla Aqly");
console.log("Salinan array terpisah dari array asli:", salinanLagu !== daftarLagu);
console.log("Sorting hanya mengubah salinan:", dataAsliTidakBerubah);
console.table(laguUrut);

const propertiYangBelumAda = profil.perann;
console.log("Contoh property yang salah menghasilkan undefined:", propertiYangBelumAda);

const laguTanpaSampul = daftarLagu.find((lagu) => lagu.sampul === undefined);
const sumberSampul = laguTanpaSampul?.sampul?.src ?? "Sampul tidak tersedia";
console.log("Contoh akses data opsional:", sumberSampul);

const elemenDebugTidakAda = document.querySelector("#elemen-debug-tidak-ada");
if (elemenDebugTidakAda === null) {
    console.info("Debug DOM: elemen tidak ditemukan; periksa selector sebelum mengakses propertinya.");
}

const tahunInputContoh = "2026";
const tahunAngkaContoh = Number(tahunInputContoh);
let tahunBerikutnya = 0;
if (Number.isFinite(tahunAngkaContoh)) {
    tahunBerikutnya = tahunAngkaContoh + 1;
}
console.log("Konversi string ke number sebelum menghitung:", tahunBerikutnya);

function ambilElemen(selector) {
    const elemen = document.querySelector(selector);
    if (elemen === null) {
        throw new Error(`Elemen wajib dengan selector "${selector}" tidak ditemukan.`);
    }
    return elemen;
}

const elemenFooterProfil = ambilElemen("#profil-footer");
const elemenDaftarLagu = ambilElemen("#daftar-lagu");
const elemenGaleriMusik = ambilElemen("#galeri-musik");
const elemenJumlahLagu = ambilElemen("#jumlah-lagu");
const formMusik = ambilElemen("#form-musik");
const statusTambah = ambilElemen("#status-tambah");

elemenFooterProfil.textContent = `${profil.nama} · ${profil.nim} · 2026`;

formMusik.querySelectorAll('input[type="text"]').forEach((kolom) => {
    kolom.addEventListener("input", () => {
        kolom.setCustomValidity(
            kolom.value.trim() ? "" : "Kolom ini tidak boleh kosong."
        );
    });
});

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

function tampilkanLagu() {
    const barisLagu = document.createDocumentFragment();
    const kartuLagu = document.createDocumentFragment();

    daftarLagu.forEach((lagu) => {
        barisLagu.append(buatBaris(lagu));

        const kartu = buatKartu(lagu);
        if (kartu !== null) {
            kartuLagu.append(kartu);
        }
    });

    elemenDaftarLagu.replaceChildren(barisLagu);
    elemenGaleriMusik.replaceChildren(kartuLagu);
    elemenJumlahLagu.textContent = `${daftarLagu.length} lagu dalam daftar.`;
}

formMusik.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!formMusik.reportValidity()) {
        return;
    }

    const dataForm = new FormData(formMusik);
    const laguBaru = {
        judul: String(dataForm.get("judul-lagu") ?? "").trim(),
        artis: String(dataForm.get("artis") ?? "").trim(),
        genre: String(dataForm.get("genre") ?? "").trim(),
        tahun: Number(dataForm.get("tahun"))
    };

    if (
        laguBaru.judul === "" ||
        laguBaru.artis === "" ||
        laguBaru.genre === "" ||
        !Number.isInteger(laguBaru.tahun) ||
        laguBaru.tahun < 1900 ||
        laguBaru.tahun > 2100
    ) {
        statusTambah.textContent = "Periksa kembali data lagu dan tahun (1900–2100).";
        return;
    }

    daftarLagu.push(laguBaru);
    tampilkanLagu();
    formMusik.reset();
    statusTambah.textContent = `Lagu "${laguBaru.judul}" berhasil ditambahkan.`;
});

tampilkanLagu();
