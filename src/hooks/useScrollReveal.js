import { useEffect } from 'react';

/**
 * A custom hook that attaches an IntersectionObserver to multiple elements.
 * Elements with the class 'reveal-element' will automatically get the 'active'
 * class added to them when they scroll into the viewport.
 */
function useScrollReveal() {
  useEffect(() => {
    // Elements to reveal
    const reveals = document.querySelectorAll('.reveal-element');

    // Intersection Observer callback
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        // When element is visible
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Stop observing once revealed
          observer.unobserve(entry.target);
        }
      });
    };

    // Observer options
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing all matched elements
    reveals.forEach(el => observer.observe(el));

    // Cleanup when component unmounts
    return () => {
      reveals.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []); // Run once on mount
}

export default useScrollReveal;
