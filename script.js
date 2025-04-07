document.addEventListener("DOMContentLoaded", function () {
  // Handle the menu-toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function (event) {
      navbar.classList.toggle("active");
      menuToggle.classList.toggle("active");
      event.stopPropagation();
    });

    document.addEventListener("click", function (event) {
      if (!navbar.contains(event.target) && event.target !== menuToggle) {
        navbar.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });

    document.querySelectorAll(".navbar a").forEach((link) => {
      link.addEventListener("click", function () {
        navbar.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }

  if (document.querySelector(".photo-gallery")) {
    let currentImageIndex = 0;
    let currentImages = [];

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector("#lightbox .close");

    if (lightbox) {
      lightbox.classList.add("hidden");
    }

    window.toggleCard = function (id) {
      const card = document.getElementById(id);
      const content = card.querySelector(".card-content");

      if (content) {
        content.classList.toggle("hidden");
      } else {
        console.error(" Error: Could not find content inside card", id);
      }
    };

    window.openLightbox = function (index, cardId) {
      const card = document.getElementById(cardId);
      if (!card) {
        console.error(" Error: Could not find card with ID:", cardId);
        return;
      }

      currentImages = Array.from(card.querySelectorAll(".image-grid img"));
      if (currentImages.length === 0) {
        console.error(" Error: No images found in card:", cardId);
        return;
      }

      if (index < 0 || index >= currentImages.length) {
        console.error(" Error: Invalid image index:", index);
        return;
      }

      const selectedImage = currentImages[index];
      if (!selectedImage || !selectedImage.src) {
        console.error(" Error: Selected image not found.");
        return;
      }

      lightboxImg.src = selectedImage.src;
      lightbox.classList.remove("hidden");

      currentImageIndex = index;
    };

    window.changeImage = function (direction) {
      if (currentImages.length === 0) return;

      currentImageIndex += direction;

      if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
      } else if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
      }

      lightboxImg.src = currentImages[currentImageIndex].src;
    };

    window.closeLightbox = function () {
      if (lightbox) {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
      }
    };

    if (closeBtn) {
      closeBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        closeLightbox();
      });
    }

    if (lightbox) {
      lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeLightbox();
      }
    });
  }
});
