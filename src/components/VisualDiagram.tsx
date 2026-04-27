import React, { useMemo, useState, useRef, useEffect } from 'react';
import { allEntities, layers, relationships } from '../data/entities';

interface VisualDiagramProps {
  activeLayers: string[];
}

interface Position {
  x: number;
  y: number;
}

export default function VisualDiagram({ activeLayers }: VisualDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(0.65);
  const [pan, setPan] = useState<Position>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Position>({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState<{ entity: typeof allEntities[0]; pos: Position } | null>(null);

  const filteredEntities = useMemo(
    () => allEntities.filter(e => activeLayers.includes(e.layer) && e.status !== 'removed'),
    [activeLayers]
  );

  const filteredRelationships = useMemo(() => {
    const entityIds = new Set(filteredEntities.map(e => e.id));
    return relationships.filter(r =>
      r.entities.every(e => entityIds.has(e.entityId)) && r.status !== 'removed'
    );
  }, [filteredEntities]);

  // Calculate entity positions organized by layer
  const entityPositions = useMemo(() => {
    const positions: Record<string, Position> = {};
    const layerOrder = layers.filter(l => activeLayers.includes(l.id));

    let globalY = 40;

    layerOrder.forEach((layer) => {
      const layerEntities = filteredEntities.filter(e => e.layer === layer.id);
      if (layerEntities.length === 0) return;

      const cols = Math.min(layerEntities.length, 5);
      const colWidth = 280;
      const rowHeight = 200;
      const startX = 60;

      layerEntities.forEach((entity, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        positions[entity.id] = {
          x: startX + col * colWidth,
          y: globalY + row * rowHeight,
        };
      });

      const rows = Math.ceil(layerEntities.length / cols);
      globalY += rows * rowHeight + 60;
    });

    return positions;
  }, [filteredEntities, activeLayers]);

  const totalWidth = useMemo(() => {
    const xs = Object.values(entityPositions).map(p => p.x);
    return xs.length > 0 ? Math.max(...xs) + 350 : 1400;
  }, [entityPositions]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setZoom(prev => Math.max(0.2, Math.min(2, prev + delta)));
  };

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const handler = (e: WheelEvent) => e.preventDefault();
    svgEl.addEventListener('wheel', handler, { passive: false });
    return () => svgEl.removeEventListener('wheel', handler);
  }, []);

  const getLayerColor = (layerId: string) => {
    return layers.find(l => l.id === layerId)?.color || '#6b7280';
  };

  const getStatusFill = (status: string) => {
    switch (status) {
      case 'new': return '#d1fae5';
      case 'modified': return '#fef3c7';
      case 'removed': return '#fee2e2';
      default: return '#eff6ff';
    }
  };

  const getStatusStroke = (status: string) => {
    switch (status) {
      case 'new': return '#059669';
      case 'modified': return '#d97706';
      case 'removed': return '#dc2626';
      default: return '#3b82f6';
    }
  };

  // Render layer backgrounds
  const layerBackgrounds = useMemo(() => {
    const backgrounds: React.JSX.Element[] = [];
    const layerOrder = layers.filter(l => activeLayers.includes(l.id));

    layerOrder.forEach((layer) => {
      const layerEntities = filteredEntities.filter(e => e.layer === layer.id);
      if (layerEntities.length === 0) return;

      const positions = layerEntities.map(e => entityPositions[e.id]).filter(Boolean);
      if (positions.length === 0) return;

      const minY = Math.min(...positions.map(p => p.y)) - 50;
      const maxY = Math.max(...positions.map(p => p.y)) + 160;
      const height = maxY - minY;

      backgrounds.push(
        <g key={layer.id}>
          <rect
            x={10}
            y={minY}
            width={totalWidth - 20}
            height={height}
            rx={16}
            fill={`${layer.color}08`}
            stroke={`${layer.color}25`}
            strokeWidth={2}
            strokeDasharray="8 4"
          />
          <text
            x={30}
            y={minY + 24}
            fill={layer.color}
            fontSize={14}
            fontWeight="bold"
            fontFamily="system-ui"
          >
            {layer.icon} {layer.id}
          </text>
        </g>
      );
      // next section
    });

    return backgrounds;
  }, [filteredEntities, entityPositions, activeLayers, totalWidth]);

  return (
    <div className="flex-1 relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-1.5">
        <button
          onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition text-gray-700 font-bold"
        >
          +
        </button>
        <span className="text-xs font-mono text-gray-500 w-12 text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom(prev => Math.max(0.2, prev - 0.1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition text-gray-700 font-bold"
        >
          -
        </button>
        <div className="w-px h-5 bg-gray-200" />
        <button
          onClick={() => { setZoom(0.65); setPan({ x: 0, y: 0 }); }}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition text-gray-500 text-xs"
          title="Reset"
        >
          ⟲
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-3">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Leyenda</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 rounded-sm border-2" style={{ backgroundColor: '#eff6ff', borderColor: '#3b82f6' }} />
            <span className="text-[10px] text-gray-600">Mantenida</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 rounded-sm border-2" style={{ backgroundColor: '#fef3c7', borderColor: '#d97706' }} />
            <span className="text-[10px] text-gray-600">Modificada</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 rounded-sm border-2" style={{ backgroundColor: '#d1fae5', borderColor: '#059669' }} />
            <span className="text-[10px] text-gray-600">Nueva</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-gray-400" />
            <span className="text-[10px] text-gray-600">Relación</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className={`${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ minHeight: '600px' }}
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Layer backgrounds */}
          {layerBackgrounds}

          {/* Relationship lines */}
          {filteredRelationships.map(rel => {
            const pos1 = entityPositions[rel.entities[0]?.entityId];
            const pos2 = entityPositions[rel.entities[1]?.entityId];
            if (!pos1 || !pos2) return null;

            const x1 = pos1.x + 110;
            const y1 = pos1.y + 60;
            const x2 = pos2.x + 110;
            const y2 = pos2.y + 60;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;

            return (
              <g key={rel.id}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={rel.status === 'new' ? '#059669' : rel.status === 'modified' ? '#d97706' : '#94a3b8'}
                  strokeWidth={rel.status === 'new' ? 2.5 : 1.5}
                  strokeDasharray={rel.status === 'new' ? '6 3' : 'none'}
                  opacity={0.6}
                />
                {/* Relationship diamond */}
                <g transform={`translate(${mx}, ${my})`}>
                  <polygon
                    points="0,-12 18,0 0,12 -18,0"
                    fill={rel.status === 'new' ? '#d1fae5' : rel.status === 'modified' ? '#fef3c7' : '#f1f5f9'}
                    stroke={rel.status === 'new' ? '#059669' : rel.status === 'modified' ? '#d97706' : '#94a3b8'}
                    strokeWidth={1.5}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={7}
                    fill="#374151"
                    fontFamily="system-ui"
                    fontWeight="500"
                  >
                    {rel.name.length > 8 ? rel.name.slice(0, 7) + '..' : rel.name}
                  </text>
                </g>
                {/* Cardinality labels */}
                <text
                  x={x1 + (mx - x1) * 0.2}
                  y={y1 + (my - y1) * 0.2 - 8}
                  fontSize={10}
                  fill="#6b7280"
                  fontFamily="system-ui"
                  fontWeight="bold"
                >
                  {rel.entities[0]?.cardinality}
                </text>
                <text
                  x={x2 + (mx - x2) * 0.2}
                  y={y2 + (my - y2) * 0.2 - 8}
                  fontSize={10}
                  fill="#6b7280"
                  fontFamily="system-ui"
                  fontWeight="bold"
                >
                  {rel.entities[1]?.cardinality}
                </text>
              </g>
            );
          })}

          {/* Entity rectangles */}
          {filteredEntities.map(entity => {
            const pos = entityPositions[entity.id];
            if (!pos) return null;
            const layerColor = getLayerColor(entity.layer);
            const w = 220;
            const headerH = 30;
            const attrH = Math.min(entity.attributes.length * 16 + 10, 120);
            const totalH = headerH + attrH;

            return (
              <g
                key={entity.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseEnter={() => setTooltip({ entity, pos })}
                onMouseLeave={() => setTooltip(null)}
                className="cursor-pointer"
              >
                {/* Shadow */}
                <rect
                  x={3}
                  y={3}
                  width={w}
                  height={totalH}
                  rx={10}
                  fill="rgba(0,0,0,0.06)"
                />
                {/* Border highlight for status */}
                <rect
                  x={0}
                  y={0}
                  width={w}
                  height={totalH}
                  rx={10}
                  fill="white"
                  stroke={getStatusStroke(entity.status)}
                  strokeWidth={entity.status === 'new' ? 3 : 2}
                />
                {/* Header */}
                <rect
                  x={0}
                  y={0}
                  width={w}
                  height={headerH}
                  rx={10}
                  fill={layerColor}
                />
                <rect
                  x={0}
                  y={14}
                  width={w}
                  height={headerH - 14}
                  fill={layerColor}
                />
                {/* Status badge */}
                <circle
                  cx={w - 14}
                  cy={15}
                  r={6}
                  fill={getStatusFill(entity.status)}
                  stroke={getStatusStroke(entity.status)}
                  strokeWidth={1.5}
                />
                {/* Entity name */}
                <text
                  x={12}
                  y={20}
                  fill="white"
                  fontSize={12}
                  fontWeight="bold"
                  fontFamily="system-ui"
                >
                  {entity.name.length > 24 ? entity.name.slice(0, 22) + '..' : entity.name}
                </text>
                {/* Attributes */}
                {entity.attributes.slice(0, 6).map((attr, i) => (
                  <g key={i}>
                    {attr.isPK && (
                      <text
                        x={10}
                        y={headerH + 16 + i * 16}
                        fill="#f59e0b"
                        fontSize={8}
                        fontFamily="system-ui"
                      >
                        🔑
                      </text>
                    )}
                    <text
                      x={attr.isPK ? 26 : 14}
                      y={headerH + 16 + i * 16}
                      fill={attr.isPK ? '#1f2937' : attr.isFK ? '#2563eb' : '#6b7280'}
                      fontSize={10}
                      fontWeight={attr.isPK ? 'bold' : 'normal'}
                      fontFamily="system-ui"
                      textDecoration={attr.isPK ? 'underline' : 'none'}
                    >
                      {attr.name}
                      {attr.isFK ? ' (FK)' : ''}
                    </text>
                  </g>
                ))}
                {entity.attributes.length > 6 && (
                  <text
                    x={14}
                    y={headerH + 16 + 6 * 16}
                    fill="#9ca3af"
                    fontSize={9}
                    fontFamily="system-ui"
                    fontStyle="italic"
                  >
                    + {entity.attributes.length - 6} más...
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-30 bg-white rounded-xl shadow-xl border border-gray-200 p-3 pointer-events-none max-w-xs"
          style={{
            left: tooltip.pos.x * zoom + pan.x + 240,
            top: tooltip.pos.y * zoom + pan.y,
          }}
        >
          <div className="font-bold text-sm text-gray-800">{tooltip.entity.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{tooltip.entity.layer}</div>
          {tooltip.entity.description && (
            <p className="text-xs text-gray-600 mt-1.5 border-t border-gray-100 pt-1.5">{tooltip.entity.description}</p>
          )}
          <div className="text-[10px] text-gray-400 mt-1">{tooltip.entity.attributes.length} atributos</div>
        </div>
      )}
    </div>
  );
}
