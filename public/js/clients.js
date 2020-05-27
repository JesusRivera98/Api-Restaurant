//const uuid = require('uuid');
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

function getAliasedClientFetch(name){
    let TheUrl = '/client/alias/?alias=' + name;
    
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
                        <li> Nombre: ${responseJSON[i].firstName} </li> 
                        <li> Apellido: ${responseJSON[i].lastName} </li>
                        <li> Nivel: ${responseJSON[i].RFC} </li>
                        <li> Email: ${responseJSON[i].email} </li>
                        <li> Address: ${responseJSON[i].address} </li>
                        <li> Alias: ${responseJSON[i].alias} </li>
                        <li> Id: ${responseJSON[i].id} </li>  
                    <ul>
                </div>`;
            }
            //fetchClients();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function getlastNamedClientFetch(name){
    let TheUrl = '/client/lastName/?lastName=' + name;
    
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
                        <li> Nombre: ${responseJSON[i].firstName} </li> 
                        <li> Apellido: ${responseJSON[i].lastName} </li>
                        <li> Nivel: ${responseJSON[i].RFC} </li>
                        <li> Email: ${responseJSON[i].email} </li>
                        <li> Address: ${responseJSON[i].address} </li>
                        <li> Alias: ${responseJSON[i].alias} </li>
                        <li> Id: ${responseJSON[i].id} </li>  
                    <ul>
                </div>`;
            }
            //fetchClients();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function getfirstNamedClientFetch(name){
    let TheUrl = '/client/firstName/?firstName=' + name;
    
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
                        <li> Nombre: ${responseJSON[i].firstName} </li> 
                        <li> Apellido: ${responseJSON[i].lastName} </li>
                        <li> Nivel: ${responseJSON[i].RFC} </li>
                        <li> Email: ${responseJSON[i].email} </li>
                        <li> Address: ${responseJSON[i].address} </li>
                        <li> Alias: ${responseJSON[i].alias} </li>
                        <li> Id: ${responseJSON[i].id} </li>  
                    <ul>
                </div>`;
            }
            //fetchClients();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function getClientFetch(name){
    let TheUrl = '/client/?firstName=' + name.firstName + '&lastName=' + name.lastName;
    
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
                        <li> Nombre: ${responseJSON[i].firstName} </li> 
                        <li> Apellido: ${responseJSON[i].lastName} </li>
                        <li> Nivel: ${responseJSON[i].RFC} </li>
                        <li> Email: ${responseJSON[i].email} </li>
                        <li> Address: ${responseJSON[i].address} </li>
                        <li> Alias: ${responseJSON[i].alias} </li>
                        <li> Id: ${responseJSON[i].id} </li>  
                    <ul>
                </div>`;
            }
            //fetchClients();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function updateClientFetch( firstName, lastName, RFC, email, address, alias, id ){
    let TheUrl = '/client/' + id;

    let data = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        RFC: RFC,
        email: email,
        address: address,
        alias: alias
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
            fetchClients();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function deleteClientFetch(id){
    let TheUrl = '/client/' + id;

    
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
            fetchClients();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function addClientFetch( firstName, lastName, RFC, email, address, alias ){
    let TheUrl = '/clients';

    let data = {
        //id: uuid.v4(),
        firstName: firstName,
        lastName: lastName,
        RFC: RFC,
        email: email,
        address: address,
        alias: alias
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
            fetchClients();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function fetchClients(){

    let url = '/clients';
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
                        <li> Nombre: ${responseJSON[i].firstName} </li> 
                        <li> Apellido: ${responseJSON[i].lastName} </li>
                        <li> Nivel: ${responseJSON[i].RFC} </li> 
                        <li> Email: ${responseJSON[i].email} </li>
                        <li> Address: ${responseJSON[i].address} </li>
                        <li> Alias: ${responseJSON[i].alias} </li>
                        <li> Id: ${responseJSON[i].id} </li>
                    <ul/> 
                </div>`;
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
    
}

function watchClientsForm(){
    let clientsForm = document.querySelector( '.clients-form' );

    clientsForm.addEventListener( 'submit', ( event ) => {
        event.preventDefault();

        fetchClients();
    });
}
function watchAddClientForm(){
    let clientsForm = document.querySelector( '.add-client-form' );

    clientsForm.addEventListener( 'submit' , ( event ) => {
        console.log("hey");
        event.preventDefault();        
        let firstName = document.getElementById( 'clientfirstName' ).value;
        let lastName = document.getElementById( 'clientlastName' ).value;
        let RFC = document.getElementById( 'clientRFC' ).value;
        let email = document.getElementById( 'clientEmail' ).value;
        let address = document.getElementById( 'clientAddress' ).value;
        let alias = document.getElementById( 'clientAlias' ).value;


        console.log('RFC', RFC);

        addClientFetch( firstName, lastName, RFC, email, address, alias);
    })
}
function watchDeleteClientForm(){
    let clientsForm = document.querySelector( '.delete-client-form' );

    clientsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let id = document.getElementById( 'clientIdToDelete' ).value;
        
        deleteClientFetch(id);
    })
}
function watchUpdateClientForm(){
    let clientsForm = document.querySelector( '.update-client-form' );

    clientsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let firstName = document.getElementById( 'updateClientfirstName' ).value;
        let lastName = document.getElementById( 'updateClientlastName' ).value;
        let RFC = document.getElementById( 'updateClientRFC' ).value;
        let email = document.getElementById( 'updateClientEmail' ).value;
        let address = document.getElementById( 'updateClientAddress' ).value;
        let alias = document.getElementById( 'updateClientAlias' ).value;
        
        let id = document.getElementById( 'clientIdToUpdate' ).value;
        
        updateClientFetch( firstName, lastName, RFC, email, address, alias, id);
    })
}
function watchGetClientNamedForm(){
    let clientsForm = document.querySelector( '.get-named-clients-form' );

    clientsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let firstName = document.getElementById( 'clientfirstNameToGet' ).value;
        let lastName = document.getElementById( 'clientlastNameToGet' ).value;
        let name = {
            firstName: firstName,
            lastName: lastName
        }
        

        getClientFetch(name);
    })
}
function watchGetfirstNameClientForm(){
    let clientsForm = document.querySelector( '.get-firstNamed-clients-form' );

    clientsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let name = document.getElementById( 'clientfirstNameToGetf' ).value;        

        getfirstNamedClientFetch(name);
    })
}
function watchGetlastNameClientForm(){
    let clientsForm = document.querySelector( '.get-lastNamed-clients-form' );

    clientsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let name = document.getElementById( 'clientlastNameToGet' ).value;        

        getlastNamedClientFetch(name);
    })
}
function watchGetAliasClientForm(){
    let clientsForm = document.querySelector( '.get-aliased-clients-form' );

    clientsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let name = document.getElementById( 'clientAliasToGet' ).value;        

        getAliasedClientFetch(name);
    })
}

function init(){
    fetchClients();
    watchClientsForm();
    watchDeleteClientForm();
    watchAddClientForm();
    watchUpdateClientForm();
    //watchGetClientForm();
    watchGetClientNamedForm();
    watchGetfirstNameClientForm();
    watchGetlastNameClientForm();
    watchGetAliasClientForm();
}

init();