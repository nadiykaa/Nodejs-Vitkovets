const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUser,
    createUser,
    updateUserById,
    deleteUserById
} = require('../controllers/userController');

const {
    validateCreateUser,
    validateUpdateUser
} = require('../middelwares/userValidation');

router.get('/', getAllUsers);

router.get('/:id', getUser);

router.post('/', validateCreateUser, createUser);

router.put('/:userId', validateUpdateUser, updateUserById);

router.delete('/:userId', deleteUserById);

module.exports = router;
