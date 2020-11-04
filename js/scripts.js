const users = new Promise((resolve, reject) => {
    fetch("https://randomuser.me/api/?results=1209809-=")
        .then(response => {
            if (response.ok) {
                resolve(response.json());
            } else {
                reject(console.log(response.statusText));
            }
        })
});

function createGallery(json) {
    const gallery = document.querySelector('#gallery');
    const users = json.results;
    users.forEach(user => {
        const card = `
            <div class="card ${users.indexOf(user)}">
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

        // const modal = `
        //     <div class="modal-container" hidden>
        //         <div class="modal">
        //             <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        //             <div class="modal-info-container">
        //                 <img class="modal-img" src="${user.picture.large}" alt="profile picture">
        //                 <h3 id="${user.name.first}-${user.name.last}" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
        //                 <p class="modal-text">${user.email}</p>
        //                 <p class="modal-text cap">${user.location.city}</p>
        //                 <hr>
        //                 <p class="modal-text">(${user.cell.substr(0, 3)}) ${user.cell.substr(4, 3)} ${user.cell.substr(8, 4)}</p>
        //                 <p class="modal-text">${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
        //                 <p class="modal-text">Birthday: ${user.dob.date.substr(5, 2)}/${user.dob.date.substr(8, 2)}/${user.dob.date.substr(0, 4)}</p>
        //             </div>
        //         </div>

        //         <div class="modal-btn-container">
        //             <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        //             <button type="button" id="modal-next" class="modal-next btn">Next</button>
        //         </div>
        //     </div>
        // `;
        gallery.insertAdjacentHTML('beforeend', card);
    });

}

// function createModal(element, data) {

// }

function addEventListeners() {
    const profiles = document.querySelectorAll('.card');
    profiles.forEach(profile => {
        profile.addEventListener('click', event => {
            console.log(event.target);
        });
    })
}

users.then(createGallery).then(addEventListeners);



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