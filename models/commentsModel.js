const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const commentsCollection = mongoose.model('comments', commentsSchema);

const Comments = {
    createComment: function (newComment) {
        return commentsCollection
            .create(newComment)
            .then(createdComment => {
                return createdComment;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getAllComments: function () {
        return commentsCollection
            .find()
            .populate('user')
            .then(allComments => {
                return allComments;
            })
            .catch(err => {
                return err;
            });
    },
    getCommentsByUser: function (value) {
        return commentsCollection
            .find({ 'user.id': value })
            .populate('user',['firstName','lastName', 'id'])
            .then(usersComments => {
                return usersComments;
            })
            .catch(err => {
                return err;
            });
    },
    getCommentsByDate: function (value) {
        return commentsCollection
            .find({ date: value })            
            .populate('user',['firstName','lastName'])
            .then(datedComments => {
                return datedComments;
            })
            .catch(err => {
                return err;
            });
    },
    getCommentById: function (value) {
        return commentsCollection
            .findOne({ id: value })            
            .populate('user',['firstName','lastName'])
            .then(idComments => {
                return idComments;
            })
            .catch(err => {
                return err;
            });
    },
    deleteCommentById: function (id) {
        return commentsCollection
            .deleteOne({ id: id }, function (err) {
                if (err) return handleError(err);
                // deleted at most one tank document
            })
            .catch(err => {
                return err;
            });
    }
}

module.exports = { Comments };