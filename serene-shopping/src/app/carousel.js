(function() {
  // Only run this script once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const track = document.querySelector('.tc-track');
    const cards = Array.from(document.querySelectorAll('.tc-card'));
    const prevButton = document.querySelector('.tc-prev');
    const nextButton = document.querySelector('.tc-next');
    // Configuration options
    const autoplaySpeed = 4000; // Time between slides in milliseconds
    const transitionSpeed = 500; // Slide transition speed in milliseconds
    // Responsive settings
    const cardsToShow = window.innerWidth < 768 ? 1 : 3;
    const cardWidth = cards[0].offsetWidth + 20; // card width + margin
    // State variables
    let currentIndex = 0;
    let isTransitioning = false;
    let autoplayInterval;
    /**
     * Initialize the carousel
     */
    function initCarousel() {
      // Set initial position
      updateCarousel();
      // Start autoplay
      startAutoplay();
    }
    /**
     * Update carousel position based on current index
     */
    function updateCarousel() {
      // Calculate position
      const position = -1 * currentIndex * cardWidth;
      track.style.transform = `translateX(${position}px)`;
      // Prevent multiple clicks during transition
      isTransitioning = true;
      setTimeout(() => {
        isTransitioning = false;
      }, transitionSpeed);
    }
    /**
     * Go to a specific slide index
     * @param {number} index - The slide index to navigate to
     */
    function goToSlide(index) {
      if (isTransitioning) return;
      // Ensure index is within bounds
      currentIndex = index;
      if (currentIndex > cards.length - cardsToShow) {
        currentIndex = cards.length - cardsToShow;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      updateCarousel();
      resetAutoplay();
    }
    /**
     * Navigate to the previous slide
     */
    function goToPrevSlide() {
      if (isTransitioning) return;
      goToSlide(currentIndex - 1);
    }
    /**
     * Navigate to the next slide
     */
    function goToNextSlide() {
      if (isTransitioning) return;
      // Handle wrapping around to the first slide
      if (currentIndex >= cards.length - cardsToShow) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    }
    /**
     * Start the autoplay interval
     */
    function startAutoplay() {
      autoplayInterval = setInterval(goToNextSlide, autoplaySpeed);
    }
    /**
     * Reset the autoplay timer
     */
    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }
    // Set up event listeners
    // Navigation button events
    prevButton.addEventListener('click', goToPrevSlide);
    nextButton.addEventListener('click', goToNextSlide);
    // Pause autoplay on hover
    const carouselWrapper = document.querySelector('.tc-wrapper');
    carouselWrapper.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    carouselWrapper.addEventListener('mouseleave', () => {
      startAutoplay();
    });
    // Handle window resize
    window.addEventListener('resize', () => {
      const newCardsToShow = window.innerWidth < 768 ? 1 : 3;
      // Only update if the number of visible cards changed
      if (newCardsToShow !== cardsToShow) {
        // Temporarily disable transitions for repositioning
        cards.forEach(card => {
          card.style.transition = 'none';
        });
        // Reset position after a brief delay
        setTimeout(() => {
          cards.forEach(card => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
          });
          goToSlide(0);
        }, 50);
      }
    });
    // Initialize the carousel
    initCarousel();
  });
})();