const {
    addUser,
    getUserById,
    getUsers,
    removeUser,
    updateUser
} = require('../services/userService');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const newUser = await addUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${userId} not found` });
        }
        const updatedUser = await updateUser(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${userId} not found` });
        }
        await removeUser(userId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUserById,
    deleteUserById
};
