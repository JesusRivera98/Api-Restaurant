//const uuid = require('uuid');
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

function getUserFetch(name) {
    let TheUrl = '/user/?firstName=' + name.firstName + '&lastName=' + name.lastName;

    let data = name

    console.log("data", data);
    let settings = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
            sessiontoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKZXN1cyIsImxhc3ROYW1lIjoiUml2ZXJhIiwiZW1haWwiOiJqZXN1czk4MjAwOUBsaXZlLmNvbSIsImxldmVsIjoiT3duZXIiLCJpZCI6IjhkMzBhNzRkLTdmOWUtNDE4Mi05ZDQxLTdlM2M1NjkxODM0OSIsImlhdCI6MTU5MDY0ODY1MiwiZXhwIjoxNTkxOTQ0NjUyfQ.6QqdNNZ4NmFHmxrrlHBGlfSBrKPk_W4rd1fw6bbZXuA'
        }
    }

    let results = document.querySelector('.results');

    fetch(TheUrl, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON);
            for (let i = 0; i < responseJSON.length; i++) {
                console.log(responseJSON[i].firstName, responseJSON[i].fName)
                results.innerHTML = ' '
                results.innerHTML +=
                    `<div> 
                    <ul> 
                        <li> Nombre: ${responseJSON[i].firstName} </li> 
                        <li> Apellido: ${responseJSON[i].lastName} </li>
                        <li> Nivel: ${responseJSON[i].level} </li>
                        <li> Email: ${responseJSON[i].email} </li>
                        <li> Password: ${responseJSON[i].password} </li>
                        <li> Id: ${responseJSON[i].id} </li>  
                    <ul>
                </div>`;
            }
            //fetchUsers();
        })
        .catch(err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function updateUserFetch(firstName, lastName, level, email, password, id) {
    let TheUrl = '/user/' + id;

    let data = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        level: level,
        email: email,
        password: password
    }
    console.log(data);

    let settings = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
            sessiontoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKZXN1cyIsImxhc3ROYW1lIjoiUml2ZXJhIiwiZW1haWwiOiJqZXN1czk4MjAwOUBsaXZlLmNvbSIsImxldmVsIjoiT3duZXIiLCJpZCI6IjhkMzBhNzRkLTdmOWUtNDE4Mi05ZDQxLTdlM2M1NjkxODM0OSIsImlhdCI6MTU5MDY0ODY1MiwiZXhwIjoxNTkxOTQ0NjUyfQ.6QqdNNZ4NmFHmxrrlHBGlfSBrKPk_W4rd1fw6bbZXuA'
        },
        body: JSON.stringify(data)
    }

    let results = document.querySelector('.results');

    fetch(TheUrl, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON);
            fetchUsers();
        })
        .catch(err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function deleteUserFetch(id) {
    let TheUrl = '/user/' + id;


    let data = {
        id: id
    }
    console.log("data", data);
    let settings = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
            sessiontoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKZXN1cyIsImxhc3ROYW1lIjoiUml2ZXJhIiwiZW1haWwiOiJqZXN1czk4MjAwOUBsaXZlLmNvbSIsImxldmVsIjoiT3duZXIiLCJpZCI6IjhkMzBhNzRkLTdmOWUtNDE4Mi05ZDQxLTdlM2M1NjkxODM0OSIsImlhdCI6MTU5MDY0ODY1MiwiZXhwIjoxNTkxOTQ0NjUyfQ.6QqdNNZ4NmFHmxrrlHBGlfSBrKPk_W4rd1fw6bbZXuA'
        },
        //'path variables' : data
    }

    let results = document.querySelector('.results');

    fetch(TheUrl, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON);
            fetchUsers();
        })
        .catch(err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function addUserFetch(firstName, lastName, level, email, password) {
    let TheUrl = '/users';

    let data = {
        //id: uuid.v4(),
        firstName: firstName,
        lastName: lastName,
        level: level,
        email: email,
        password: password
    }
    console.log(data);

    let settings = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
            sessiontoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKZXN1cyIsImxhc3ROYW1lIjoiUml2ZXJhIiwiZW1haWwiOiJqZXN1czk4MjAwOUBsaXZlLmNvbSIsImxldmVsIjoiT3duZXIiLCJpZCI6IjhkMzBhNzRkLTdmOWUtNDE4Mi05ZDQxLTdlM2M1NjkxODM0OSIsImlhdCI6MTU5MDY0ODY1MiwiZXhwIjoxNTkxOTQ0NjUyfQ.6QqdNNZ4NmFHmxrrlHBGlfSBrKPk_W4rd1fw6bbZXuA'
        },
        body: JSON.stringify(data)
    }

    let results = document.querySelector('.results');

    fetch(TheUrl, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON);
            fetchUsers();
        })
        .catch(err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function fetchUsers() {

    let url = '/users';
    let settings = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    }
    let results = document.querySelector('.results');

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            results.innerHTML = "";
            console.log(responseJSON);
            for (let i = 0; i < responseJSON.length; i++) {
                results.innerHTML +=
                    `<div> 
                    <ul> 
                        <li> Nombre: ${responseJSON[i].firstName} </li> 
                        <li> Apellido: ${responseJSON[i].lastName} </li>
                        <li> Nivel: ${responseJSON[i].level} </li> 
                        <li> Email: ${responseJSON[i].email} </li>
                        <li> Password: ${responseJSON[i].password} </li>
                        <li> Id: ${responseJSON[i].id} </li>
                        <li> Ref: ${responseJSON[i]._id} </li>
                    <ul/> 
                </div>`;
            }
        })
        .catch(err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });

}

function watchUsersForm() {
    let usersForm = document.querySelector('.users-form');

    usersForm.addEventListener('submit', (event) => {
        event.preventDefault();

        fetchUsers();
    });
}

function watchAddUserForm() {
    let usersForm = document.querySelector('.add-user-form');

    usersForm.addEventListener('submit', (event) => {
        console.log("hey");
        event.preventDefault();
        let firstName = document.getElementById('userfirstName').value;
        let lastName = document.getElementById('userlastName').value;
        let level = document.getElementById('userLevel').value;
        let email = document.getElementById('userEmail').value;
        let password = document.getElementById('userPassword').value;


        console.log('level', level);

        addUserFetch(firstName, lastName, level, email, password);
    })
}
function watchDeleteUserForm() {
    let usersForm = document.querySelector('.delete-user-form');

    usersForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let id = document.getElementById('userIdToDelete').value;

        deleteUserFetch(id);
    })
}
function watchUpdateUserForm() {
    let usersForm = document.querySelector('.update-user-form');

    usersForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let firstName = document.getElementById('updateUserfirstName').value;
        let lastName = document.getElementById('updateUserlastName').value;
        let level = document.getElementById('updateUserLevel').value;
        let email = document.getElementById('updateUserEmail').value;
        let password = document.getElementById('updateUserPassword').value;

        let id = document.getElementById('userIdToUpdate').value;

        updateUserFetch(firstName, lastName, level, email, password, id);
    })
}
function watchGetUserForm() {
    let usersForm = document.querySelector('.get-firstNamed-users-form');

    usersForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let firstName = document.getElementById('userfirstNameToGet').value;
        let lastName = document.getElementById('userlastNameToGet').value;

        let name = {
            firstName: firstName,
            lastName: lastName
        }


        getUserFetch(name);
    })
}

function init() {
    fetchUsers();
    watchUsersForm();
    watchDeleteUserForm();
    watchAddUserForm();
    watchUpdateUserForm();
    watchGetUserForm();
}

init();