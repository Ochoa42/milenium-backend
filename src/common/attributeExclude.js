export const PROVEEDOR_EXCLUDED = ['createdAt', 'updatedAt', 'esta_activo', 'zona_id', 'telefono', 'direccion', 'empresa'];

export const EMPLEADO_EXCLUDED = ['createdAt', 'updatedAt', 'esta_activo', 'salario_base', 'telefono', 'direccion', 'cargo', 'fecha_nacimiento', 'fecha_contratacion', 'usuario_id', 'ci'];

export const ZONA_EXCLUDED = ['createdAt', 'updatedAt', 'esta_activo'];

export const PRODUCTO_EXCLUDED = ['createdAt', 'updatedAt', 'esta_activo', 'unidad_medida', 'precio_base_sugerido', 'descripcion'];

export const COMPRA_EXCLUDED = ['createdAt', 'updatedAt', 'esta_activo', 'proveedor_id', 'chofer_id', 'ayudante_id', 'fecha_compra', 'peso_neto_total_kg', 'precio_por_kg', 'costo_total', 'monto_pagado', 'saldo_pendiente', 'estado_pago'];

export const DETALLE_COMPRA_EXCLUDED = ['createdAt', 'updatedAt', 'esta_activo'];

export const DETALLE_DESPACHO_EXCLUDED = ['createdAt', 'updatedAt', 'esta_activo'];

export const EVENTO_FAENADO_EXCLUDED = ['createdAt', 'updatedAt', 'esta_activo'];

export const USUARIO_EXCLUDED = ['createdAt', 'updatedAt', 'esta_activo', 'password_hash', 'password_reset_token', 'password_reset_expires'];

export const ROLE_EXCLUDE = ['createdAt', 'updatedAt', 'descripcion',]
