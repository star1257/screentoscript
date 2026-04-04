/* ---------- SLIDESHOW ---------- */
const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let currentSlide = 0;
let autoSlide;

function showSlide(index) {
    if (!slides || slideItems.length === 0) return;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideItems.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
    showSlide(currentSlide);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    if (autoSlide) clearInterval(autoSlide);
}

if (slides && prevBtn && nextBtn && slideItems.length) {
    showSlide(currentSlide);
    nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoSlide();
    });
    prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoSlide();
    });

    slides.parentElement.addEventListener("mouseenter", stopAutoSlide);
    slides.parentElement.addEventListener("mouseleave", startAutoSlide);
    startAutoSlide();
}

/* ---------- STAR RATING ---------- */
const ratingTexts = {
    1: "did not like it",
    2: "it was ok",
    3: "liked it",
    4: "really liked it",
    5: "it was amazing"
};

document.querySelectorAll(".star-rating").forEach((ratingGroup) => {
    const stars = Array.from(ratingGroup.querySelectorAll(".star-buttons button"));
    const label = ratingGroup.querySelector(".rating-label");
    let selectedValue = 0;

    function updateDisplay(value, hover = false) {
        stars.forEach((star, index) => {
            star.classList.remove("hovered", "active");
            if (hover && index < value) star.classList.add("hovered");
            else if (!hover && index < selectedValue) star.classList.add("active");
        });
        label.textContent = hover
            ? ratingTexts[value] || "Rate this"
            : selectedValue
            ? ratingTexts[selectedValue]
            : "Rate this";
    }

    stars.forEach((star, index) => {
        const value = index + 1;
        star.addEventListener("mouseenter", () => updateDisplay(value, true));
        star.addEventListener("mouseleave", () => updateDisplay(selectedValue, false));
        star.addEventListener("click", () => {
            selectedValue = value;
            updateDisplay(selectedValue, false);
        });
    });

    updateDisplay(selectedValue, false);
});