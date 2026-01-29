import { Model, DataTypes } from 'sequelize';

class Proveedor extends Model {
  static associate(models) {
    this.belongsTo(models.Zona, { foreignKey: 'zona_id' });
  }
}

export default (sequelize) => {
  Proveedor.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    apellido_paterno: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido_materno: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    empresa: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    zona_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(50),
    },
    direccion: {
      type: DataTypes.TEXT,
    },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Proveedor',
    tableName: 'Proveedores',
    timestamps: true,
  });
  return Proveedor;
};