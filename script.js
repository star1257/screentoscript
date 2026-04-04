document.addEventListener("DOMContentLoaded", () => {
    const ratingGroups = document.querySelectorAll(".rating-group");

    ratingGroups.forEach((group) => {
        const inputs = group.querySelectorAll('input[type="radio"]');
        const output = group.parentElement.querySelector(".rating-value");
        const storageKey = group.dataset.ratingKey;

        // Load saved rating
        const savedRating = localStorage.getItem(storageKey);
        if (savedRating) {
            const savedInput = group.querySelector(`input[value="${savedRating}"]`);
            if (savedInput) {
                savedInput.checked = true;
                updateText(output, savedRating);
            }
        }

        inputs.forEach((input) => {
            input.addEventListener("change", () => {
                localStorage.setItem(storageKey, input.value);
                updateText(output, input.value);
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

    // Newsletter signup handling
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