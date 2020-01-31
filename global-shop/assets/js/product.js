const locationVal = window.location.search.split("?").pop(),
  insertNotFound = () => {
    document.body.insertAdjacentHTML("afterbegin", '<p class="not-found">No product found</p>');
    document.title = "No Product Found - Global Shop";
  };
if (+locationVal) {
  // <a href="#" class="help">Get help buying. Chat now.</a>
  document.querySelector("#header")
    .insertAdjacentHTML("afterend", '<div class="spinner" id="spinner"><div class="rect"></div><div class="rect rect_2"></div><div class="rect rect_3"></div><div class="rect rect_4"></div><div class="rect rect_5"></div></div>');
  fetch('../assets/js/goods.js')
    .then(response => response.json())
    .then(goods => {
      const item = goods[locationVal - 1],
        spinner = document.querySelector('#spinner');
      if (item) {
        const detail = document.createElement('section');
        detail.className = 'detail';
        detail.innerHTML = `<div class="detail__box"><h2 class="offer" id="detailOffer">${item.title}</h2><ul class="stars"><li class="star star_painted"></li><li class="star star_painted"></li><li class="star star_painted"></li><li class="star star_unpainted"></li><li class="star star_unpainted"></li></ul><p class="detail__desc" id="detailDesc">With up to 40 hours of battery life, ${item.title} is your perfect everyday headphone. Get the most out of your music with an award-winning, emotionally charged Beats listening experience.</p><input class="detail__input" id="detailI" type="number" min="1" max="99" value="1" /><div class="detail__btns"><button class="detail__btn black-btn" id="addToCart">Add to cart</button><button class="fav" title="Add to favourites"><i class="far fa-heart" id="favIcon"></i></button></div></div><div><img src="../assets/img/product${item.id}-lg.jpg" alt="${item.title}" id="detailPhoto" /><div class="thumbs"><div class="thumb active" data-img="${item.id}"><img src="../assets/img/product${item.id}-thumb.jpg" alt="" /></div><div class="thumb" data-img="${item.id}"><img src="../assets/img/product${item.id}-thumb.jpg" alt="" /></div><div class="thumb" data-img="${item.id}"><img src="../assets/img/product${item.id}-thumb.jpg" alt="" /></div><div class="thumb" data-img="${item.id}"><img src="../assets/img/product${item.id}-thumb.jpg" alt="" /></div><div class="thumb" data-img="${item.id}"><img src="../assets/img/product${item.id}-thumb.jpg" alt="" /></div></div></div>`;
        document.body.replaceChild(detail, spinner);
        document.title = `${item.title} - buy at a bargain price | Global Shop`;
        const detailI = document.querySelector("#detailI");
        document.querySelector("#favIcon").addEventListener("click", function () {
          this.classList.toggle("fas");
          if (!this.className.includes("fas")) this.title = "Add to favorites";
          else this.title = "Added to favorites";
        });
        document.querySelectorAll(".thumb").forEach(e => {
          e.addEventListener("mouseover", () => {
            document.querySelector(".thumb.active").classList.remove("active");
            e.classList.add("active");
            document.querySelector(
              "#detailPhoto"
            ).src = `../assets/img/product${e.dataset.img}-lg.jpg`;
          });
        });

        detailI.addEventListener("input", function () {
          const val = this.value;
          if (val.includes(".")) this.value = val.replace(/[^\d]/g, "");
          else if (val[0] == 0) this.value = val.slice(1);
          if (this.value == "") this.value = 1;
          if (+val > 99) this.value = 99;
        });

        document.querySelector("#addToCart").addEventListener("click", () => {
          const storageItems = localStorage.getItem("goods"),
            itemData = `${locationVal}:${detailI.value}`;
          if (storageItems == null) localStorage.setItem("goods", itemData);
          else {
            const goodsData = storageItems.split(",").filter(e => e.split(":").shift() != locationVal);
            goodsData.unshift(itemData);
            localStorage.setItem("goods", goodsData);
          }
          document.querySelector("#basketCount").textContent = localStorage
            .getItem("goods")
            .split(",").length;
        });
      } else {
        spinner.remove();
        insertNotFound();
      }
    })
} else insertNotFound();