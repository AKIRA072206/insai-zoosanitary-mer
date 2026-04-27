import { Entity, layers } from '../data/entities';

interface EntityCardProps {
  entity: Entity;
  isSelected: boolean;
  onClick: (entity: Entity) => void;
}

export default function EntityCard({ entity, isSelected, onClick }: EntityCardProps) {
  const layer = layers.find(l => l.id === entity.layer);
  const color = layer?.color || '#6b7280';

  const statusConfig = {
    maintained: { label: 'Mantenida', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: '✔️' },
    modified: { label: 'Modificada', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: '✏️' },
    new: { label: 'Nueva', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: '🆕' },
    removed: { label: 'Eliminada', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: '❌' },
  };

  const status = statusConfig[entity.status];

  return (
    <div
      onClick={() => onClick(entity)}
      className={`relative cursor-pointer rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
        isSelected ? 'ring-2 ring-offset-2 shadow-xl scale-[1.02]' : 'shadow-sm'
      } ${entity.status === 'removed' ? 'opacity-50' : ''}`}
      style={{
        borderColor: isSelected ? color : `${color}40`,
        ...(isSelected ? { ringColor: color } : {}),
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2.5 rounded-t-[10px] flex items-center justify-between"
        style={{ backgroundColor: `${color}15` }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <h4 className="font-bold text-sm text-gray-800">{entity.name}</h4>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.text} ${status.border} border`}>
          {status.icon} {status.label}
        </span>
      </div>

      {/* Attributes */}
      <div className="px-4 py-2 bg-white rounded-b-[10px]">
        <div className="space-y-0.5 max-h-40 overflow-y-auto">
          {entity.attributes.map((attr, i) => (
            <div key={i} className="flex items-center gap-2 text-xs py-0.5">
              {attr.isPK && (
                <span className="text-amber-500 font-bold text-[10px]">🔑</span>
              )}
              {attr.isFK && (
                <span className="text-blue-500 font-bold text-[10px]">🔗</span>
              )}
              {!attr.isPK && !attr.isFK && (
                <span className="text-gray-300 text-[10px]">○</span>
              )}
              <span
                className={`${
                  attr.isPK
                    ? 'font-bold text-gray-800 underline'
                    : attr.isFK
                    ? 'font-medium text-blue-700'
                    : 'text-gray-600'
                } ${attr.isDerived ? 'italic' : ''}`}
              >
                {attr.name}
              </span>
              {attr.isMultivalued && (
                <span className="text-[9px] text-purple-500 font-medium">(multi)</span>
              )}
            </div>
          ))}
        </div>
        {entity.isWeak && (
          <div className="mt-1 pt-1 border-t border-dashed border-gray-200">
            <span className="text-[10px] text-gray-400 italic">Entidad débil</span>
          </div>
        )}
      </div>
    </div>
  );
}
