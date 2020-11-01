async function fetchUsers(url) {
    const usersJSON = await fetch(url).then(response => response.json())

    return await usersJSON.results;
}
console.log(fetchUsers('https://randomuser.me/api/?results=12'));
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