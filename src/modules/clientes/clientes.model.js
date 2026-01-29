import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {
  static associate(models) {
    this.belongsTo(models.Zona, { foreignKey: 'zona_id' });
  }
}

export default (sequelize) => {
  Cliente.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ci: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    zona_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido_paterno: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido_materno: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    correo_electronico: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    },
    direccion: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: true
    },
    puntos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    genero: {
      type: DataTypes.ENUM('M', 'F', 'O'),
      allowNull: true,
      defaultValue: null
    },
    tipo_cliente: {
      type: DataTypes.ENUM('MAY', 'MIN'),
      allowNull: false,
      defaultValue: 'MIN'
    },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'Clientes',
    timestamps: true,
  });
  return Cliente;
};