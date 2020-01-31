const productsList = document.querySelector("#productsList"),
  priceSel = document.querySelector("#priceSel"),
  showProducts = () => {
    productsList.innerHTML =
      '<div class="spinner"><div class="rect"></div><div class="rect rect_2"></div><div class="rect rect_3"></div><div class="rect rect_4"></div><div class="rect rect_5"></div></div>';
    fetch('assets/js/goods.js')
      .then(response => response.json())
      .then(goods => {
        const sort = [];
        document.querySelectorAll(".sort.active").forEach(s => sort.unshift(s.textContent));
        productsList.textContent = "";

        goods.sort((a, b) => {
          if (priceSel.value == "ascending") return a.price - b.price;
          else if (priceSel.value == 'descending') return b.price - a.price;
        }).forEach(g => {
          if (g.sort.includes(sort.join(" "))) {
            const product = document.createElement("a");
            product.href = `pages/product.html?${g.id}`;
            product.className = "products__item";
            product.target = "_blank";
            product.innerHTML = `<div class="product-img"><img src="assets/img/product${g.id}.png" alt="${g.title}" /></div><h3 class="product-txt">${g.title}</h3><p class="product-desc">Get the most out of your music with an experience.</p><div class="pricing"><p class="price product-txt">$${g.price}</p><ul class="stars"><li class="star star_painted"></li><li class="star star_painted"></li><li class="star star_painted"></li><li class="star star_unpainted"></li><li class="star star_unpainted"></li></ul></div>`;
            productsList.appendChild(product);
          }
        });
        if (productsList.textContent == "") {
          if (!document.querySelector("#notFound"))
            productsList.innerHTML =
            '<p class="not-found" id="notFound">No products found</p>';
        } else if (document.querySelector("#notFound"))
          document.querySelector("#notFound").remove();
      })
  };

showProducts();
document.querySelectorAll(".slider").forEach(e => {
  const slides = e.querySelectorAll(".slide"),
    dots = e.querySelectorAll(".slider__dot");
  let index = 0;
  const goToSlide = n => {
    slides[index].className = "slide";
    index = (n + slides.length) % slides.length;
    slides[index].classList.add("active");
    document.querySelector("#showBtn").href = `pages/product.html?${slides[
        index
      ].href
        .split("?")
        .pop()}`;
    e.querySelector(".slider__dot.active").classList.remove("active");
    dots[index].classList.add("active");
  };
  e.querySelector(".slider__next").addEventListener("click", () =>
    goToSlide(index + 1)
  );
  e.querySelector(".slider__prev").addEventListener("click", () =>
    goToSlide(index - 1)
  );
  dots.forEach(d => {
    d.addEventListener("click", () => goToSlide(+d.textContent - 1));
  });
});

document.querySelectorAll(".feature__color").forEach(e => {
  e.addEventListener("click", () => {
    document
      .querySelector(".feature__color.active")
      .classList.remove("active");
    e.classList.add("active");
    document.querySelectorAll(".feature .slide").forEach(s => {
      s.href = `pages/product.html?${e.dataset.img}`;
      s.querySelector(
        "img"
      ).src = `assets/img/product${e.dataset.img}-lg.jpg`;
    });
  });
});

document.querySelectorAll(".play").forEach(e => {
  e.addEventListener("click", () => {
    if (e.parentNode.className == "header__video")
      e.parentNode.style.boxShadow = "none";
    e.parentNode.innerHTML = `<video class="video" width="100%" height="100%" autoplay controls><source src="assets/videos/${e.dataset.video}.mp4" type="video/mp4"><source src="assets/videos/${e.dataset.video}.ogv" type="video/ogg">Your browser does not support the video tag.</video>`;
  });
});

document.querySelectorAll(".sorts_kind .sort").forEach(e => {
  e.addEventListener("click", () => {
    e.parentNode.querySelector(".sort.active").classList.remove("active");
    e.classList.add("active");
    showProducts();
  });
  e.addEventListener("mouseover", () => {
    e.parentNode.querySelector(".sort.active").style.opacity = 0.6;
    e.style.opacity = 1;
  });
  e.addEventListener("mouseout", () => {
    if (!e.className.includes("active")) {
      e.parentNode.querySelector(".sort.active").style.opacity = 1;
      e.style.opacity = 0.6;
    }
  });
});

document.querySelectorAll(".sorts_color .sort").forEach(e => {
  e.addEventListener("click", () => {
    const activeSort = e.parentNode.querySelector(".sort.active");
    if (activeSort && e.textContent != activeSort.textContent) {
      activeSort.classList.remove("active");
    }
    e.classList.toggle("active");
    showProducts();
  });
});

priceSel.addEventListener("change", showProducts);