
import React, { useState, useRef } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { generateContent } from '../services/geminiService';
import type { ThemeColors } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const RenderMarkdownTable: React.FC<{ markdown: string; theme: ThemeColors }> = ({ markdown, theme }) => {
  if (!markdown.trim()) return null;

  const lines = markdown.trim().split('\n').map(line => line.trim()).filter(Boolean);
  if (lines.length < 2 || !lines[1].includes('---')) {
    // Return as preformatted text if it's not a valid markdown table
    return <pre className="whitespace-pre-wrap p-4 bg-black/10 rounded-md">{markdown}</pre>;
  }

  const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
  const rows = lines.slice(2).map(line => line.split('|').map(cell => cell.trim()).filter(Boolean));

  return (
    <div className={`overflow-x-auto ${theme.card} rounded-lg border ${theme.border}`}>
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className={theme.secondary}>
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${theme.border}`}>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`hover:${theme.secondary} transition-colors`}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 text-sm whitespace-normal break-words">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const TableView: React.FC = () => {
  const { t, currentTheme } = useAppContext();
  const [prompt, setPrompt] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setMarkdown('');

    const fullPrompt = `Generate a markdown table based on this description: "${prompt}". IMPORTANT: Provide only the raw markdown table code, with no surrounding text, explanations, or markdown fences like \`\`\`.`;
    const { text } = await generateContent(fullPrompt);
    setMarkdown(text);
    setIsLoading(false);
  };
  
  const handleSaveTable = () => {
    if (!markdown.trim()) return;
    
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const filename = prompt.trim().toLowerCase().slice(0, 30).replace(/\s+/g, '_') || 'table';
    link.download = `${filename}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    if (markdown) {
      navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleExportPdf = () => {
    const input = tableRef.current;
    if (!input) return;
    
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const ratio = canvasWidth / pdfWidth;
      const imgHeight = canvasHeight / ratio;
      
      let finalHeight = imgHeight;
      let finalWidth = pdfWidth;

      if (imgHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = (canvasWidth / canvasHeight) * pdfHeight;
      }

      pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
      pdf.save('table.pdf');
    });
  };

  return (
    <div className={`flex flex-col h-full ${currentTheme.background} ${currentTheme.text} p-4`}>
      <div className={`p-4 rounded-lg shadow-sm ${currentTheme.card} mb-4 flex-shrink-0`}>
        <h2 className="text-xl font-bold mb-2">{t.tables.title}</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.tables.placeholder}
            className={`flex-grow px-4 py-2 ${currentTheme.background} rounded-md focus:outline-none focus:ring-2 ring-cyan-500 ${currentTheme.text} resize-none`}
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`px-6 py-2 rounded-md ${currentTheme.accent} text-white font-semibold transition-opacity ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
          >
            {isLoading ? t.tables.generating : t.tables.generate}
          </button>
        </div>
      </div>
      
      <div className={`flex-grow p-4 rounded-lg overflow-y-auto ${currentTheme.card}`}>
          {isLoading && <div className="text-lg text-center">{t.tables.generating}</div>}
          
          {markdown && !isLoading && (
              <div>
                  <div className="flex justify-end mb-2 space-x-2 rtl:space-x-reverse">
                      <button onClick={handleSaveTable} className={`px-4 py-2 text-sm rounded-md ${currentTheme.secondary} hover:opacity-80`}>
                          {t.tables.saveTable}
                      </button>
                      <button onClick={handleCopy} className={`px-4 py-2 text-sm rounded-md ${currentTheme.secondary} hover:opacity-80`}>
                          {copied ? t.tables.copied : t.tables.copyMarkdown}
                      </button>
                      <button onClick={handleExportPdf} className={`px-4 py-2 text-sm rounded-md ${currentTheme.secondary} hover:opacity-80`}>
                          {t.tables.exportPdf}
                      </button>
                  </div>
                  <div ref={tableRef}>
                      <RenderMarkdownTable markdown={markdown} theme={currentTheme} />
                  </div>
              </div>
          )}

          {!isLoading && !markdown && (
              <div className={`flex items-center justify-center h-full ${currentTheme.textSecondary}`}>
                  <p>Enter a description above to generate a table.</p>
              </div>
          )}
      </div>
    </div>
  );
};

export default TableView;
