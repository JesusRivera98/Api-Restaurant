const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    cost: {
        type: Number
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    components: [{
        component: {
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
    }
    ]
});

const productsCollection = mongoose.model('products', productsSchema);

const Products = {
    createProduct: function (newProduct) {
        return productsCollection
            .create(newProduct)
            .then(createdProduct => {
                return createdProduct;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    addProductComponent: function (id, newCompoent) {
        return productsCollection
        .findOneAndUpdate({id:id},{$push:{ components: newCompoent } })
        .then(addedComponent => {
            return addedComponent;
        })
        .catch(err => {
            throw new Error(err);
        });
    },
    getAllProducts: function () {
        return productsCollection
            .find()
            .populate('components.component')
            .then(allProducts => {
                return allProducts;
            })
            .catch(err => {
                return err;
            });
    },
    getProductByName: function (name) {
        return productsCollection
            .find({ name: new RegExp(name, "i") })
            .populate('components.component')
            .then(namedProducts => {
                return namedProducts;
            })
            .catch(err => {
                return err;
            });
    },
    getProductById: function (id) {
        return productsCollection
            .findOne({ id : id })
            .then(idProduct => {
                return idProduct;
            })
            .catch(err => {
                return err;
            });
    },
    deleteProductById: function (id) {
        return productsCollection
            .deleteOne({ id: id }, function (err) {
                if (err) return handleError(err);
                // deleted at most one tank document
            })
            .catch(err => {
                return err;
            });
    },
    patchProductById: function (id) {
        return productsCollection
            .updateOne({ id: id }, values)
            .catch(err => {
                return err;
            });
    },
    updateProductName: function (id, value) {
        return productsCollection
            .updateOne({ id: id }, { name: value })
            .catch(err => {
                return err;
            });
    },
    updateProductDescription: function (id, value) {
        return productsCollection
            .updateOne({ id: id }, { description: value })
            .catch(err => {
                return err;
            });
    },
    updateProductUnit: function (id, value) {
        return productsCollection
            .updateOne({ id: id }, { unit: value })
            .catch(err => {
                return err;
            });
    },
    updateProductCost: function (id, value) {
        return productsCollection
            .updateOne({ id: id }, { cost: value })
            .catch(err => {
                return err;
            });
    },
    updateProductPrice: function (id, value) {
        return productsCollection
            .updateOne({ id: id }, { price: value })
            .catch(err => {
                return err;
            });
    },
    updateProductStock: function (id, value) {
        return productsCollection
            .updateOne({ id: id }, { stock: value })
            .catch(err => {
                return err;
            });
    },
    updateProductComponents: function (id, value) {
        return productsCollection
            .updateOne({ id: id }, { components: value })
            .catch(err => {
                return err;
            });
    }
}

module.exports = { Products };