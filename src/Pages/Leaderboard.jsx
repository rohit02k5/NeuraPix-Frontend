import React, { useState, useEffect } from 'react';
import { Loader } from '../components';

const Leaderboard = () => {
    const [loading, setLoading] = useState(false);
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/leaderboard`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const result = await response.json();
                    setLeaders(result.data);
                }
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <section className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="font-extrabold text-[#ffffff] text-[40px]">Leaderboard</h1>
                <p className="mt-2 text-gray-400 text-[16px]">
                    Top creators earning coins by sharing with the community.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="bg-[#10131f]/60 backdrop-blur-md rounded-2xl border border-gray-800 shadow-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#0b0b1e] text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Rank</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4 text-right">Coins</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-gray-300 text-sm">
                            {leaders.map((leader, index) => (
                                <tr key={leader._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-bold text-neon-purple">#{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-white">{leader.name}</td>
                                    <td className="px-6 py-4 text-right font-bold text-neon-blue">{leader.coins}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default Leaderboard;
