const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const usersFilePath = path.join(__dirname, '../models/userModel.json');

const getUsers = async () => {
  try {
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(usersData);
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const usersData = await getUsers();
    return usersData.find(({ id }) => userId === id);
  } catch (error) {
    throw error;
  }
};

const addUser = async (userData) => {
  try {
    const usersData = await getUsers();
    const newUser = { id: uuidv4(), ...userData };
    const updatedUsersData = [...usersData, newUser];
    await fs.writeFile(usersFilePath, JSON.stringify(updatedUsersData), 'utf8');
    return newUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const usersData = await getUsers();
    const updatedUsersData = usersData.map(user =>
      user.id === userId ? { ...user, ...userData } : user
    );
    await fs.writeFile(usersFilePath, JSON.stringify(updatedUsersData), 'utf8');
    return updatedUsersData.find(({ id }) => id === userId);
  } catch (error) {
    throw error;
  }
};

const removeUser = async (userId) => {
  try {
    const usersData = await getUsers();
    const updatedUsersData = usersData.filter(({ id }) => id !== userId);
    await fs.writeFile(usersFilePath, JSON.stringify(updatedUsersData), 'utf8');
    return updatedUsersData;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser
};
