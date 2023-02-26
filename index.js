const loadPhones = async (value, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.data);
  displayPhone(data.data, dataLimit);
};

const displayPhone = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  // display phone only if there
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 12) {
    phones = phones.slice(0, 12);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // No Fount Massage
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach(phone => {
    console.log(phone.brand);

    phoneContainer.innerHTML += `
        <div class="col">
        <div class="card">
            <img src="${phone.image}" class="card-img-top p-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                 
                <button onClick="loaderPhoneDetails('${phone.slug}')" type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Show Details
            </button>
            </div>

        </div>
    </div>

        `;
  });
  toggleSpinner(false);
};

const processSearch = dataLimit => {
  toggleSpinner(true);
  const value = document.getElementById("search-field").value;
  loadPhones(value, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", () => {
  processSearch(12);
});

// enter key pressed
document.getElementById("search-field").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    processSearch(12);
  }
});

// Loaders for search
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// "btn-show-all"
document.getElementById("btn-show-all").addEventListener("click", () => {
  processSearch();
});

// loaderPhoneDetails

const loaderPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = phone => {
  console.log(phone);
  document.getElementById("exampleModalLabel").innerText =
    "Name : " + phone.name;

  document.getElementById("modalBody").innerHTML = `

    <h5>Brand : ${phone.brand}</h5>
    <h5>Release Data : ${
      phone.releaseDate ? phone.releaseDate : "No Release Date"
    }</h5>
    <h5>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage'}</h5>
    <h5>Other : ${phone.other ? phone.other.Bluetooth : 'No Information'}</h5>

    
    
    `;
};

// loadPhones(a);
