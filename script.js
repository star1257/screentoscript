/* ---------- SLIDESHOW ---------- */
const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const slideshow = document.querySelector(".slideshow");

let currentSlide = 0;
let autoSlide;

function showSlide(index) {
    if (!slides || slideItems.length === 0) return;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    if (slideItems.length === 0) return;
    currentSlide++;
    if (currentSlide >= slideItems.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function prevSlide() {
    if (slideItems.length === 0) return;
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slideItems.length - 1;
    }
    showSlide(currentSlide);
}

function startAutoSlide() {
    if (slideItems.length <= 1) return;
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

if (slides && prevBtn && nextBtn && slideItems.length > 0) {
    showSlide(currentSlide);

    nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoSlide();
    });

    if (slideshow) {
        slideshow.addEventListener("mouseenter", stopAutoSlide);
        slideshow.addEventListener("mouseleave", startAutoSlide);
    }

    startAutoSlide();
}

/* ---------- STAR RATING ---------- */
document.querySelectorAll(".star-rating").forEach((ratingGroup) => {
    const stars = ratingGroup.querySelectorAll("button");
    let selectedValue = 0;

    function updateStars(value, className) {
        stars.forEach((star, index) => {
            if (index < value) {
                star.classList.add(className);
            } else {
                star.classList.remove(className);
            }
        });
    }

    function clearHover() {
        stars.forEach((star) => {
            star.classList.remove("hovered");
        });
    }

    stars.forEach((star, index) => {
        const value = index + 1;

        star.addEventListener("mouseenter", () => {
            clearHover();
            updateStars(value, "hovered");
        });

        star.addEventListener("click", () => {
            selectedValue = value;
            stars.forEach((s) => s.classList.remove("active"));
            updateStars(selectedValue, "active");
        });

        star.addEventListener("mouseleave", () => {
            clearHover();
        });
    });

    ratingGroup.addEventListener("mouseleave", () => {
        clearHover();
    });
});