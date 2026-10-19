
import { ambilProyek } from "./api.js";
import { profil, buatPerkenalan, formatKeahlian } from "./data.js";
import { isiProyek, pulihkan, muat } from "./state.js";
import { tampilkanGalat, aturMemuat } from "./dom.js";
import { pasangPendengar } from "./events.js";

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

async function mulai() {
    pulihkan(muat()); 
    pasangPendengar(); 
    aturMemuat(true);

    try {
        isiProyek(await ambilProyek()); 
    } catch (galat) {
        tampilkanGalat("Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.");
    } finally {
        aturMemuat(false);
    }
}

mulai();
