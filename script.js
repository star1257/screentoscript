document.addEventListener("DOMContentLoaded", () => {
    // ========== SLIDESHOW (FULLY REWRITTEN FOR RELIABILITY) ==========
    const slides = document.querySelectorAll('.mySlides');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('dotsContainer');
    let slideIndex = 1;
    let slideInterval;

    // Create dots dynamically if they don't exist
    if (dotsContainer && slides.length > 0) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i + 1);
            dot.addEventListener('click', () => {
                currentSlide(i + 1);
            });
            dotsContainer.appendChild(dot);
        }
    }

    const dots = document.querySelectorAll('.dot');

    function showSlides(n) {
        if (slides.length === 0) return;
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = "none";
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active-dot');
        });
        
        // Show current slide and highlight active dot
        slides[slideIndex - 1].style.display = "block";
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add('active-dot');
        }
    }

    function nextSlide() {
        clearInterval(slideInterval);
        slideIndex++;
        showSlides(slideIndex);
        startAutoSlide();
    }

    function prevSlide() {
        clearInterval(slideInterval);
        slideIndex--;
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
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 4000);
    }

    // Initialize slideshow if slides exist
    if (slides.length > 0) {
        showSlides(slideIndex);
        startAutoSlide();
        
        // Add event listeners for prev/next buttons
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
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