document.addEventListener("DOMContentLoaded", () => {
    // ========== RATING SYSTEM (FIXED) ==========
    const ratingGroups = document.querySelectorAll(".rating-group");

    ratingGroups.forEach((group) => {
        const inputs = group.querySelectorAll('input[type="radio"]');
        // Find the rating-value element inside the same .rating-box
        const ratingBox = group.closest('.rating-box');
        const output = ratingBox ? ratingBox.querySelector(".rating-value") : null;
        const storageKey = group.dataset.ratingKey;

        if (!output) return;

        // Load saved rating from localStorage
        const savedRating = localStorage.getItem(storageKey);
        if (savedRating) {
            const savedInput = group.querySelector(`input[value="${savedRating}"]`);
            if (savedInput) {
                savedInput.checked = true;
                updateText(output, savedRating);
            }
        }

        // Add event listeners to radio buttons
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
            1: "1 star",
            2: "2 stars",
            3: "3 stars",
            4: "4 stars",
            5: "5 stars"
        };
        output.textContent = `Your rating: ${labels[value]}`;
    }

    // ========== SLIDESHOW ==========
    let slideIndex = 1;
    let slideInterval;

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("slideshow-slide");
        const dots = document.getElementsByClassName("dot");
        if (!slides.length) return;
        
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if (slides[slideIndex-1]) {
            slides[slideIndex-1].style.display = "block";
        }
        if (dots[slideIndex-1]) {
            dots[slideIndex-1].className += " active";
        }
    }

    function changeSlide(n) {
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

    // Initialize slideshow if it exists on page
    if (document.getElementsByClassName("slideshow-slide").length > 0) {
        showSlides(slideIndex);
        startAutoSlide();
        
        // Make functions global so onclick attributes work
        window.changeSlide = changeSlide;
        window.currentSlide = currentSlide;
    }

    // ========== NEWSLETTER SIGNUP (optional) ==========
    const newsletterForm = document.querySelector('.updates-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '') {
                alert(`Thanks for subscribing with ${emailInput.value}! You'll receive our weekly updates.`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});