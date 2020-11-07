const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');
const searchHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;
searchContainer.insertAdjacentHTML("afterbegin", searchHTML);
document.querySelector('#search-input').addEventListener('keyup', event => {
    searchUsers(event.target.value);
});
document.querySelector('#search-input').addEventListener('search', event => {
    searchUsers(event.target.value);
});

const users = new Promise((resolve, reject) => {
    fetch("https://randomuser.me/api/?results=12&nat=us")
        .then(response => {
            if (response.ok) {
                resolve(response.json());
            } else {
                reject(console.log(response.statusText));
            }
        })
});

async function searchUsers(string) {
    const data = await users.then(val => val.results);
    const filteredList = [];
    
    for (let i = 0; i < data.length; i++) {
        let {first, last} = data[i].name;
        const name = `${first} ${last}`.toLowerCase();
    
        if (name.includes(string.toLowerCase())) {
            filteredList.push(data[i]);
        }
    }
    
    if (filteredList.length != 0) {
        gallery.innerHTML = '';
        createGallery(filteredList);
    } else if (filteredList.length == 0 && string) {
        gallery.innerHTML = `<h2>No results found</h2>`;
    } else if (filteredList.length == 0 && !string) {
        createGallery(data);
    }
}

function createGallery(data) {
    data.forEach(item => {
        let {picture, name, location, email} = item;
        const card = `
            <div id="${data.indexOf(item)}-user"class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="${name.first}-${name.last}" class="card-name cap">${name.first} ${name.last}</h3> 
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${location.city}, ${location.state}</p>
                </div>
            </div>
        `;
        gallery.insertAdjacentHTML('beforeend', card);
    });
    addEventListeners(data);
}

async function addModalListeners(index, data) {
    const next = document.querySelector('#modal-next');
    const prev = document.querySelector('#modal-prev');
    const close = document.querySelector('#modal-close-btn');
    const modal = document.querySelector('.modal-container');

    next.addEventListener('click', () => {
        if (index + 1 < data.length) {
            modal.remove();
            generateModal(index + 1, data);
        }
    })
    prev.addEventListener('click', () => {
        if (index > 0) {
            modal.remove();
            generateModal(index - 1, data);
        }
    })
    close.addEventListener('click', () => modal.remove());
}

async function generateModal(index, data) {
    let {name, email, location, phone, picture} = data[index];
    const dob = new Date(data[index].dob.date);
    const dateString = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`;
    const modal = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${picture.large}" alt="profile picture">
                    <h3 id="${name.first}-${name.last}-modal" class="modal-name cap">${name.first} ${name.last}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${location.city}</p>
                    <hr>
                    <p class="modal-text">${phone}</p>
                    <p class="modal-text">${location.street.number} ${location.street.name}., ${location.city}, ${location.state} ${location.postcode}</p>
                    <p class="modal-text">Birthday: ${dateString}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;
    gallery.insertAdjacentHTML('beforeend', modal);
    addModalListeners(index, data);
}

function addEventListeners(data) {
    const profiles = document.querySelectorAll('.card');
    profiles.forEach(profile => {
        profile.addEventListener('click', event => {
            generateModal(parseInt(event.currentTarget.id), data);
        });
    })
}

users.then(val => createGallery(val.results));