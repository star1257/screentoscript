document.addEventListener("DOMContentLoaded", () => {
    // ========== RATING SYSTEM ==========
    const ratingGroups = document.querySelectorAll(".rating-group");

    ratingGroups.forEach((group) => {
        const inputs = group.querySelectorAll('input[type="radio"]');
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

        // Add event listeners
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

    // ========== NEWSLETTER SIGNUP ==========
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

    // ========== BACK TO TOP BUTTON ==========
    // Create the button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});