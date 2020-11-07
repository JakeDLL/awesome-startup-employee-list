// Gallery selected to insert modal and user profiles
const gallery = document.querySelector('#gallery');
// Fetch request for 12 random users which resolves if fetch is successful
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

/**
 * ----------
 * SEARCH BAR
 * ----------
 */
const searchContainer = document.querySelector('.search-container');
const searchHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;
searchContainer.insertAdjacentHTML("afterbegin", searchHTML);
// Event listeners so the users will update dynamically when typing and clearing the search bar
document.querySelector('#search-input').addEventListener('keyup', event => {
    searchUsers(event.target.value);
});
document.querySelector('#search-input').addEventListener('search', event => {
    searchUsers(event.target.value);
});

/**
 * searchUsers function
 * This function searches the user data agains the string parameter And calls createGallery with filetered list if users are found.
 * @param {String} string - Value from search bar to search user name.
 */
async function searchUsers(string) {
    const data = await users.then(val => val.results);
    const filteredList = [];
    // Loops through the data array to match the string with names
    for (let i = 0; i < data.length; i++) {
        let {first, last} = data[i].name;
        const name = `${first} ${last}`.toLowerCase();
        // If the name includes the string, it pushes the user to the filteredList array.
        if (name.includes(string.toLowerCase())) {
            filteredList.push(data[i]);
        }
    }
    // If there are users in the filteredList, it calls createGallery with the filteredList as the argument, else, display all users.
    if (filteredList.length != 0) {
        gallery.innerHTML = '';
        createGallery(filteredList);
    } else if (filteredList.length == 0 && string) {
        gallery.innerHTML = `<h2>No results found</h2>`;
    } else if (filteredList.length == 0 && !string) {
        gallery.innerHTML = '';
        createGallery(data);
    }
}

/**
 * createGallery function
 * This function takes an array and loops through it to create user cards and displays it. Also calls addEventListeners with the array passed as an argument.
 * @param {Array} data - Array of user objects
 */
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

/**
 * addEventListeners function
 * This function adds the event listeners to the profiles and calls generateModal with the appropiate arguments.
 * @param {Array} data - array of users to be passed as argument to generateModal.
 */
function addEventListeners(data) {
    const profiles = document.querySelectorAll('.card');
    // Loops through the profiles elemets array to add event listeners
    profiles.forEach(profile => {
        profile.addEventListener('click', event => {
            // If element is clicked, it passes the number part of the ID and an array of users to generateModal.
            generateModal(parseInt(event.currentTarget.id), data);
        });
    })
}

/**
 * generateModal function
 * This function generates the modal for the user that was selected and inserts it to the page. Adds event listeners to the modal.
 * @param {Number} index - Number to use as index to select user from data array.
 * @param {Array} data - Array of user objects.
 */
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
    gallery.parentNode.insertAdjacentHTML('beforeend', modal);
    addModalListeners(index, data);
}

/**
 * addModalListeners function
 * This function adds event listeners to the previous, next, and closing button. Also navigates to desired user.
 * @param {Number} index - Number to select user to navigate to.
 * @param {Array} data - Array of user objects.
 */
async function addModalListeners(index, data) {
    const next = document.querySelector('#modal-next');
    const prev = document.querySelector('#modal-prev');
    const close = document.querySelector('#modal-close-btn');
    const modal = document.querySelector('.modal-container');

    // The event listeners check if it is possible to navigate to desired user, then removes the current modal and generates a new one.
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

// Consume promise by passing the results to createGallery.
users.then(val => createGallery(val.results));