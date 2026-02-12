import { Model, DataTypes } from 'sequelize';

class KardexMovimiento extends Model {
    static associate(models) {
        this.belongsTo(models.Lote, { foreignKey: 'id_lote', as: 'lote' });
        this.belongsTo(models.Ubicacion, { foreignKey: 'id_ubicacion_origen', as: 'ubicacion_origen' });
        this.belongsTo(models.Ubicacion, { foreignKey: 'id_ubicacion_destino', as: 'ubicacion_destino' });
        this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
    }
}

export default (sequelize) => {
    KardexMovimiento.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_lote: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        tipo_movimiento: {
            type: DataTypes.ENUM('Ingreso', 'Venta', 'Traslado', 'Ajuste', 'Merma'),
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        id_ubicacion_origen: {
            type: DataTypes.UUID,
            allowNull: true, // Null for initial entry
        },
        id_ubicacion_destino: {
            type: DataTypes.UUID,
            allowNull: true, // Null for sale/exit
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: true, // Should exist, but keeping nullable for system ops if needed
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        observacion: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'KardexMovimiento',
        tableName: 'KardexMovimientos',
        timestamps: true,
    });
    return KardexMovimiento;
};
