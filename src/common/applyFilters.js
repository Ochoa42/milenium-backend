export const CLIENT_CONFIG = {
  searchableFields: ['nombre', 'apellido_paterno', 'apellido_materno', 'ci'],
  filterableFields: ['tipo_cliente', 'zona_id', 'status'],
  defaultSort: ['nombre', 'ASC']
};

export const COMPRA_CONFIG = {
  searchableFields: [
    '$Proveedor.nombre$',
    '$Chofer.nombre$',
    '$Chofer.apellido_paterno$',
    '$Ayudante.nombre$',
    '$Ayudante.apellido_paterno$',
    // 'estado_pago'
  ],
  filterableFields: [
    'proveedor_id',
    'chofer_id',
    'ayudante_id',
    'estado_pago',
    'fecha_compra'
  ],

  defaultSort: ['fecha_compra', 'DESC']
};

export const ZONA_CONFIG = {
  searchableFields: ['nombre', 'provincia'],
  filterableFields: ['provincia'],
  defaultSort: ['nombre', 'ASC']
}

export const EMPLEADO_CONFIG = {
  searchableFields: ['nombre', 'apellido_paterno', 'apellido_materno', 'ci'],
  filterableFields: ['cargo'],
  defaultSort: ['nombre', 'ASC']
}

export const PROVEEDOR_CONFIG = {
  searchableFields: ['nombre', 'apellido_paterno', 'apellido_materno'],
  filterableFields: ['zona_id'],
  defaultSort: ['nombre', 'ASC']
}

export const DESPACHO_CONFIG = {
  searchableFields: [
    '$Promotor.nombre$',
    '$Promotor.apellido_paterno$',
    '$Promotor.apellido_materno$',
    '$Chofer.nombre$',
    '$Chofer.apellido_paterno$',
    '$Chofer.apellido_materno$',
    '$Zona.nombre$',
    '$Zona.provincia$'
  ],
  filterableFields: ['promotor_id', 'chofer_id', 'zona_destino_id', 'estado'],
  defaultSort: ['fecha_despacho', 'DESC']
}

export const VENTA_CONFIG = {
  searchableFields: [
    '$Cliente.nombre$',
    '$Cliente.apellido_paterno$',
    '$Cliente.apellido_materno$',
  ],
  filterableFields: ['despacho_id', 'cliente_id', 'estado_cobranza'],
  defaultSort: ['fecha_venta', 'DESC']
}

export const PRODUCTO_CONFIG = {
  searchableFields: ['nombre_producto', 'descripcion'],
  filterableFields: ['metodo_cobro'],
  defaultSort: ['nombre_producto', 'ASC']
}

export const EVENTO_FAENADO_CONFIG = {
  searchableFields: ['$responsable.nombre$', '$responsable.apellido_paterno$'],
  filterableFields: ['estado', 'responsable_id'],
  defaultSort: ['fecha_faenado', 'DESC']
}

export const LOTES_EN_FAENADO_CONFIG = {
  searchableFields: [
    '$EventoFaenado.responsable.nombre$',
    '$EventoFaenado.responsable.apellido_paterno$',
    '$EventoFaenado.responsable.apellido_materno$'
  ],
  filterableFields: ['$EventoFaenado.estado'],
  defaultSort: ['createdAt', 'DESC']
}