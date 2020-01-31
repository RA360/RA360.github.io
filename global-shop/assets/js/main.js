const suggests = document.querySelector("#suggests"),
  searchI = document.querySelector("#searchI"),
  searchBtn = document.querySelector("#searchBtn"),
  title = document.querySelector("#title"),
  getCookie = name => {
    const matches = document.cookie.match(
      new RegExp(
        `(?:^|; )${name.replace(
            /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
            "\\$1"
          )}=([^;]*)`
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

if (localStorage.getItem("goods") != null)
  document.querySelector("#basketCount").textContent = localStorage
  .getItem("goods")
  .split(",").length;

if (getCookie("city") === undefined) {
  fetch('http://ip-api.com/json')
    .then(response => response.json())
    .then(data => {
      document.body.insertAdjacentHTML(
        "afterbegin",
        `<div class="city" id="city"><button class="city__close close" id="cityClose"></button><div id="cityBox"><p class="city__txt">Your city – <span class="city__name" id="cityName">${data.city}?</span></p><div class="city__btns"><button class="city__agree agree" id="cityAgree">Yes</button><button class="city__another" id="cityAnother">Another city</button></div><p class="city__info">Availability of goods, methods and delivery time depend on the selected city.</p></div></div>`
      );
      const close = document.querySelector("#cityClose"),
        cityBox = document.querySelector("#cityBox"),
        setCookie = name => {
          const date = new Date();
          date.setMonth(date.getMonth() + 24);
          document.cookie = `city=${name};expires=${date};SameSite=Strict`;
        },
        removePopup = () => {
          const city = document.querySelector('#city');
          city.classList.add("hide");
          setTimeout(() => {
            city.remove();
          }, 1000);
        },
        script = document.createElement("script");
      script.src =
        "https://api-maps.yandex.ru/2.1/?lang=en_US&load=SuggestView";
      document.head.appendChild(script);
      document.querySelector("#cityAgree").addEventListener("click", () => {
        setCookie(data.city);
        cityBox.innerHTML = `<p class="city__success city__txt">Now you see goods with the availability, ways and delivery time for ${data.city}</p>`;
        const timeout = setTimeout(() => removePopup(), 15000);
        close.addEventListener("click", () => clearTimeout(timeout));
      });
      document.querySelector("#cityAnother").addEventListener("click", () => {
        cityBox.innerHTML =
          '<input class="city__input input" id="cityI" placeholder="Enter a city.." autocomplete="off" /><p class="city__info">Click on suggestion.</p>';
        const suggestView = new ymaps.SuggestView("cityI");
        suggestView.events.add("select", e => {
          setCookie(e.get("item").value);
          removePopup();
        });
      });
      close.addEventListener("click", () => {
        setCookie(data.city);
        removePopup();
      });
    })
}

if (sessionStorage.getItem("cookie") == null) {
  document.body.insertAdjacentHTML(
    "afterbegin",
    '<div class="cookie"><div><p class="cookie__title">Global Shop and Cookies</p><p class="cookie__info">This site uses cookies. By clicking ACCEPT or continuing to browse the site you are agreeing to our use of cookies. <a class="cookie__link" href="https://ru.wikipedia.org/wiki/Cookie" target="_blank">Find out more here</a>.</p></div><button class="cookie__agree agree js-cookie__close">Accept</button><button class="close js-cookie__close"></button></div>'
  );
  document.querySelectorAll(".js-cookie__close").forEach(e => {
    e.addEventListener("click", () => {
      e.parentNode.style.bottom = "-999px";
      sessionStorage.setItem("cookie", "accept");
      setTimeout(() => {
        e.parentNode.remove();
      }, 2000);
    });
  });
}

document.querySelector("#hamburger").addEventListener("click", function () {
  this.classList.toggle("open");
  document.querySelector("#dropdown").classList.toggle("visible");
});

searchBtn.addEventListener("click", () => {
  searchI.classList.toggle("visible");
  title.classList.toggle("hidden");
  const closeSearch = e => {
    if (e.target != searchI) {
      if (e.target != suggests) suggests.style.display = "none";
      if (e.target != searchBtn) {
        searchI.classList.remove("visible");
        title.classList.remove("hidden");
        document.removeEventListener("click", closeSearch);
      }
    }
  };
  document.addEventListener("click", closeSearch);
});

searchI.addEventListener("input", function () {
  const val = this.value;
  suggests.style.display = 'block';
  suggests.textContent = "";
  if (val.length == 0) suggests.classList.remove('visible');
  else {
    fetch('assets/js/goods.js')
      .then(response => response.json())
      .then(goods => {
        const goodsArr = goods.filter(e => e.title.toLowerCase().slice(0, val.length) == val);
        if (goodsArr != '') {
          goodsArr.forEach(e => {
            const suggest = document.createElement('a');
            suggest.className = 'suggest';
            suggest.href = `pages/product.html?${e.id}`;
            suggest.target = '_blank';
            suggest.innerHTML = `<span>${e.title.slice(0,val.length)}</span>${e.title.substring(val.length)}`;
            suggests.appendChild(suggest);
          });
          suggests.classList.add('visible');
        } else suggests.classList.remove('visible');
      })
  }
});


// var playing = true;
// var pauseButton = document.getElementById('pause');

// function pauseselectedSliderhow(){
// 	pauseButton.innerHTML = '&#9658;'; // play character
// 	playing = false;
// 	clearInterval(slideInterval);
// }

// function playselectedSliderhow(){
// 	pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
// 	playing = true;
// 	slideInterval = setInterval(nextSlide,2000);
// }

// pauseButton.onclick = function(){
// 	if(playing){ pauseSlideshow(); }
// 	else{ playSlideshow(); }
// };