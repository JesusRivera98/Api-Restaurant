const mongoose = require('mongoose');

const billsSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    client: {
        type: String
    },
    table: {
        type: String,
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        notes: {
            type: String
        }
    }],
    total: {
        type: Number,
        required: true
    },
    waiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

});

const billsCollection = mongoose.model('bills', billsSchema);

const Bills = {
    createBill: function (newBill) {
        return billsCollection
            .create(newBill)
            .then(createdBill => {
                return createdBill;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    addNewProduct: function (id, newProduct) {
        return billsCollection
            .findOneAndUpdate({id:id},{$push:{ products: newProduct } })
            .then(addedProduct => {
                return addedProduct;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getAllBills: function () {
        return billsCollection
            .find()
            .populate('waiter',['firstName','lastName'])
            .populate({path:'products.product', model:'products'})
            .then(allBills => {
                return allBills;
            })
            .catch(err => {
                return err;
            });
    },
    getAllBillProducts: function (id) {
        return billsCollection
        .find({id: id}, 'products')
        .populate('product', ['name'])
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
    },
    getBillsByDate: function (value) {
        return billsCollection
            .find({ date: value })            
            .populate('waiter',['firstName','lastName'])
            .populate({path:'products.product', model:'products'})
            .then(datedBills => {
                return datedBills;
            })
            .catch(err => {
                return err;
            });
    },
    getBillsByClient: function (value) {
        return billsCollection
            .find({ client: value })
            .populate('waiter',['firstName','lastName'])
            .populate({path:'products.product', model:'products'})
            .then(clientsBills => {
                return clientsBills;
            })
            .catch(err => {
                return err;
            });
    },
    getBillsByWaiter: function (value) {
        return billsCollection
            .find({ 'waiter.id': value })
            .populate('waiter',['firstName','lastName', 'id'])            
            .populate({path:'products.product', model:'products'})
            .then(waitersBills => {
                return waitersBills;
            })
            .catch(err => {
                return err;
            });
    },
    deleteBillById: function (id) {
        return billsCollection
            .deleteOne({ id: id }, function (err) {
                if (err) return handleError(err);
                // deleted at most one tank document
            })
            .catch(err => {
                return err;
            });
    },
    deleteBillProductById: function (id, productId) {
        return billsCollection
            .updateOne({ id: id }, {$pull:{products: {'product': productId}}},{milti:true},function (err) {
                if (err) return handleError(err);
                // deleted at most one tank document
            })
            .catch(err => {
                return err;
            });
    },
    patchBillById: function (id) {
        return billsCollection
            .updateOne({ id: id }, values)
            .catch(err => {
                return err;
            });
    },
    updateBillDate: function (id, value) {
        return billsCollection
            .updateOne({ id: id }, { date: value })
            .catch(err => {
                return err;
            });
    },
    updateBillClient: function (id, value) {
        return billsCollection
            .updateOne({ id: id }, { client: value })
            .catch(err => {
                return err;
            });
    },
    updateBillProducts: function (id, value) {
        return billsCollection
            .updateOne({ id: id }, { products: value })
            .catch(err => {
                return err;
            });
    },
    updateBillTotal: function (id, value) {
        return billsCollection
            .updateOne({ id: id }, { total: value })
            .catch(err => {
                return err;
            });
    },
    updateBillTable: function (id, value) {
        return billsCollection
            .updateOne({ id: id }, { table: value })
            .catch(err => {
                return err;
            });
    },
    updateBillWaiter: function (id, value) {
        return billsCollection
            .updateOne({ id: id }, { waiter: value })
            .catch(err => {
                return err;
            });
    },
    updateAProductQuantity: function (idBill, idProduct, value) {      
        return billsCollection
            .updateOne({ id: idBill}, { $set:{"products.$[prod].quantity": value }}, {arrayFilters:[{"prod.product":idProduct}]})
            .catch(err => {
                return err;
            });
    },
    updateUpdate: function(id, idD){
        return billsCollection
        .find({id : id})
        .products
        .find({id : idD})
    }
}

module.exports = { Bills };