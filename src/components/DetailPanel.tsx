import { Entity, layers, relationships } from '../data/entities';

interface DetailPanelProps {
  entity: Entity | null;
  onClose: () => void;
}

export default function DetailPanel({ entity, onClose }: DetailPanelProps) {
  if (!entity) return null;

  const layer = layers.find(l => l.id === entity.layer);
  const color = layer?.color || '#6b7280';

  const relatedRelationships = relationships.filter(r =>
    r.entities.some(e => e.entityId === entity.id)
  );

  const statusConfig: Record<string, { label: string; bg: string; text: string; desc: string }> = {
    maintained: { label: '✔️ Mantenida', bg: 'bg-blue-50', text: 'text-blue-700', desc: 'Esta entidad se mantiene igual que en el modelo fitosanitario.' },
    modified: { label: '✏️ Modificada', bg: 'bg-amber-50', text: 'text-amber-700', desc: 'Esta entidad fue modificada para adaptarse al módulo zoosanitario.' },
    new: { label: '🆕 Nueva', bg: 'bg-emerald-50', text: 'text-emerald-700', desc: 'Esta entidad es completamente nueva para el módulo zoosanitario.' },
    removed: { label: '❌ Eliminada', bg: 'bg-red-50', text: 'text-red-700', desc: 'Esta entidad fue eliminada ya que no aplica en el módulo zoosanitario.' },
  };

  const status = statusConfig[entity.status];

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="p-4" style={{ backgroundColor: `${color}10` }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs font-medium text-gray-500">{layer?.icon} {entity.layer}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded-lg transition text-gray-500"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{entity.name}</h2>
          <div className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
            {status.label}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Status description */}
        <div className={`p-3 rounded-xl ${status.bg} border border-opacity-20`} style={{ borderColor: color }}>
          <p className="text-sm text-gray-700">{status.desc}</p>
          {entity.description && (
            <p className="text-sm text-gray-600 mt-2 font-medium">{entity.description}</p>
          )}
        </div>

        {/* Attributes */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ backgroundColor: `${color}20`, color }}>A</span>
            Atributos ({entity.attributes.length})
          </h3>
          <div className="space-y-1.5">
            {entity.attributes.map((attr, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-1.5">
                  {attr.isPK && <span className="text-xs">🔑</span>}
                  {attr.isFK && <span className="text-xs">🔗</span>}
                  {!attr.isPK && !attr.isFK && <span className="text-xs text-gray-300">○</span>}
                </div>
                <span className={`text-sm ${attr.isPK ? 'font-bold underline' : attr.isFK ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
                  {attr.name}
                </span>
                <div className="ml-auto flex gap-1">
                  {attr.isPK && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">PK</span>}
                  {attr.isFK && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">FK</span>}
                  {attr.isDerived && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium">Derivado</span>}
                  {attr.isMultivalued && <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded font-medium">Multivaluado</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relationships */}
        {relatedRelationships.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ backgroundColor: `${color}20`, color }}>R</span>
              Relaciones ({relatedRelationships.length})
            </h3>
            <div className="space-y-2">
              {relatedRelationships.map((rel) => (
                <div key={rel.id} className="p-3 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs">◆</span>
                    <span className="font-semibold text-sm text-gray-800">{rel.name}</span>
                    {rel.status === 'new' && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">NUEVA</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    {rel.entities.map((e, i) => (
                      <span key={i} className="flex items-center gap-1">
                        {i > 0 && <span className="text-gray-400 mx-1">↔</span>}
                        <span className="font-medium">{e.entityId}</span>
                        <span className="text-gray-400">({e.cardinality})</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
