
import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { generateContent } from '../services/geminiService';

declare global {
  interface Window {
    mermaid?: any;
  }
}

const MindmapView: React.FC = () => {
  const { t, currentTheme } = useAppContext();
  const [topic, setTopic] = useState('');
  const [mermaidCode, setMermaidCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const renderMermaid = async () => {
        if (mermaidCode && mermaidRef.current && window.mermaid) {
            try {
                mermaidRef.current.innerHTML = ''; // Clear previous render
                setError('');
                const { svg } = await window.mermaid.render('mermaid-graph', mermaidCode);
                mermaidRef.current.innerHTML = svg;
            } catch (e: any) {
                console.error("Mermaid rendering error:", e);
                setError(`Failed to render mind map. Please check the generated code. Error: ${e.message}`);
                mermaidRef.current.innerHTML = `<pre class="text-red-500">${e.message}</pre>`;
            }
        }
    };
    renderMermaid();
  }, [mermaidCode]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setMermaidCode('');
    setError('');

    const prompt = `Generate a concise mind map in Mermaid markdown syntax for the topic: "${topic}". The code MUST start with 'graph TD'. Use short, clear labels for nodes. Provide only the Mermaid code, without any explanation or markdown fences (\`\`\`). Example for 'Photosynthesis':\ngraph TD\n    A[Photosynthesis] --> B[Inputs];\n    A --> C[Outputs];\n    B --> B1[Sunlight];\n    B --> B2[Water];\n    B --> B3[CO2];\n    C --> C1[Glucose];\n    C --> C2[Oxygen];`;
    const { text } = await generateContent(prompt);
    setMermaidCode(text);
    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col h-full ${currentTheme.background} ${currentTheme.text} p-4`}>
      <div className={`p-4 rounded-lg shadow-sm ${currentTheme.card} mb-4`}>
        <h2 className="text-xl font-bold mb-2">{t.mindmap.title}</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder={t.mindmap.placeholder}
            className={`flex-grow px-4 py-2 ${currentTheme.background} rounded-md focus:outline-none focus:ring-2 ring-cyan-500 ${currentTheme.text}`}
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`px-6 py-2 rounded-md ${currentTheme.accent} text-white font-semibold transition-opacity ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
          >
            {isLoading ? t.mindmap.generating : t.mindmap.generate}
          </button>
        </div>
      </div>
      
      <div className={`flex-grow p-4 rounded-lg overflow-auto ${currentTheme.card} flex items-center justify-center`}>
        {isLoading && <div className="text-lg">{t.mindmap.generating}</div>}
        {error && <div className="text-red-400 p-4 bg-red-900/20 rounded-md">{error}</div>}
        <div ref={mermaidRef} className="w-full h-full [&_svg]:max-w-full [&_svg]:max-h-full"></div>
        {!isLoading && !mermaidCode && !error && (
            <div className={`${currentTheme.textSecondary}`}>
                <p>Your generated mind map will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default MindmapView;