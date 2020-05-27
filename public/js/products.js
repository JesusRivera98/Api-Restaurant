//const uuid = require('uuid');
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

function getProductFetch(name){
    let TheUrl = '/product/?name=' + name;
    
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
                        <li> Nombre: ${responseJSON[i].name} </li> 
                        <li> Descripción: ${responseJSON[i].description} </li>
                        <li> Unidad: ${responseJSON[i].nivel} </li>
                        <li> Costo: ${responseJSON[i].cost} </li>
                        <li> Precio: ${responseJSON[i].price} </li>
                        <li> Cantidad: ${responseJSON[i].stock} </li>
                        <li> Id: ${responseJSON[i].id} </li>  
                    <ul>
                </div>`;
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function updateProductFetch( name, description, unit, cost, price, stock, id ){
    let TheUrl = '/product/' + id;

    let data = {
        id: id,
        name: name,
        description: description,
        unit: unit,
        cost: cost,
        price: price,
        stock
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
            fetchProducts();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function deleteProductFetch(id){
    let TheUrl = '/product/' + id;

    let data = {
        id : id
    }
    console.log("data", data);
    let settings = {
        method : 'DELETE',
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
            fetchProducts();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function addProductFetch( name, description, unit, cost, price, stock ){
    let TheUrl = '/products';

    let data = {
        //id: uuid.v4(),
        name: name,
        description: description,
        unit: unit,
        cost: cost,
        price: price,
        stock: stock
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
            fetchProducts();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
function fetchProducts(){

    let url = '/products';
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
                        <li> Nombre: ${responseJSON[i].name} </li> 
                        <li> Descripción: ${responseJSON[i].description} </li>
                        <li> Unidad: ${responseJSON[i].unit} </li> 
                        <li> Costo: ${responseJSON[i].cost} </li>
                        <li> Precio: ${responseJSON[i].price} </li>
                        <li> Cantidad: ${responseJSON[i].stock} </li>
                        <li> Id: ${responseJSON[i].id} </li>
                    <ul/> 
                </div>`;
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
    
}

function watchProductsForm(){
    let productsForm = document.querySelector( '.products-form' );

    productsForm.addEventListener( 'submit', ( event ) => {
        event.preventDefault();

        fetchProducts();
    });
}
function watchAddProductForm(){
    let productsForm = document.querySelector( '.add-product-form' );

    productsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let name = document.getElementById( 'productName' ).value;
        let description = document.getElementById( 'productDescription' ).value;
        let unit = document.getElementById( 'productUnit' ).value;
        let cost = document.getElementById( 'productCost' ).value;
        let price = document.getElementById( 'productPrice' ).value;
        let stock = document.getElementById( 'productStock' ).value;

        addProductFetch( name, description, unit, cost, price, stock);
    })
}
function watchDeleteProductForm(){
    let productsForm = document.querySelector( '.delete-product-form' );

    productsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let id = document.getElementById( 'productIdToDelete' ).value;
        
        deleteProductFetch(id);
    })
}
function watchUpdateProductForm(){
    let productsForm = document.querySelector( '.update-product-form' );

    productsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let name = document.getElementById( 'updateProductName' ).value;
        let description = document.getElementById( 'updateProductDescription' ).value;
        let unit = document.getElementById( 'updateProductUnit' ).value;
        let cost = document.getElementById( 'updateProductCost' ).value;
        let price = document.getElementById( 'updateProductPrice' ).value;
        let stock = document.getElementById( 'updateProductStock' ).value;
        
        let id = document.getElementById( 'productIdToUpdate' ).value;
        
        updateProductFetch( name, description, unit, cost, price, stock, id);
    })
}
function watchGetProductForm(){
    let productsForm = document.querySelector( '.get-named-products-form' );

    productsForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();        
        let name = document.getElementById( 'productNameToGet' ).value;
       
        getProductFetch(name);
    })
}

function init(){
    fetchProducts();
    watchProductsForm();
    watchDeleteProductForm();
    watchAddProductForm();
    watchUpdateProductForm();
    watchGetProductForm();
}

init();