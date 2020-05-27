//const uuid = require('uuid');
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

function getUserFetch(name){
    let TheUrl = '/user/?fName=' + name;
    
    let data = name

    console.log("data", data);
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        }
    }

    let results = document.querySelector( '.results' );

    fetch( TheUrl, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON);
            results.innerHTML = ' '
            for ( let i = 0; i < responseJSON.length; i ++ ){
                results.innerHTML += 
                `<div> 
                    <ul> 
                        <li> Nombre: ${responseJSON[i].fName} </li> 
                        <li> Apellido: ${responseJSON[i].lName} </li>
                        <li> Nivel: ${responseJSON[i].nivel} </li>
                        <li> Email: ${responseJSON[i].email} </li>
                        <li> Password: ${responseJSON[i].password} </li>
                        <li> Id: ${responseJSON[i].id} </li>  
                    <ul>
                </div>`;
            }
            //fetchUsers();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function updateUserFetch( fName, lName, level, email, password, id ){
    let TheUrl = '/user/' + id;

    let data = {
        id: id,
        fName: fName,
        lName: lName,
        level: level,
        email: email,
        password: password
    }
    console.log(data);

    let settings = {
        method : 'PATCH',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }

    let results = document.querySelector( '.results' );

    fetch( TheUrl, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON);
            fetchUsers();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function deleteUserFetch(id){
    let TheUrl = '/user/' + id;

    
    let data = {
        id : id
    }
    console.log("data", data);
    let settings = {
        method : 'DELETE',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },
        //'path variables' : data
    }

    let results = document.querySelector( '.results' );

    fetch( TheUrl, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON);
            fetchUsers();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function addUserFetch( fName, lName, level, email, password ){
    let TheUrl = '/users';

    let data = {
        //id: uuid.v4(),
        fName: fName,
        lName: lName,
        level: level,
        email: email,
        password: password
    }
    console.log(data);

    let settings = {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }

    let results = document.querySelector( '.results' );

    fetch( TheUrl, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON);
            fetchUsers();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function fetchUsers(){

    let url = '/users';
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
    }
    let results = document.querySelector( '.results' );

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            results.innerHTML = "";
            console.log(responseJSON);
            for ( let i = 0; i < responseJSON.length; i ++ ){
                results.innerHTML += 
                `<div> 
                    <ul> 
                        <li> Nombre: ${responseJSON[i].fName} </li> 
                        <li> Apellido: ${responseJSON[i].lName} </li>
                        <li> Nivel: ${responseJSON[i].level} </li> 
                        <li> Email: ${responseJSON[i].email} </li>
                        <li> Password: ${responseJSON[i].password} </li>
                        <li> Id: ${responseJSON[i].id} </li>
                    <ul/> 
                </div>`;
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
    
}

function watchUsersForm(){
    let usersForm = document.querySelector( '.users-form' );

    usersForm.addEventListener( 'submit', ( event ) => {
        event.preventDefault();

        fetchUsers();
    });
}

function watchAddUserForm(){
    let usersForm = document.querySelector( '.add-user-form' );

    usersForm.addEventListener( 'submit' , ( event ) => {
        console.log("hey");
        event.preventDefault();        
        let fName = document.getElementById( 'userfName' ).value;
        let lName = document.getElementById( 'userlName' ).value;
        let level = document.getElementById( 'userLevel' ).value;
        let email = document.getElementById( 'userEmail' ).value;
        let password = document.getElementById( 'userPassword' ).value;


        console.log('level', level);

        addUserFetch( fName, lName, level, email, password);
    })
}
function watchDeleteUserForm(){
    let usersForm = document.querySelector( '.delete-user-form' );

    usersForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let id = document.getElementById( 'userIdToDelete' ).value;
        
        deleteUserFetch(id);
    })
}
function watchUpdateUserForm(){
    let usersForm = document.querySelector( '.update-user-form' );

    usersForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let fName = document.getElementById( 'updateUserfName' ).value;
        let lName = document.getElementById( 'updateUserlName' ).value;
        let level = document.getElementById( 'updateUserLevel' ).value;
        let email = document.getElementById( 'updateUserEmail' ).value;
        let password = document.getElementById( 'updateUserPassword' ).value;
        
        let id = document.getElementById( 'userIdToUpdate' ).value;
        
        updateUserFetch( fName, lName, level, email, password, id);
    })
}
function watchGetUserForm(){
    let usersForm = document.querySelector( '.get-fNamed-users-form' );

    usersForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let fName = document.getElementById( 'userfNameToGet' ).value;
        let lName = document.getElementById( 'userlNameToGet' ).value;
        let name = {
            fName: fName,
            lName:lName
        }
        

        getUserFetch(name);
    })
}

function init(){
    fetchUsers();
    watchUsersForm();
    watchDeleteUserForm();
    watchAddUserForm();
    watchUpdateUserForm();
    watchGetUserForm();
}

init();