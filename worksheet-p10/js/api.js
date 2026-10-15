
const ALAMAT = "./data/proyek.json";

export async function ambilDaftarLagu() {
    const respons = await fetch(ALAMAT);

    console.log("status", respons.status, "ok", respons.ok);

    if (!respons.ok) {
        throw new Error(`Gagal mengambil data: ${respons.status}`);
    }

    const data = await respons.json();
    return data;
}
