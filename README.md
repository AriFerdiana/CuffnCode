# CuffnCode - Web Based Host Simulation

![Web Simulation Screenshot](https://via.placeholder.com/800x400.png?text=Web+Simulation+Screenshot)

Repositori ini adalah _fork_ dari proyek hardware pengukur tekanan darah [CuffnCode](https://github.com/Student-Embedded-Control-and-AI-Fest/CuffnCode). Proyek ini dimodifikasi untuk Evaluasi 3 mata kuliah **IFB 206 Komputasi Paralel** di ITENAS oleh:
- **Nama:** Ari Ferdiana
- **NRP:** 152024002

## Demo & Dokumentasi
Silakan buka tautan GitHub Pages berikut untuk melihat dokumentasi lengkap dan mencoba **Simulasi Komputasi Paralel** secara langsung di browser Anda:

👉 **[Jalankan Web Simulation](https://AriFerdiana.github.io/CuffnCode/)**

## Latar Belakang (Komputasi Paralel)
Proyek hardware aslinya memproses sinyal sensor pada mikrokontroler. Jika kita memindahkan beban pemrosesan *Digital Signal Processing* (DSP) seperti *Notch Filter* untuk menghilangkan dengung listrik (Hum 50Hz) ke sisi komputer (Host), hal ini akan membutuhkan tenaga komputasi yang lumayan besar untuk menangani ribuan sampel dalam waktu cepat (Real-time).

Solusinya adalah menggunakan **Data Parallelism** pada sistem terdistribusi/multi-core.

### Implementasi Web Workers
Ketimbang menggunakan Python (seperti implementasi umum), saya menggunakan **JavaScript Web Workers** untuk mensimulasikan pemrosesan ini secara langsung di antarmuka web.

1. **Main Thread (UI):** Menghasilkan data sinyal palsu dengan noise secara *real-time* dan menggambar grafik.
2. **Pekerja Latar Belakang (Workers):** Memotong data sinyal (misalnya 100.000 sampel) menjadi beberapa bagian, dan membagikannya ke beberapa thread terpisah (Web Workers). Masing-masing pekerja akan melakukan filtering berat (simulasi algoritma kompleks).
3. **Hasil:** Terbukti melalui halaman simulasi bahwa **Eksekusi Paralel (Multi-Thread)** jauh lebih cepat dalam menyelesaikan _batch_ sinyal dibandingkan **Eksekusi Sekuensial (Single-Thread)**.

## Cara Menjalankan Lokal
Karena ini murni HTML/JS/CSS statis, tidak perlu menginstal Node.js atau Python.
1. _Clone_ repositori ini.
2. Karena alasan keamanan browser (CORS policy pada file `worker.js`), Anda tidak bisa langsung mengklik ganda `index.html`. Anda perlu menjalankan lokal server sederhana.
3. Menggunakan Python (jika tersedia):
   ```bash
   python -m http.server 8000
   ```
4. Buka `http://localhost:8000` di browser Anda.
