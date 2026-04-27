import { useState, useMemo } from 'react';
import { Entity, allEntities, layers, relationships } from '../data/entities';
import EntityCard from './EntityCard';
import DetailPanel from './DetailPanel';

interface DiagramViewProps {
  activeLayers: string[];
  statusFilter: string;
  searchTerm: string;
}

export default function DiagramView({ activeLayers, statusFilter, searchTerm }: DiagramViewProps) {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const filteredEntities = useMemo(() => {
    return allEntities.filter(e => {
      if (!activeLayers.includes(e.layer)) return false;
      if (statusFilter !== 'all' && e.status !== statusFilter) return false;
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          e.name.toLowerCase().includes(search) ||
          e.attributes.some(a => a.name.toLowerCase().includes(search)) ||
          e.layer.toLowerCase().includes(search)
        );
      }
      return true;
    });
  }, [activeLayers, statusFilter, searchTerm]);

  const filteredRelationships = useMemo(() => {
    const entityIds = new Set(filteredEntities.map(e => e.id));
    return relationships.filter(r =>
      r.entities.every(e => entityIds.has(e.entityId))
    );
  }, [filteredEntities]);

  const groupedByLayer = useMemo(() => {
    const groups: Record<string, Entity[]> = {};
    filteredEntities.forEach(entity => {
      if (!groups[entity.layer]) groups[entity.layer] = [];
      groups[entity.layer].push(entity);
    });
    return groups;
  }, [filteredEntities]);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Relationship summary bar */}
      {filteredRelationships.length > 0 && (
        <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🔗</span>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Relaciones Activas ({filteredRelationships.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filteredRelationships.map(rel => (
              <span
                key={rel.id}
                className={`inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border font-medium ${
                  rel.status === 'new'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : rel.status === 'modified'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}
              >
                {rel.entities.map(e => e.entityId).join(' ↔ ')}
                <span className="text-gray-400">({rel.name})</span>
                {rel.entities.map((e, i) => (
                  <span key={i} className="text-gray-400">
                    {i > 0 ? '' : ''}{e.cardinality}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Layers */}
      {Object.keys(groupedByLayer).length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500 font-medium">No se encontraron entidades</p>
            <p className="text-gray-400 text-sm">Ajusta los filtros o la búsqueda</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {layers
            .filter(l => groupedByLayer[l.id])
            .map(layer => (
              <div key={layer.id} className="relative">
                {/* Layer header */}
                <div
                  className="sticky top-0 z-10 flex items-center gap-3 p-3 rounded-xl mb-3 backdrop-blur-sm"
                  style={{ backgroundColor: `${layer.color}12`, borderLeft: `4px solid ${layer.color}` }}
                >
                  <span className="text-lg">{layer.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">{layer.id}</h3>
                    <p className="text-xs text-gray-500">{layer.description}</p>
                  </div>
                  <span
                    className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
                  >
                    {groupedByLayer[layer.id].length} entidades
                  </span>
                </div>

                {/* Entity cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 pl-4">
                  {groupedByLayer[layer.id].map(entity => (
                    <EntityCard
                      key={entity.id}
                      entity={entity}
                      isSelected={selectedEntity?.id === entity.id}
                      onClick={setSelectedEntity}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Detail panel */}
      {selectedEntity && (
        <DetailPanel
          entity={selectedEntity}
          onClose={() => setSelectedEntity(null)}
        />
      )}
    </div>
  );
}
