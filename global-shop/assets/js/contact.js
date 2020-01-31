const coords = [{
    coord: [43.684345, -79.431292],
    title: "Canada"
  },
  {
    coord: [40.66817, -73.97907],
    title: "USA"
  },
  {
    coord: [-33.873603, 151.211858],
    title: "Australia"
  },
  {
    coord: [30.065993, 31.266061],
    title: "Egypt"
  },
  {
    coord: [25.195128, 55.27846],
    title: "Dubai"
  }
];

ymaps.ready(() => {
  const map = new ymaps.Map("map", {
    zoom: 11,
    center: coords[0].coord,
    controls: []
  });

  coords.forEach(n =>
    map.geoObjects.add(
      new ymaps.Placemark(
        n.coord, {}, {
          iconLayout: "default#image",
          iconImageHref: "../assets/img/mark.png",
          iconImageSize: [46, 46],
          iconImageOffset: [-22, -28]
        }
      )
    )
  );

  document.querySelector("#mapBtns").innerHTML = coords
    .map(
      n =>
      `<button class="map-btn" data-coord="${JSON.stringify(n.coord)}">${
        n.title
      }</button>`
    )
    .join("");
  const mapBtn = document.querySelectorAll(".map-btn");
  mapBtn[0].classList.add("active");
  mapBtn.forEach(e => {
    e.addEventListener("click", () => {
      document.querySelector(".map-btn.active").classList.remove("active");
      e.classList.add("active");
      map.setCenter(JSON.parse(e.dataset.coord));
    });
  });
});