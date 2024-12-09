// navbar scrolling effect
const header = document.querySelector(".navbar-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("nav-scrolled");
  } else {
    header.classList.remove("nav-scrolled");
  }
});

//user icon hover js
var user = document.querySelector(".user");
var nav_user = document.querySelector(".nav-user");

user.addEventListener("mouseenter", function () {
  nav_user.style.display = "flex";
});
nav_user.addEventListener("mouseenter", function () {
  nav_user.style.display = "flex";
});

nav_user.addEventListener("mouseleave", function () {
  nav_user.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  // Swiper initialization for different sliders
  var swiper1 = new Swiper(".mySwiper", {
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
        slidesPerView: 7,
        spaceBetween: 20,
      },
    },
  });

  var swiper2 = new Swiper(".myRelProSwiper", {
    slidesPerView: 6,
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

  var swiper3 = new Swiper(".myStationarySwiper", {
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
        spaceBetween: 24,
      },
    },
  });

  // Retrieve the saved number from localStorage or default to 1
  var num = parseInt(localStorage.getItem("quantity"));
  num = 1;
  num = isNaN(num) ? 1 : num;
  number.innerText = num;

  // Set the initial visibility of controls
  items.style.display = num > 0 ? "flex" : "none";

  // Minus button decreases the number
  minusBtn.addEventListener("click", function () {
    if (num > 1) {
      num -= 1;
    } else if (num === 1) {
      // num = 0;
      items.style.display = "none"; // Hide the quantity controls
    }
    number.innerText = num;
    localStorage.setItem("quantity", num);
  });

  // Plus button increases the number
  plusBtn.addEventListener("click", function () {
    num += 1;
    number.innerText = num;
    localStorage.setItem("quantity", num);

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
  spaceBetween: 4,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

//price range
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const thumbLeft = document.getElementById("thumb-left");
  const thumbRight = document.getElementById("thumb-right");
  const priceLeft = document.getElementById("price-left");
  const priceRight = document.getElementById("price-right");

  if (slider && thumbLeft && thumbRight && priceLeft && priceRight) {
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
      thumb.style.left = `${percentage * (100 - 5)}%`;
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
      const minSelectedPrice = parseInt(
        priceLeft.innerText.replace("₹", "").trim()
      );
      const maxSelectedPrice = parseInt(
        priceRight.innerText.replace("₹", "").trim()
      );
      console.log("Filtered price range:", {
        minSelectedPrice,
        maxSelectedPrice,
      });
      // Add AJAX or filtering logic if needed
    };

    // Initialize slider
    updateSliderColor();
  }

  // Order Tracking
  let currentStep = 0;

  const updateSteps = () => {
    const steps = document.querySelectorAll(".step");
    const progressBar = document.querySelector(".progress-line span");

    if (steps.length && progressBar) {
      steps.forEach((step, index) => {
        if (index < currentStep) {
          step.classList.add("completed");
          step.classList.remove("active");
        } else if (index === currentStep) {
          step.classList.add("completed");
          step.classList.remove("active");
        } else {
          step.classList.remove("active");
          step.classList.remove("completed");
        }
      });

      const progressPercentage = Math.min(
        (currentStep / (steps.length - 1)) * 100,
        100
      );
      progressBar.style.width = `${progressPercentage}%`;
    }
  };

  const nextStepButton = document.getElementById("nextStep");
  if (nextStepButton) {
    nextStepButton.addEventListener("click", () => {
      const steps = document.querySelectorAll(".step");
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateSteps();
      } else {
        alert("All steps are completed!");
      }
    });
  }

  updateSteps();
});

// cancel page js
document.addEventListener("DOMContentLoaded", function () {
  var continue_btn = document.querySelector("#continue");
  var change_btn = document.querySelector("#change");
  var refund = document.querySelector(".refund-new");
  var cancel_reason = document.querySelector(".cancel-reason");
  var selected_reason = document.querySelector("#selected-reason");
  var select_reason = document.querySelector("#select-reason");

  // Hide change button by default

  continue_btn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevents the form from submitting
    refund.style.display = "block";
    cancel_reason.style.display = "none";
    change_btn.style.display = "block";
    selected_reason.style.display = "block";
    selected_reason.innerHTML = select_reason.value; // Corrected line
  });

  change_btn.addEventListener("click", function () {
    cancel_reason.style.display = "block";
    refund.style.display = "none";
    change_btn.style.display = "none";
    selected_reason.style.display = "none";
  });
});

//plus minus btn an dadd to cart btn
document.addEventListener("DOMContentLoaded", function () {
  var minusBtns = document.querySelectorAll(".minus-btn");
  var plusBtns = document.querySelectorAll(".plus-btn");
  var numberElements = document.querySelectorAll(".number");
  var btns = document.querySelectorAll(".add-to-cart-btn");
  var items = document.querySelectorAll(".items-qua");
  var td = document.querySelector("td");

  // Loop through each product card
  minusBtns.forEach((minusBtn, index) => {
    let n = localStorage.getItem(`quantity-${index}`)
      ? parseInt(localStorage.getItem(`quantity-${index}`))
      : 1;
    let isCartVisible =
      localStorage.getItem(`isCartVisible-${index}`) === "true";

    if (td) {
      items[index].style.display = "flex";
    } else {
      if (isCartVisible) {
        items[index].style.display = "flex"; // Show quantity controls
        btns[index].style.display = "none"; // Hide Add to Cart button
      } else {
        items[index].style.display = "none"; // Hide quantity controls
        btns[index].style.display = "block"; // Show Add to Cart button
      }
    }

    // Set the initial quantity
    numberElements[index].textContent = n;

    // Update the state of the minus button
    function updateMinusButton() {
      minusBtns[index].disabled = n <= 1;
    }

    updateMinusButton();

    // Minus button decreases the number
    minusBtn.addEventListener("click", function () {
      if (td) {
        // If td exists, do not change quantity
        if (n > 1) {
          n -= 1;
          numberElements[index].textContent = n;
          localStorage.setItem(`quantity-${index}`, n); // Save quantity to localStorage
          updateMinusButton();
        }
        return;
      }
      if (n > 1) {
        n -= 1;
        btns[index].style.display = "none"; // Hide the Add to Cart button
        items[index].style.display = "flex"; // Show quantity controls
      } else if (n === 1) {
        n -= 1;
        btns[index].style.display = "block"; // Show the Add to Cart button
        localStorage.setItem(`isCartVisible-${index}`, "false"); // Save visibility state
        items[index].style.display = "none"; // Hide the quantity controls
      }
      numberElements[index].textContent = n;
      localStorage.setItem(`quantity-${index}`, n); // Save quantity to localStorage
      updateMinusButton();
    });

    // Button to restore item quantity controls
    if (!td) {
      btns[index].addEventListener("click", function () {
        n = 1; // Reset the number to default value
        numberElements[index].textContent = n; // Update the UI
        items[index].style.display = "flex"; // Show the quantity controls
        btns[index].style.display = "none"; // Hide the Add to Cart button
        localStorage.setItem(`quantity-${index}`, n); // Save quantity to localStorage
        localStorage.setItem(`isCartVisible-${index}`, "true"); // Save visibility state
        updateMinusButton();
      });
    }
    // Plus button increases the number
    plusBtns[index].addEventListener("click", function () {
      if (td) {
        n += 1;
        // If td exists, do not change quantity
        numberElements[index].textContent = n;
        localStorage.setItem(`quantity-${index}`, n); // Save quantity to localStorage
        return;
      } else {
        n += 1;
        numberElements[index].textContent = n;
        btns[index].style.display = "none"; // Hide the Add to Cart button
        items[index].style.display = "flex"; // Show the quantity controls
        localStorage.setItem(`quantity-${index}`, n); // Save quantity to localStorage
        localStorage.setItem(`isCartVisible-${index}`, "true"); // Save visibility state
      }
      updateMinusButton();
    });
  });
});

//heart image change on click
var heart_images = document.querySelectorAll(".heart");
heart_images.forEach((heart_img) => {
  heart_img.addEventListener("click", function () {
    let currentSrc = heart_img.getAttribute("src");
    console.log("Current src: ", currentSrc); // This will help you debug

    if (currentSrc.includes("heart.png")) {
      heart_img.setAttribute("src", "public/images/books/heart-fill.png");
    } else {
      heart_img.setAttribute("src", "public/images/books/heart.png");
    }
  });
});

//toggle password
function togglePassword(event, inputId, className) {
  const icon = event.currentTarget; // The clicked icon element
  const pass = document.getElementById(inputId); // Use ID to select the input field

  if (pass) {
    // Determine the current state of the password input field
    const isPassword = pass.type === 'password';

    // Toggle the type of the input field
    pass.type = isPassword ? 'text' : 'password';

    // Toggle the icon class (eye-open/eye-slash)
    if (isPassword) {
      icon.classList.remove(className); // Remove 'fa-eye-slash'
      icon.classList.add('fa-eye'); // Add 'fa-eye'
    } else {
      icon.classList.remove('fa-eye'); // Remove 'fa-eye'
      icon.classList.add(className); // Add 'fa-eye-slash'
    }
  }
}

// change profile photo
function triggerFileInput() {
  document.getElementById('fileInput').click();  // Triggers the file input dialog when pen icon is clicked
}
function changeProfile(input) {
  var file = input.files[0];
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // Update the src attribute of the profile image with the selected file
      document.getElementById('profile').src = e.target.result;
    }

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
}
