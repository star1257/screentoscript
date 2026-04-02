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
    currentSlide = (currentSlide + 1) % slideItems.length;
    showSlide(currentSlide);
}

function prevSlide() {
    if (slideItems.length === 0) return;
    currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
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
    const stars = Array.from(ratingGroup.querySelectorAll("button"));
    let selectedValue = 0;

    function paint(value, className) {
        stars.forEach((star, index) => {
            star.classList.toggle(className, index < value);
        });
    }

    function clearHover() {
        stars.forEach((star) => star.classList.remove("hovered"));
        paint(selectedValue, "active");
    }

    function updateAria() {
        stars.forEach((star, index) => {
            const value = index + 1;
            star.setAttribute("aria-label", `${value} star${value > 1 ? "s" : ""}`);
            star.setAttribute("aria-pressed", value === selectedValue ? "true" : "false");
            star.setAttribute("tabindex", selectedValue === 0 ? (index === 0 ? "0" : "-1") : (value === selectedValue ? "0" : "-1"));
        });
    }

    stars.forEach((star, index) => {
        const value = index + 1;

        star.addEventListener("mouseenter", () => {
            paint(value, "hovered");
        });

        star.addEventListener("click", () => {
            selectedValue = value;
            paint(selectedValue, "active");
            updateAria();
        });

        star.addEventListener("mouseleave", () => {
            clearHover();
        });

        star.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectedValue = value;
                paint(selectedValue, "active");
                updateAria();
            }

            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                e.preventDefault();
                const next = Math.min(index + 1, stars.length - 1);
                stars[next].focus();
            }

            if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                e.preventDefault();
                const prev = Math.max(index - 1, 0);
                stars[prev].focus();
            }
        });
    });

    ratingGroup.addEventListener("mouseleave", clearHover);
    clearHover();
    updateAria();
});