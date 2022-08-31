const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => displayPhones(data))
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        //if you want to display 20 phones only
        phones = phones.slice(0, 10);

        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //display no phone found
    const noPhone = document.getElementById('no-phone');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="col">
        <div class="card">
            <img src="${phone.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
                <h3 class="card-title">Brand: ${phone.brand}</h3>
                <h5 class="card-title">Phone name: ${phone.phone_name}</h5>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModa">show details</button>
            </div>
        </div>
    </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    //stop spinner or loader
    toggleLoader(false);
}

const processSearch = (dataLimit) => {
    toggleLoader(true);
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    // searchField.value = '';
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    //start spinner or loader
    processSearch(10);
});

//search input field enter key handler
document.getElementById('input-field').addEventListener('keypress', function (e) {
    // console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

//not a best way to show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    // console.log(phone)
    const modalTitle = document.getElementById('phoneDetailsModaLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'no releaseDate found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'no Bluetooth'}</p>
    <p>Main Features: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no mainFeatures'}</p>
    <p>sensors: ${phone.mainFeatures.sensors[0]} ${phone.mainFeatures.sensors[1]} ${phone.mainFeatures.sensors[2]}</p>
    `;
    //don't need to do append because we did't create any tag because it is already exist in html
}

// loadPhones('apple');