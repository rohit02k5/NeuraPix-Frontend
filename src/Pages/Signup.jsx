import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signup(form.name, form.email, form.password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <section className="max-w-7xl mx-auto flex justify-center items-center min-h-[60vh]">
            <div className="w-full max-w-md bg-[#10131f]/60 backdrop-blur-md p-8 rounded-2xl border border-gray-800 shadow-lg relative z-20">
                <h2 className="font-bold text-3xl text-white mb-6 text-center">Join NeuraPix</h2>

                {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="bg-[#0b0b1e] border border-gray-800 text-white text-sm rounded-lg focus:ring-neon-blue focus:border-neon-blue outline-none block w-full p-3 transition-all duration-300 focus:shadow-neon"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="bg-[#0b0b1e] border border-gray-800 text-white text-sm rounded-lg focus:ring-neon-blue focus:border-neon-blue outline-none block w-full p-3 transition-all duration-300 focus:shadow-neon"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="bg-[#0b0b1e] border border-gray-800 text-white text-sm rounded-lg focus:ring-neon-blue focus:border-neon-blue outline-none block w-full p-3 transition-all duration-300 focus:shadow-neon"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 text-white bg-gradient-to-r from-neon-blue to-neon-purple font-medium rounded-lg text-sm w-full px-6 py-3 text-center shadow-lg hover:shadow-neon transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-gray-400 text-sm text-center">
                    Already have an account? <Link to="/login" className="text-neon-blue hover:underline">Login</Link>
                </p>
            </div>
        </section>
    );
};

export default Signup;
