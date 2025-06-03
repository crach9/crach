const carousel = document.getElementById("carousel");
let currentIndex = 0;
const visibleItems = 6;
let totalItems = carousel.children.length;

// Клонируем первые и последние элементы для бесшовной прокрутки
for (let i = 0; i < visibleItems; i++) {
  const firstClone = carousel.children[i].cloneNode(true);
  firstClone.classList.add('clone');
  carousel.appendChild(firstClone);
}
for (let i = totalItems - 1; i >= totalItems - visibleItems; i--) {
  const lastClone = carousel.children[i].cloneNode(true);
  lastClone.classList.add('clone');
  carousel.insertBefore(lastClone, carousel.firstChild);
}

// Обновляем переменные
let offset = visibleItems;
totalItems = carousel.children.length;
let itemWidth = carousel.children[offset].offsetWidth + 20; // 20 = gap
carousel.style.transform = `translateX(-${offset * itemWidth}px)`;

function scrollCarousel(direction) {
  currentIndex += direction; // теперь direction всегда +/-1
  const maxIndex = totalItems - 2 * visibleItems;
  carousel.style.transition = 'transform 0.4s ease';
  carousel.style.transform = `translateX(-${(offset + currentIndex) * itemWidth}px)`;

  // Зацикливание
  setTimeout(() => {
    if (currentIndex < 0) {
      carousel.style.transition = 'none';
      currentIndex = maxIndex - 1;
      carousel.style.transform = `translateX(-${(offset + currentIndex) * itemWidth}px)`;
    } else if (currentIndex >= maxIndex) {
      carousel.style.transition = 'none';
      currentIndex = 0;
      carousel.style.transform = `translateX(-${offset * itemWidth}px)`;
    }
  }, 400);
} 