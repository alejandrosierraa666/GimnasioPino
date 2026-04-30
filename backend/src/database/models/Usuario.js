const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Usuario extends Model { }

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre no puede estar vacío"
            },
            len: {
                args: [2, 255],
                msg: "El nombre debe tener entre 2 y 255 caracteres"
            },
            notNull: {
                msg: "El nombre es obligatorio"
            }
        }

    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El email no puede estar vacío"
            },
            isEmail: {
                msg: "El email debe ser una dirección de correo electrónico válida"
            },
            notNull: {
                msg: "El email es obligatorio"
            }
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "La contraseña no puede estar vacía"
            },
            len: {
                args: [6, 255],
                msg: "La contraseña debe tener entre 6 y 255 caracteres"
            },
            notNull: {
                msg: "La contraseña es obligatoria"
            }
        }
    },
    rol: {
        type: DataTypes.ENUM("admin", "entrenador", "cliente"),
        allowNull: false,
        validate: {
            isIn: {
                args: [["admin", "entrenador", "cliente"]],
                msg: "El rol debe ser 'admin', 'entrenador' o 'cliente'"
            },
            notNull: {
                msg: "El rol es obligatorio"
            }
        }
    }
}), {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: false
}