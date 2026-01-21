'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProfilePage() {
    const router = useRouter();
    const [passwords, setPasswords] = useState({
        current: '',
        new: ''
    });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement password change API call
        toast.success('Password updated successfully!');
        setPasswords({ current: '', new: '' });
    };

    const handleRevokeSession = (sessionId: string) => {
        // TODO: Implement session revocation
        toast.success('Session revoked');
    };

    const handleRevokeAll = () => {
        // TODO: Implement revoke all sessions
        toast.success('All sessions revoked');
    };

    const sessions = [
        {
            id: '1',
            device: 'MacBook Pro 16"',
            browser: 'Chrome',
            location: 'San Francisco, USA',
            ip: '192.168.1.1',
            lastActive: 'Just now',
            isCurrent: true,
            icon: 'laptop_mac'
        },
        {
            id: '2',
            device: 'iPhone 15 Pro',
            browser: 'Mobile App',
            location: 'London, UK',
            ip: '82.10.4.15',
            lastActive: '2 hours ago',
            isCurrent: false,
            icon: 'smartphone'
        },
        {
            id: '3',
            device: 'Workstation PC',
            browser: 'Firefox',
            location: 'New York, USA',
            ip: '24.5.12.99',
            lastActive: '3 days ago',
            isCurrent: false,
            icon: 'desktop_windows'
        }
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden gradient-bg">
            {/* Decorative Orbs */}
            <div className="glow-orb w-[600px] h-[600px] bg-blue-200/40 top-[-100px] left-[-100px]"></div>
            <div className="glow-orb w-[700px] h-[700px] bg-purple-200/30 bottom-[-100px] right-[-100px]"></div>
            <div className="glow-orb w-[400px] h-[400px] bg-indigo-100/50 top-[20%] right-[10%]"></div>

            {/* Sidebar */}
            <aside className="w-80 sidebar-glass flex flex-col overflow-hidden m-4 mr-0 rounded-3xl">
                <div className="p-8 flex items-center gap-4">
                    <div className="size-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                        <span className="material-symbols-outlined !text-3xl">auto_awesome</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">LivingDocs</h1>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Management Console</p>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-2 py-4">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-3 px-5 py-4 text-slate-500 hover:text-indigo-600 hover:bg-white/40 rounded-2xl transition-all w-full text-left"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-semibold text-sm">Dashboard</span>
                    </button>
                    <div className="flex items-center gap-3 px-5 py-4 text-indigo-600 bg-white/60 border border-white/60 shadow-sm rounded-2xl">
                        <span className="material-symbols-outlined">person</span>
                        <span className="font-bold text-sm">Profile Settings</span>
                    </div>
                    <button className="flex items-center gap-3 px-5 py-4 text-slate-500 hover:text-indigo-600 hover:bg-white/40 rounded-2xl transition-all w-full text-left">
                        <span className="material-symbols-outlined">shield_person</span>
                        <span className="font-semibold text-sm">Security</span>
                    </button>
                    <button className="flex items-center gap-3 px-5 py-4 text-slate-500 hover:text-indigo-600 hover:bg-white/40 rounded-2xl transition-all w-full text-left">
                        <span className="material-symbols-outlined">payments</span>
                        <span className="font-semibold text-sm">Billing</span>
                    </button>
                </nav>

                <div className="p-8">
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-white/40 border border-white text-slate-600 font-bold text-sm rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-4xl mx-auto py-12 px-8 space-y-10">
                    <header className="mb-12">
                        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Account Management</h2>
                        <p className="text-slate-500 mt-2 font-medium">Manage your profile details, security, and active sessions.</p>
                    </header>

                    {/* Profile Section */}
                    <section className="glass-card rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="relative group">
                            <div className="size-40 rounded-[2.5rem] bg-gradient-to-br from-indigo-400 to-purple-600 overflow-hidden border-4 border-white shadow-2xl relative flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-7xl">person</span>
                            </div>
                            <button className="absolute -bottom-2 -right-2 size-12 bg-white border border-slate-100 rounded-2xl shadow-xl flex items-center justify-center text-indigo-600 hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">photo_camera</span>
                            </button>
                        </div>

                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-900">Alex Chen</h3>
                                    <p className="text-indigo-600 font-semibold flex items-center justify-center md:justify-start gap-2 mt-1">
                                        <span className="material-symbols-outlined !text-lg">verified</span>
                                        Pro Account Member
                                    </p>
                                </div>
                                <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-lg">edit</span> Edit Profile
                                </button>
                            </div>
                            <p className="text-slate-600 leading-relaxed max-w-xl">
                                Senior UX Designer & AI Enthusiast. Helping teams build the future of document collaboration at LivingDocs. Based in San Francisco, CA.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <span className="material-symbols-outlined text-lg">mail</span>
                                    alex.chen@livingdocs.ai
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <span className="material-symbols-outlined text-lg">location_on</span>
                                    San Francisco, USA
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Password Reset Section */}
                    <section className="glass-card rounded-3xl p-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="size-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100">
                                <span className="material-symbols-outlined text-amber-500">lock_reset</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Reset Password</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Security Settings</p>
                            </div>
                        </div>

                        <form onSubmit={handlePasswordChange}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600 ml-1">Current Password</label>
                                    <input
                                        className="w-full input-glass border rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all outline-none"
                                        placeholder="••••••••••••"
                                        type="password"
                                        value={passwords.current}
                                        onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600 ml-1">New Password</label>
                                    <input
                                        className="w-full input-glass border rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all outline-none"
                                        placeholder="Enter new password"
                                        type="password"
                                        value={passwords.new}
                                        onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-between">
                                <p className="text-xs text-slate-400 font-medium">Password must be at least 12 characters with one symbol.</p>
                                <button
                                    type="submit"
                                    className="gradient-button px-8 py-3.5 rounded-2xl font-bold text-sm"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Active Sessions Section */}
                    <section className="glass-card rounded-3xl p-10 overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                                    <span className="material-symbols-outlined text-indigo-500">devices</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Active Sessions</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Device History</p>
                                </div>
                            </div>
                            <button
                                onClick={handleRevokeAll}
                                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Revoke All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {sessions.map((session) => (
                                <div
                                    key={session.id}
                                    className={`flex items-center gap-4 p-5 rounded-2xl hover:bg-white/50 transition-all ${session.isCurrent ? 'bg-white/30 border border-white/40' : 'bg-white/20 border border-white/30'
                                        } ${!session.isCurrent ? 'opacity-80' : ''}`}
                                >
                                    <div className="size-12 bg-white rounded-xl flex items-center justify-center border border-white shadow-sm">
                                        <span className="material-symbols-outlined text-slate-400">{session.icon}</span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[15px] font-bold text-slate-900 truncate">{session.device}</p>
                                            {session.isCurrent && (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full border border-green-200 uppercase">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            {session.browser} • {session.location} • {session.ip}
                                        </p>
                                    </div>

                                    <div className="text-right mr-4 hidden md:block">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Last Active</p>
                                        <p className="text-sm font-bold text-slate-600">{session.lastActive}</p>
                                    </div>

                                    <button
                                        onClick={() => handleRevokeSession(session.id)}
                                        className="px-4 py-2 bg-white/60 border border-slate-100 rounded-xl text-xs font-bold text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
                                    >
                                        Revoke
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="pt-10 pb-20 text-center space-y-4">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
                            LivingDocs v2.4.0 — Security Engine 4.0
                        </p>
                        <div className="flex justify-center gap-8">
                            <a className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest" href="#">
                                Privacy Policy
                            </a>
                            <a className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest" href="#">
                                Terms of Service
                            </a>
                            <a className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest" href="#">
                                Support
                            </a>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}
