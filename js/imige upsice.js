// Gallery data - dynamically generated from HTML
let galleryImages = [];
let currentImageIndex = 0;
let modal;

// Initialize modal and generate gallery data
document.addEventListener('DOMContentLoaded', function() {
    modal = new bootstrap.Modal(document.getElementById('imageModal'));
    generateGalleryData();
});

// Generate gallery data from existing HTML images
function generateGalleryData() {
    galleryImages = []; // Reset array
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-image');
        const title = item.querySelector('.gallery-title');

        if (img && title) {
            // Create high-res version of image src for modal
            let modalSrc = img.src;

            // If using picsum, convert to higher resolution for modal
            if (img.src.includes('picsum.photos')) {
                modalSrc = img.src.replace('400/300', '800/600');
            }

            galleryImages.push({
                src: modalSrc,
                alt: img.alt || title.textContent,
                title: title.textContent
            });
        }
    });

    console.log('Gallery initialized with', galleryImages.length, 'images');
}

// Open modal with specific image
function openModal(index) {
    if (galleryImages.length === 0) {
        console.warn('No images found in gallery');
        return;
    }

    currentImageIndex = index;
    showImage();
    modal.show();
}

// Close modal
function closeModal() {
    modal.hide();
}

// Show current image in modal
function showImage() {
    const image = galleryImages[currentImageIndex];
    document.getElementById('modalImage').src = image.src;
    document.getElementById('modalImage').alt = image.alt;
    document.getElementById('modalTitle').textContent = image.title;
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage();
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage();
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (modal._isShown) {
        switch(e.key) {
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeModal();
                break;
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('imageModal').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('imageModal').addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage(); // Swipe left = next image
        } else {
            prevImage(); // Swipe right = previous image
        }
    }
}

// Dark mode switch functionality (if needed)
document.getElementById('darkModeSwitch').addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
    }
});