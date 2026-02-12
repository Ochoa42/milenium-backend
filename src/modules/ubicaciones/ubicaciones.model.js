import { Model, DataTypes } from 'sequelize';

class Ubicacion extends Model {
    static associate(models) {
        // Define associations here if needed
    }
}

export default (sequelize) => {
    Ubicacion.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        tipo_area: {
            type: DataTypes.ENUM('Venta', 'Deposito', 'Merma'),
            allowNull: false,
            defaultValue: 'Deposito'
        },
        esta_activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Ubicacion',
        tableName: 'Ubicaciones',
        timestamps: true,
    });
    return Ubicacion;
};
