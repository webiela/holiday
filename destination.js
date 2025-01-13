'use strict';





/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});

function showSuggestions(value) {
  const dropdown = document.getElementById('search-dropdown');
  if (value.length === 0) {
    dropdown.style.display = 'none';
    return;
  }

  // Example suggestions, replace with actual data
  const suggestions = ['Destination 1', 'Destination 2', 'Destination 3', 'Destination 4'];
  const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase()));

  dropdown.innerHTML = '';
  filteredSuggestions.forEach(suggestion => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.textContent = suggestion;
    item.onclick = () => {
      document.querySelector('.search-bar').value = suggestion;
      dropdown.style.display = 'none';
    };
    dropdown.appendChild(item);
  });

  dropdown.style.display = 'block';
}