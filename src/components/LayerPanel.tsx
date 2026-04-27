import { layers } from '../data/entities';

interface LayerPanelProps {
  activeLayers: string[];
  onToggleLayer: (layerId: string) => void;
  onShowAll: () => void;
  onHideAll: () => void;
}

export default function LayerPanel({ activeLayers, onToggleLayer, onShowAll, onHideAll }: LayerPanelProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4 w-80">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">📑 Capas del Modelo</h3>
        <div className="flex gap-1">
          <button
            onClick={onShowAll}
            className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition font-medium"
          >
            Todas
          </button>
          <button
            onClick={onHideAll}
            className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition font-medium"
          >
            Ninguna
          </button>
        </div>
      </div>
      <div className="space-y-1.5">
        {layers.map((layer) => {
          const isActive = activeLayers.includes(layer.id);
          return (
            <button
              key={layer.id}
              onClick={() => onToggleLayer(layer.id)}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 text-left group ${
                isActive
                  ? 'bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-200'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all ${
                  isActive ? 'border-transparent' : 'border-gray-300'
                }`}
                style={{ backgroundColor: isActive ? layer.color : 'transparent' }}
              >
                {isActive && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{layer.icon}</span>
                  <span className={`text-sm font-semibold truncate ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                    {layer.id}
                  </span>
                </div>
                <p className={`text-xs mt-0.5 truncate ${isActive ? 'text-gray-500' : 'text-gray-400'}`}>
                  {layer.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
