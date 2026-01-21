'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateProjectModal } from '@/components/modals/create-project-modal';
import { UploadDocumentModal } from '@/components/modals/upload-document-modal';

export default function DashboardPage() {
    const router = useRouter();
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [message, setMessage] = useState('');

    // Mock data - replace with actual API data
    const currentProject = {
        id: '1',
        name: 'Quarterly_Report_Q4.pdf',
        status: 'active'
    };

    const projects = [
        { id: '1', name: 'Quarterly Report Q4', icon: 'description', active: true },
        { id: '2', name: 'Legal Draft v2', icon: 'draft', active: false },
        { id: '3', name: 'Financial Summary', icon: 'payments', active: false },
    ];

    const chatMessages = [
        {
            id: '1',
            type: 'ai',
            content: "I've analyzed the financial trends in Section 2. There's a notable **15% increase** in operational costs compared to Q3.",
            timestamp: '10:24 AM',
            hasChart: true
        },
        {
            id: '2',
            type: 'user',
            content: 'Can you compare these expenses with our initial budget targets on page 14?',
            timestamp: '10:25 AM'
        }
    ];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // TODO: Implement actual message sending logic
        console.log('Sending message:', message);
        setMessage('');
    };

    return (
        <>
            <div className="flex h-screen w-full overflow-hidden gradient-bg">
                {/* Decorative Orbs */}
                <div className="glow-orb w-[400px] h-[400px] bg-blue-200/40 top-[-100px] left-[-100px]"></div>
                <div className="glow-orb w-[500px] h-[500px] bg-purple-200/30 bottom-[-100px] right-[-100px]"></div>
                <div className="glow-orb w-[300px] h-[300px] bg-indigo-100/50 top-[20%] right-[10%]"></div>

                {/* Sidebar */}
                <aside className="w-72 sidebar-glass rounded-3xl m-4 mr-0 flex flex-col overflow-hidden">
                    <div className="p-6 flex items-center gap-3">
                        <div className="size-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <span className="material-symbols-outlined">auto_awesome</span>
                        </div>
                        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">LivingDocs</h2>
                    </div>

                    <div className="px-4 space-y-3 mb-6">
                        <button
                            onClick={() => setShowCreateProject(true)}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-white/60 hover:bg-white/80 border border-white/60 text-indigo-600 font-semibold rounded-2xl shadow-sm transition-all hover:scale-[1.02]"
                        >
                            <span className="material-symbols-outlined">add_circle</span>
                            New Project
                        </button>
                        <button
                            onClick={() => setShowUpload(true)}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-white/30 hover:bg-white/50 border border-white/40 text-slate-600 font-semibold rounded-2xl transition-all"
                        >
                            <span className="material-symbols-outlined">upload_file</span>
                            Upload
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-8">
                        <div>
                            <p className="px-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Projects</p>
                            <div className="space-y-1">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all ${project.active
                                                ? 'bg-white/80 border border-white/80 text-indigo-600 shadow-sm'
                                                : 'hover:bg-white/40 text-slate-500'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">{project.icon}</span>
                                        <span className={`text-sm truncate ${project.active ? 'font-semibold' : 'font-medium'}`}>
                                            {project.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="px-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Workspaces</p>
                            <div className="space-y-3 px-2">
                                <div className="flex items-center gap-3 text-sm text-slate-500 py-1 hover:text-indigo-600 cursor-pointer transition-colors">
                                    <span className="size-2 rounded-full bg-green-400"></span>
                                    Production
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-500 py-1 hover:text-indigo-600 cursor-pointer transition-colors">
                                    <span className="size-2 rounded-full bg-amber-400"></span>
                                    Drafts
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 mt-auto">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/30 border border-white/40 cursor-pointer hover:bg-white/40 transition-colors">
                            <div className="size-10 rounded-full bg-indigo-100 overflow-hidden border border-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-indigo-600">person</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-slate-900 truncate">Alex Chen</p>
                                <p className="text-[10px] text-slate-500 truncate">Pro Account</p>
                            </div>
                            <button className="text-slate-400 hover:text-indigo-600" onClick={() => router.push('/profile')}>
                                <span className="material-symbols-outlined text-lg">settings</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col gap-4 overflow-hidden p-4">
                    {/* Header */}
                    <header className="h-16 flex items-center justify-between px-4">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-400">Workspace</span>
                            <span className="text-slate-300">/</span>
                            <span className="text-slate-900 font-bold">{currentProject.name}</span>
                            <span className="ml-2 px-2.5 py-1 bg-green-500/10 text-green-600 text-[10px] font-bold rounded-full border border-green-500/20">
                                Active Analysis
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative group w-80">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <input
                                    className="w-full bg-white/40 border-white/60 backdrop-blur-md rounded-2xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400"
                                    placeholder="Search insights..."
                                    type="text"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                    <span className="material-symbols-outlined">notifications</span>
                                </button>
                                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                    <span className="material-symbols-outlined">help</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 flex gap-4 overflow-hidden">
                        {/* Chat Section */}
                        <section className="flex-1 flex flex-col glass-panel rounded-[2.5rem] overflow-hidden">
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
                                {chatMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex items-start gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`size-10 rounded-xl flex items-center justify-center border shadow-sm ${msg.type === 'ai'
                                                ? 'bg-indigo-50 border-indigo-100'
                                                : 'bg-white border-slate-100'
                                            }`}>
                                            <span className={`material-symbols-outlined ${msg.type === 'ai' ? 'text-indigo-500' : 'text-slate-400'
                                                }`}>
                                                {msg.type === 'ai' ? 'smart_toy' : 'person'}
                                            </span>
                                        </div>

                                        <div className={`space-y-4 max-w-[85%] ${msg.type === 'user' ? 'flex flex-col items-end' : ''}`}>
                                            <div className={`rounded-3xl p-5 shadow-sm ${msg.type === 'ai'
                                                    ? 'bg-white/80 border border-white rounded-tl-none'
                                                    : 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100'
                                                }`}>
                                                <p className={`text-[15px] leading-relaxed ${msg.type === 'ai' ? 'text-slate-700' : 'font-medium'
                                                    }`}>
                                                    {msg.content}
                                                </p>

                                                {msg.hasChart && msg.type === 'ai' && (
                                                    <div className="mt-4 p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
                                                        <div className="flex justify-between items-end mb-4">
                                                            <div>
                                                                <p className="text-[10px] uppercase font-bold text-slate-400">Expense Trend</p>
                                                                <p className="text-xl font-bold text-slate-800">
                                                                    $1.2M <span className="text-xs text-indigo-500 font-normal">+12%</span>
                                                                </p>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                {[6, 10, 8, 12, 14].map((height, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`w-1.5 rounded-full ${i === 4 ? 'bg-indigo-500' : 'bg-indigo-200'
                                                                            }`}
                                                                        style={{ height: `${height * 4}px` }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`text-[10px] font-bold text-slate-400 uppercase tracking-tighter ${msg.type === 'user' ? 'mr-1' : 'ml-1'
                                                }`}>
                                                {msg.type === 'ai' ? 'LivingDocs AI' : 'You'} • {msg.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {/* Typing Indicator */}
                                <div className="flex items-start gap-4 opacity-60">
                                    <div className="size-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-indigo-500 animate-pulse">auto_awesome</span>
                                    </div>
                                    <div className="space-y-2 py-2">
                                        <div className="flex gap-1.5">
                                            {[0, 0.2, 0.4].map((delay, i) => (
                                                <div
                                                    key={i}
                                                    className="size-1.5 rounded-full bg-indigo-400 animate-bounce"
                                                    style={{ animationDelay: `${delay}s` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-6">
                                <form onSubmit={handleSendMessage} className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] p-2 shadow-sm">
                                    <div className="flex items-center gap-2 px-3">
                                        <button type="button" className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                                            <span className="material-symbols-outlined">attach_file</span>
                                        </button>
                                        <input
                                            className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] py-3 placeholder:text-slate-400 outline-none"
                                            placeholder="Type a message..."
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-indigo-600 size-11 rounded-2xl text-white shadow-lg shadow-indigo-100 hover:scale-105 transition-transform flex items-center justify-center"
                                        >
                                            <span className="material-symbols-outlined !text-[20px]">send</span>
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-4 flex gap-6 justify-center">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <span className="size-1 bg-indigo-400 rounded-full"></span>
                                        GPT-4o Enhanced
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <span className="size-1 bg-indigo-400 rounded-full"></span>
                                        42k Tokens
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Document Viewer Section */}
                        <section className="w-[45%] flex flex-col bg-white/20 backdrop-blur-3xl border border-white/50 rounded-[2.5rem] relative overflow-hidden group">
                            {/* Toolbar */}
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 bg-white/60 backdrop-blur-xl border border-white rounded-full px-5 py-2 flex items-center gap-5 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="flex items-center gap-1">
                                    <button className="size-8 flex items-center justify-center hover:bg-white rounded-full transition-colors">
                                        <span className="material-symbols-outlined text-lg">remove</span>
                                    </button>
                                    <span className="text-xs font-bold w-10 text-center text-slate-700">85%</span>
                                    <button className="size-8 flex items-center justify-center hover:bg-white rounded-full transition-colors">
                                        <span className="material-symbols-outlined text-lg">add</span>
                                    </button>
                                </div>
                                <div className="w-px h-4 bg-slate-200"></div>
                                <div className="flex items-center gap-1">
                                    <button className="size-8 flex items-center justify-center hover:bg-white rounded-full transition-colors">
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button className="size-8 flex items-center justify-center hover:bg-white rounded-full transition-colors">
                                        <span className="material-symbols-outlined text-lg">bookmark</span>
                                    </button>
                                    <button className="size-8 flex items-center justify-center hover:bg-white rounded-full transition-colors">
                                        <span className="material-symbols-outlined text-lg">download</span>
                                    </button>
                                </div>
                            </div>

                            {/* Document Pages */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-slate-50/20">
                                <div className="max-w-2xl mx-auto space-y-10">
                                    {/* Page 1 */}
                                    <div className="aspect-[1/1.41] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden p-16">
                                        <div className="absolute top-0 right-0 p-10 opacity-5">
                                            <span className="material-symbols-outlined text-8xl text-indigo-900">analytics</span>
                                        </div>
                                        <div className="h-12 w-2/3 bg-slate-100 rounded-xl mb-10"></div>
                                        <div className="space-y-6">
                                            {[100, 100, 85].map((width, i) => (
                                                <div key={i} className="h-4 bg-slate-50 rounded" style={{ width: `${width}%` }}></div>
                                            ))}
                                        </div>
                                        <div className="mt-16 grid grid-cols-2 gap-10">
                                            <div className="h-36 bg-slate-50/50 border border-slate-100/50 rounded-2xl"></div>
                                            <div className="h-36 bg-slate-50/50 border border-slate-100/50 rounded-2xl"></div>
                                        </div>
                                        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-300 tracking-widest uppercase">
                                            Page 1 of 42
                                        </p>
                                    </div>

                                    {/* Page 2 with highlight */}
                                    <div className="aspect-[1/1.41] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden p-16">
                                        <div className="h-8 w-1/2 bg-slate-100 rounded-lg mb-10"></div>
                                        <div className="space-y-6 relative">
                                            <div className="absolute -inset-4 bg-indigo-50/50 border-l-4 border-indigo-400 rounded-r-xl pointer-events-none"></div>
                                            {[100, 100, 100].map((width, i) => (
                                                <div key={i} className="h-4 bg-slate-50 rounded" style={{ width: `${width}%` }}></div>
                                            ))}
                                        </div>
                                        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-300 tracking-widest uppercase">
                                            Page 2 of 42
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className="absolute bottom-8 right-8 w-56 bg-white/80 backdrop-blur-2xl border border-white rounded-3xl p-5 shadow-xl shadow-indigo-100/20 transform hover:-translate-y-1 transition-all">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-indigo-500 text-lg">auto_graph</span>
                                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Doc Metrics</span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Readability', value: 'Perfect', percent: 95 },
                                        { label: 'Confidence', value: '98%', percent: 98 }
                                    ].map((metric, i) => (
                                        <div key={i} className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] font-bold">
                                                <span className="text-slate-500">{metric.label}</span>
                                                <span className="text-indigo-600">{metric.value}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500" style={{ width: `${metric.percent}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Modals */}
            <CreateProjectModal
                isOpen={showCreateProject}
                onClose={() => setShowCreateProject(false)}
            />
            <UploadDocumentModal
                isOpen={showUpload}
                onClose={() => setShowUpload(false)}
            />
        </>
    );
}
