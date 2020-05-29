const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const validateToken = require('./middleware/validateToken');
const validateSessionToken = require('./middleware/validateSessionToken');

const mongoose = require('mongoose');
const { Bookmarks } = require('./models/bookmarksModel');
const { Comments } = require('./models/commentsModel');
const { Users } = require('./models/usersModel');
const { Clients } = require('./models/clientsModel');
const { Products } = require('./models/productsModel');
const { Bills, BillsClient } = require('./models/billsModel')
const { DATABASE_URL, PORT, SECRET_TOKEN } = require('./config');
const cors = require('./middleware/cors');

const uuid = require('uuid');

const app = express();
const jsonParser = bodyParser.json();

//const API_TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653.";

app.use(cors);
app.use(express.static("public"));
app.use(morgan('dev'));

function middleware(req, res, next) {
    console.log("Inside the middleware");

    req.test = {};
    req.test = {
        message: "This was added inside the middleware"
    }

    next();
}

/*function validateToken(req, res, next){
    let token = req.headers.waiterization;

    if(!token){
        res.statusMessage = "You must send the 'waiterization' token";
        return res.status(401).end()
    }
    console.log(token);
    console.log(API_TOKEN);

    if(token != `Bearer ${API_TOKEN}`){
        res.statusMessage = "The 'aut' token doesn't matches";
        return res.status(401).end();
    }
    next();
}*/

app.use(validateToken);

/*const bookmark = {
    id: uuid.v4(),
    firstName: string,
    lastName: string,
    url: string,
    email: number
}*/
let bookmarksList = [
    {
        id: uuid.v4(),
        firstName: "Google",
        lastName: "El buscador con el mejor algoritmo",
        url: "www.google.com",
        email: 5
    },
    {
        id: uuid.v4(),
        firstName: "Facebook",
        lastName: "La red social más utilizada",
        url: "www.facebook.com",
        email: 5
    }
];

//////////////////////////////////USERS/////////////////////////////////////////////////////////////////

//Get all users
app.get('/users', middleware, (req, res) => {
    console.log("Getting the list of users.");
    //console.log(req.test);

    //console.log(req.headers);
    Users
        .getAllUsers()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })

    //return res.status(200).json(usersList);
});
//Get user by name
app.get('/user', (req, res) => {
    console.log("Getting user by firstName, ");
    console.log("query is :", req);

    let firstName = req.query.firstName;
    let lastName = req.query.lastName;

    if (!firstName) {
        res.statusMessage = "The parameter 'firstName' is required.";
        return res.status(406).end();
    }
    if (!lastName) {
        res.statusMessage = "The parameter 'lastName' is required.";
        return res.status(406).end();
    }

    name = {
        firstName: firstName,
        lastName: lastName
    }

    Users
        .getUserByName(name)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Add new user
app.post('/users', jsonParser, validateSessionToken, (req, res) => {
    console.log('adding an user')
    let { firstName, lastName, level, email, password } = req.body;

    if (!firstName || !lastName || !level || !password) {
        res.statusMessage = "All parameters: 'firstName', 'lastName', 'level' and 'password' must be sent in the body.";
        return res.status(406).end();
    }
    bcrypt.hash(password, 10)
        .then(hashedPassword => {
            let newUser = {
                id: uuid.v4(),
                firstName: firstName,
                lastName: lastName,
                level: level,
                email: email,
                password: hashedPassword
            };
            console.log(newUser);

            Users
                .createUser(newUser)
                .then(result => {
                    if (result.errmsg) {
                        res.statusMessage = "The id of that user already exists in the database." +
                            result.errmsg;
                        return res.status(409).end();
                    }
                    console.log(result);
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = err;
                    return res.status(500).end();
                });
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        });
});
//Delete a user
app.delete('/user/:id', (req, res) => {
    console.log('Deleting user');
    //console.log("req: \n", req);
    let id = req.params.id;
    //f1724b45-e9f8-4d7c-aca4-2f5d8d67b69f
    if (!id) {
        res.statusMessage = "The 'id' must be sent as parameter in the query string.";
        return res.status(406).end();
    }

    Users
        .deleteUserById(id)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })

    /*

    //console.log(typeof(id));
    let userToRemove = usersList.findIndex((user) => {
        if (user.id === id) {
            return true;
        }
    });

    if (userToRemove < 0) {
        res.statusMessage = "The 'id' was not found in the list of users.";
        return res.status(404).end();
    }

    usersList.splice(userToRemove, 1);

    return res.status(200).json({});*/
});
//Patch a user
app.patch('/user/:id', jsonParser, (req, res) => {
    console.log("Patching user by id, ");

    let pId = req.params.id
    let id = req.body.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let level = req.body.level;
    let email = req.body.email;
    let password = req.body.password;

    if (!id) {
        res.statusMessage = "The 'id' must be sent in the body.";
        return res.status(406).end();
    }

    if (firstName) {
        Users
            .updateUserfirstName(id, firstName)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (lastName) {
        Users
            .updateUserlastName(id, lastName)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (level) {
        Users
            .updateUserLevel(id, level)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (email) {
        Users
            .updateUserEmail(id, email)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (password) {
        bcrypt.hash(password, 10)
            .then(hashedPassword => {
                Users
                    .updateUserPassword(id, hashedPassword)
                    .then(result => {
                        //return res.status( 200 ).json( result );
                    })
                    .catch(err => {
                        res.statusMessage = "Something is wrong with the Database. Try again later.";
                        return res.status(500).end();
                    })

            })
            .catch(err => {
                res.statusMessage = err.message;
                return res.status(400).end();
            });
    }

    Users
        .getAllUsers()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});

//////////////////////////////////CLIENTS/////////////////////////////////////////////////////////////////

//Get all clients
app.get('/clients', middleware, (req, res) => {
    console.log("Getting the list of clients.");

    Clients
        .getAllClients()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Get client by name
app.get('/client', (req, res) => {
    console.log("Getting client by name, ");

    let firstName = req.query.firstName;
    let lastName = req.query.lastName;

    if (!firstName) {
        res.statusMessage = "The parameter 'firstName' is required.";
        return res.status(406).end();
    }
    if (!lastName) {
        res.statusMessage = "The parameter 'lastName' is required.";
        return res.status(406).end();
    }

    name = {
        firstName: firstName,
        lastName: lastName
    }

    Clients
        .getClientByName(name)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Get client by firstName
app.get('/client/firstName', (req, res) => {
    console.log("Getting client by name, ");

    let firstName = req.query.firstName;

    if (!firstName) {
        res.statusMessage = "The parameter 'firstName' is required.";
        return res.status(406).end();
    }

    Clients
        .getClientByfirstName(firstName)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Get client by lastName
app.get('/client/lastName', (req, res) => {
    console.log("Getting client by lastName, ");

    let lastName = req.query.lastName;

    if (!lastName) {
        res.statusMessage = "The parameter 'lastName' is required.";
        return res.status(406).end();
    }

    Clients
        .getClientBylastName(lastName)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Get client by alias
app.get('/client/alias', (req, res) => {
    console.log("Getting client by alias");
    console.log(req)
    let alias = req.query.alias;

    if (!alias) {
        res.statusMessage = "The parameter 'alias' is required.";
        return res.status(406).end();
    }

    Clients
        .getClientByAlias(alias)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Create new client
app.post('/clients', jsonParser, (req, res) => {
    console.log('adding an client')

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let RFC = req.body.RFC;
    let email = req.body.email;
    let address = req.body.address;
    let alias = req.body.alias

    /*if (!firstName || !lastName || !RFC || !address) {
        res.statusMessage = "All parameters: 'firstName', 'lastName', 'levle' and 'address' must be sent in the body.";
        return res.status(406).end();
    }*/

    let newClient = {
        id: uuid.v4(),
        firstName: firstName,
        lastName: lastName,
        RFC: RFC,
        email: email,
        address: address,
        alias: alias
    };

    Clients
        .createClient(newClient)
        .then(result => {
            if (result.errmsg) {
                res.statusMessage = "The id of that client already exists in the database." +
                    result.errmsg;
                return res.status(409).end();
            }
            console.log(result);
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = err;
            return res.status(500).end();
        });
});
//Delete a client
app.delete('/client/:id', (req, res) => {
    console.log('Deleting client');

    let id = req.params.id;

    if (!id) {
        res.statusMessage = "The 'id' must be sent as parameter in the query string.";
        return res.status(406).end();
    }

    Clients
        .deleteClientById(id)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Patch a client
app.patch('/client/:id', jsonParser, (req, res) => {
    console.log("Patching client by id, ");

    let pId = req.params.id
    let id = req.body.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let RFC = req.body.RFC;
    let email = req.body.email;
    let address = req.body.address;
    let alias = req.body.alias;

    if (!id) {
        res.statusMessage = "The 'id' must be sent in the body.";
        return res.status(406).end();
    }

    if (firstName) {
        Clients
            .updateClientfirstName(id, firstName)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (lastName) {
        Clients
            .updateClientlastName(id, lastName)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (RFC) {
        Clients
            .updateClientRFC(id, RFC)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (email) {
        Clients
            .updateClientEmail(id, email)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (address) {
        Clients
            .updateClientAddress(id, address)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (alias) {
        Clients
            .updateClientAlias(id, alias)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }

    Clients
        .getAllClients()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});

//////////////////////////////////PRODUCTS/////////////////////////////////////////////////////////////////

//Get all products
app.get('/products', middleware, (req, res) => {
    console.log("Getting the list of products.");

    Products
        .getAllProducts()
        .then(results => {
            console.log(results)
            const filteredResults = results.map(result => {
                const filteredProducts = result.components.map(prod => {
                    console.log('--------', prod)
                    return {
                        product: prod.component.name,
                        quantity: prod.quantity,
                        notes: prod.notes
                    }
                })
                const filteredComments = result.comments.map(comm => {
                    return {
                        user: comm.user,
                        comment: comm.comment,
                        date: comm.date
                    }
                })
                return {
                    id: result.id,
                    name: result.name,
                    description: result.description,
                    unit: result.unit,
                    cost: result.cost,
                    price: result.price,
                    stock: result.stock,
                    components: filteredProducts,
                    comments: filteredComments
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Get product by name
app.get('/product/name', (req, res) => {
    console.log("Getting product by name");

    let name = req.query.name;

    if (!name) {
        res.statusMessage = "The parameter 'firstName' is required.";
        return res.status(406).end();
    }

    Products
        .getProductByName(name)
        .then(results => {
            const filteredResults = results.map(result => {
                const filteredProducts = result.components.map(prod => {
                    console.log('--------', prod)
                    return {
                        product: prod.component.name,
                        quantity: prod.quantity,
                        notes: prod.notes
                    }
                })
                const filteredComments = result.comments.map(comm => {
                    return {
                        user: comm.user,
                        comment: comm.comment,
                        date: comm.date
                    }
                })
                return {
                    id: result.id,
                    name: result.name,
                    description: result.description,
                    unit: result.unit,
                    cost: result.cost,
                    price: result.price,
                    stock: result.stock,
                    components: filteredProducts,
                    comments: filteredComments
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Get product by id
app.get('/product/id', (req, res) => {
    console.log("Getting product by id");

    let id = req.query.id;

    if (!id) {
        res.statusMessage = "The parameter 'id' is required.";
        return res.status(406).end();
    }

    Products
        .getProductById(id)
        .then(result => {
            console.log(result)

            const filteredProducts = result.components.map(prod => {
                return {
                    product: prod.component.id,
                    quantity: prod.quantity,
                    notes: prod.notes
                }
            })
            const filteredComments = result.comments.map(comm => {
                return {
                    user: comm.user,
                    comment: comm.comment,
                    date: comm.date
                }
            })
            const filteredResult = {
                id: result.id,
                name: result.name,
                description: result.description,
                unit: result.unit,
                cost: result.cost,
                price: result.price,
                stock: result.stock,
                components: filteredProducts,
                comments: filteredComments
            }

            return res.status(200).json(filteredResult);
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
            //res.statusMessage = "Something is wrong with the Database. Try again later.";
            //return res.status(500).end();
        })
});
//Create new product
app.post('/products', jsonParser, (req, res) => {
    console.log('adding a product')

    let name = req.body.name;
    let description = req.body.description;
    let unit = req.body.unit;
    let cost = Number(Number(req.body.cost));
    let price = Number(req.body.price);
    let stock = req.body.stock

    /*if (!name || !description || !unit || !price) {
        res.statusMessage = "All parameters: 'firstName', 'description', 'levle' and 'price' must be sent in the body.";
        return res.status(406).end();
    }*/

    let newProduct = {
        id: uuid.v4(),
        name: name,
        description: description,
        unit: unit,
        cost: cost,
        price: price,
        stock: stock
    };

    Products
        .createProduct(newProduct)
        .then(result => {
            if (result.errmsg) {
                res.statusMessage = "The id of that product already exists in the database." +
                    result.errmsg;
                return res.status(409).end();
            }
            console.log(result);
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = err;
            return res.status(500).end();
        });
});
//Delete a product
app.delete('/product/:id', (req, res) => {
    console.log('Deleting product');

    let id = req.params.id;

    if (!id) {
        res.statusMessage = "The 'id' must be sent as parameter in the query string.";
        return res.status(406).end();
    }

    Products
        .deleteProductById(id)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Patch a product
app.patch('/product/:id', jsonParser, (req, res) => {
    console.log("Patching product by id, ");

    let pId = req.params.id
    let id = req.body.id;
    let name = req.body.name;
    let description = req.body.description;
    let unit = req.body.unit;
    let cost = Number(req.body.cost);
    let price = Number(req.body.price);
    let stock = Number(req.body.stock);

    if (!id) {
        res.statusMessage = "The 'id' must be sent in the body.";
        return res.status(406).end();
    }

    if (name) {
        Products
            .updateProductName(id, name)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (description) {
        Products
            .updateProductDescription(id, description)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (unit) {
        Products
            .updateProductUnit(id, unit)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (cost) {
        Products
            .updateProductCost(id, cost)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (price) {
        Products
            .updateProductPrice(id, price)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (stock) {
        Products
            .updateProductStock(id, stock)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }

    Products
        .getAllProducts()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Add a component to a product
app.patch('/products/components', jsonParser, (req, res) => {
    console.log('adding a component to a product')
    let productId = req.body.productId;
    let componentId = req.body.componentId;
    let quantity = req.body.quantity;
    let notes = req.body.notes;

    if (!productId || !componentId || !quantity) {
        res.statusMessage = "All parameters: 'productId', 'componentId' and 'quantity' must be sent in the body.";
        return res.status(406).end();
    }
    Products
        .getProductById(componentId)
        .then(component => {
            console.log(component)
            const newComponent = {
                component: component._id,
                quantity,
                notes: notes
            }
            Products
                .addProductComponent(productId, newComponent)
                .then(result => {
                    if (result.errmsg) {
                        res.statusMessage = "The id of that product already exists in the database." +
                            result.errmsg;
                        return res.status(409).end();
                    }
                    console.log('added product', result);
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = err;
                    return res.status(500).end();
                });

        })
        .catch(err => {
            res.statusMessage = err;
            return res.status(500).end();
        });
});
//Add a comment to a product
app.patch('/products/comments', jsonParser, (req, res) => {
    console.log('adding a comment to a product')
    //console.log(req);
    let productId = req.body.productId;
    let userId = req.body.userId;
    let comment = req.body.comment;
    let date = req.body.date;

    if (!userId || !productId || !comment || !date) {
        console.log(userId, productId, comment, date);
        res.statusMessage = "All parameters: 'productId', 'userId', 'date and 'comment' must be sent in the body.";
        return res.status(406).end();
    }
    Users
        .getUserById(userId)
        .then(user => {
            console.log(user)
            const newComment = {
                user: user._id,
                comment,
                date: date
            }
            Products
                .addProductComment(productId, newComment)
                .then(result => {
                    if (result.errmsg) {
                        res.statusMessage = "The id of that product already exists in the database." +
                            result.errmsg;
                        return res.status(409).end();
                    }
                    console.log('added product', result);
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = err;
                    return res.status(500).end();
                });
        })
        .catch(err => {
            res.statusMessage = err;
            return res.status(500).end();
        });
});

//////////////////////////////////BILLS/////////////////////////////////////////////////////////////////

//Get all the bills
app.get('/bills', middleware, (req, res) => {
    console.log("Getting the list of bills.");

    Bills
        .getAllBills()
        .then(results => {
            console.log(results)
            const filteredResults = results.map(result => {
                const filteredProducts = result.products.map(prod => {
                    console.log('--------', prod)
                    return {
                        product: prod.product.name,
                        quantity: prod.quantity,
                        notes: prod.notes
                    }
                })
                let newWait = ""
                if (result.waiter != undefined) {
                    newWait = `${result.waiter.firstName} ${result.waiter.lastName}`
                }
                return {
                    id: result.id,
                    date: result.date,
                    client: result.client,
                    table: result.table,
                    products: filteredProducts,
                    waiter: newWait
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            /*res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();*/
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
//Get bill by client
app.get('/bill/client/', (req, res) => {
    console.log("Getting bill by client");

    let client = req.query.client;

    if (!client) {
        res.statusMessage = "The parameter 'client' is required.";
        return res.status(406).end();
    }

    Bills
        .getBillsByClient(client)
        .then(results => {
            const filteredResults = results.map(result => {

                const filteredProducts = result.products.map(prod => {
                    return {
                        product: prod.product.name,
                        stock: prod.stock,
                        notes: prod.notes
                    }
                })

                let newWait = ""
                if (result.waiter != undefined) {
                    newWait = `${result.waiter.firstName} ${result.waiter.lastName}`
                }
                return {
                    id: result.id,
                    date: result.date,
                    client: result.client,
                    table: result.table,
                    products: filteredProducts,
                    waiter: newWait
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Get bill by date
app.get('/bill/date/', (req, res) => {
    console.log("Getting bill by date");

    let date = req.query.date;

    if (!date) {
        res.statusMessage = "The parameter 'date' is required.";
        return res.status(406).end();
    }

    Bills
        .getBillsByDate(date)
        .then(results => {
            const filteredResults = results.map(result => {
                const filteredProducts = result.products.map(prod => {
                    return {
                        product: prod.product.name,
                        stock: prod.stock,
                        notes: prod.notes
                    }
                })
                let newWait = ""
                if (result.waiter != undefined) {
                    newWait = `${result.waiter.firstName} ${result.waiter.lastName}`
                }
                return {
                    id: result.id,
                    date: result.date,
                    client: result.client,
                    table: result.table,
                    products: filteredProducts,
                    waiter: newWait
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            /*res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();*/
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
//Get bill by waiter
app.get('/bill/waiter/', (req, res) => {
    console.log("Getting bill by waiter");

    let waiter = req.query.waiter;

    if (!waiter) {
        res.statusMessage = "The parameter 'waiter' is required.";
        return res.status(406).end();
    }
    //console.log(waiter);
    Bills
        .getBillsByWaiter(waiter)
        .then(results => {
            console.log(results)
            const filteredResults = results.map(result => {
                const filteredProducts = result.products.map(prod => {
                    return {
                        product: prod.product.name,
                        stock: prod.stock,
                        notes: prod.notes
                    }
                })

                let newWait = ""
                if (result.waiter != undefined) {
                    newWait = `${result.waiter.firstName} ${result.waiter.lastName}`
                }
                return {
                    id: result.id,
                    date: result.date,
                    client: result.client,
                    table: result.table,
                    products: filteredProducts,
                    waiter: newWait
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Add a new bill
app.post('/bills', jsonParser, (req, res) => {
    console.log('adding a bill')
    let date = req.body.date;
    let waiterId = req.body.waiter;
    let client = req.body.client;
    let table = req.body.table;
    let total = req.body.total;
    //console.log(waiterId)

    Users
        .getUserById(waiterId)
        .then(waiter => {
            if (!date || !client || !total) {
                res.statusMessage = "All parameters: 'date', 'client'and 'total' must be sent in the body.";
                return res.status(406).end();
            }
            if (!waiter) {
                //validations
                /*
                let newBill = {
                id: uuid.v4(),
                date: date,
                client: client,
                table: table,
                total: total
            }
                */
            }
            //console.log('id', waiter, waiter.id)
            const newBill = {
                id: uuid.v4(),
                date,
                client,
                table,
                total,
                waiter: waiter._id
            }
            console.log("res:", newBill)

            Bills
                .createBill(newBill)
                .then(result => {
                    if (result.errmsg) {
                        res.statusMessage = "The id of that bill already exists in the database." +
                            result.errmsg;
                        return res.status(409).end();
                    }
                    console.log(result);
                    return res.status(201).json(result);
                })
                .catch(err => {
                    console.log(err)
                    res.statusMessage = err;
                    return res.status(500).end();
                });
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        });
});
//Add a product to a bill
app.post('/bills/products', jsonParser, (req, res) => {
    console.log('adding a product to a bill')
    let billId = req.body.billId;
    let productId = req.body.productId;
    let quantity = Number(req.body.quantity);
    let notes = req.body.notes;
    if (!billId || !productId || !quantity) {
        res.statusMessage = "All parameters: 'billId', 'productId' and 'quantity' must be sent in the body.";
        return res.status(406).end();
    }
    Products
        .getProductById(productId)
        .then(product => {
            const newProduct = {
                product: product._id,
                quantity,
                notes
            }
            console.log("____________________________", newProduct)
            Bills
                .addNewProduct(billId, newProduct)
                .then(result => {
                    if (result.errmsg) {
                        res.statusMessage = "The id of that bill already exists in the database." +
                            result.errmsg;
                        return res.status(409).end();
                    }
                    console.log('added bill', result);
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = err;
                    return res.status(500).end();
                });

        })
        .catch(err => {
            res.statusMessage = err;
            return res.status(500).end();
        });
});
//Update the quantity of a bill
app.patch('/bill/product/:id', jsonParser, (req, res) => {
    console.log("Patching bill's product by id, ");

    let pId = req.params.id
    let productId = req.body.productId;
    let billId = req.body.billId;
    let quantity = req.body.quantity;

    if (!billId) {
        res.statusMessage = "The 'billId' must be sent in the body.";
        return res.status(406).end();
    }

    if (quantity) {
        Bills
            .updateAProductQuantity(billId, productId, quantity)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }

    Bills
        .getAllBills()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Delete a bill's product
app.delete('/bill/product/:id', jsonParser, (req, res) => {
    console.log('Deleting bill product');

    let id = req.params.id;
    let pId = req.body.pId;

    if (!id) {
        res.statusMessage = "The 'id' must be sent as parameter in the query string.";
        return res.status(406).end();
    }
    if (!pId) {
        res.statusMessage = "The 'pId' must be sent as parameter in the query string.";
        return res.status(406).end();
    }

    console.log(pId)
    Bills
        .deleteBillProductById(id, pId)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Delete a bill
app.delete('/bill/:id', (req, res) => {
    console.log('Deleting bill');

    let id = req.params.id;

    if (!id) {
        res.statusMessage = "The 'id' must be sent as parameter in the query string.";
        return res.status(406).end();
    }

    Bills
        .deleteBillById(id)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Patch a bill
app.patch('/bill/:id', jsonParser, (req, res) => {
    console.log("Patching bill by id, ");

    let pId = req.params.id
    let id = req.body.id;
    let date = req.body.date;
    let client = req.body.client;
    let table = req.body.table;
    let total = Number(req.body.total);
    let waiter = req.body.waiter;
    let products = req.body.products;

    if (!id) {
        res.statusMessage = "The 'id' must be sent in the body.";
        return res.status(406).end();
    }

    if (date) {
        Bills
            .updateBillDate(id, date)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (client) {
        Bills
            .updateBillClient(id, client)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (table) {
        Bills
            .updateBillTable(id, table)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (total) {

        Bills
            .updateBillTotal(id, total)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (waiter) {
        Bills
            .updateBillWaiter(id, waiter)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (products) {
        Bills
            .updateBillProducts(id, products)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }

    Bills
        .getAllBills()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});

//probar algo con bill id y product id
app.get('/bill/prueba', (req, res) => {
    console.log("Getting bill's product");

    let bill = req.query.bill;
    let product = req.query.product;

    if (!bill) {
        res.statusMessage = "The parameter 'bill' is required.";
        return res.status(406).end();
    }
    if (!product) {
        res.statusMessage = "The parameter 'bill' is required.";
        return res.status(406).end();
    }

    Bills
        .updateUpdate(bill, product)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});

//////////////////////////////////BILLS CLIENT/////////////////////////////////////////////////////////////////

//Get all the bills
app.get('/billsClient', middleware, (req, res) => {
    console.log("Getting the list of bills.");

    BillsClient
        .getAllBillsClient()
        .then(results => {
            //console.log(results)
            const filteredResults = results.map(result => {
                //console.log("res  __---",result)
                const filteredProducts = result.products.map(prod => {
                    //console.log(prod)
                    return {
                        product: prod.product.name,
                        quantity: prod.quantity,
                        notes: prod.notes
                    }
                })
                let newClient = ""
                if (result.client != undefined) {
                    newClient = `${result.client.firstName} ${result.client.lastName}`
                }
                console.log("Total", result.total)
                return {
                    id: result.id,
                    date: result.date,
                    client: newClient,
                    total: result.total,
                    open: result.open,
                    products: filteredProducts
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            /*res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();*/
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
//Get open bills
app.get('/billsClient/open', middleware, (req, res) => {
    console.log("Getting the list of bills.");

    BillsClient
        .getBillsClientOpen()
        .then(results => {
            //console.log(results)
            const filteredResults = results.map(result => {
                console.log(result)
                const filteredProducts = result.products.map(prod => {
                    return {
                        product: prod.product.name,
                        quantity: prod.quantity,
                        notes: prod.notes
                    }
                })
                let newClient = ""
                if (result.client != undefined) {
                    newClient = `${result.client.firstName} ${result.client.lastName}`
                }
                return {
                    id: result.id,
                    date: result.date,
                    client: newClient,
                    total: result.total,
                    open: result.open,
                    products: filteredProducts
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            /*res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();*/
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
//Get closed bills
app.get('/billsClient/closed', middleware, (req, res) => {
    console.log("Getting the list of bills.");

    BillsClient
        .getBillsClientClosed()
        .then(results => {
            //console.log(results)
            const filteredResults = results.map(result => {
                console.log(result)
                const filteredProducts = result.products.map(prod => {
                    return {
                        product: prod.product.name,
                        quantity: prod.quantity,
                        notes: prod.notes
                    }
                })
                let newClient = ""
                if (result.client != undefined) {
                    newClient = `${result.client.firstName} ${result.client.lastName}`
                }
                return {
                    id: result.id,
                    date: result.date,
                    client: newClient,
                    total: result.total,
                    open: result.open,
                    products: filteredProducts
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            /*res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();*/
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
/*//Get bill by client
app.get('/billClient/client/', (req, res) => {
    console.log("Getting bill by client");

    let client = req.query.client;

    if (!client) {
        res.statusMessage = "The parameter 'client' is required.";
        return res.status(406).end();
    }

    Bills
        .getBillsByClient(client)
        .then(results => {
            const filteredResults = results.map(result => {

                const filteredProducts = result.products.map(prod => {
                    return {
                        product: prod.product.name,
                        stock: prod.stock,
                        notes: prod.notes
                    }
                })

                let newWait = ""
                if (result.waiter != undefined) {
                    newWait = `${result.waiter.firstName} ${result.waiter.lastName}`
                }
                return {
                    id: result.id,
                    date: result.date,
                    client: result.client,
                    table: result.table,
                    products: filteredProducts,
                    waiter: newWait
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});*/
//Get bill by date
app.get('/billClient/date/', (req, res) => {
    console.log("Getting bill by date");

    let date = req.query.date;

    if (!date) {
        res.statusMessage = "The parameter 'date' is required.";
        return res.status(406).end();
    }

    Bills
        .getBillsByDate(date)
        .then(results => {
            const filteredResults = results.map(result => {
                const filteredProducts = result.products.map(prod => {
                    return {
                        product: prod.product.name,
                        stock: prod.stock,
                        notes: prod.notes
                    }
                })
                let newClient = ""
                if (result.client != undefined) {
                    newClient = `${result.client.firstName} ${result.client.lastName}`
                }
                return {
                    id: result.id,
                    date: result.date,
                    table: result.table,
                    products: filteredProducts,
                    client: newClient,
                    statuts: status
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            /*res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();*/
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
//Get bill by client
app.get('/billClient/client/', (req, res) => {
    console.log("Getting bill by client");

    let client = req.query.client;

    if (!client) {
        res.statusMessage = "The parameter 'client' is required.";
        return res.status(406).end();
    }
    //console.log(client);
    Bills
        .getBillsByWaiter(client)
        .then(results => {
            console.log(results)
            const filteredResults = results.map(result => {
                const filteredProducts = result.products.map(prod => {
                    return {
                        product: prod.product.name,
                        stock: prod.stock,
                        notes: prod.notes
                    }
                })

                let newWait = ""
                if (result.client != undefined) {
                    newWait = `${result.client.firstName} ${result.client.lastName}`
                }
                return {
                    id: result.id,
                    date: result.date,
                    client: newWait,
                    total: result.total,
                    products: filteredProducts,
                    open: result.open
                }
            });

            return res.status(200).json(filteredResults);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Get bill by id
app.get('/billClient/id', (req, res) => {
    console.log("Getting bill by id");

    let id = req.query.id;

    if (!id) {
        res.statusMessage = "The parameter 'id' is required.";
        return res.status(406).end();
    }

    BillsClient
        .getBillsClientById(id)
        .then(result => {
            console.log(result)

            const filteredProducts = result.products.map(prod => {
                return {
                    product: prod.product.name,
                    quantity: prod.quantity,
                    notes: prod.notes
                }
            })

            let newWait = ""
            if (result.client != undefined) {
                newWait = `${result.client.firstName} ${result.client.lastName}`
            }
            const filteredResult = {
                id: result.id,
                date: result.date,
                client: newWait,
                total: result.total,
                products: filteredProducts,
                open: result.open
            }
            console.log(filteredResult)

            return res.status(200).json(filteredResult);
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Add a new bill
app.post('/billsClient', jsonParser, (req, res) => {
    console.log('adding a bill')
    let date = req.body.date;
    let clientId = req.body.client;
    let table = req.body.table;
    let total = Number(req.body.total);
    let open = req.body.open;
    console.log(date, clientId, total);

    Users
        .getUserById(clientId)
        .then(client => {
            if (!date) {
                console.log("date")
            }
            if (!clientId) {
                console.log("id")
            }
            if (!total) {
                console.log("total")
            }
            if (!date || !clientId || !total) {
                console.log(date, clientId, total);
                res.statusMessage = "All parameters: 'date', 'client'and 'total' must be sent in the body.";
                return res.status(406).end();
            }
            if (!client) {
                //validations
            }
            const newBill = {
                id: uuid.v4(),
                date,
                table,
                total,
                client: client._id,
                open
            }

            BillsClient
                .createBill(newBill)
                .then(result => {
                    if (result.errmsg) {
                        res.statusMessage = "The id of that bill already exists in the database." +
                            result.errmsg;
                        return res.status(409).end();
                    }
                    console.log(result);
                    return res.status(201).json(result);
                })
                .catch(err => {
                    console.log(err)
                    res.statusMessage = err;
                    return res.status(500).end();
                });
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        });
});
//Add a product to a bill
app.post('/billsClient/products', jsonParser, (req, res) => {
    console.log('adding a product to a bill')
    let billId = req.body.billId;
    let productId = req.body.productId;
    let quantity = Number(req.body.quantity);
    let notes = req.body.notes;
    if (!billId || !productId || !quantity) {
        res.statusMessage = "All parameters: 'billId', 'productId' and 'quantity' must be sent in the body.";
        return res.status(406).end();
    }
    Products
        .getProductById(productId)
        .then(product => {
            const newProduct = {
                product: product._id,
                quantity,
                notes
            }
            console.log("____________________________", newProduct)
            Bills
                .addNewProduct(billId, newProduct)
                .then(result => {
                    if (result.errmsg) {
                        res.statusMessage = "The id of that bill already exists in the database." +
                            result.errmsg;
                        return res.status(409).end();
                    }
                    console.log('added bill', result);
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = err;
                    return res.status(500).end();
                });

        })
        .catch(err => {
            res.statusMessage = err;
            return res.status(500).end();
        });
});
//Update the quantity of a bill
app.patch('/billClient/product/:id', jsonParser, (req, res) => {
    console.log("Patching bill's product by id, ");

    let pId = req.params.id
    let productId = req.body.productId;
    let billId = req.body.billId;
    let quantity = req.body.quantity;

    if (!billId) {
        res.statusMessage = "The 'billId' must be sent in the body.";
        return res.status(406).end();
    }

    if (quantity) {
        Bills
            .updateAProductQuantity(billId, productId, quantity)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }

    Bills
        .getAllBills()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Delete a bill's product
app.delete('/billClient/product/:id', jsonParser, (req, res) => {
    console.log('Deleting bill product');

    let id = req.params.id;
    let pId = req.body.pId;

    if (!id) {
        res.statusMessage = "The 'id' must be sent as parameter in the query string.";
        return res.status(406).end();
    }
    if (!pId) {
        res.statusMessage = "The 'pId' must be sent as parameter in the query string.";
        return res.status(406).end();
    }

    console.log(pId)
    Bills
        .deleteBillProductById(id, pId)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Delete a bill
app.delete('/billClient/:id', (req, res) => {
    console.log('Deleting bill');

    let id = req.params.id;

    if (!id) {
        res.statusMessage = "The 'id' must be sent as parameter in the query string.";
        return res.status(406).end();
    }

    BillsClient
        .deleteBillById(id)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});
//Patch a bill
app.patch('/billClient/:id', jsonParser, (req, res) => {
    console.log("Patching bill by id, ");

    let pId = req.params.id
    let id = req.body.id;
    let date = req.body.date;
    let open = req.body.open;
    let table = req.body.table;
    let total = Number(req.body.total);
    let client = req.body.client;
    let products = req.body.products;
    console.log(open);

    if (!id) {
        res.statusMessage = "The 'id' must be sent in the body.";
        return res.status(406).end();
    }

    if (date) {
        BillsClient
            .updateBillDate(id, date)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (open != undefined) {
        BillsClient
            .updateBillOpen(id, open)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (table) {
        BillsClient
            .updateBillTable(id, table)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (total) {
        BillsClient
            .updateBillTotal(id, total)
            .then(result => {
                //return res.status( 200 ).json( result );
            })
            .catch(err => {
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })
    }
    if (client) {
        Users
            .getUserById(clientId)
            .then(client => {
                BillsClient
                    .updateBillWaiter(id, client)
                    .then(result => {
                        //return res.status( 200 ).json( result );
                    })
                    .catch(err => {
                        res.statusMessage = "Something is wrong with the Database. Try again later.";
                        return res.status(500).end();
                    })
            })
            .catch(err => {
                res.statusMessage = err.message;
                return res.status(400).end();
            });
    }
    if (products) {
        console.log(products)
        let filteredProducts = []
        products.map(product => {
            console.log(product.product)
            Products
                .getProductById(product.product)
                .then(res => {
                    console.log("res", res);
                    let newProd = {
                        product: res._id,
                        quantity: product.quantity,
                        notes: products.notes
                    }
                    console.log('pliesa', filteredProducts)
                    BillsClient
                        .addNewProduct(id, newProd)
                        .then(result => {

                        })
                        .catch(err => {
                            console.log(err.message)
                            res.statusMessage = err.message;
                            return res.status(400).end();
                            res.statusMessage = "Something is wrong with the Database. Try again later.";
                            return res.status(500).end();
                        })
                })
                .catch(err => {
                    console.log(err.message)
                    res.statusMessage = err.message;
                    return res.status(400).end();
                    res.statusMessage = "Something is wrong with the Database. Try again later.";
                    return res.status(500).end();
                })
        })
        /*console.log("products",products)
        console.log("Fproducts",filteredProducts)
        BillsClient
            .updateBillProducts(id, filteredProducts)
            .then(result => {
                return res.status( 200 ).json( result );
            })
            .catch(err => {
                console.log(err.message)
                res.statusMessage = err.message;
                return res.status(400).end();
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.status(500).end();
            })*/

    }

    BillsClient
        .getAllBillsClient()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});

//probar algo con bill id y product id
app.get('/billClient/prueba', (req, res) => {
    console.log("Getting bill's product");

    let bill = req.query.bill;
    let product = req.query.product;

    if (!bill) {
        res.statusMessage = "The parameter 'bill' is required.";
        return res.status(406).end();
    }
    if (!product) {
        res.statusMessage = "The parameter 'bill' is required.";
        return res.status(406).end();
    }

    Bills
        .updateUpdate(bill, product)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.status(500).end();
        })
});

////////////////////////////////////////COMMENTS////////////////////////////////////////////////////////////////////////////////////

//Obtener todos los comentarios
app.get('/api/comments', (req, res) => {
    Comments.getAllComments()
        .then(results => {
            return res.status(200).json(results);
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
//Agregar un comentario
app.post('/api/comments', jsonParser, (req, res) => {
    console.log("Adding a new comment")
    let id = req.body.id
    let comment = req.body.comment;
    let date = req.body.date;

    console.log(id, comment, date);

    if (!id) {
        res.statusMessage = "You need an 'id'";
        return res.status(400).end();
    }
    if (!comment) {
        res.statusMessage = "You need the content of the comment";
        return res.status(400).end();
    }
    if (!date) {
        res.statusMessage = "You need a date";
        return res.status(400).end();
    }
    Users
        .getUserById(id)
        .then(result => {
            let newComment = {
                id: uuid.v4(),
                user: result._id,
                comment,
                date
            }
            Comments
                .createComment(newComment)
                .then(results => {
                    return res.status(200).json(results);
                })
                .catch(err => {
                    res.statusMessage = err.message;
                    return res.status(400).end();
                })
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        })



});
//Eliminar un comentario
app.delete('/api/comment', jsonParser, (req, res) => {
    id = req.body.id;
    if (!id) {
        res.statusMessage = "You need an 'id'";
        return res.status(400).end();
    }
    Comments
        .deleteCommentById(id)
        .then(result => {
            return res.status(200).json(results);
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
//Obtener comentarios de una fecha
app.get('/api/comment', jsonParser, (req, res) => {
    date = req.body.date;
    if (!date) {
        res.statusMessage = "You need a date";
        return res.status(400).end();
    }
    Comments
        .getCommentsByDate(date)
        .then(result => {
            return res.status(200).json(results);
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
//Obtener comentarios de un cliente
app.get('/api/comment', jsonParser, (req, res) => {
    user = req.body.user;
    if (!user) {
        res.statusMessage = "You need a user";
        return res.status(400).end();
    }
    Comments
        .getCommentsByUser(user)
        .then(result => {
            return res.status(200).json(results);
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        })
});
//Obtener comentario por id
app.get('/api/comment', jsonParser, (req, res) => {
    id = req.body.id;
    if (!id) {
        res.statusMessage = "You need a id";
        return res.status(400).end();
    }
    Comments
        .getCommentsById(id)
        .then(result => {
            return res.status(200).json(results);
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        })

});

////////////////////////////////////////AUTHENTICATION////////////////////////////////////////////////////////////////////////////////////

//Validar un usuario
app.get('/api/validate-user', (req, res) => {
    const { sessiontoken } = req.headers;

    jsonwebtoken.verify(sessiontoken, SECRET_TOKEN, (err, decoded) => {
        if (err) {
            res.statusMessage = "Session expired!";
            return res.status(400).end();
        }

        return res.status(200).json(decoded);
    });
});
//Iniciar sesión
app.post('/api/users/login', jsonParser, (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status(406).end();
    }

    Users
        .getUserByEmail(email)
        .then(user => {
            console.log(user);
            if (user) {
                //console.log(password, user.level)
                bcrypt.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            let userData = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                level: user.level,
                                id: user.id
                            };
                            jsonwebtoken.sign(userData, SECRET_TOKEN, { expiresIn: '15 days' }, (err, token) => {
                                if (err) {
                                    res.statusMessage = "Something went wrong with generating the token.";
                                    return res.status(400).end();
                                }
                                return res.status(200).json({ token });
                            });
                        }
                        else {
                            throw new Error("Invalid credentials");
                        }
                    })
                    .catch(err => {
                        res.statusMessage = err.message;
                        return res.status(400).end();
                    });
            }
            else {
                throw new Error("User doesn't exists!");
            }
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        });
});

////////////////////////////////////////conexión del server////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log("This server is running on port", PORT);

    new Promise((resolve, reject) => {

        const settings = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        mongoose.connect(DATABASE_URL, settings, (err) => {
            if (err) {
                return reject(err);
            }
            else {
                console.log("Database connected successfully.");
                return resolve();
            }
        })
    })
        .catch(err => {
            console.log(err);
        });
});

//http://localhost:8080

//http://localhost:8080/api/bookmarks

//http://localhost:8080/api/bookmarkById?=123

//http://localhost:8080/api/getbookmarkById/:123
