# BimAcquire

Project tentang JavaScript DOM, Event Handling, dan Fetch API. Website toko online sederhana yang dibuat dengan HTML, CSS, dan JavaScript tanpa library.

# Tampilan App

## 1. index.html
<img width="3840" height="2160" alt="Screenshot 2026-10-27 092214" src="https://github.com/user-attachments/assets/cc9dceaa-320f-4422-9ded-705316b68708" />
<img width="3840" height="2160" alt="Screenshot 2026-10-27 092233" src="https://github.com/user-attachments/assets/15e5541b-4a2d-43e5-a250-689d91e9ea57" />

## 2. form.html
<img width="3840" height="2160" alt="Screenshot 2026-10-27 092250" src="https://github.com/user-attachments/assets/f9b4b30e-a508-4eff-81a6-228c4ab08ae1" />
<img width="3840" height="2160" alt="Screenshot 2026-10-27 092322" src="https://github.com/user-attachments/assets/8dea2301-72ac-4255-b209-4144081a5b90" />

## Fitur

Halaman Belanja (index.html)
- Mengambil data produk dari https://dummyjson.com/products pakai Fetch API
- Menampilkan gambar, nama, harga, kategori, diskon, rating, dan stok
- Bisa mencari produk berdasarkan nama atau kategori
- Bisa memfilter produk berdasarkan kategori
- Ada tampilan loading saat data diambil dan pesan error kalau gagal

Halaman Bantuan (form.html)
- Form untuk mengirim pesan, isinya nama, email, kategori, dan pesan
- Validasi jalan saat mengetik dan saat form dikirim
- Hasil form ditampilkan di bawah form setelah semua input benar

Aturan validasi form:
- Nama: wajib diisi, minimal 3 karakter, harus ada huruf
- Email: wajib diisi dan formatnya harus benar
- Kategori: wajib dipilih
- Pesan: wajib diisi, minimal 10 dan maksimal 200 karakter

## Struktur Folder

```
index.html
form.html
css/
  index.css
  form.css
js/
  index.js
  form.js
README.md
```

## Cara Menjalankan

Buka file index.html di browser. Halaman Belanja butuh internet karena datanya diambil dari DummyJSON.
