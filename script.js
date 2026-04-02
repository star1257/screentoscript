const slides = document.querySelector(".slides");
const slideImages = document.querySelectorAll(".slides img");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;

function updateSlide() {
    if (!slides) return;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

if (nextBtn && prevBtn && slides && slideImages.length > 0) {
    nextBtn.addEventListener("click", () => {
        index = (index + 1) % slideImages.length;
        updateSlide();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + slideImages.length) % slideImages.length;
        updateSlide();
    });

    setInterval(() => {
        index = (index + 1) % slideImages.length;
        updateSlide();
    }, 4000);
}