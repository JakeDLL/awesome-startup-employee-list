const users = new Promise((resolve, reject) => {
    const usersJSON = fetch("https://randomuser.me/api/?results=12").then(response => response.json());
    resolve(usersJSON);
});

async function createGallery(json) {
    const gallery = document.querySelector('#gallery');
    const users = await json.results;
    users.forEach(user => {
        console.log(user);
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
users.then(createGallery);
// info to get from api:
/**
 * gallery:
 * name
 * thumbnail img
 * email
 * city
 * 
 * Modal:
 * Name
 * img
 * email
 * city
 * number
 * address
 * dob
 */