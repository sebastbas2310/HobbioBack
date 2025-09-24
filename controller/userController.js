const bcrypt = require("bcryptjs");
const { User } = require("../models");

const UserController = {
  getUser: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  addUser: async (req, res) => {
    try {
      const {
        user_name,
        user_status,
        email,
        password,
        things_like,
        phone_number,
      } = req.body;

      if (!password) {
        return res.status(400).json({ error: "La contraseña es obligatoria" });
      }

      const passwordH = await bcrypt.hash(password, 10);

      const UserExists = await User.findOne({ where: { email } });
      if (!UserExists) {
        const newUser = await User.create({
          user_name,
          user_status,
          email,
          password: passwordH,
          things_like,
          phone_number,
        });

        return res.status(201).json(newUser);
      }

      return res.status(400).json({ error: "User already exist" });
    } catch (error) {
      res.status(500).json({ error: error.message, error_2: error });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        User_name,
        User_status,
        email,
        password,
        things_like,
        phone_number,
      } = req.body;

      const foundUser = await User.findByPk(id);
      if (!foundUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (User_name) foundUser.User_name = User_name;
      if (User_status) foundUser.User_status = User_status;
      if (email) foundUser.email = email;
      if (things_like) foundUser.things_like = things_like;
      if (phone_number) foundUser.phone_number = phone_number;

      if (password) {
        foundUser.password = await bcrypt.hash(password, 10);
      }

      await foundUser.save();

      return res.status(200).json({
        message: "Usuario actualizado correctamente",
        User: foundUser,
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  changeUserStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { User_status } = req.body;

      if (!["Activo", "Inactivo"].includes(User_status)) {
        return res.status(400).json({ error: "Estado inválido. Use 'Activo' o 'Inactivo'." });
      }

      const foundUser = await User.findByPk(id);
      if (!foundUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      foundUser.User_status = User_status;
      await foundUser.save();

      res.json({ message: `Estado actualizado a ${User_status}`, User: foundUser });
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const foundUser = await User.findByPk(id);
      if (!foundUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json(foundUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserController;