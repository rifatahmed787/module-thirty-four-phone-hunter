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
        console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="col">
        <div class="card">
            <img src="${phone.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
                <h3 class="card-title">Brand: ${phone.brand}</h3>
                <h5 class="card-title">Phone name: ${phone.phone_name}</h5>
                <p class="card-text">${phone.slug}</p>
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

// loadPhones();