const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

const usersCollection = mongoose.model('users', usersSchema);

const Users = {
    createUser : function (newUser) {
        return usersCollection
            .create(newUser)
            .then(createdUser => {
                return createdUser;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getAllUsers : function () {
        return usersCollection
            .find()
            .then(allUsers => {
                return allUsers;
            })
            .catch(err => {
                return err;
            });
    },
    getUserByName : function (value) {
        return usersCollection
            .find({ firstName: new RegExp(value.firstName, "i"), lastName: new RegExp(value.lastName, "i") })
            .then(namedUsers => {
                return namedUsers;
            })
            .catch(err => {
                return err;
            });
    },
    getUserById : function (value) {
        return usersCollection
            .findOne({ id: value })
            .then(idUser => {
                return idUser;
            })
            .catch(err => {
                throw new Error( err.message );
            });
    },
    getUserByfirstName : function (value) {
        return usersCollection
            .find({ firstName: value })
            .then(namedUsers => {
                return namedUsers;
            })
            .catch(err => {
                return err;
            });
    },
    getUserBylastName : function (value) {
        return usersCollection
            .find({ lastName: value })
            .then(namedUsers => {
                return namedUsers;
            })
            .catch(err => {
                return err;
            });
    },
    deleteUserById : function (id) {
        return usersCollection
            .deleteOne({ id: id }, function (err) {
                if (err) return handleError(err);
                // deleted at most one tank document
            })
            .catch(err => {
                return err;
            });
    },
    patchUserById : function (id) {
        return usersCollection
            .updateOne({ id: id }, values)        
            .catch(err => {
                return err;
            });
    },
    updateUserfirstName : function (id, value) {
        return usersCollection
            .updateOne({ id: id }, { firstName: value })
            .catch(err => {
                return err;
            });
    },
    updateUserlastName : function (id, value) {
        return usersCollection
            .updateOne({ id: id }, { lastName: value })
            .catch(err => {
                return err;
            });
    },
    updateUserLevel : function (id, value) {
        return usersCollection
            .updateOne({ id: id }, { level: value })
            .catch(err => {
                return err;
            });
    },
    updateUserEmail : function (id, value) {
        return usersCollection
            .updateOne({ id: id }, { email: value })
            .catch(err => {
                return err;
            });
    },
    updateUserPassword : function (id, value) {
        return usersCollection
            .updateOne({ id: id }, { password: value })
            .catch(err => {
                return err;
            });
    }
}

module.exports = { Users };