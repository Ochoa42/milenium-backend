import { Model, DataTypes } from 'sequelize';

class StockDistribucion extends Model {
    static associate(models) {
        this.belongsTo(models.Lote, { foreignKey: 'id_lote', as: 'lote' });
        this.belongsTo(models.Ubicacion, { foreignKey: 'id_ubicacion', as: 'ubicacion' });
    }
}

export default (sequelize) => {
    StockDistribucion.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_lote: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_ubicacion: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        cantidad_actual: {
            type: DataTypes.DECIMAL(10, 2), // Using decimal to support non-integer units (e.g., liters, meters)
            defaultValue: 0,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'StockDistribucion',
        tableName: 'StockDistribucion',
        timestamps: true,
    });
    return StockDistribucion;
};
