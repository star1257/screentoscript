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

    // ========== SEARCH FUNCTIONALITY (works on all pages) ==========
    // Define searchable items: books and films with their titles and target URLs
    const searchableItems = [
        { title: "Romeo and Juliet", type: "Book", url: "romeoJuliet.html" },
        { title: "Romeo + Juliet (1996)", type: "Film", url: "romeoJuliet.html" },
        { title: "Pride and Prejudice", type: "Book", url: "pridePrejudice.html" },
        { title: "Pride & Prejudice (2005)", type: "Film", url: "pridePrejudice.html" },
        { title: "The Great Gatsby", type: "Book", url: "greatGatsby.html" },
        { title: "The Great Gatsby (2013)", type: "Film", url: "greatGatsby.html" }
    ];

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('searchResults');

    if (searchInput && searchButton && resultsContainer) {
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            if (query === "") {
                resultsContainer.classList.remove('show');
                return;
            }

            const filtered = searchableItems.filter(item =>
                item.title.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                resultsContainer.innerHTML = `<div class="no-results">No matches found</div>`;
            } else {
                resultsContainer.innerHTML = filtered.map(item => `
                    <div class="search-result-item" data-url="${item.url}">
                        <div class="search-result-title">${escapeHtml(item.title)}</div>
                        <div class="search-result-type">${item.type}</div>
                    </div>
                `).join('');
                // Add click listeners to results
                document.querySelectorAll('.search-result-item').forEach(el => {
                    el.addEventListener('click', () => {
                        window.location.href = el.dataset.url;
                    });
                });
            }
            resultsContainer.classList.add('show');
        }

        function escapeHtml(str) {
            return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            });
        }

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target) && !searchButton.contains(e.target)) {
                resultsContainer.classList.remove('show');
            }
        });

        // Optional: live search as you type (uncomment if desired)
        // searchInput.addEventListener('input', performSearch);
    }
});