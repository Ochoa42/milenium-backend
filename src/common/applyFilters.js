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
  searchableFields: ['nombre', 'apellido_paterno', 'apellido_materno', 'razon_social', 'nit_ci', 'contacto'],
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
  searchableFields: ['nombre_comercial', 'codigo_barras', '$categoria.nombre$', '$marca.nombre$'],
  filterableFields: ['id_categoria', 'id_marca', 'estado', 'maneja_vencimiento'],
  defaultSort: ['nombre_comercial', 'ASC']
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

export const MARCA_CONFIG = {
  searchableFields: ['nombre', 'descripcion'],
  filterableFields: ['esta_activo'],
  defaultSort: ['nombre', 'ASC']
}

export const CATEGORIA_CONFIG = {
  searchableFields: ['nombre', 'descripcion'],
  filterableFields: ['esta_activo'],
  defaultSort: ['nombre', 'ASC']
}


export const UBICACIONES_CONFIG = {
  searchableFields: ['nombre', 'descripcion'],
  filterableFields: ['esta_activo', 'tipo_area'],
  defaultSort: ['nombre', 'ASC']
}

export const UNIDAD_MEDIDA_CONFIG = {
  searchableFields: ['nombre', 'abreviatura'],
  filterableFields: ['esta_activo'],
  defaultSort: ['nombre', 'ASC']
}

export const LOTE_CONFIG = {
  searchableFields: ['codigo_lote', '$producto.nombre_comercial$', '$proveedor.nombre$'],
  filterableFields: ['id_producto', 'id_proveedor'],
  defaultSort: ['fecha_ingreso', 'DESC']
}

export const STOCK_DISTRIBUCION_CONFIG = {
  searchableFields: ['$lote.codigo_lote$', '$lote.producto.nombre_comercial$', '$ubicacion.nombre$'],
  filterableFields: ['id_lote', 'id_ubicacion'],
  defaultSort: ['createdAt', 'DESC']
}

export const PRODUCTOS_SERIES_CONFIG = {
  searchableFields: ['numero_serie', '$lote.producto.nombre_comercial$'],
  filterableFields: ['id_lote', 'id_ubicacion', 'estado'],
  defaultSort: ['numero_serie', 'ASC']
}

export const PRESENTACION_CONFIG = {
  searchableFields: ['nombre', '$producto.nombre_comercial$'],
  filterableFields: ['id_producto', 'esta_activo'],
  defaultSort: ['nombre', 'ASC']
}

export const KARDEX_MOVIMIENTO_CONFIG = {
  searchableFields: ['$lote.codigo_lote$', '$lote.producto.nombre_comercial$'],
  filterableFields: ['id_lote', 'tipo_movimiento', 'id_ubicacion_origen', 'id_ubicacion_destino', 'id_usuario'],
  defaultSort: ['fecha', 'DESC']
}
