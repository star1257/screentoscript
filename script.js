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
    if (autoSlide) {
        clearInterval(autoSlide);
    }
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

    window.addEventListener("resize", () => {
        showSlide(currentSlide);
    });

    startAutoSlide();
}


/* ---------- GOODREADS-STYLE STAR RATING ---------- */
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

    function paint(value, className) {
        stars.forEach((star, index) => {
            star.classList.toggle(className, index < value);
        });
    }

    function clearClass(className) {
        stars.forEach((star) => {
            star.classList.remove(className);
        });
    }

    function updateDisplay(value, isHover = false) {
        clearClass("hovered");
        clearClass("active");

        if (isHover) {
            paint(value, "hovered");
            if (label) {
                label.textContent = ratingTexts[value];
            }
        } else {
            paint(selectedValue, "active");
            if (label) {
                label.textContent = selectedValue ? ratingTexts[selectedValue] : "Rate this";
            }
        }
    }

    function updateAria() {
        stars.forEach((star, index) => {
            const value = index + 1;
            star.setAttribute("aria-label", `${value} star${value > 1 ? "s" : ""}`);
            star.setAttribute("aria-pressed", value === selectedValue ? "true" : "false");
            star.setAttribute("tabindex", value === (selectedValue || 1) ? "0" : "-1");
        });
    }

    stars.forEach((star, index) => {
        const value = index + 1;

        star.addEventListener("mouseenter", () => {
            updateDisplay(value, true);
        });

        star.addEventListener("click", () => {
            selectedValue = value;
            updateDisplay(selectedValue, false);
            updateAria();
        });

        star.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectedValue = value;
                updateDisplay(selectedValue, false);
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

    ratingGroup.addEventListener("mouseleave", () => {
        updateDisplay(selectedValue, false);
    });

    updateDisplay(0, false);
    updateAria();
});