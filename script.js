const apiKey = "3kjHL3y3cTELlj9LDnFX2rC6euVujehRYG8tndMuEmMvUquL5z19IhXM";
const query1 = "https://api.pexels.com/v1/search?query=hamsters";
const query2 = "https://api.pexels.com/v1/search?query=tigers";
const cerca = document.querySelector(".form-control");
const form = document.querySelector("form");
const query3 = "https://api.pexels.com/v1/search?query=";
form.addEventListener("submit", () => {
  request(query3 + cerca.value);
});

const row = document.querySelector("main .row");
const loadImg = document.getElementById("load");
const loadImg2 = document.getElementById("load2");

let isTiger;

const loadImages = (dataObj) => {
  row.innerHTML = "";

  dataObj.photos.forEach((img) => {
    row.innerHTML += `
      <div class="col-md-4 mb-2">
          <div class="card mb-4 shadow-sm d-flex h-100">
              <img src="${img.src.original}" class="bd-placeholder-img card-img-top w-100" />
              <div class="card-body d-flex flex-column justify-content-between">
                  <h5 class="card-title">${img.photographer}</h5>
                  <p class="card-text">${img.alt}</p>
                  <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
                      </div>
                      <small class="text-muted">ID: ${img.id}</small>
                  </div>
              </div>
          </div>
      </div>`;
  });

  const hideButtons = document.querySelectorAll(".hide-btn");
  console.log(hideButtons);
  hideButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      console.log(card);
      if (card) {
        card.classList.add("d-none");
      }
    });
  });
};

const request = (query) => {
  fetch(query, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella richiesta");
      }
    })
    .then((data) => {
      loadImages(data);
    })
    .catch((e) => {
      console.log(e);
    });
};

loadImg.addEventListener("click", () => {
  isTiger = false;
  request(query1);
});

loadImg2.addEventListener("click", () => {
  isTiger = true;
  request(query2);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento caricato");
});
