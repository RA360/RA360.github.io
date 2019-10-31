$(document).ready(function() {
  // Lang Select
  $("#lang").click(function(e) {
    e.stopPropagation();
    $("#currency-icon").removeClass("currency-icon");
    $("#currency-select").removeClass("open");
    $("#lang-icon").toggleClass("lang-icon");
    $("#lang-select").toggleClass("open");
  });

  // Currency Select
  $("#currency").click(function(e) {
    e.stopPropagation();
    $("#lang-icon").removeClass("lang-icon");
    $("#lang-select").removeClass("open");
    $("#currency-icon").toggleClass("currency-icon");
    $("#currency-select").toggleClass("open");
  });

  // Hamburger
  $("#hamburger").click(function(e) {
    e.stopPropagation();
    $(this).toggleClass("open");
    $("#hamburger-box").toggleClass("open");
  });

  // Hamburger Open
  $("#hamburger-shop").click(function(e) {
    e.stopPropagation();
    $("#hamburger-angle").toggleClass("open");
    $("#hamburger-dropdown").toggleClass("open");
  });

  // Slider for Banners
  let banners = new Swiper("#banners", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });

  // Slider for Qualities
  let qualities = new Swiper("#qualities", {
    slidesPerView: 5,
    allowSlideNext: false,
    allowSlidePrev: false,
    pagination: {
      el: ".swiper-pagination"
    },
    breakpoints: {
      1400: {
        slidesPerView: 4,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      1200: {
        slidesPerView: 3,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      1110: {
        slidesPerView: 2,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      570: {
        slidesPerView: 1,
        allowSlideNext: true,
        allowSlidePrev: true
      }
    }
  });

  let productsCar = new Swiper("#products-car", {
    slidesPerView: 4,
    allowSlideNext: true,
    allowSlidePrev: true,
    pagination: {
      el: ".swiper-pagination"
    },
    breakpoints: {
      1800: {
        slidesPerView: 3,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      1400: {
        slidesPerView: 2,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      1000: {
        slidesPerView: 1,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      470: {
        slidesPerView: 1,
        spaceBetween: 50,
        allowSlideNext: true,
        allowSlidePrev: true
      }
    }
  });

  let productsCamel = new Swiper("#products-camel", {
    slidesPerView: 3,
    allowSlideNext: false,
    allowSlidePrev: false,
    pagination: {
      el: ".swiper-pagination"
    },
    breakpoints: {
      1400: {
        slidesPerView: 2,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      1000: {
        slidesPerView: 1,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      470: {
        slidesPerView: 1,
        spaceBetween: 50,
        allowSlideNext: true,
        allowSlidePrev: true
      }
    }
  });

  // Slider for Galleries
  let galleries = new Swiper("#galleries", {
    slidesPerView: 6,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination"
    },
    breakpoints: {
      1920: {
        slidesPerView: 5
      },
      1550: {
        slidesPerView: 4
      },
      1280: {
        slidesPerView: 3
      }
    }
  });

  // Slider for categories btns
  let categoiresBtns = new Swiper("#categories-btns", {
    allowSlideNext: false,
    allowSlidePrev: false,
    breakpoints: {
      590: {
        allowSlideNext: true,
        allowSlidePrev: true
      }
    }
  });

  // Upload Modal
  $("#gallery-btn").click(function() {
    $("#upload").toggleClass("open");
  });

  $("#upload-close").click(function() {
    $("#upload").removeClass("open");
  });

  // Upload Button
  $("#upload-file").click(function() {
    $("#file").click();
  });

  // Allow Right
  $("#right").click(function() {
    $("#right-checked").toggleClass("allow");
  });

  // Product Gallery
  let productThumbs = new Swiper("#product-thumbs", {
    spaceBetween: 10,
    slidesPerView: 5,
    loop: true,
    freeMode: true,
    loopedSlides: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      1550: {
        slidesPerView: 4,
        spaceBetween: 0
      },
      1400: {
        slidesPerView: 3
      },
      1110: {
        slidesPerView: 2
      },
      820: {
        slidesPerView: 4
      },
      650: {
        slidesPerView: 3
      },
      500: {
        slidesPerView: 2
      },
      400: {
        slidesPerView: 1
      }
    }
  });

  let productGallery = new Swiper("#product-gallery", {
    spaceBetween: 100,
    loop: true,
    loopedSlides: 5,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    thumbs: {
      swiper: productThumbs
    }
  });

  // Product Quantity
  let quantityNum = Number($("#quantity-num").html());
  $("#quantity-next").click(function() {
    if (quantityNum < 7) {
      quantityNum += 1;
      $("#quantity-num").html(quantityNum);
    }
  });

  $("#quantity-prev").click(function() {
    if (quantityNum > 1) {
      quantityNum -= 1;
      $("#quantity-num").html(quantityNum);
    }
  });

  // Accordion for Description
  $("#accordion").click(function() {
    $("#ac-body")
      .not($(this).next())
      .slideUp(500);
    $("#desc-angle").toggleClass("open");
    $(this)
      .next()
      .slideToggle(500);
  });

  // Related Products
  let relatedProducts = new Swiper("#related-products", {
    slidesPerView: 4,
    allowSlideNext: false,
    allowSlidePrev: false,
    pagination: {
      el: ".swiper-pagination"
    },
    breakpoints: {
      1800: {
        slidesPerView: 3,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      1400: {
        slidesPerView: 2,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      1000: {
        slidesPerView: 1,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      470: {
        slidesPerView: 1,
        spaceBetween: 50,
        allowSlideNext: true,
        allowSlidePrev: true
      }
    }
  });

  $(window).click(function() {
    $("#hamburger-angle").removeClass("open");
    $("#hamburger-dropdown").removeClass("open");
    $("#lang-icon").removeClass("lang-icon");
    $("#lang-select").removeClass("open");
    $("#currency-icon").removeClass("currency-icon");
    $("#currency-select").removeClass("open");
  });
});
