const slides = document.querySelector(".slides");
const slideImages = document.querySelectorAll(".slide");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;
let autoplay;

function updateSlide() {
    if (!slides) return;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    index = (index + 1) % slideImages.length;
    updateSlide();
}

function prevSlide() {
    index = (index - 1 + slideImages.length) % slideImages.length;
    updateSlide();
}

if (slides && slideImages.length > 0 && prevBtn && nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    autoplay = setInterval(nextSlide, 4000);
}

document.querySelectorAll(".star-rating").forEach(rating => {
    const stars = Array.from(rating.querySelectorAll("button"));
    let selected = -1;

    function paint(ratingIndex) {
        stars.forEach((star, i) => {
            star.classList.toggle("active", i <= ratingIndex);
        });
    }

    function clearHover() {
        paint(selected);
    }

    stars.forEach((star, i) => {
        star.addEventListener("mouseenter", () => paint(i));
        star.addEventListener("click", () => {
            selected = i;
            paint(selected);
        });
        star.addEventListener("focus", () => paint(i));
        star.addEventListener("blur", clearHover);
        star.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selected = i;
                paint(selected);
            }
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                e.preventDefault();
                const next = Math.max(0, i - 1);
                stars[next].focus();
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                e.preventDefault();
                const prev = Math.min(stars.length - 1, i + 1);
                stars[prev].focus();
            }
        });
    });

    rating.addEventListener("mouseleave", clearHover);
});