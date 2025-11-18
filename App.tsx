
import React, { useState, Suspense, lazy } from 'react';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import MindmapView from './components/MindmapView';
import ToolsView from './components/ToolsView';
import type { AppView } from './types';

const WhiteboardView = lazy(() => import('./components/WhiteboardView'));
const TableView = lazy(() => import('./components/TableView'));

// We need a separate component for the main layout to access the context
const AppLayout: React.FC = () => {
    const { currentTheme } = useAppContext();
    const [activeView, setActiveView] = useState<AppView>('chat');

    const renderView = () => {
        switch (activeView) {
            case 'chat':
                return <ChatView />;
            case 'mindmap':
                return <MindmapView />;
            case 'whiteboard':
                return (
                    <Suspense fallback={<div className="p-4">Loading Whiteboard...</div>}>
                        <WhiteboardView />
                    </Suspense>
                );
            case 'tables':
                 return (
                    <Suspense fallback={<div className="p-4">Loading Tables...</div>}>
                        <TableView />
                    </Suspense>
                );
            case 'tools':
                return <ToolsView />;
            default:
                return <ChatView />;
        }
    };

    return (
        <div className={`flex h-screen font-sans ${currentTheme.background} overflow-hidden`}>
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1">
                {renderView()}
            </main>
        </div>
    );
}

const App: React.FC = () => {
  return (
    <AppProvider>
        <AppLayout />
    </AppProvider>
  );
};

export default App;