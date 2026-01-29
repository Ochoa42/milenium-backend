import { Model, DataTypes } from 'sequelize';

class Zona extends Model {
  static associate(models) {
    this.hasMany(models.Cliente, { foreignKey: 'zona_id' });
  }
}

export default (sequelize) => {
  Zona.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    provincia: {
      type: DataTypes.STRING(255),
    },
  }, {
    sequelize,
    modelName: 'Zona',
    tableName: 'Zonas',
    timestamps: true,
  });
  return Zona;
};