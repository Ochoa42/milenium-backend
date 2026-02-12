import { Model, DataTypes } from 'sequelize';

class ProductoSerie extends Model {
    static associate(models) {
        this.belongsTo(models.Lote, { foreignKey: 'id_lote', as: 'lote' });
        this.belongsTo(models.Ubicacion, { foreignKey: 'id_ubicacion', as: 'ubicacion' });
    }
}

export default (sequelize) => {
    ProductoSerie.init({
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
            allowNull: true, // Can be null if sold/not in a specific location? Design says FK, usually implies existence. Keeping nullable for flexibility if needed (e.g. in transit, or sold)
        },
        numero_serie: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        estado: {
            type: DataTypes.ENUM('Disponible', 'Vendido', 'Garantia'),
            defaultValue: 'Disponible',
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ProductoSerie',
        tableName: 'ProductosSeries',
        timestamps: true,
    });
    return ProductoSerie;
};
