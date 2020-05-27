//const uuid = require('uuid');
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

function updateBillProductQuantityFetch(product, quantity, bill){
    let TheUrl = '/bill/product/quantity';
    let data = {
        billId: bill,
        productId: product,
        quantity: quantity
    }
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
            fetchBills();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });

}
function addBillProductFetch(product, quantity, notes, bill){
    let TheUrl = '/bills/products';
    let data = {
        billId: bill,
        productId: product,
        quantity: quantity,
        notes: notes
    }
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
            fetchBills();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });

}
function getBillClientedFetch(client){
    let TheUrl = '/bill/client/?client=' + client;
    
    let data = client

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
                        <li> Fecha: ${responseJSON[i].date} </li> 
                        <li> Cliente: ${responseJSON[i].client} </li>
                        <li> Mesa: ${responseJSON[i].table} </li> 
                        <li> Total: ${responseJSON[i].total} </li>
                        <li> Mesero: ${responseJSON[i].waiter} </li>
                        <li> Id: ${responseJSON[i].id} </li>
                        <li>`
                console.log()
                for(let j = 0; j < responseJSON[i].products.length; j++){
                    console.log(responseJSON[i].products[j].product);
                    results.innerHTML += `<li>
                            Product: ${responseJSON[i].products[j].product} 
                            Quantity: ${responseJSON[i].products[j].quantity}
                            Notes: ${responseJSON[i].products[j].notes}
                            </li>`
                }
                results.innerHTML +=
                `</li>                                                
                    <ul/> 
                </div>`;
            }
            //fetchBills();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function getBillWaiteredFetch(waiter){
    let TheUrl = '/bill/waiter/?waiter=' + waiter;
    
    let data = waiter

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
                        <li> Fecha: ${responseJSON[i].date} </li> 
                        <li> Cliente: ${responseJSON[i].client} </li>
                        <li> Mesa: ${responseJSON[i].table} </li> 
                        <li> Total: ${responseJSON[i].total} </li>
                        <li> Mesero: ${responseJSON[i].waiter} </li>
                        <li> Id: ${responseJSON[i].id} </li>
                        <li>`
                console.log()
                for(let j = 0; j < responseJSON[i].products.length; j++){
                    console.log(responseJSON[i].products[j].product);
                    results.innerHTML += `<li>
                            Product: ${responseJSON[i].products[j].product} 
                            Quantity: ${responseJSON[i].products[j].quantity}
                            Notes: ${responseJSON[i].products[j].notes}
                            </li>`
                }
                results.innerHTML +=
                `</li>                                                
                    <ul/> 
                </div>`;
            }
            //fetchBills();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function getBillDatedFetch(date){
    let TheUrl = '/bill/date/?date=' + date;
    
    let data = date

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
                        <li> Fecha: ${responseJSON[i].date} </li> 
                        <li> Cliente: ${responseJSON[i].client} </li>
                        <li> Mesa: ${responseJSON[i].table} </li> 
                        <li> Total: ${responseJSON[i].total} </li>
                        <li> Mesero: ${responseJSON[i].waiter} </li>
                        <li> Id: ${responseJSON[i].id} </li>
                        <li>`
                console.log()
                for(let j = 0; j < responseJSON[i].products.length; j++){
                    console.log(responseJSON[i].products[j]);
                    results.innerHTML += `<li>
                            Product: ${responseJSON[i].products[j].product} 
                            Quantity: ${responseJSON[i].products[j].quantity}
                            Notes: ${responseJSON[i].products[j].notes}
                            </li>`
                }
                results.innerHTML +=
                `</li>                                                
                    <ul/> 
                </div>`;
            }
            //fetchBills();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function updateBillFetch( date, client, table, total, waiter, id ){
    let TheUrl = '/bill/' + id;

    let data = {
        id: id,
        date: date,
        client: client,
        table: table,
        total: total,
        waiter: waiter
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
            fetchBills();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function deleteBillFetch(id){
    let TheUrl = '/bill/' + id;

    
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
            fetchBills();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function addBillFetch( date, client, table, total, waiter ){
    let TheUrl = '/bills';

    let data = {
        //id: uuid.v4(),
        date: date,
        client: client,
        table: table,
        total: total,
        waiter: waiter
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
            fetchBills();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function fetchBills(){

    let url = '/bills';
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
            for ( let i = 0; i < responseJSON.length; i ++ ){
                results.innerHTML += 
                `<div> 
                    <ul> 
                        <li> Fecha: ${responseJSON[i].date} </li> 
                        <li> Cliente: ${responseJSON[i].client} </li>
                        <li> Mesa: ${responseJSON[i].table} </li> 
                        <li> Total: ${responseJSON[i].total} </li>
                        <li> Mesero: ${responseJSON[i].waiter} </li>
                        <li> Id: ${responseJSON[i].id} </li>
                        <li>`
                console.log()
                for(let j = 0; j < responseJSON[i].products.length; j++){
                    console.log(responseJSON[i].products[j]);
                    results.innerHTML += `<li>
                            Product: ${responseJSON[i].products[j].product} 
                            Quantity: ${responseJSON[i].products[j].quantity}
                            Notes: ${responseJSON[i].products[j].notes}
                            </li>`
                }
                results.innerHTML +=
                `</li>                                                
                    <ul/> 
                </div>`;
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
    
}

function watchBillsForm(){
    let billsForm = document.querySelector( '.bills-form' );

    billsForm.addEventListener( 'submit', ( event ) => {
        event.preventDefault();

        fetchBills();
    });
}
function watchAddBillForm(){
    let billsForm = document.querySelector( '.add-bill-form' );

    billsForm.addEventListener( 'submit' , ( event ) => {
        console.log("hey");
        event.preventDefault();        
        let date = document.getElementById( 'billDate' ).value;
        let client = document.getElementById( 'billClient' ).value;
        let table = document.getElementById( 'billTable' ).value;
        let total = document.getElementById( 'billTotal' ).value;
        let waiter = document.getElementById( 'billWaiter' ).value;


        console.log('table', table);

        addBillFetch( date, client, table, total, waiter);
    })
}
function watchDeleteBillForm(){
    let billsForm = document.querySelector( '.delete-bill-form' );

    billsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let id = document.getElementById( 'billIdToDelete' ).value;
        
        deleteBillFetch(id);
    })
}
function watchUpdateBillForm(){
    let billsForm = document.querySelector( '.update-bill-form' );

    billsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let date = document.getElementById( 'updateBillDate' ).value;
        let client = document.getElementById( 'updateBillClient' ).value;
        let table = document.getElementById( 'updateBillTable' ).value;
        let total = document.getElementById( 'updateBillTotal' ).value;
        let waiter = document.getElementById( 'updateBillWaiter' ).value;
        
        let id = document.getElementById( 'billIdToUpdate' ).value;
        
        updateBillFetch( date, client, table, total, waiter, id);
    })
}
function watchGetBillForm(){
    let billsForm = document.querySelector( '.get-dated-bills-form' );

    billsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let date = document.getElementById( 'billDateToGet' ).value;       

        getBillDatedFetch(date);
    })
}
function watchGetWaiteredBillForm(){
    let billsForm = document.querySelector( '.get-waitered-bills-form' );

    billsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let waiter = document.getElementById( 'billWaiterToGet' ).value;

        getBillWaiteredFetch(waiter);
    })
}
function watchGetClientedBillForm(){
    let billsForm = document.querySelector( '.get-cliented-bills-form' );

    billsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let client = document.getElementById( 'billClientToGet' ).value;

        getBillClientedFetch(client);
    })
}
function watchAddBillProductForm(){
    let billsForm = document.querySelector( '.add-bill-product-form' );

    billsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let product = document.getElementById( 'productIdToAdd' ).value;
        let quantity = document.getElementById( 'productQuantityToAdd' ).value;
        let notes = document.getElementById( 'productNotesToAdd' ).value;
        let bill = document.getElementById( 'billIdToAddProduct' ).value;

        addBillProductFetch( product, quantity, notes, bill);
    })
}
function watchUpdateBillProductQuantityForm(){
    let billsForm = document.querySelector( '.add-bill-product-form' );

    billsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let product = document.getElementById( 'productIdToAdd' ).value;
        let quantity = document.getElementById( 'productQuantityToAdd' ).value;
        let bill = document.getElementById( 'billIdToAddProduct' ).value;

        updateBillProductQuantityFetch( product, quantity, bill);
    })
}


function init(){
    fetchBills();
    watchBillsForm();
    watchDeleteBillForm();
    watchAddBillForm();
    watchUpdateBillForm();
    watchGetBillForm();
    watchAddBillProductForm();
    watchGetWaiteredBillForm();
    watchGetClientedBillForm();
}

init();