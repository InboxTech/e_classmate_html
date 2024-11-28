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
        slidesPerView: 8,
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

  // Quantity Controls
  var minusBtn = document.getElementById("minus-btn");
  var plusBtn = document.getElementById("plus-btn");
  var number = document.getElementById("number");
  var items = document.querySelector(".items-qua");

  if (minusBtn && plusBtn && number && items) {
    let num = parseInt(localStorage.getItem("quantity")) || 1;
    number.innerText = num;

    items.style.display = num > 0 ? "flex" : "none";

    minusBtn.addEventListener("click", function () {
      if (num > 1) {
        num -= 1;
      } else if (num === 1) {
        items.style.display = "none";
      }
      number.innerText = num;
      localStorage.setItem("quantity", num);
    });

    plusBtn.addEventListener("click", function () {
      num += 1;
      number.innerText = num;
      localStorage.setItem("quantity", num);
      if (num > 0) {
        items.style.display = "flex";
      }
    });
  }

  // Price Range Slider
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

      const progressPercentage = Math.min((currentStep / (steps.length - 1)) * 100, 100);
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

  // Continue/Change buttons for refund and cancellation
  const continueBtn = document.querySelector("#continue");
  const changeBtn = document.querySelector("#change");
  const refund = document.querySelector(".refund-new");
  const cancelReason = document.querySelector(".cancel-reason");
  const selectedReason = document.querySelector("#selected-reason");

  if (continueBtn && changeBtn && refund && cancelReason && selectedReason) {
    continueBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevents the form from submitting
      refund.style.display = "block";
      cancelReason.style.display = "none";
      changeBtn.style.display = "block";
      selectedReason.style.display = "block";
    });

    changeBtn.addEventListener("click", function () {
      cancelReason.style.display = "block";
      refund.style.display = "none";
      changeBtn.style.display = "none";
      selectedReason.style.display = "none";
    });
  }
});
