const users = new Promise((resolve, reject) => {
    fetch("https://randomuser.me/api/?results=12")
        .then(response => {
            if (response.ok) {
                resolve(response.json());
            } else {
                reject(console.log(response.statusText));
            }
        })
});

async function createGallery(json) {
    const gallery = document.querySelector('#gallery');
    const users = await json.results;
    users.forEach(user => {
        const card = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="${user.name.first}-${user.name.last}" class="card-name cap">${user.name.first} ${user.name.last}</h3> 
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `;
        gallery.insertAdjacentHTML('beforeend', card);
    });
}

function createModal(element) {

}

// function addEventListeners() {
//     const profiles = document.querySelectorAll('.card');
//     profiles.forEach(profile => {
//         profile.addEventListener('click', event => {
//             // createModal(event.target);
//         });
//     })
// }

users.then(createGallery);
// .then(addEventListeners);
// info to get from api:
//  * Modal:
//  * Name
//  * img
//  * email
//  * city
//  * number
//  * address
//  * dob
//  */