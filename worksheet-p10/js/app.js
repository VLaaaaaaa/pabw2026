
import { ambilProyek } from "./api.js";
import { aturDaftarLagu, tampilkanStatusData } from "./dom.js";

export const profil = {
    nama: "Hafla Aqly",
    nim: "25523191",
    peran: "Mahasiswa Informatika",
    keahlian: ["HTML semantik", "CSS responsif", "JavaScript modern"]
};

function buatPerkenalan({ nama, peran }) {
    return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));


const badan = JSON.stringify({
    judul: "Judul contoh",
    kategori: "web"
});

console.log(typeof badan); // string
console.log(badan);


async function mulaiAplikasi() {
    tampilkanStatusData("Sedang memuat data...");

    try {
        const data = await ambilProyek();

        if (!Array.isArray(data)) {
            throw new Error("Format data harus berupa larik.");
        }

        
        if (data.length > 0) {
            console.log(data[0].judul);
        }

        // C.2: Memeriksa bentuk data
        console.log("Data berupa larik:", Array.isArray(data));
        console.log("Jumlah data:", data.length);
        console.log("Data lengkap:", data);

        aturDaftarLagu(data);

        tampilkanStatusData(
            data.length === 0
                ? "Data berhasil dimuat, tetapi belum ada lagu."
                : `Berhasil memuat ${data.length} lagu.`
        );
    } catch (galat) {
        console.error("Gagal menjalankan aplikasi:", galat.message);
        tampilkanStatusData(`Gagal memuat data: ${galat.message}`);
    }
}

mulaiAplikasi();
