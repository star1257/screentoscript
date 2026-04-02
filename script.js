// ---------- SLIDESHOW ----------
const slides = document.querySelector(".slides");
const slideImages = document.querySelectorAll(".slide");
const slideshow = document.querySelector(".slideshow");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;
let autoplay;

function updateSlide() {
    if (!slides || slideImages.length === 0) return;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    if (slideImages.length === 0) return;
    index = (index + 1) % slideImages.length;
    updateSlide();
}

function prevSlide() {
    if (slideImages.length === 0) return;
    index = (index - 1 + slideImages.length) % slideImages.length;
    updateSlide();
}

function startAutoplay() {
    if (slideImages.length <= 1) return;
    stopAutoplay();
    autoplay = setInterval(nextSlide, 4000);
}

function stopAutoplay() {
    clearInterval(autoplay);
}

if (slides && slideImages.length > 0 && prevBtn && nextBtn) {
    updateSlide();

    nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoplay();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoplay();
    });

    if (slideshow) {
        slideshow.addEventListener("mouseenter", stopAutoplay);
        slideshow.addEventListener("mouseleave", startAutoplay);
    }

    startAutoplay();
}

// ---------- STAR RATING ----------
document.querySelectorAll(".star-rating").forEach((rating) => {
    const stars = Array.from(rating.querySelectorAll("button"));
    let selectedRating = 0;

    stars.forEach((star, i) => {
        const value = i + 1;
        star.dataset.value = value;
        star.setAttribute("role", "radio");
        star.setAttribute("aria-checked", "false");
        star.setAttribute("aria-label", `${value} star${value > 1 ? "s" : ""}`);
        star.setAttribute("tabindex", i === 0 ? "0" : "-1");
    });

    function paint(value) {
        stars.forEach((star, i) => {
            const active = i < value;
            star.classList.toggle("active", active);
            star.setAttribute("aria-checked", active && i === value - 1 ? "true" : "false");
        });
    }

    function setRating(value) {
        selectedRating = value;
        paint(selectedRating);

        stars.forEach((star, i) => {
            star.setAttribute("tabindex", i === value - 1 ? "0" : "-1");
        });
    }

    stars.forEach((star, i) => {
        const value = i + 1;

        star.addEventListener("mouseenter", () => {
            paint(value);
        });

        star.addEventListener("focus", () => {
            paint(value);
        });

        star.addEventListener("click", () => {
            setRating(value);
        });

        star.addEventListener("keydown", (e) => {
            let newValue = selectedRating || value;

            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                e.preventDefault();
                newValue = Math.min(5, value + 1);
                stars[newValue - 1].focus();
            }

            if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                e.preventDefault();
                newValue = Math.max(1, value - 1);
                stars[newValue - 1].focus();
            }

            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setRating(value);
            }
        });
    });

    rating.addEventListener("mouseleave", () => {
        paint(selectedRating);
    });

    rating.addEventListener("focusout", (e) => {
        if (!rating.contains(e.relatedTarget)) {
            paint(selectedRating);
        }
    });

    paint(0);
});