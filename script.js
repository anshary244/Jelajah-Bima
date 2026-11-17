// 1. Efek suara 'Klik' ringan
function playClickSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
}

// 2. Fungsi Suara Narator Bahasa Indonesia (Text-to-Speech)
function speakText(text) {
    if (!('speechSynthesis' in window)) return;

    // Hentikan suara sebelumnya jika pengguna cepat pindah slide
    window.speechSynthesis.cancel();

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Bahasa Indonesia
    utterance.rate = 1.0;     // Kecepatan bicara normal
    utterance.pitch = 1.05;   // Nada suara ramah dan jelas

    window.speechSynthesis.speak(utterance);
}

// 3. Daftar Teks yang Akan Diucapkan di Setiap Slide
const narasiSlide = {
    2: "Selamat datang di Jelajah Bima. Klik Mulai Jelajah untuk melanjutkan.",
    3: "Menu Utama. Silakan pilih Tentang Bima, Destinasi Wisata, Produk Lokal Bima, atau Video.",
    4: "Tentang Bima. Mengenal sejarah, budaya, dan keindahan Tanah bima.",
    5: "Destinasi Wisata Bima. Silakan pilih destinasi yang ingin Anda jelajahi.",
    6: "Pantai Lariti, keajaiban laut terbelah di Kecamatan Lambu.",
    7: "Pulau Kelapa, surga tersembunyi dengan bukit hijau dan laut biru.",
    8: "Air Terjun Tambora, pesona alam di kaki Gunung Tambora.",
    9: "Padang Savana Tambora, hamparan padang rumput luas yang memukau.",
    10: "Pulau Ular, wisata unik di perairan Wera.",
    11: "Pantai Rontu, keindahan pesisir pantai selatan Bima.",
    12: "Istana Asi bima, saksi sejarah Kesultanan Bima.",
    13: "Uma Lengge Wawo, rumah adat tradisional kebanggaan masyarakat Bima.",
    14: "Produk Lokal Bima. Silakan pilih produk unggulan khas Bima.",
    15: "Tenun bima, kain tenun ikat tradisional warisan leluhur Bima.",
    16: "Susu Kuda Liar, minuman kesehatan alami khas Bima.",
    17: "Madu Hutan Bima, madu murni berkualitas dari hutan Bima.",
    18: "Bawang Merah Bima, komoditas unggulan dengan aroma khas.",
    19: "Pangaha Bunga, kue tradisional khas Bima yang renyah dan manis.",
    20: "Minyak Oi Bima, minyak herbal tradisional berkhasiat.",
    22: "Terima kasih telah menjelajahi keindahan Bima bersama Kelompok 3."
};

// 4. Fungsi Utama Pindah Slide
function goToSlide(slideNumber) {
    playClickSound();

    // Hentikan video otomatis jika pengguna meninggalkan Slide 21
    const videoPlayer = document.getElementById('video-bima');
    if (videoPlayer) {
        videoPlayer.pause();
    }

    // Sembunyikan semua slide
    const slides = document.querySelectorAll('.slide');
    slides.forEach(function(slide) {
        slide.classList.remove('active');
    });

    // Tampilkan slide tujuan
    const targetSlide = document.getElementById('slide' + slideNumber);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }

    // Bacakan narasi sesuai nomor slide yang dibuka
    const teksNarasi = narasiSlide[slideNumber] || "";
    speakText(teksNarasi);
}
