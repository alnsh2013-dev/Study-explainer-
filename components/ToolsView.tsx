
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { generateContent } from '../services/geminiService';

type Tool = 'subconscious' | 'problemSolver' | 'affirmations';

const ToolCard: React.FC<{
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  isLoading: boolean;
}> = ({ title, description, buttonText, onClick, isLoading }) => {
  const { currentTheme } = useAppContext();
  return (
    <div className={`${currentTheme.card} p-6 rounded-lg shadow-md flex flex-col`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className={`flex-grow mb-4 ${currentTheme.textSecondary}`}>{description}</p>
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`w-full px-4 py-2 rounded-md ${currentTheme.accent} text-white font-semibold transition-opacity ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
      >
        {isLoading ? 'Generating...' : buttonText}
      </button>
    </div>
  );
};

const ToolsView: React.FC = () => {
  const { t, currentTheme } = useAppContext();
  const [loadingTool, setLoadingTool] = useState<Tool | null>(null);
  const [response, setResponse] = useState('');

  const handleGenerate = async (tool: Tool) => {
    setLoadingTool(tool);
    setResponse('');
    let prompt = '';
    switch (tool) {
      case 'subconscious':
        prompt = "Generate 5 practical techniques and 5 powerful affirmations for studying using the subconscious mind. Focus on methods for better retention and recall during sleep and relaxation. Format the response clearly with headings for 'Techniques' and 'Affirmations'. The user is a student in (high school/medical school).";
        break;
      case 'problemSolver':
        prompt = "I'm a student struggling with studying. Provide actionable advice for the following common problems: 1. Procrastination, 2. Lack of Focus, 3. Exam Anxiety. For each problem, give 3 concrete, easy-to-implement solutions. Format as a list.";
        break;
      case 'affirmations':
        prompt = "Generate 10 powerful, positive affirmations for a student aiming for academic success and excellence. The affirmations should boost confidence, focus, and motivation. Phrase them in the first person ('I am...').";
        break;
    }
    const { text } = await generateContent(prompt);
    setResponse(text);
    setLoadingTool(null);
  };

  return (
    <div className={`h-full ${currentTheme.background} ${currentTheme.text} p-4 overflow-y-auto`}>
      <div className={`p-4 rounded-lg shadow-sm ${currentTheme.card} mb-4`}>
        <h2 className="text-xl font-bold">{t.tools.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <ToolCard
          title={t.tools.subconscious.title}
          description={t.tools.subconscious.description}
          buttonText={t.tools.subconscious.button}
          onClick={() => handleGenerate('subconscious')}
          isLoading={loadingTool === 'subconscious'}
        />
        <ToolCard
          title={t.tools.problemSolver.title}
          description={t.tools.problemSolver.description}
          buttonText={t.tools.problemSolver.button}
          onClick={() => handleGenerate('problemSolver')}
          isLoading={loadingTool === 'problemSolver'}
        />
        <ToolCard
          title={t.tools.affirmations.title}
          description={t.tools.affirmations.description}
          buttonText={t.tools.affirmations.button}
          onClick={() => handleGenerate('affirmations')}
          isLoading={loadingTool === 'affirmations'}
        />
      </div>

      {loadingTool && !response && (
        <div className={`mt-4 p-6 rounded-lg shadow-md ${currentTheme.card} text-center`}>
          <p>{t.tools.generating}</p>
        </div>
      )}

      {response && (
        <div className={`mt-4 p-6 rounded-lg shadow-md ${currentTheme.card}`}>
          <h3 className="text-lg font-semibold mb-3">{t.tools.responseTitle}</h3>
          <div className={`prose prose-invert max-w-none ${currentTheme.textSecondary} whitespace-pre-wrap`}>
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsView;