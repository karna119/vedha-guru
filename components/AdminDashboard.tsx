import React, { useEffect, useState } from 'react';
import { userService, UserData } from '../services/userService';

interface AdminDashboardProps {
    onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await userService.getUsers();
            setUsers(data);
            setLoading(false);
        };
        fetchUsers();
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
                    <button
                        onClick={onBack}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition"
                    >
                        Back to Home
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-700">Registered Users</h3>
                        <span className="bg-saffron-100 text-saffron-800 px-3 py-1 rounded-full text-sm font-bold">
                            Total: {users.length}
                        </span>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Loading users...</div>
                    ) : users.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 italic">No users found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Phone Number</th>
                                        <th className="px-6 py-4 font-medium">Last Login</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((user, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {new Date(user.last_login).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
