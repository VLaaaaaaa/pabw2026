export const profil = {
    nama: "Hafla Aqly",
    nim: "25523191",
    peran: "Mahasiswa Informatika",
    keahlian: ["HTML semantik", "CSS responsif", "JavaScript modern"]
};

export const daftarLagu = [
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
