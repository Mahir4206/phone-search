const getPhonesData = async (phones, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phones}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (display, dataLimit) => {
    const warning = document.getElementById('warning')
    if (display.length === 0) {
        warning.classList.remove('d-none')
    }
    else {
        warning.classList.add('d-none')
    }

    // show all

    const showAll = document.getElementById('show-all')
    if (dataLimit && display.length > 10) {
        display = display.slice(0, 10)
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }
    const phoneContainer = document.getElementById('phone-container')
    // textContent or innerHtml
    phoneContainer.textContent = ``;
    display.forEach(element => {
        // console.log(element)
        const createDiv = document.createElement('div')
        createDiv.classList.add('col')
        createDiv.innerHTML = `
        <div class="card h-100">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                <button onclick = "specificDetails('${element.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Details
                </button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(createDiv)
    });
    toggleSpinner(false)
}

const prossessData = dataLimit => {
    toggleSpinner(true)
    const getInputField = document.getElementById('input-field')
    const getValue = getInputField.value;
    getPhonesData(getValue, dataLimit)
}

const getSearchResult = () => {
    prossessData(10)
}

document.getElementById('input-field').addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        prossessData(10)
    }
});

const toggleSpinner = isLoading => {
    const getSpinner = document.getElementById('spinner')
    if (isLoading) {
        getSpinner.classList.remove('d-none')
    }
    else {
        getSpinner.classList.add('d-none')
    }
}


document.getElementById('btn-show-all').addEventListener('click', function () {
    prossessData()
})

const specificDetails = async details => {
    idUrl = `https://openapi.programming-hero.com/api/phone/${details}`;
    const getDetails = await fetch(idUrl);
    const detailsJson = await getDetails.json();
    displayDetails(detailsJson.data)
}

const displayDetails = display => {
    // console.log(display)
    const getTitle = document.getElementById('exampleModalLabel')
    const getBody = document.getElementById('modal-inner-body')
    getTitle.innerText = `${display.name}`;
    getBody.innerHTML = `
    <div>
    <image src="${display.image}">
    <h6>Release Date: ${display.releaseDate ? display.releaseDate : 'No Release Date Found'}</h6>
    <h6>Display: ${display.mainFeatures.displaySize}</h6>
    <h6>Chipset: ${display.mainFeatures.chipSet}</h6>
    <h6>Memory: ${display.mainFeatures.memory}</h6>
    <h6>Storage: ${display.mainFeatures.storage}</h6>
    <h6>Sensors: ${display.mainFeatures.sensors}</h6>
    </div>
    `;
}