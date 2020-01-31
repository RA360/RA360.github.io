const storageItems = localStorage.getItem("goods"),
  cart = document.querySelector("#cart"),
  insertEmptyCart = () => {
    cart.style.position = "";
    cart.classList.add("cart_empty");
    cart.innerHTML =
      '<img class="cart__img" src="../assets/img/empty.png" alt=""><p class="cart__not-found not-found">Your cart is currently empty.</p>';
  };

if (storageItems != null) {
  cart.innerHTML =
    '<div class="spinner"><div class="rect"></div><div class="rect rect_2"></div><div class="rect rect_3"></div><div class="rect rect_4"></div><div class="rect rect_5"></div></div>';
  fetch("../assets/js/goods.js")
    .then(response => response.json())
    .then(goods => {
      let goodsData = storageItems.split(",");
      cart.textContent = "";
      goodsData.forEach(e => {
        const item = goods[e.split(":").shift() - 1],
          cartBox = document.createElement("div");
        cartBox.className = "cart__box";
        cartBox.dataset.id = `${e.split(":").shift()}`;
        cartBox.innerHTML = `<a href="product.html?${
          item.id
        }" class="product-img" target="_blank"><img src="../assets/img/product${
          item.id
        }-sm.png" alt="${
          item.title
        }" /></a><div class="product-about"><a href="product.html?${
          item.id
        }" class="product-txt" target="_blank">${
          item.title
        }</a><p class="product-desc">Get the most out of your music with an experience.</p><ul class="stars"><li class="star star_painted"></li><li class="star star_painted"></li><li class="star star_painted"></li><li class="star star_unpainted"></li><li class="star star_unpainted"></li></ul></div>
      <div class="cart__groups">
        <div class="cart__group">
          <p class="price">$${item.price}</p>
        </div>
        <div class="cart__group">
          <div class="quantity cart__item">
            <button class="quantity__btn disabled js-decrease">
              <i class="fas fa-minus"></i>
            </button>
            <input class="quantity__num js-cart__input" value="${+e
              .split(":")
              .pop()}" />
            <button class="quantity__btn js-increase">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="cart__group">
          <p class="cart__item js-total">
          $${+(item.price * +e.split(":").pop()).toFixed(2)}
          </p>
        </div>
        <div class="cart__group">
          <button class="cart__delete cart__item">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>`;
        cart.appendChild(cartBox);
      });
      cart.style.position = "relative";
      const cartBtm = document.createElement("div"),
        setTitles = index => {
          ["Price", "Qty", "Total", "Delete"].forEach((e, i) =>
            document
            .querySelectorAll(".cart__box")[index].querySelectorAll(".cart__group")[i].insertAdjacentHTML(
              "afterbegin",
              `<h4 class="cart__title">${e}</h4>`
            )
          );
        };
      setTitles(0);
      cartBtm.className = "cart__bottom";
      cartBtm.innerHTML =
        '<p class="cart__title">Grand Total</p><p class="grand-total" id="grandTotal"></p><button class="checkout black-btn" id="checkout">Checkout</button>';
      cart.appendChild(cartBtm);
      const grandTotal = document.querySelector("#grandTotal"),
        setGrandTotal = () => {
          const totals = [...document.querySelectorAll(".js-total")];
          if (totals.length > 1)
            grandTotal.innerHTML = `<span class="grand-total-currency">$</span>${totals.reduce(
              (sum, t) =>
                +(sum + +t.textContent.replace(/[^\d\.]/g, "")).toFixed(2),
              0
            )}`;
          else
            grandTotal.innerHTML = `<span class="grand-total-currency">$</span>${+totals[0].textContent.replace(
              /[^\d\.]/g,
              ""
            )}`;
        };
      setGrandTotal();
      const checkAndCalculate = parent => {
          const quantityNum = parent.querySelector(".quantity__num"),
            decrease = parent.querySelector(".js-decrease"),
            increase = parent.querySelector(".js-increase");
          if (+quantityNum.value < 99) {
            increase.classList.remove("disabled");
            decrease.classList.remove("disabled");
            if (+quantityNum.value == 1) decrease.classList.add("disabled");
          } else increase.classList.add("disabled");
          parent.querySelector(".js-total").textContent = `$${+(
            +parent
              .querySelector(".price")
              .textContent.replace(/[^\d\.]/g, "") * +quantityNum.value
          ).toFixed(2)}`;
          setGrandTotal();
        },
        letEnterNum = () => {
          document.querySelectorAll(".js-cart__input").forEach(e => {
            e.addEventListener("input", () => {
              const val = e.value;
              if (val.includes(".") || val.includes(" ") || isNaN(val))
                e.value = val.replace(/[^\d]/g, "");
            });
          });
        };
      letEnterNum();

      document.querySelectorAll(".quantity__btn").forEach(e => {
        e.addEventListener("click", () => {
          const parent = e.parentNode.parentNode.parentNode,
            quantityNum = parent.querySelector(".quantity__num");
          if (e.className.includes("decrease")) {
            if (+quantityNum.value > 1) {
              quantityNum.value = +quantityNum.value - 1;
            }
          } else {
            if (+quantityNum.value < 99)
              quantityNum.value = +quantityNum.value + 1;
          }
          checkAndCalculate(parent);
        });
      });

      document.querySelectorAll(".quantity__num").forEach(e => {
        const parent = e.parentNode.parentNode.parentNode;
        if (+e.value >= 99) {
          parent.querySelector(".js-increase").classList.add("disabled");
          parent.querySelector(".js-decrease").classList.remove("disabled");
        }
        e.addEventListener("input", () => {
          const val = e.value;
          if (val[0] == 0) e.value = val.slice(1);
          if (e.value == "") e.value = 1;
          if (+e.value > 99) e.value = 99;
          checkAndCalculate(parent);
        });
      });

      document.querySelectorAll(".cart__delete").forEach(e => {
        e.addEventListener("click", () => {
          const parent = e.parentNode.parentNode.parentNode,
            cartBoxes = document.querySelectorAll(".cart__box"),
            basketCount = document.querySelector("#basketCount");
          goodsData = goodsData.filter(
            d => d.split(":").shift() != parent.dataset.id
          );
          if (goodsData == "") {
            insertEmptyCart();
            localStorage.removeItem("goods");
            basketCount.textContent = 0;
          } else {
            grandTotal.innerHTML = `<span class="grand-total-currency">$</span>${+(
              +grandTotal.textContent.replace(/[^\d\.]/g, "") -
              +parent
                .querySelector(".js-total")
                .textContent.replace(/[^\d\.]/g, "")
            ).toFixed(2)}`;
            if (parent == cartBoxes[0]) setTitles(1);
            parent.remove();
            localStorage.setItem("goods", goodsData.toString());
            basketCount.textContent = localStorage
              .getItem("goods")
              .split(",").length;
          }
        });
      });

      document.querySelector("#checkout").addEventListener("click", () => {
        const orderOverlay = document.querySelector("#orderOverlay"),
          setBlur = val =>
          document
          .querySelectorAll("body>*:not(.order-overlay):not(script)")
          .forEach(n => (n.style.filter = val));
        orderOverlay.innerHTML =
          '<div class="order"><button class="close" id="orderClose"></button><form action="#" class="card" id="card" autocomplete="off"><label class="card__label_m card__label" for="cardNum">Card Number</label><input class="card__num js-cart__input" id="cardNum" name="cardNum" placeholder="0000 0000 0000 0000" maxlength="23" required /><div class="card-num-error js-card__error" id="cardNumError"></div><label class="card__label" for="cardHolder">Card Holder</label><input class="card__holder" id="holder" name="holder" placeholder="Surname and Name" required /><div class="card__row"><div class="card__item"><label class="card__label" for="expire">Expire</label><input class="card__expire card__item-elem js-cart__input" id="expire" name="expire" placeholder="MM/YY" maxlength="5" required /><div class="card__item-elem js-card__error" id="cardExpireError"></div></div><div class="card__item"><label class="card__label" for="cvv">CVV</label><input class="card__cvv card__item-elem js-cart__input" id="cvv" name="cvv" placeholder="000" maxlength="3" required /><div class="card__item-elem js-card__error" id="cardCvvError"></div></div></div><button class="card__btn black-btn" type="submit">Place order and pay</button></form></div>';
        document.body.style.overflow = "hidden";
        orderOverlay.classList.add("visible");
        setBlur("blur(2px)");
        const orderClose = document.querySelector("#orderClose"),
          cardNum = document.querySelector("#cardNum"),
          expire = document.querySelector("#expire");

        orderClose.addEventListener("click", () => {
          orderOverlay.classList.remove("visible");
          setBlur("none");
          document.body.style.overflow = "visible";
          orderOverlay.textContent = '';
        });

        letEnterNum();

        cardNum.addEventListener("input", function () {
          const val = this.value,
            digits = [],
            cardNumError = document.querySelector("#cardNumError"),
            cardNumEmptytError = document.querySelector("#cardNumEmptytError"),
            cardNumShortError = document.querySelector("#cardNumShortError"),
            insertErrorMsg = e => {
              if (e.target != this) {
                const val = this.value.replace(/\s+/g, "");
                if (val.length == 0)
                  cardNumError.innerHTML =
                  '<p class="card__error" id="cardNumEmptytError">Please enter the card number on the front of your card</p>';
                else if (val.length < 12)
                  cardNumError.innerHTML = `<p class="card__error" id="cardNumShortError">The card number you've entered is too short</p>`;
                else {
                  let sum = 0;
                  val.split("").forEach((v, i) => {
                    let num = +v;
                    if (i % 2 == 0) {
                      num *= 2;
                      if (num > 9) num = 1 + (num % 10);
                    }
                    sum += num;
                  });
                  if (sum % 10 == 0)
                    cardNumError.innerHTML = `<p class="card__error">Please enter a valid card number</p>`;
                  else {
                    cardNumError.textContent = "";
                    document.removeEventListener("click", insertErrorMsg);
                  }
                }
              }
            };
          for (let i = 0; i < val.length; i += 4) {
            digits.push(val.slice(i, i + 4));
          }
          this.value = digits.join(" ");
          document.addEventListener("click", insertErrorMsg);
          if (val.length > 11 && cardNumShortError) cardNumShortError.remove();
          else if (val.length > 0 && cardNumEmptytError)
            cardNumEmptytError.remove();
        });

        document.querySelector("#holder").addEventListener("input", function () {
          this.value = this.value.replace(/[\W\d]/g, "");
        });

        expire.addEventListener("input", function () {
          const val = this.value.replace("/", ""),
            cardExpireError = document.querySelector("#cardExpireError"),
            insertErrorMsg = e => {
              if (e.target != this) {
                const val = this.value.replace("/", "");
                if (val.length < 4 || val.slice(0, 2) > 12)
                  cardExpireError.innerHTML = `<p class="card__error">Please enter a valid expiry date in format MM/YY</p>`;
                else if (val.length == 4) {
                  const date = new Date();
                  if (
                    +val.substring(2) >=
                    date
                    .getFullYear()
                    .toString()
                    .substring(2)
                  ) {
                    cardExpireError.textContent = "";
                    document.removeEventListener("click", insertErrorMsg);
                  } else
                    cardExpireError.innerHTML =
                    '<p class="card__error">This date has expired</p>';
                }
              }
            };
          if (val.length > 2)
            this.value = `${val.slice(0, 2)}/${val.substring(2)}`;
          document.addEventListener("click", insertErrorMsg);
          if (val.length == 4) cardExpireError.textContent = "";
        });

        document.querySelector("#cvv").addEventListener("input", function () {
          const cardCvvError = document.querySelector("#cardCvvError"),
            insertErrorMsg = e => {
              if (e.target != this && this.value.length < 3)
                cardCvvError.innerHTML = `<p class="card__error">Please enter the last 3 digits found on the back of your card</p>`;
              else document.removeEventListener("click", insertErrorMsg);
            };
          document.addEventListener("click", insertErrorMsg);
          if (this.value.length == 3) cardCvvError.textContent = "";
        });

        document.querySelector("#card").addEventListener("submit", function (event) {
          if (
            [...document.querySelectorAll(".js-card__error")].every(
              e => e.textContent == ""
            )
          ) {
            insertEmptyCart();
            localStorage.removeItem("goods");
            this.parentNode.insertAdjacentHTML('beforeend', '<p class="order__success">Payment has been made successful</p>');
            this.remove();
            orderClose.classList.add('order__close');
          } else event.preventDefault();
        });
      });
    });
} else insertEmptyCart();