document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    if (slides && slideItems.length && prevBtn && nextBtn) {
        let index = 0;

        const updateSlide = () => {
            slides.style.transform = `translateX(-${index * 100}%)`;
        };

        const nextSlide = () => {
            index = (index + 1) % slideItems.length;
            updateSlide();
        };

        const prevSlide = () => {
            index = (index - 1 + slideItems.length) % slideItems.length;
            updateSlide();
        };

        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        setInterval(nextSlide, 4500);
    }

    document.querySelectorAll(".star-rating").forEach(rating => {
        const buttons = Array.from(rating.querySelectorAll("button"));
        let selected = -1;

        const paint = (hoverIndex) => {
            buttons.forEach((button, i) => {
                button.classList.toggle("active", i <= hoverIndex);
            });
        };

        const reset = () => paint(selected);

        buttons.forEach((button, i) => {
            button.addEventListener("mouseenter", () => paint(i));
            button.addEventListener("click", () => {
                selected = i;
                paint(selected);
            });
            button.addEventListener("focus", () => paint(i));
            button.addEventListener("blur", reset);
            button.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selected = i;
                    paint(selected);
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const prev = Math.min(buttons.length - 1, i + 1);
                    buttons[prev].focus();
                }
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    const next = Math.max(0, i - 1);
                    buttons[next].focus();
                }
            });
        });

        rating.addEventListener("mouseleave", reset);
    });
});