let activeSlideIndex = 0;
let slideInterval = null;
let slideTimer = 0;
const slideDuration = 15000;
const updateIntervalTime = 100;
let isPlaying = true;

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('pt-BR');
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateStamp').textContent = now.toLocaleDateString('pt-BR', dateOptions).toUpperCase();
}

function startSlideshow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        if (!isPlaying) return;
        slideTimer += updateIntervalTime;
        document.getElementById('progressBar').style.width = ((slideTimer / slideDuration) * 100) + '%';
        if (slideTimer >= slideDuration) {
            slideTimer = 0;
            nextSlide();
        }
    }, updateIntervalTime);
}

function nextSlide() {
    const slidesCount = document.querySelectorAll('.slide').length || 3;
    activeSlideIndex = (activeSlideIndex + 1) % slidesCount;
    updateSlideUI();
}

function jumpToSlide(index) {
    activeSlideIndex = index;
    slideTimer = 0;
    document.getElementById('progressBar').style.width = '0%';
    updateSlideUI();
}

function updateSlideUI() {
    document.querySelectorAll('.slide').forEach((slide, idx) => {
        slide.classList.toggle('active', idx === activeSlideIndex);
    });
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeSlideIndex);
    });
}

function toggleSlideshow() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('playPauseBtn');
    btn.innerHTML = isPlaying ? '<span>⏸</span> Pause' : '<span>▶</span> Play';
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Erro ao tentar ativar tela cheia: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    try {
        Chart.register(ChartDataLabels);
        Chart.defaults.color = '#e5e7eb';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.08)';
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.font.size = 14;
        Chart.defaults.font.weight = '600';
    } catch (e) {
        console.warn('Chart.js init error:', e);
    }

    loadEmbeddedData();
    startSlideshow();
    setInterval(updateClock, 1000);
    updateClock();
    // setInterval(loadEmbeddedData, 120000); // Desativado - dados estáticos
});
