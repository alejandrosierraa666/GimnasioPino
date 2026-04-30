const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Cliente extends Model { }

Cliente.init({
    qr_code: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    contrasenna: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "La contraseña no puede estar vacía"
            },
            len: {
                args: [6, 10],
                msg: "La contraseña debe tener entre 6 y 10 caracteres"
            },
            notNull: {
                msg: "La contraseña es obligatoria"
            }
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre no puede estar vacío"
            },
            len: {
                args: [2, 20],
                msg: "El nombre debe tener entre 2 y 20 caracteres"
            },
            notNull: {
                msg: "El nombre es obligatorio"
            }
        }

    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Los apellidos no pueden estar vacíos"
            },
            len: {
                args: [4, 20],
                msg: "Los apellidos deben tener entre 4 y 20 caracteres"
            },
            notNull: {
                msg: "Los apellidos son obligatorios"
            }
        }

    },
    email: {
        type: DataTypes.STRING,
        unique: {
            args: true,
            msg: "El email ya está registrado"
        },
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
    rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: {
                args: [[1, 2, 3]],
                msg: "El rol debe ser 1, 2 o 3"
            },
            notNull: {
                msg: "El rol es obligatorio"
            }
        }
    }
}, {
    sequelize,
    modelName: "Cliente",
    tableName: "clientes",
    timestamps: false
});

module.exports = Cliente;