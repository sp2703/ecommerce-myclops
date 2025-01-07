'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { analyticsInstance } from '@/lib/analytics';
import toast from 'react-hot-toast';

export default function SignUp() {
  const router = useRouter();
  const { setUserId } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate user creation with a random ID
    const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
    setUserId(newUserId);
    
    analyticsInstance.trackSignup({ userId: newUserId });
    toast.success('Signed up successfully!');
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}