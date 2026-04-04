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
});