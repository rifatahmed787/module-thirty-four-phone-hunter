const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data)
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => displayPhones(data))
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
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
}

document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhones(searchText);
})

loadPhones();