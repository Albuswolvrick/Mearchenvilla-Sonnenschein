// Sample image data - replace with your actual images
const images = [
    {
        src: "img/Eingang.jpg",
        name: "der Eingang",
        alt: "Der Eingang"
    },
    {
        src: "img/Gruppenraum1.jpg",
        name: "Der Gruppenraum",
        alt: "Gruppenraum"
    },
    {
        src: "img/Gruppenraum2.jpg",
        name: "der Gruppenraum",
        alt: "der Gruppenraum"
    },
    {
        src: "img/Frühstück.jpg",
        name: "frühstück",
        alt: "frühstück"
    },
    {
        src: "img/schlafecke.jpg",
        name: "schlaf Raum",
        alt: "schlafraum"
    },
    {
        src: "img/Toilette.jpg",
        name: "die toilette ",
        alt: "die toilette"
    },
    {
        src: "img/Francis test bild.jpg",
        name: "Francis ein Schönner Hund",
        alt: "Francis test bild"
    }
];

//writes the Modall
let currentImageIndex = 0;
const modal = new bootstrap.Modal(document.getElementById('imageModal'));

// Generate gallery using for loop
function createGallery() 
{
    const galleryRow = document.getElementById('gallery-row');

    for (let i = 0; i < images.length; i++) {
        const image = images[i];

        // Create column with responsive classes (1 col on mobile, 2 on tablet, 3 on desktop)
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-6 col-lg-4';

        // Create gallery item
        colDiv.innerHTML = `
                    <div class="gallery-item" data-index="${i}">
                        <img src="${image.src}" alt="${image.alt}" loading="lazy">
                        <div class="image-overlay">
                            <h6 class="mb-0">${image.name}</h6>
                        </div>
                    </div>
                `;

        galleryRow.appendChild(colDiv);
    }
}

// Open modal with selected image
function openModal(index) {
    currentImageIndex = index;
    updateModalContent();
    modal.show();
}

// Update modal content
function updateModalContent() {
    const image = images[currentImageIndex];
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalImageTitle');
    const counter = document.getElementById('imageCounter');

    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalTitle.textContent = image.name;
    counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

// Navigate to previous image
function showPrevious() {
    currentImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    updateModalContent();
}

// Navigate to next image
function showNext() {
    currentImageIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    updateModalContent();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Create gallery
    createGallery();

    // Add click event to gallery items
    document.getElementById('gallery-row').addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const index = parseInt(galleryItem.dataset.index);
            openModal(index);
        }
    });

    // Navigation buttons
    document.getElementById('prevBtn').addEventListener('click', showPrevious);
    document.getElementById('nextBtn').addEventListener('click', showNext);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (document.querySelector('.modal.show')) {
            if (e.key === 'ArrowLeft') {
                showPrevious();
            } else if (e.key === 'ArrowRight') {
                showNext();
            }
        }
    });
});