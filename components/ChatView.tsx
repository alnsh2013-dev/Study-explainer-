
import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAppContext } from '../hooks/useAppContext';
import { icons } from '../constants';
import { generateContent } from '../services/geminiService';
import type { Message, FileData, Task } from '../types';

const ChatView: React.FC = () => {
  const { t, currentTheme } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Task Management State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState('');

  useEffect(() => {
    const savedChat = localStorage.getItem('chat-history');
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
    const savedTasks = localStorage.getItem('task-list');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('task-list', JSON.stringify(tasks));
  }, [tasks]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: FileData[] = [];
    Array.from(selectedFiles).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        newFiles.push({ base64, mimeType: file.type, name: file.name });
        if (newFiles.length === selectedFiles.length) {
            setFiles(prev => [...prev, ...newFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSend = async () => {
    if (isLoading || (!input.trim() && files.length === 0)) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      image: files.length > 0 ? `data:${files[0].mimeType};base64,${files[0].base64}` : undefined,
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const currentFiles = [...files];
    setFiles([]);

    const { text, sources } = await generateContent(input, currentFiles, useSearch);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: text,
      sources: sources,
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };
  
  const handleSaveChat = () => {
    localStorage.setItem('chat-history', JSON.stringify(messages));
    alert(t.chat.saved);
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
        localStorage.removeItem('chat-history');
        setMessages([]);
        alert(t.chat.cleared);
    }
  };

  const handleCopyChat = () => {
    const content = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n\n');
    navigator.clipboard.writeText(content).then(() => {
      alert(t.chat.copiedChat);
    }).catch(err => {
      console.error('Failed to copy chat: ', err);
    });
  };

  const handleExportChat = () => {
    const content = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat-history.txt';
    link.click();
  };

  const handleScreenshot = () => {
    if (chatContainerRef.current) {
      html2canvas(chatContainerRef.current).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'chat-screenshot.png';
        link.click();
      });
    }
  };

  const handleExportPdf = () => {
    const input = chatContainerRef.current;
    if (!input) return;

    html2canvas(input, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const ratio = canvasWidth / pdfWidth;
        const imgHeight = canvasHeight / ratio;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = -heightLeft;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save('chat-history.pdf');
    });
  };

  // Task handlers
  const handleAddTask = () => {
    if (newTaskInput.trim() === '') return;
    const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskInput.trim(),
        completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskInput('');
  };

  const handleToggleTask = (id: string) => {
      setTasks(prev =>
          prev.map(task =>
              task.id === id ? { ...task, completed: !task.completed } : task
          )
      );
  };

  const handleDeleteTask = (id: string) => {
      setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className={`flex flex-col h-full ${currentTheme.background} ${currentTheme.text} p-4`}>
      <div className={`flex justify-between items-center mb-4 p-2 ${currentTheme.card} rounded-lg shadow-sm flex-wrap gap-2`}>
        <h2 className="text-xl font-bold">{t.sidebar.smartTutor}</h2>
        <div className="flex space-x-2 rtl:space-x-reverse flex-wrap gap-2">
            <button onClick={() => setIsTaskPanelOpen(!isTaskPanelOpen)} className={`p-2 rounded-md hover:bg-opacity-70 ${currentTheme.secondary} flex items-center`}>
              <icons.tasks className="w-5 h-5 me-2"/> {t.chat.myTasks}
            </button>
            <button onClick={handleSaveChat} className={`p-2 rounded-md hover:bg-opacity-70 ${currentTheme.secondary}`}>{t.chat.saveChat}</button>
            <button onClick={handleClearChat} className={`p-2 rounded-md hover:bg-opacity-70 ${currentTheme.secondary}`}>{t.chat.clearChat}</button>
            <button onClick={handleCopyChat} className={`p-2 rounded-md hover:bg-opacity-70 ${currentTheme.secondary}`}>{t.chat.copyChat}</button>
            <button onClick={handleExportChat} className={`p-2 rounded-md hover:bg-opacity-70 ${currentTheme.secondary}`}>{t.chat.exportChat}</button>
            <button onClick={handleScreenshot} className={`p-2 rounded-md hover:bg-opacity-70 ${currentTheme.secondary}`}>{t.chat.screenshot}</button>
            <button onClick={handleExportPdf} className={`p-2 rounded-md hover:bg-opacity-70 ${currentTheme.secondary}`}>{t.chat.exportPdf}</button>
        </div>
      </div>
      
      <div className="flex-grow flex overflow-hidden space-x-4 rtl:space-x-reverse">
        {/* Main Chat Area */}
        <div className="flex-grow flex flex-col h-full">
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto pr-2 space-y-4">
                {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xl p-4 rounded-xl shadow-md ${msg.role === 'user' ? `${currentTheme.accent} text-white` : `${currentTheme.card} ${currentTheme.text}`}`}>
                    {msg.image && <img src={msg.image} alt="uploaded content" className="rounded-lg mb-2 max-h-60" />}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-opacity-20 border-current">
                        <h4 className="font-semibold text-sm mb-2">{t.chat.sources}:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {msg.sources.map((source, index) => (
                            <li key={index} className="text-sm truncate">
                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {source.title}
                                </a>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>
                </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className={`max-w-xl p-4 rounded-xl shadow-md ${currentTheme.card} ${currentTheme.text}`}>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="mt-4">
                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {files.map((file, index) => (
                            <div key={index} className={`flex items-center p-2 rounded-lg ${currentTheme.secondary}`}>
                                <span className="text-sm">{file.name}</span>
                                <button onClick={() => setFiles(f => f.filter((_, i) => i !== index))} className="ml-2 text-red-400">X</button>
                            </div>
                        ))}
                    </div>
                )}
                <div className={`flex items-center p-2 ${currentTheme.card} rounded-lg shadow-md ${currentTheme.border} border`}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" multiple />
                <button onClick={() => fileInputRef.current?.click()} className={`p-2 rounded-full hover:bg-opacity-20 ${currentTheme.textSecondary} hover:bg-gray-500`}>
                    <icons.upload className="w-6 h-6" />
                </button>
                <input
                    type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.chat.placeholder} className={`flex-grow px-4 py-2 bg-transparent focus:outline-none ${currentTheme.text}`} disabled={isLoading}
                />
                <div className="flex items-center space-x-2 mx-2 rtl:space-x-reverse">
                    <label htmlFor="search-toggle" className={`text-sm cursor-pointer whitespace-nowrap ${currentTheme.textSecondary}`}>{t.chat.searchTheWeb}</label>
                    <button id="search-toggle" role="switch" aria-checked={useSearch} onClick={() => setUseSearch(!useSearch)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${useSearch ? currentTheme.accent.replace('bg-','bg-') : 'bg-gray-400'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${useSearch ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'}`}/>
                    </button>
                </div>
                <button onClick={handleSend} disabled={isLoading} className={`p-3 rounded-full transition-colors ${isLoading ? 'bg-gray-500' : `${currentTheme.accent} text-white`}`}>
                    <icons.send className="w-6 h-6" />
                </button>
                </div>
            </div>
        </div>

        {/* Task Panel */}
        <div className={`flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${isTaskPanelOpen ? 'w-72' : 'w-0'}`}>
            <div className={`h-full w-72 ${currentTheme.card} rounded-lg flex flex-col p-4`}>
                <h3 className="text-lg font-bold mb-4 flex-shrink-0">{t.chat.myTasks}</h3>
                <div className="flex-grow overflow-y-auto space-y-2 pr-2">
                    <ul className="space-y-2">
                        {tasks.map(task => (
                            <li key={task.id} className="flex items-center p-2 rounded-md hover:bg-black/10">
                                <input
                                    type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id)}
                                    className="form-checkbox h-5 w-5 rounded text-cyan-500 bg-transparent border-gray-400 focus:ring-cyan-500 cursor-pointer"
                                />
                                <span className={`flex-grow mx-3 ${task.completed ? `line-through ${currentTheme.textSecondary}` : ''}`}>{task.text}</span>
                                <button onClick={() => handleDeleteTask(task.id)} className="text-red-400 hover:text-red-600 font-bold text-xl leading-none">&times;</button>
                            </li>
                        ))}
                    </ul>
                    {tasks.length === 0 && (
                        <div className={`flex items-center justify-center h-full ${currentTheme.textSecondary}`}>No tasks yet.</div>
                    )}
                </div>
                <div className="mt-4 flex space-x-2 rtl:space-x-reverse flex-shrink-0">
                    <input type="text" value={newTaskInput} onChange={(e) => setNewTaskInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                        placeholder={t.chat.taskPlaceholder}
                        className={`flex-grow px-3 py-2 ${currentTheme.background} focus:outline-none ${currentTheme.text} ${currentTheme.border} border rounded-md`}
                    />
                    <button onClick={handleAddTask} className={`px-4 py-2 rounded-md ${currentTheme.accent} text-white font-semibold`}>
                        {t.chat.addTask}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
