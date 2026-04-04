document.addEventListener("DOMContentLoaded", () => {
    // ========== SLIDESHOW ==========
    let slideIndex = 1;
    let slideInterval;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    function showSlides(n) {
        if (slides.length === 0) return;
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
    }

    function plusSlides(n) {
        clearInterval(slideInterval);
        slideIndex += n;
        showSlides(slideIndex);
        startAutoSlide();
    }

    function currentSlide(n) {
        clearInterval(slideInterval);
        slideIndex = n;
        showSlides(slideIndex);
        startAutoSlide();
    }

    function startAutoSlide() {
        slideInterval = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 4000);
    }

    if (slides.length > 0) {
        showSlides(slideIndex);
        startAutoSlide();
        window.plusSlides = plusSlides;
        window.currentSlide = currentSlide;
    }

    // ========== RATING SYSTEM ==========
    const ratingGroups = document.querySelectorAll(".rating-group");
    ratingGroups.forEach((group) => {
        const inputs = group.querySelectorAll('input[type="radio"]');
        const ratingBox = group.closest('.rating-box');
        const output = ratingBox ? ratingBox.querySelector(".rating-value") : null;
        const storageKey = group.dataset.ratingKey;
        if (!output) return;

        const savedRating = localStorage.getItem(storageKey);
        if (savedRating) {
            const savedInput = group.querySelector(`input[value="${savedRating}"]`);
            if (savedInput) {
                savedInput.checked = true;
                updateText(output, savedRating);
            }
        }

        inputs.forEach((input) => {
            input.addEventListener("change", (e) => {
                const value = e.target.value;
                localStorage.setItem(storageKey, value);
                updateText(output, value);
            });
        });
    });

    function updateText(output, value) {
        const labels = {
            1: "⭐ 1 star",
            2: "⭐⭐ 2 stars",
            3: "⭐⭐⭐ 3 stars",
            4: "⭐⭐⭐⭐ 4 stars",
            5: "⭐⭐⭐⭐⭐ 5 stars"
        };
        output.textContent = labels[value];
    }

    // ========== NEWSLETTER ==========
    const newsletterForm = document.querySelector('.updates-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '') {
                alert(`Thanks for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});