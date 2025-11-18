
import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useAppContext } from '../hooks/useAppContext';

const WhiteboardView: React.FC = () => {
    const { t, currentTheme } = useAppContext();
    const canvasRef = useRef<CanvasDraw>(null);
    const [color, setColor] = useState('#000000');
    const [brushRadius, setBrushRadius] = useState(4);

    const handleClear = () => canvasRef.current?.clear();
    const handleUndo = () => canvasRef.current?.undo();
    const handleSave = () => {
        if (canvasRef.current) {
            const dataUrl = canvasRef.current.getDataURL('image/png', false, '#FFFFFF');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'whiteboard.png';
            link.click();
        }
    };
    
    return (
        <div className={`flex flex-col h-full ${currentTheme.background} ${currentTheme.text} p-4`}>
            <div className={`flex flex-wrap justify-between items-center mb-4 p-3 rounded-lg shadow-sm ${currentTheme.card}`}>
                <h2 className="text-xl font-bold">{t.whiteboard.title}</h2>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="color-picker" className="text-sm">{t.whiteboard.color}:</label>
                        <input id="color-picker" type="color" value={color} onChange={e => setColor(e.target.value)} className="w-8 h-8 rounded" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label htmlFor="brush-radius" className="text-sm">{t.whiteboard.strokeWidth}:</label>
                        <input id="brush-radius" type="range" min="1" max="20" value={brushRadius} onChange={e => setBrushRadius(parseInt(e.target.value, 10))} className="w-24" />
                    </div>
                    <button onClick={handleUndo} className={`px-4 py-2 rounded-md ${currentTheme.secondary} hover:opacity-80`}>{t.whiteboard.undo}</button>
                    <button onClick={handleClear} className={`px-4 py-2 rounded-md ${currentTheme.secondary} hover:opacity-80`}>{t.whiteboard.clear}</button>
                    <button onClick={handleSave} className={`px-4 py-2 rounded-md ${currentTheme.accent} text-white hover:opacity-80`}>{t.whiteboard.save}</button>
                </div>
            </div>

            <div className="flex-grow rounded-lg overflow-hidden shadow-lg">
                <CanvasDraw
                    ref={canvasRef}
                    brushColor={color}
                    brushRadius={brushRadius}
                    lazyRadius={8}
                    canvasWidth="100%"
                    canvasHeight="100%"
                    style={{ width: '100%', height: '100%' }}
                    hideGrid
                />
            </div>
        </div>
    );
};

export default WhiteboardView;
