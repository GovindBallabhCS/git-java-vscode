/* JS File: script.js - Full Functional (Sliders + Search + Price Update) */

// Main Slider (3 Slides, 540x405)
let currentMain = 0;
const mainSlides = document.querySelectorAll('#mainSlider .main-slide');
const indicators = document.querySelectorAll('.slider-indicators .indicator');

function updateMainSlide() {
    mainSlides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    mainSlides[currentMain].classList.add('active');
    indicators[currentMain].classList.add('active');
}

function nextMainSlide() { currentMain = (currentMain + 1) % mainSlides.length; updateMainSlide(); }
function prevMainSlide() { currentMain = (currentMain - 1 + mainSlides.length) % mainSlides.length; updateMainSlide(); }
function goToMainSlide(index) { currentMain = index; updateMainSlide(); }
setInterval(nextMainSlide, 5500); // Auto 5.5 sec

// Mini Sliders Auto Rotate
function rotateMini(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    const slides = slider.querySelectorAll('.mini-slide');
    let active = Array.from(slides).findIndex(s => s.classList.contains('active'));
    slides[active].classList.remove('active');
    active = (active + 1) % slides.length;
    slides[active].classList.add('active');
}
setInterval(() => rotateMini('leftMiniSlider'), 4200);
setInterval(() => rotateMini('rightMiniSlider'), 4800);

// Search Products (Live Highlight + Scroll)
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => card.classList.remove('highlight-product'));
    if (!query) return;
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        if (name.includes(query)) {
            card.classList.add('highlight-product');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// Price Update on Size Select Change
function updatePrice(select) {
    const card = select.closest('.product-card');
    const option = select.options[select.selectedIndex];
    const price = option.dataset.price;
    const old = option.dataset.old;
    const disc = option.dataset.discount;
    let html = `₹${price}`;
    if (old) html += ` <span class="old-price">₹${old}</span>`;
    if (disc > 0) html += ` <span class="discount-badge">${disc}% OFF</span>`;
    card.querySelector('.price-display').innerHTML = html;
}

// Page Load पर Sliders Init
window.onload = () => updateMainSlide();