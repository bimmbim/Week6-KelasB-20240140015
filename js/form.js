const form = document.getElementById("form");
const hasilEl = document.getElementById("hasil");

const rules = {
  nama: (v) => {
    v = v.trim();
    if (!v) return "Nama wajib diisi.";
    if (v.length < 3) return `Nama minimal 3 karakter (sekarang ${v.length}).`;
    if (!/\p{L}/u.test(v)) return "Nama harus mengandung huruf.";
    return "";
  },
  email: (v) => {
    v = v.trim();
    if (!v) return "Email wajib diisi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Format email tidak valid.";
    return "";
  },
  kategori: (v) => {
    if (!v) return "Pilih salah satu kategori.";
    return "";
  },
  pesan: (v) => {
    v = v.trim();
    if (!v) return "Pesan wajib diisi.";
    if (v.length < 10)
      return `Pesan minimal 10 karakter (sekarang ${v.length}).`;
    if (v.length > 200)
      return `Pesan maksimal 200 karakter (sekarang ${v.length}).`;
    return "";
  },
};

function validate(id) {
  const input = document.getElementById(id);
  const msg = rules[id](input.value);
  document.getElementById(`${id}-error`).textContent = msg;
  input.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}

for (const id in rules) {
  document.getElementById(id).addEventListener("input", () => validate(id));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const invalid = Object.keys(rules).filter((id) => !validate(id));
  if (invalid.length) {
    document.getElementById(invalid[0]).focus();
    hasilEl.hidden = true;
    return;
  }

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const kategori = document.getElementById("kategori").value;
  const pesan = document.getElementById("pesan").value.trim();

  document.getElementById("hasil-ucapan").textContent =
    `Terima kasih, ${nama}! Pesan kamu sudah kami terima.`;
  document.getElementById("hasil-nama").textContent = nama;
  document.getElementById("hasil-email").textContent = email;
  document.getElementById("hasil-kategori").textContent = kategori;
  document.getElementById("hasil-pesan").textContent = pesan;
  hasilEl.hidden = false;
});
