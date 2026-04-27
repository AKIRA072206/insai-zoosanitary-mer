import { allEntities, layers } from '../data/entities';

interface ChangesSummaryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangesSummary({ isOpen, onClose }: ChangesSummaryProps) {
  if (!isOpen) return null;

  const newEntities = allEntities.filter(e => e.status === 'new');
  const modifiedEntities = allEntities.filter(e => e.status === 'modified');
  const removedEntities = allEntities.filter(e => e.status === 'removed');
  const maintainedEntities = allEntities.filter(e => e.status === 'maintained');

  const changes = [
    {
      title: '🆕 Entidades Nuevas (Zoosanitaria)',
      items: newEntities,
      color: 'emerald',
      description: 'Entidades completamente nuevas añadidas para el módulo zoosanitario',
    },
    {
      title: '✏️ Entidades Modificadas',
      items: modifiedEntities,
      color: 'amber',
      description: 'Entidades existentes adaptadas para soportar funcionalidad zoosanitaria',
    },
    {
      title: '❌ Entidades Eliminadas',
      items: removedEntities,
      color: 'red',
      description: 'Entidades que no aplican en el módulo zoosanitario',
    },
    {
      title: '✔️ Entidades Mantenidas',
      items: maintainedEntities,
      color: 'blue',
      description: 'Entidades que se conservan sin cambios del modelo fitosanitario',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">📊 Resumen de Cambios</h2>
              <p className="text-indigo-100 mt-1">Fitosanitaria → Zoosanitaria | INSAI {new Date().getFullYear()}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{newEntities.length}</div>
              <div className="text-xs text-indigo-200">Nuevas</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{modifiedEntities.length}</div>
              <div className="text-xs text-indigo-200">Modificadas</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{removedEntities.length}</div>
              <div className="text-xs text-indigo-200">Eliminadas</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{maintainedEntities.length}</div>
              <div className="text-xs text-indigo-200">Mantenidas</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Key Changes */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-5 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3 text-lg">🐄 Cambios Principales: Fitosanitaria → Zoosanitaria</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">●</span>
                <span><strong>Nueva capa Zoosanitaria:</strong> Se agrega todo el módulo de Animales, Tipo_Animales, Enfermedades, Tipos_Enfermedades, Epidemiología_Hallazgos, Hallazgos bovinos/búfalos y otras especies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">●</span>
                <span><strong>Avales Sanitarios:</strong> Nueva entidad para gestión de certificados de movilización animal y avales de sanidad.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">●</span>
                <span><strong>Inspección adaptada:</strong> La entidad Inspección se modifica para incluir hallazgos de animales, enfermedades y controles zoosanitarios.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">●</span>
                <span><strong>Finca actualizada:</strong> Se agregan campos de Censo_Base y RGAN (Registro Ganadero Autónomo Nacional).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">●</span>
                <span><strong>Insumos veterinarios:</strong> La entidad Insumos se adapta para incluir vacunas, antiparasitarios y biológicos veterinarios.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">●</span>
                <span><strong>Plaga → Parásitos/Enfermedades:</strong> Las entidades Plaga y Tipo_Plaga se amplían para incluir parásitos y vectores animales.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">●</span>
                <span><strong>Cultivo eliminado:</strong> Las entidades Cultivo y Tipo_Cultivo no aplican en el módulo zoosanitario.</span>
              </li>
            </ul>
          </div>

          {changes.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-gray-800 mb-3 text-base">{section.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{section.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {section.items.map((entity) => {
                  const layer = layers.find(l => l.id === entity.layer);
                  return (
                    <div key={entity.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: layer?.color }} />
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-gray-800">{entity.name}</div>
                        <div className="text-xs text-gray-500">{layer?.icon} {entity.layer}</div>
                        {entity.description && (
                          <p className="text-xs text-gray-600 mt-1">{entity.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
