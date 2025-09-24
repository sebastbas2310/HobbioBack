const bcrypt = require("bcryptjs");
const { worker } = require("../models")

const workerController={

   getWorker: async (req, res) => {
    try {
        const Worker = await worker.findAll();
        res.status(200).json(Worker); // <--- Aquí ya mandas la lista directa
        }catch (error) {
        return res.status(500).json({ error: error.message });
        }
    },

    
    addWorker : async (req, res) => {
    try {
        const {
      worker_name,
      worker_rol,
      salary,
      email,
      password,
      phone_number,
      worker_status,
    } = req.body;

        if (!password) {
            return res.status(400).json({ error: "La contraseña es obligatoria" });
        }

        passwordH = await bcrypt.hash(password, 10);

         const workerExists = await worker.findOne({ where: { email } })
         if (!workerExists) {
          const Worker = await worker.create({
            worker_name,
            worker_rol,
            salary,
            email,
            password : passwordH,
            phone_number,
            worker_status,
            });

            return res.status(201).json(Worker);
         }

         return res.status(400).json({error:"user already exist"})


    } catch (error) {
        res.status(500).json({ error: error.message, error_2 : error })
    }
},

  
    updateWorker: async (req, res) => {
      try {
        const { id } = req.params; // ID del trabajador recibido en la URL
        const {
          worker_name,
          worker_rol,
          salary,
          email,
          password,
          phone_number,
          worker_status,
        } = req.body; // Datos recibidos en el cuerpo de la petición

        // Buscar el trabajador por ID
        const Worker = await worker.findByPk(id);
        if (!Worker) {
          return res.status(404).json({ message: "Trabajador no encontrado" });
        }

        // Actualizar los campos si se proporcionan
        if (worker_name) Worker.worker_name = worker_name;
        if (worker_rol) Worker.worker_rol = worker_rol;
        if (salary) Worker.salary = salary;
        if (email) Worker.email = email;
        if (phone_number) Worker.phone_number = phone_number;
        if (worker_status) Worker.worker_status = worker_status;

        // Encriptar la contraseña si se proporciona una nueva
        if (password) {
          Worker.password = await bcrypt.hash(password, 10);
        }

        // Guardar los cambios en la base de datos
        await Worker.save();

        return res.status(200).json({
          message: "Trabajador actualizado correctamente",
          worker: Worker,
        });
      } catch (error) {
        console.error("Error al actualizar trabajador:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    },

  changeWorkerStatus : async (req, res) => {
    try {
        const { id } = req.params; // ID del usuario recibido en la URL
        const { estado } = req.body; // Estado recibido en el cuerpo de la petición

        // Validar que el estado sea "Activo" o "Inactivo"
        if (!["Activo", "Inactivo"].includes(estado)) {
            return res.status(400).json({ error: "Estado inválido. Use 'Activo' o 'Inactivo'." });
        }

        // Buscar el usuario por ID
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "worker no encontrado" });
        }

        // Actualizar el estado del usuario
        usuario.estado = estado;
        await usuario.save();

        res.json({ message: `Estado actualizado a ${estado}`, usuario });
      } catch (error) {
        console.error("Error al cambiar estado:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
  },

  getWorkerById : async (req, res) => {
    try {
        const { id } = req.params;
        const Worker = await worker.findByPk(id);
        if (!Worker) {
            return res.status(404).json({ message: "worker no encontrado" });
        }
        return res.status(200).json(Worker);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

  }
}
module.exports = workerController;