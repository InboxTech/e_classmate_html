var swiper = new Swiper(".mySwiper", {
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 15,
    },
    1440: {
      slidesPerView: 8,
      spaceBetween: 20,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  var minusBtn = document.getElementById("minus-btn");
  var plusBtn = document.getElementById("plus-btn");
  var number = document.getElementById("number");
  var items = document.querySelector(".items-qua");

  // Retrieve the saved number from localStorage or default to 1
  var num = localStorage.getItem("quantity") ? parseInt(localStorage.getItem("quantity")) : 1;
  number.innerText = num;

  // Set the initial visibility of controls based on the saved number
  if (num > 0) {
    items.style.display = "flex";
  } else {
    items.style.display = "none";
  }

  // Minus button decreases the number
  minusBtn.addEventListener("click", function () {
    if (num > 1) {
      num -= 1;
    } else if (num === 1) {
      items.style.display = "none"; // Hide the quantity controls
    }
    number.innerText = num;
    localStorage.setItem("quantity", num); // Save the updated number
  });

  // Plus button increases the number
  plusBtn.addEventListener("click", function () {
    num += 1;
    number.innerText = num; // Fix typo here
    localStorage.setItem("quantity", num); // Save the updated number

    if (num > 0) {
      items.style.display = "flex"; // Show the quantity controls
    }
  });
});

//related product swiper in product detail page
var swiper = new Swiper(".myRelProSwiper", {
  slidesPerView: 6,
  // spaceBetween:10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

var swiper = new Swiper(".myStationarySwiper", {
  // slidesPerView: 5,
  spaceBetween: 3,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
});


// let currentIndex = 0;
// const slides = document.querySelectorAll('.offer-slide');
// const totalSlides = slides.length;

// function showSlide(index) {
//   slides.forEach((slide, i) => {
//     if (i === index) {
//       gsap.to(slide, { y: 0, duration: 0.5, ease: "power2.out", opacity: 1 });
//     } else {
//       gsap.to(slide, { y: "100%", duration: 0.5, ease: "power2.out", opacity: 0 });
//     }
//   });
// }

// function nextSlide() {
//   currentIndex = (currentIndex + 1) % totalSlides;
//   showSlide(currentIndex);
// }

// // Initialize the first slide
// showSlide(currentIndex);

// // Change slide every 3 seconds
// setInterval(nextSlide, 3000);



document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const thumbLeft = document.getElementById("thumb-left");
  const thumbRight = document.getElementById("thumb-right");
  const priceLeft = document.getElementById("price-left");
  const priceRight = document.getElementById("price-right");

  const minPrice = 0;
  const maxPrice = 2000;

  let draggingThumb = null;

  const getPercentage = (clientX, sliderRect) => {
    const position = Math.min(
      Math.max(clientX - sliderRect.left, 0),
      sliderRect.width
    );
    return position / sliderRect.width;
  };

  const updateThumb = (thumb, percentage, priceLabel) => {
    const price = Math.round(minPrice + (maxPrice - minPrice) * percentage);
    thumb.style.left = `${percentage * 100}%`;
    priceLabel.innerText = `₹ ${price}`;
  };

  const updateSliderColor = () => {
    const leftPercent = thumbLeft.offsetLeft / slider.offsetWidth;
    const rightPercent = thumbRight.offsetLeft / slider.offsetWidth;

    slider.style.background = `linear-gradient(
      to right,
      grey ${leftPercent * 100}%,
      red ${leftPercent * 100}%,
      red ${rightPercent * 100}%,
      grey ${rightPercent * 100}%
    )`;
  };

  const onMouseMove = (event) => {
    const sliderRect = slider.getBoundingClientRect();
    const percentage = getPercentage(event.clientX, sliderRect);

    if (draggingThumb === "left") {
      if (percentage < parseFloat(thumbRight.style.left) / 100) {
        updateThumb(thumbLeft, percentage, priceLeft);
      }
    } else if (draggingThumb === "right") {
      if (percentage > parseFloat(thumbLeft.style.left) / 100) {
        updateThumb(thumbRight, percentage, priceRight);
      }
    }
    updateSliderColor();
  };

  const onMouseUp = () => {
    draggingThumb = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    filterByPrice();
  };

  thumbLeft.addEventListener("mousedown", () => {
    draggingThumb = "left";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  thumbRight.addEventListener("mousedown", () => {
    draggingThumb = "right";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  const filterByPrice = () => {
    const minSelectedPrice = parseInt(priceLeft.innerText.replace("₹", "").trim());
    const maxSelectedPrice = parseInt(priceRight.innerText.replace("₹", "").trim());
    console.log("Filtered price range:", { minSelectedPrice, maxSelectedPrice });

    // Add AJAX or filtering logic if needed
  };

  // Initialize slider
  updateSliderColor();
});
