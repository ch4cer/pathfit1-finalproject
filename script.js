document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the 'hidden' class (the sections) for the scroll animation
    const hiddenElements = document.querySelectorAll('.hidden');

    // Setup the Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Check if the element is visible (intersecting the viewport)
            if (entry.isIntersecting) {
                // Add the 'show' class to fade it in
                entry.target.classList.add('show');
                // Stop observing this element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options: trigger when 10% of the element is visible
        rootMargin: '0px',
        threshold: 0.1 
    });

    // Loop through all hidden elements and start observing them
    hiddenElements.forEach(el => {
        observer.observe(el);
    });
});

// Function to move the slide left or right AND pause the old video
function moveSlide(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;
    
    // Get total number of slides and current index
    const slides = track.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = parseInt(track.getAttribute('data-current-index'));
    
    // --- VIDEO PAUSE LOGIC ---
    // 1. Find the current (soon-to-be-old) slide
    const currentSlide = slides[currentIndex];
    const currentVideo = currentSlide ? currentSlide.querySelector('video') : null;
    
    // 2. Calculate the new index
    let newIndex = currentIndex + direction;
    
    // Handle wrapping (looping)
    if (newIndex >= totalSlides) {
        newIndex = 0; // Go to first slide
    } else if (newIndex < 0) {
        newIndex = totalSlides - 1; // Go to last slide
    }

    // 3. Pause the video in the slide that is moving out of view
    if (currentVideo) {
        currentVideo.pause();
    }
    // -------------------------
    
    // 4. Update the data attribute with the new index
    track.setAttribute('data-current-index', newIndex);
    
    // 5. Calculate the translation distance (100% per slide)
    const translateValue = -newIndex * 100;
    
    // 6. Apply the transformation
    track.style.transform = `translateX(${translateValue}%)`;
}