// Slideshow logic
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
let index = 0;

function showSlide(i) {
  if (i >= images.length) index = 0;
  else if (i < 0) index = images.length - 1;
  slides.style.transform = `translateX(-${index * 900}px)`;
}

next?.addEventListener('click', () => {
  index++;
  showSlide(index);
});
prev?.addEventListener('click', () => {
  index--;
  showSlide(index);
});
setInterval(() => {
  index++;
  showSlide(index);
}, 4000);

// Star rating logic
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stars').forEach(starSet => {
    const stars = starSet.querySelectorAll('i');
    stars.forEach((star, i) => {
      star.addEventListener('click', () => {
        stars.forEach((s, j) => {
          s.classList.toggle('active', j <= i);
        });
      });
    });
  });
});