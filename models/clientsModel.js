const mongoose = require('mongoose');

const clientsSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    RFC: {
        type: String
    },
    email:{
        type: String
    },
    address: {
        type: String
    },
    alias: {
        type: String
    }
});

const clientsCollection = mongoose.model('clients', clientsSchema);

const Clients = {
    createClient : function (newClient) {
        return clientsCollection
            .create(newClient)
            .then(createdClient => {
                return createdClient;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getAllClients : function () {
        return clientsCollection
            .find()
            .then(allClients => {
                return allClients;
            })
            .catch(err => {
                return err;
            });
    },
    getClientByName : function (value) {
        return clientsCollection
            .find({ firstName: new RegExp(value.firstName, "i"), lastName: new RegExp(value.lastName, "i")})
            .then(namedClients => {
                return namedClients;
            })
            .catch(err => {
                return err;
            });
    },
    getClientByfirstName : function (name) {
        return clientsCollection
            .find({ firstName: new RegExp(name, "i")})
            .then(namedClients => {
                return namedClients;
            })
            .catch(err => {
                return err;
            });
    },
    getClientBylastName : function (name) {
        return clientsCollection
            .find({ lastName: new RegExp(name, "i") })
            .then(namedClients => {
                return namedClients;
            })
            .catch(err => {
                return err;
            });
    },
    getClientByAlias : function (name) {
        return clientsCollection
            .find({ alias: new RegExp(name, "i")})
            .then(namedClients => {
                return namedClients;
            })
            .catch(err => {
                return err;
            });
    },
    deleteClientById : function (id) {
        return clientsCollection
            .deleteOne({ id: id }, function (err) {
                if (err) return handleError(err);
                // deleted at most one tank document
            })
            .catch(err => {
                return err;
            });
    },
    patchClientById : function (id) {
        return clientsCollection
            .updateOne({ id: id }, values)        
            .catch(err => {
                return err;
            });
    },
    updateClientfirstName : function (id, value) {
        return clientsCollection
            .updateOne({ id: id }, { firstName: value })
            .catch(err => {
                return err;
            });
    },
    updateClientlastName : function (id, value) {
        return clientsCollection
            .updateOne({ id: id }, { lastName: value })
            .catch(err => {
                return err;
            });
    },
    updateClientRFC : function (id, value) {
        return clientsCollection
            .updateOne({ id: id }, { RFC: value })
            .catch(err => {
                return err;
            });
    },
    updateClientDireccion : function (id, value) {
        return clientsCollection
            .updateOne({ id: id }, { address: value })
            .catch(err => {
                return err;
            });
    },
    updateClientAlias : function (id, value) {
        return clientsCollection
            .updateOne({ id: id }, { alias: value })
            .catch(err => {
                return err;
            });
    }
}

module.exports = { Clients };