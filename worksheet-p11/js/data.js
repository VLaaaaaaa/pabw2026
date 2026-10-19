
export const profil = {
    nama: "Hafla Aqly",
    nim: "25523191",
    peran: "Mahasiswa Informatika",
    keahlian: ["HTML semantik", "CSS responsif", "JavaScript modern"]
};

export function buatPerkenalan({ nama, peran }) {
    return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

export function saring(daftar, kategori) {
    return daftar.filter(
        (lagu) =>
            kategori === "semua" ||
            lagu.genre.toLowerCase() === kategori
    );
}
