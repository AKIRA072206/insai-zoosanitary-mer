// Definición de todas las entidades del modelo EER para INSAI Zoosanitario
// Organizadas por capas/módulos

export interface Attribute {
  name: string;
  isPK?: boolean;
  isFK?: boolean;
  isDerived?: boolean;
  isMultivalued?: boolean;
  isOptional?: boolean;
}

export interface Entity {
  id: string;
  name: string;
  attributes: Attribute[];
  isWeak?: boolean;
  layer: string;
  x: number;
  y: number;
  status: 'maintained' | 'modified' | 'new' | 'removed';
  description?: string;
}

export interface Relationship {
  id: string;
  name: string;
  entities: { entityId: string; cardinality: string }[];
  layer: string;
  attributes?: Attribute[];
  status: 'maintained' | 'modified' | 'new' | 'removed';
}

// =============================================
// CAPA 1: SEGURIDAD Y USUARIOS
// =============================================
export const securityEntities: Entity[] = [
  {
    id: 'usuarios',
    name: 'Usuarios',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'Gmail' },
      { name: 'Password' },
      { name: 'Estado' },
      { name: 'Data' },
    ],
    layer: 'Seguridad y Usuarios',
    x: 200,
    y: 100,
    status: 'maintained',
    description: 'Usuarios del sistema INSAI'
  },
  {
    id: 'roles',
    name: 'Roles',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
      { name: 'Permiso' },
      { name: 'Descripcion' },
    ],
    layer: 'Seguridad y Usuarios',
    x: 50,
    y: 100,
    status: 'maintained',
    description: 'Roles de acceso al sistema'
  },
  {
    id: 'instancias',
    name: 'Instancias',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'nombre' },
      { name: 'status' },
      { name: 'db_name' },
    ],
    layer: 'Seguridad y Usuarios',
    x: 50,
    y: 250,
    status: 'maintained',
    description: 'Instancias del sistema multitenencia'
  },
  {
    id: 'usuario_instancia',
    name: 'Usuario_Instancia',
    attributes: [
      { name: 'instancia_id', isFK: true },
      { name: 'usuario_id', isFK: true },
      { name: 'rol_id', isFK: true },
    ],
    layer: 'Seguridad y Usuarios',
    x: 130,
    y: 250,
    status: 'maintained',
    description: 'Relación usuario-instancia con rol'
  },
  {
    id: 'bitacora',
    name: 'Bitácora',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Fecha' },
      { name: 'Accion' },
      { name: 'Tabla' },
      { name: 'Usuario' },
      { name: 'Descripcion' },
      { name: 'usuario_global_id', isFK: true },
      { name: 'created_at' },
    ],
    layer: 'Seguridad y Usuarios',
    x: 300,
    y: 50,
    status: 'maintained',
    description: 'Registro de auditoría del sistema'
  },
  {
    id: 'notificaciones',
    name: 'Notificaciones',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'tipo' },
      { name: 'Mensaje' },
      { name: 'leida' },
      { name: 'created_at' },
    ],
    layer: 'Seguridad y Usuarios',
    x: 400,
    y: 50,
    status: 'maintained',
    description: 'Sistema de notificaciones'
  },
];

// =============================================
// CAPA 2: ORGANIZACIÓN INSTITUCIONAL
// =============================================
export const organizationEntities: Entity[] = [
  {
    id: 'oficinas',
    name: 'Oficinas',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
      { name: 'Estado' },
    ],
    layer: 'Organización',
    x: 350,
    y: 150,
    status: 'maintained',
  },
  {
    id: 'empleados',
    name: 'Empleados',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'cedula' },
      { name: 'nombre' },
      { name: 'apellido' },
      { name: 'telefono' },
      { name: 'email' },
      { name: 'foto_url' },
      { name: 'fechas_ingreso' },
      { name: 'status_laboral' },
      { name: 'Estado' },
      { name: 'observaciones' },
    ],
    layer: 'Organización',
    x: 500,
    y: 200,
    status: 'maintained',
  },
  {
    id: 'cargos',
    name: 'Cargos',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
      { name: 'Nombre' },
    ],
    layer: 'Organización',
    x: 650,
    y: 120,
    status: 'maintained',
  },
  {
    id: 'contrato',
    name: 'Contrato',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
    ],
    layer: 'Organización',
    x: 550,
    y: 80,
    status: 'maintained',
  },
  {
    id: 'departamentos',
    name: 'Departamentos',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'nombre' },
      { name: 'Estado' },
    ],
    layer: 'Organización',
    x: 650,
    y: 250,
    status: 'maintained',
  },
  {
    id: 'profesiones',
    name: 'Profesiones',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
    ],
    layer: 'Organización',
    x: 500,
    y: 300,
    status: 'maintained',
  },
  {
    id: 'vehiculos',
    name: 'Vehículos',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'tipo_vehiculo' },
      { name: 'placa' },
      { name: 'marca' },
      { name: 'modelo' },
      { name: 'color' },
      { name: 'año' },
      { name: 'capacidad_carga' },
    ],
    layer: 'Organización',
    x: 800,
    y: 120,
    status: 'maintained',
  },
];

// =============================================
// CAPA 3: GEOGRAFÍA Y UBICACIÓN
// =============================================
export const geographyEntities: Entity[] = [
  {
    id: 'estado',
    name: 'Estado',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'codigo' },
      { name: 'Nombre' },
      { name: 'area_km2' },
    ],
    layer: 'Geografía',
    x: 80,
    y: 400,
    status: 'maintained',
  },
  {
    id: 'municipio',
    name: 'Municipio',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'codigo' },
      { name: 'Nombre' },
      { name: 'area_km2' },
    ],
    layer: 'Geografía',
    x: 80,
    y: 500,
    status: 'maintained',
  },
  {
    id: 'parroquia',
    name: 'Parroquia',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'codigo' },
      { name: 'Nombre' },
      { name: 'area_km2' },
    ],
    layer: 'Geografía',
    x: 80,
    y: 600,
    status: 'maintained',
  },
  {
    id: 'sectores',
    name: 'Sectores',
    attributes: [
      { name: 'Nombre' },
      { name: 'codigo' },
    ],
    layer: 'Geografía',
    x: 200,
    y: 600,
    status: 'maintained',
  },
];

// =============================================
// CAPA 4: CLIENTES Y PROPIEDADES
// =============================================
export const clientEntities: Entity[] = [
  {
    id: 'cliente',
    name: 'Cliente',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
      { name: 'Apellido' },
      { name: 'Cedula' },
      { name: 'Rif' },
      { name: 'Contacto' },
      { name: 'Estado' },
      { name: 'ubicacion' },
      { name: 'hectareas_totales' },
    ],
    layer: 'Clientes y Propiedades',
    x: 300,
    y: 350,
    status: 'maintained',
  },
  {
    id: 'solicitud',
    name: 'Solicitud',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Fecha_Solicitud' },
      { name: 'Estado' },
      { name: 'status' },
      { name: 'Fecha_resolucion' },
    ],
    layer: 'Clientes y Propiedades',
    x: 200,
    y: 350,
    status: 'maintained',
  },
  {
    id: 'tipo_solicitud',
    name: 'Tipo_Solicitud',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
      { name: 'Descripcion' },
    ],
    layer: 'Clientes y Propiedades',
    x: 200,
    y: 420,
    status: 'maintained',
  },
  {
    id: 'propiedad',
    name: 'Propiedad',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
      { name: 'codigo_insai' },
      { name: 'num_reg_hierro' },
      { name: 'UTM_Norte' },
      { name: 'UTM_Este' },
      { name: 'area_km2' },
    ],
    layer: 'Clientes y Propiedades',
    x: 300,
    y: 470,
    status: 'maintained',
  },
  {
    id: 'tipo_propiedad',
    name: 'Tipo_Propiedad',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'Nombre' },
    ],
    layer: 'Clientes y Propiedades',
    x: 180,
    y: 550,
    status: 'maintained',
  },
  {
    id: 'finca',
    name: 'Finca',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'Registro_Hierro' },
      { name: 'Tipo_Actividad' },
      { name: 'imagen_Hierro' },
      { name: 'Tipo_Silo' },
      { name: 'Recepción_Cereal' },
      { name: 'Censo_Base' },
      { name: 'RGAN' },
    ],
    layer: 'Clientes y Propiedades',
    x: 350,
    y: 560,
    status: 'modified',
    description: 'Modificada: se agregan campos para gestión zoosanitaria (Censo_Base, RGAN)'
  },
  {
    id: 'silos',
    name: 'Silos',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'Capacidad_TM' },
      { name: 'número_Celdas' },
    ],
    layer: 'Clientes y Propiedades',
    x: 250,
    y: 560,
    status: 'maintained',
  },
];

// =============================================
// CAPA 5: PLANIFICACIÓN E INSPECCIÓN
// =============================================
export const inspectionEntities: Entity[] = [
  {
    id: 'planificacion',
    name: 'Planificación',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'actividad' },
      { name: 'prioridad' },
      { name: 'codigo' },
      { name: 'Estado' },
      { name: 'seguimiento' },
      { name: 'ubicacion' },
      { name: 'Descripcion' },
      { name: 'Fecha_Programada' },
      { name: 'asignado_a', isFK: true },
      { name: 'encargado', isFK: true },
    ],
    layer: 'Planificación e Inspección',
    x: 750,
    y: 250,
    status: 'maintained',
  },
  {
    id: 'inspeccion',
    name: 'Inspección',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'ID_Inspeccion' },
      { name: 'N_Control' },
      { name: 'cedula' },
      { name: 'Area' },
      { name: 'Zona' },
      { name: 'Coordenadas_UTM' },
      { name: 'UTM_Norte' },
      { name: 'UTM_Este' },
      { name: 'Fecha' },
      { name: 'fecha_emision' },
      { name: 'Aspectos_Constatados' },
      { name: 'Hora_Inspeccion' },
      { name: 'finalidad' },
      { name: 'codigo' },
      { name: 'Estado' },
    ],
    layer: 'Planificación e Inspección',
    x: 750,
    y: 400,
    status: 'modified',
    description: 'Modificada: se adapta para inspecciones zoosanitarias con campos de finalidad y hallazgos animales'
  },
  {
    id: 'seguimiento_inspecciones',
    name: 'Seguimiento_Inspecciones',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'estado_anterior' },
      { name: 'estado_nuevo' },
      { name: 'observaciones' },
      { name: 'fecha_cambio' },
      { name: 'usuario_id', isFK: true },
    ],
    layer: 'Planificación e Inspección',
    x: 850,
    y: 450,
    status: 'maintained',
  },
  {
    id: 'inspeccion_biologicos',
    name: 'Inspección_Biológicos',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'aval_id', isFK: true },
      { name: 'pruebas_diagnosticas' },
      { name: 'fecha_vacunacion' },
      { name: 'insumo_id', isFK: true },
    ],
    layer: 'Planificación e Inspección',
    x: 600,
    y: 500,
    status: 'modified',
    description: 'Modificada: se refuerza para control zoosanitario con pruebas diagnósticas'
  },
  {
    id: 'acta_silos',
    name: 'Acta_Silos',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'semana_epi' },
      { name: 'fecha_notificacion' },
      { name: 'lugar_ubicacion' },
      { name: 'nro_registro_insai' },
      { name: 'numero_silos' },
      { name: 'cant_afectado' },
      { name: 'cant_importado' },
    ],
    layer: 'Planificación e Inspección',
    x: 700,
    y: 550,
    status: 'maintained',
  },
  {
    id: 'finalidad',
    name: 'Finalidad',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'nombre' },
    ],
    layer: 'Planificación e Inspección',
    x: 850,
    y: 550,
    status: 'maintained',
  },
  {
    id: 'finalidad_catalogo',
    name: 'Finalidad_Catalogo',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'nombre' },
    ],
    layer: 'Planificación e Inspección',
    x: 950,
    y: 500,
    status: 'maintained',
  },
  {
    id: 'finalidades',
    name: 'Finalidades',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'nombre' },
      { name: 'status' },
      { name: 'descripcion' },
      { name: 'cod_sigsa' },
    ],
    layer: 'Planificación e Inspección',
    x: 1000,
    y: 550,
    status: 'maintained',
  },
  {
    id: 'tipo_evento',
    name: 'Tipo_Evento',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
    ],
    layer: 'Planificación e Inspección',
    x: 750,
    y: 650,
    status: 'maintained',
  },
];

// =============================================
// CAPA 6: ZOOSANITARIA (NUEVA)
// =============================================
export const zoosanitaryEntities: Entity[] = [
  {
    id: 'animales',
    name: 'Animales',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'nombre' },
      { name: 'nombre_cientifico' },
      { name: 'dieta' },
      { name: 'peso_promedio_kg' },
      { name: 'longitud_promedio_mt' },
      { name: 'habitat_principal' },
      { name: 'cantidad_sacrificado' },
      { name: 'cantidad_marcados' },
      { name: 'observaciones' },
    ],
    layer: 'Zoosanitaria',
    x: 1100,
    y: 300,
    status: 'new',
    description: 'NUEVA: Entidad central del módulo zoosanitario para registro de especies animales'
  },
  {
    id: 'tipo_animales',
    name: 'Tipo_Animales',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'nombre' },
    ],
    layer: 'Zoosanitaria',
    x: 1250,
    y: 300,
    status: 'new',
    description: 'NUEVA: Clasificación de tipos de animales (bovinos, porcinos, aves, etc.)'
  },
  {
    id: 'enfermedades',
    name: 'Enfermedades',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'nombre' },
      { name: 'detectada' },
      { name: 'cantidad_probados' },
      { name: 'cantidad_positivos' },
    ],
    layer: 'Zoosanitaria',
    x: 1100,
    y: 450,
    status: 'new',
    description: 'NUEVA: Registro de enfermedades detectadas en inspecciones zoosanitarias'
  },
  {
    id: 'tipos_enfermedades',
    name: 'Tipos_Enfermedades',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'nombre' },
    ],
    layer: 'Zoosanitaria',
    x: 1250,
    y: 450,
    status: 'new',
    description: 'NUEVA: Catálogo de tipos de enfermedades animales'
  },
  {
    id: 'epidemiologia_hallazgos',
    name: 'Epidemiología_Hallazgos',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'cantidad_reactores' },
      { name: 'observaciones' },
      { name: 'inspeccion_id', isFK: true },
    ],
    layer: 'Zoosanitaria',
    x: 1000,
    y: 350,
    status: 'new',
    description: 'NUEVA: Hallazgos epidemiológicos durante inspecciones zoosanitarias'
  },
  {
    id: 'inspeccion_hallazgos_bov_buf',
    name: 'Inspección_Hallazgos_Bov_Buf',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'inspeccion_id', isFK: true },
      { name: 't_novillas' },
      { name: 't_novillos' },
      { name: 't_vacas' },
      { name: 't_toros' },
      { name: 'total_bov_buf' },
    ],
    layer: 'Zoosanitaria',
    x: 1000,
    y: 600,
    status: 'new',
    description: 'NUEVA: Hallazgos específicos para bovinos y búfalos'
  },
  {
    id: 'inspeccion_hallazgos_otras',
    name: 'Inspección_Hallazgos_Otras',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'propiedad' },
      { name: 'aval_id', isFK: true },
      { name: 'tipo_animal' },
      { name: 'machos' },
      { name: 'hembras' },
      { name: 'crias' },
      { name: 'total' },
      { name: 'created_at' },
    ],
    layer: 'Zoosanitaria',
    x: 900,
    y: 80,
    status: 'new',
    description: 'NUEVA: Hallazgos para otras especies animales'
  },
  {
    id: 'avales_sanitarios',
    name: 'Avales_Sanitarios',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'certificado_vacunacion_id' },
      { name: 'fecha_emision' },
      { name: 'fecha_vencimiento' },
      { name: 'jefe_osa_id', isFK: true },
      { name: 'medico_responsable_id', isFK: true },
      { name: 'codigo_predio' },
      { name: 'numero_aval' },
      { name: 'observaciones' },
    ],
    layer: 'Zoosanitaria',
    x: 500,
    y: 430,
    status: 'new',
    description: 'NUEVA: Avales sanitarios para movilización animal'
  },
];

// =============================================
// CAPA 7: PROGRAMAS Y CULTIVOS (Fitosanitaria - Se mantiene parcialmente)
// =============================================
export const programEntities: Entity[] = [
  {
    id: 'programa',
    name: 'Programa',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
      { name: 'Descripcion' },
    ],
    layer: 'Programas',
    x: 950,
    y: 200,
    status: 'maintained',
  },
  {
    id: 'tipo_programa',
    name: 'Tipo_Programa',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
    ],
    layer: 'Programas',
    x: 1050,
    y: 200,
    status: 'maintained',
  },
  {
    id: 'plaga',
    name: 'Plaga',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
      { name: 'N_Cientifico' },
      { name: 'Descripcion' },
    ],
    layer: 'Programas',
    x: 1100,
    y: 130,
    status: 'modified',
    description: 'Modificada: ahora incluye parásitos y enfermedades animales además de plagas vegetales'
  },
  {
    id: 'tipo_plaga',
    name: 'Tipo_Plaga',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'Nombre' },
    ],
    layer: 'Programas',
    x: 1200,
    y: 130,
    status: 'modified',
    description: 'Modificada: se amplía para incluir parásitos, vectores, enfermedades zoonóticas'
  },
  {
    id: 'cultivo',
    name: 'Cultivo',
    attributes: [
      { name: 'Nombre' },
      { name: 'Id', isPK: true },
    ],
    layer: 'Programas',
    x: 1200,
    y: 200,
    status: 'removed',
    description: 'ELIMINADA: No aplica en el módulo zoosanitario (era fitosanitaria)'
  },
  {
    id: 'tipo_cultivo',
    name: 'Tipo_Cultivo',
    attributes: [
      { name: 'Nombre' },
      { name: 'id', isPK: true },
    ],
    layer: 'Programas',
    x: 1300,
    y: 200,
    status: 'removed',
    description: 'ELIMINADA: No aplica en el módulo zoosanitario (era fitosanitaria)'
  },
];

// =============================================
// CAPA 8: INSUMOS Y STOCK
// =============================================
export const supplyEntities: Entity[] = [
  {
    id: 'insumos',
    name: 'Insumos',
    attributes: [
      { name: 'Id', isPK: true },
      { name: 'nombre_comercial' },
      { name: 'presentacion' },
      { name: 'tipo_insumo' },
      { name: 'marca' },
      { name: 'ingrediente_activo' },
      { name: 'aplicado' },
    ],
    layer: 'Insumos',
    x: 450,
    y: 600,
    status: 'modified',
    description: 'Modificada: adaptada para incluir vacunas, antiparasitarios y biológicos veterinarios'
  },
  {
    id: 'categorias_insumos',
    name: 'Categorías_Insumos',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'Nombre' },
    ],
    layer: 'Insumos',
    x: 350,
    y: 650,
    status: 'modified',
    description: 'Modificada: nuevas categorías para productos veterinarios'
  },
  {
    id: 'insumos_stock',
    name: 'Insumos_Stock',
    attributes: [
      { name: 'id', isPK: true },
      { name: 'stock_actual' },
      { name: 'stock_minimo' },
      { name: 'ultima_movimiento' },
      { name: 'oficina_id', isFK: true },
      { name: 'insumo_id', isFK: true },
    ],
    layer: 'Insumos',
    x: 450,
    y: 700,
    status: 'maintained',
  },
];

// =============================================
// TODAS LAS RELACIONES
// =============================================
export const relationships: Relationship[] = [
  // Seguridad
  { id: 'r1', name: 'Posee', entities: [{ entityId: 'usuarios', cardinality: 'M' }, { entityId: 'roles', cardinality: 'N' }], layer: 'Seguridad y Usuarios', status: 'maintained' },
  { id: 'r2', name: 'genera', entities: [{ entityId: 'usuarios', cardinality: '1' }, { entityId: 'bitacora', cardinality: 'N' }], layer: 'Seguridad y Usuarios', status: 'maintained' },
  { id: 'r3', name: 'tiene', entities: [{ entityId: 'usuarios', cardinality: '1' }, { entityId: 'notificaciones', cardinality: 'N' }], layer: 'Seguridad y Usuarios', status: 'maintained' },

  // Organización
  { id: 'r4', name: 'Pertenece', entities: [{ entityId: 'empleados', cardinality: 'N' }, { entityId: 'oficinas', cardinality: '1' }], layer: 'Organización', status: 'maintained' },
  { id: 'r5', name: 'tiene', entities: [{ entityId: 'empleados', cardinality: 'N' }, { entityId: 'cargos', cardinality: '1' }], layer: 'Organización', status: 'maintained' },
  { id: 'r6', name: 'tiene', entities: [{ entityId: 'empleados', cardinality: '1' }, { entityId: 'contrato', cardinality: 'N' }], layer: 'Organización', status: 'maintained' },
  { id: 'r7', name: 'Pertenece', entities: [{ entityId: 'empleados', cardinality: 'N' }, { entityId: 'departamentos', cardinality: '1' }], layer: 'Organización', status: 'maintained' },
  { id: 'r8', name: 'Posee', entities: [{ entityId: 'empleados', cardinality: '1' }, { entityId: 'profesiones', cardinality: '1' }], layer: 'Organización', status: 'maintained' },
  { id: 'r9', name: 'asignado', entities: [{ entityId: 'empleados', cardinality: 'N' }, { entityId: 'vehiculos', cardinality: '1' }], layer: 'Organización', status: 'maintained' },

  // Geografía
  { id: 'r10', name: 'Pertenece', entities: [{ entityId: 'municipio', cardinality: 'N' }, { entityId: 'estado', cardinality: '1' }], layer: 'Geografía', status: 'maintained' },
  { id: 'r11', name: 'Pertenece', entities: [{ entityId: 'parroquia', cardinality: 'N' }, { entityId: 'municipio', cardinality: '1' }], layer: 'Geografía', status: 'maintained' },
  { id: 'r12', name: 'Pertenece', entities: [{ entityId: 'sectores', cardinality: 'N' }, { entityId: 'parroquia', cardinality: '1' }], layer: 'Geografía', status: 'maintained' },

  // Clientes
  { id: 'r13', name: 'Realiza', entities: [{ entityId: 'cliente', cardinality: '1' }, { entityId: 'solicitud', cardinality: 'N' }], layer: 'Clientes y Propiedades', status: 'maintained' },
  { id: 'r14', name: 'tiene', entities: [{ entityId: 'solicitud', cardinality: 'N' }, { entityId: 'tipo_solicitud', cardinality: '1' }], layer: 'Clientes y Propiedades', status: 'maintained' },
  { id: 'r15', name: 'Posee', entities: [{ entityId: 'cliente', cardinality: '1' }, { entityId: 'propiedad', cardinality: 'N' }], layer: 'Clientes y Propiedades', status: 'maintained' },

  // Inspección
  { id: 'r16', name: 'crea', entities: [{ entityId: 'empleados', cardinality: '1' }, { entityId: 'planificacion', cardinality: 'N' }], layer: 'Planificación e Inspección', status: 'maintained' },
  { id: 'r17', name: 'se asigna', entities: [{ entityId: 'planificacion', cardinality: '1' }, { entityId: 'inspeccion', cardinality: '1' }], layer: 'Planificación e Inspección', status: 'maintained' },
  { id: 'r18', name: 'Genera', entities: [{ entityId: 'inspeccion', cardinality: '1' }, { entityId: 'inspeccion_biologicos', cardinality: '1' }], layer: 'Planificación e Inspección', status: 'maintained' },
  { id: 'r19', name: 'guarda', entities: [{ entityId: 'inspeccion', cardinality: '1' }, { entityId: 'seguimiento_inspecciones', cardinality: 'N' }], layer: 'Planificación e Inspección', status: 'maintained' },

  // Zoosanitaria
  { id: 'r20', name: 'tiene', entities: [{ entityId: 'animales', cardinality: 'N' }, { entityId: 'tipo_animales', cardinality: '1' }], layer: 'Zoosanitaria', status: 'new' },
  { id: 'r21', name: 'tiene', entities: [{ entityId: 'enfermedades', cardinality: 'N' }, { entityId: 'tipos_enfermedades', cardinality: '1' }], layer: 'Zoosanitaria', status: 'new' },
  { id: 'r22', name: 'tiene', entities: [{ entityId: 'epidemiologia_hallazgos', cardinality: 'N' }, { entityId: 'inspeccion', cardinality: '1' }], layer: 'Zoosanitaria', status: 'new' },
  { id: 'r23', name: 'posee', entities: [{ entityId: 'inspeccion', cardinality: '1' }, { entityId: 'inspeccion_hallazgos_bov_buf', cardinality: 'N' }], layer: 'Zoosanitaria', status: 'new' },
  { id: 'r24', name: 'posee', entities: [{ entityId: 'inspeccion', cardinality: '1' }, { entityId: 'inspeccion_hallazgos_otras', cardinality: 'N' }], layer: 'Zoosanitaria', status: 'new' },
  { id: 'r25', name: 'Genera', entities: [{ entityId: 'inspeccion_biologicos', cardinality: '1' }, { entityId: 'avales_sanitarios', cardinality: '1' }], layer: 'Zoosanitaria', status: 'new' },

  // Programas
  { id: 'r26', name: 'tiene', entities: [{ entityId: 'programa', cardinality: 'N' }, { entityId: 'tipo_programa', cardinality: '1' }], layer: 'Programas', status: 'maintained' },
  { id: 'r27', name: 'Aplica', entities: [{ entityId: 'programa', cardinality: 'N' }, { entityId: 'plaga', cardinality: 'N' }], layer: 'Programas', status: 'modified' },
  { id: 'r28', name: 'tiene', entities: [{ entityId: 'plaga', cardinality: 'N' }, { entityId: 'tipo_plaga', cardinality: '1' }], layer: 'Programas', status: 'maintained' },

  // Insumos
  { id: 'r29', name: 'tiene', entities: [{ entityId: 'insumos', cardinality: 'N' }, { entityId: 'categorias_insumos', cardinality: '1' }], layer: 'Insumos', status: 'maintained' },
  { id: 'r30', name: 'pertenece', entities: [{ entityId: 'insumos_stock', cardinality: 'N' }, { entityId: 'insumos', cardinality: '1' }], layer: 'Insumos', status: 'maintained' },
];

export const allEntities: Entity[] = [
  ...securityEntities,
  ...organizationEntities,
  ...geographyEntities,
  ...clientEntities,
  ...inspectionEntities,
  ...zoosanitaryEntities,
  ...programEntities,
  ...supplyEntities,
];

export const layers = [
  { id: 'Seguridad y Usuarios', color: '#6366f1', icon: '🔐', description: 'Control de acceso, roles, auditoría y notificaciones' },
  { id: 'Organización', color: '#0ea5e9', icon: '🏛️', description: 'Empleados, oficinas, cargos, departamentos y vehículos' },
  { id: 'Geografía', color: '#10b981', icon: '🗺️', description: 'División político-territorial: estados, municipios, parroquias, sectores' },
  { id: 'Clientes y Propiedades', color: '#f59e0b', icon: '🏠', description: 'Clientes, solicitudes, propiedades, fincas y silos' },
  { id: 'Planificación e Inspección', color: '#ef4444', icon: '📋', description: 'Planificación, inspecciones, seguimiento, actas y finalidades' },
  { id: 'Zoosanitaria', color: '#8b5cf6', icon: '🐄', description: 'NUEVA CAPA: Animales, enfermedades, hallazgos, epidemiología y avales sanitarios' },
  { id: 'Programas', color: '#ec4899', icon: '📊', description: 'Programas, tipos, plagas/parásitos (adaptado de fitosanitaria)' },
  { id: 'Insumos', color: '#14b8a6', icon: '💊', description: 'Insumos veterinarios, categorías y control de stock' },
];
