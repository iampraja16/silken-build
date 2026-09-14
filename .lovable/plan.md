# Redesign About & Selected Works — Bento Technical Elegance

## Arah utama
Pertahankan palet terang/gelap, tipografi, isi proyek, dan identitas visual yang sekarang. Ubah dua bagian ini menjadi sistem bento teknis yang lebih padat, modern, sederhana, dan elegan.

Prinsip visual:
- Foto tetap berukuran moderat dan menjadi bagian dari komposisi, bukan objek tunggal di ruang kosong.
- Setiap elemen harus menyampaikan profil, proses, atau bukti engineering.
- Gerak terasa seperti instrumen presisi: halus, terukur, dan responsif.
- Efek 3D hanya dipakai bila membantu menjelaskan sensor, point cloud, CAN bus, atau aliran edge AI.

## About
- Susun grid 12 kolom yang terdiri dari panel manifesto besar, panel portrait, dan technology rail di bawahnya.
- Isi panel manifesto dengan positioning singkat mengenai penghubung hardware, edge computing, dan intelligence; gunakan konten faktual yang sudah tersedia, tanpa membuat statistik baru.
- Pertahankan portrait asli dalam ukuran sedang. Gunakan scroll-linked crop/scale yang halus, grayscale-to-color, sedikit depth shift, serta latar grid teknis yang ikut terbuka ketika masuk viewport.
- Integrasikan dua lapis technology loop ke dalam batas grid: satu lapis samar di belakang portrait dan satu rail utama di bawah komposisi. Tambahkan border tipis dan pause-on-hover.
- Tambahkan metadata faktual ringan seperti lokasi, fokus bidang, dan status riset yang memang sudah ada.
- Pada mobile, ubah menjadi urutan manifesto → portrait → metadata → technology rail tanpa overlap yang mengganggu.

## Selected Works
- Ganti accordion teks dengan bento grid empat proyek menggunakan data proyek yang sudah ada.
- Jadikan R-SENSE proyek unggulan dengan area lebih besar; METRICS, CAN Bus Data Acquisition, dan Edge AI Self-Diagnostic menjadi modul pendukung dengan ukuran bervariasi.
- Setiap proyek menampilkan judul, subtitle, ringkasan pendek, teknologi, status bila ada, dan visual teknis yang relevan:
  - R-SENSE: gelombang sensor, klasifikasi jalan, dan node LoRa.
  - METRICS: point cloud/depth mesh dan bidang estimasi volume.
  - CAN Bus: node ECU, jalur CANH/CANL, dan paket telemetry.
  - Edge AI: alur device → retrieval → graph → diagnosis.
- Visual proyek dibuat dengan SVG/CSS/canvas ringan agar tajam di kedua tema dan tidak bergantung pada gambar stok.
- Klik atau fokus membuka detail proyek dengan shared-layout transition; hover memberi tilt/depth sangat ringan, diagram hidup, dan arrow movement.
- Pastikan seluruh kartu dapat digunakan dengan keyboard dan memiliki keadaan fokus yang jelas.

## Motion dan 3D
- Gunakan Framer Motion untuk reveal, shared layout, parallax portrait, dan transisi detail.
- Gunakan pseudo-3D berbasis transform dan perspektif untuk kartu; hindari Three.js karena manfaat visualnya tidak sebanding dengan bobot dan kompleksitas untuk bagian ini.
- Animasi diagram menggunakan transform, stroke, dan opacity agar tetap ringan.
- Semua gerak mengikuti `prefers-reduced-motion`; marquee berhenti dan transform depth dinonaktifkan bila diperlukan.

## Konsistensi visual
- Salin struktur dan proporsi arah “Bento Technical Elegance”, tetapi terapkan token warna dan font proyek yang sekarang.
- Gunakan border tipis, radius maksimal 8px, kontras informasi yang jelas, dan minim efek kaca.
- Jangan gunakan glow besar, orb dekoratif, statistik fiktif, atau tampilan sci-fi/cyberpunk.
- Pastikan tema gelap dan terang sama-sama terasa dirancang, bukan sekadar inversi warna.

## Validasi
- Periksa komposisi dan keterbacaan pada desktop serta mobile.
- Uji interaksi pointer, keyboard, ekspansi proyek, marquee, pergantian tema, dan reduced motion.
- Pastikan tidak ada overlap, layout shift, console error, atau visual proyek yang terpotong.
