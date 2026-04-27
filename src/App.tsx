import { useState } from 'react';
import { layers, allEntities } from './data/entities';
import LayerPanel from './components/LayerPanel';
import DiagramView from './components/DiagramView';
import VisualDiagram from './components/VisualDiagram';
import ChangesSummary from './components/ChangesSummary';

type ViewMode = 'cards' | 'diagram';

export default function App() {
  const [activeLayers, setActiveLayers] = useState<string[]>(layers.map(l => l.id));
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [showChanges, setShowChanges] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(l => l !== layerId)
        : [...prev, layerId]
    );
  };

  const stats = {
    total: allEntities.length,
    new: allEntities.filter(e => e.status === 'new').length,
    modified: allEntities.filter(e => e.status === 'modified').length,
    removed: allEntities.filter(e => e.status === 'removed').length,
    maintained: allEntities.filter(e => e.status === 'maintained').length,
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 text-white shadow-lg z-30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg font-bold">
                🐄
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">INSAI - Modelo EER Zoosanitario</h1>
                <p className="text-indigo-200 text-xs">Sistema de Inspección de Campo | Actualización Fitosanitaria → Zoosanitaria</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar entidad o atributo..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-white/15 border border-white/20 rounded-xl text-sm text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition"
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-white/15 border border-white/20 rounded-xl text-sm text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer"
            >
              <option value="all" className="text-gray-800">Todas ({stats.total})</option>
              <option value="new" className="text-gray-800">🆕 Nuevas ({stats.new})</option>
              <option value="modified" className="text-gray-800">✏️ Modificadas ({stats.modified})</option>
              <option value="maintained" className="text-gray-800">✔️ Mantenidas ({stats.maintained})</option>
              <option value="removed" className="text-gray-800">❌ Eliminadas ({stats.removed})</option>
            </select>

            {/* View toggle */}
            <div className="flex bg-white/15 rounded-xl p-0.5 border border-white/20">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${viewMode === 'cards' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-200 hover:text-white'}`}
              >
                📋 Tarjetas
              </button>
              <button
                onClick={() => setViewMode('diagram')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${viewMode === 'diagram' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-200 hover:text-white'}`}
              >
                🗺️ Diagrama
              </button>
            </div>

            {/* Changes button */}
            <button
              onClick={() => setShowChanges(true)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/20 rounded-xl text-sm font-semibold transition flex items-center gap-2"
            >
              📊 Cambios
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="px-4 pb-2 flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">
              <span className="text-indigo-300">Total:</span> <span className="font-bold">{stats.total}</span>
            </span>
            <span className="bg-emerald-500/20 px-2.5 py-1 rounded-lg">
              <span className="text-emerald-300">Nuevas:</span> <span className="font-bold">{stats.new}</span>
            </span>
            <span className="bg-amber-500/20 px-2.5 py-1 rounded-lg">
              <span className="text-amber-300">Modificadas:</span> <span className="font-bold">{stats.modified}</span>
            </span>
            <span className="bg-blue-500/20 px-2.5 py-1 rounded-lg">
              <span className="text-blue-300">Mantenidas:</span> <span className="font-bold">{stats.maintained}</span>
            </span>
            <span className="bg-red-500/20 px-2.5 py-1 rounded-lg">
              <span className="text-red-300">Eliminadas:</span> <span className="font-bold">{stats.removed}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Toggle sidebar button */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg border border-gray-200 rounded-r-xl px-1 py-4 hover:bg-gray-50 transition"
          style={{ left: showSidebar ? '320px' : '0' }}
        >
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${showSidebar ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-80 p-3 overflow-y-auto border-r border-gray-200 bg-white/50">
            <LayerPanel
              activeLayers={activeLayers}
              onToggleLayer={toggleLayer}
              onShowAll={() => setActiveLayers(layers.map(l => l.id))}
              onHideAll={() => setActiveLayers([])}
            />
          </aside>
        )}

        {/* Main view */}
        <main className="flex-1 p-4 overflow-hidden flex flex-col">
          {viewMode === 'cards' ? (
            <DiagramView
              activeLayers={activeLayers}
              statusFilter={statusFilter}
              searchTerm={searchTerm}
            />
          ) : (
            <VisualDiagram activeLayers={activeLayers} />
          )}
        </main>
      </div>

      {/* Changes modal */}
      <ChangesSummary isOpen={showChanges} onClose={() => setShowChanges(false)} />
    </div>
  );
}
