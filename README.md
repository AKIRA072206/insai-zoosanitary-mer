# INSAI Zoosanitary MER Dashboard

Dashboard React para visualizar el Modelo Entidad-Relación del sistema zoosanitario del Instituto Nacional de Salud Agrícola Integral (INSAI).

## Propósito

Visualizar de manera ordenada las entidades, atributos, relaciones y cardinalidades del sistema de inspecciones de campo zoosanitario. Migración desde modelo fitosanitario.

## Stack

- **Frontend:** React 19 + TypeScript 5.9
- **Build:** Vite 7
- **Styling:** Tailwind CSS 4

## Estructura

```
src/
├── components/
│   ├── VisualDiagram.tsx    # Diagrama visual interactivo (zoom/pan)
│   ├── DiagramView.tsx    # Vista de tarjetas
│   ├── EntityCard.tsx   # Componente de entidad
│   ├── LayerPanel.tsx    # Panel de control de capas
│   └── ChangesSummary.tsx
├── data/
│   └── entities.ts       # Definición de entidades y relaciones
├── utils/
│   └── cn.ts           # Utility for classNames
├── App.tsx
└── main.tsx
```

## Capas del Modelo

| Capa | Descripción | Entidades |
|------|-------------|-----------|
| Seguridad y Usuarios | Control acceso, roles, auditoría | Usuarios, Roles, Instancias, Bitácora |
| Organización | Empleados, oficinas, cargos | Empleados, Oficinas, Cargos, Vehículos |
| Geografía | División político-territorial | Estado, Municipio, Parroquia, Sectores |
| Clientes y Propiedades | Cliente, Solicitud, Propiedad, Finca | Cliente, Propiedad, Finca, Silos |
| Planificación e Inspección | Inspecciones de campo | Planificación, Inspección, Seguimiento |
| Zoosanitaria | **NUEVA** - Animales y salud animal | Animales, Enfermedades, Avales Sanitarios |
| Programas | Plagas y parásitos | Programa, Plaga, Tipo_Plaga |
| Insumos | Inventario veterinario | Insumos, Categorías, Stock |

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Estados de Entidades

- 🆕 **Nueva** - Entidad agregada en modelo zoosanitario
- ✏️ **Modificada** - Entidad adaptada del modelo fitosanitario
- ✔️ **Mantenida** - Entidad sin cambios
- ❌ **Eliminada** - Entidad removida (ya no aplica)