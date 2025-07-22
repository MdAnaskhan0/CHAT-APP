import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { apiClient } from '../../lib/api-client.js';
import { REGISTER_ROUTE } from '../../utils/constants.js';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/index.js';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await apiClient.post(`${REGISTER_ROUTE}`, {
        email,
        password,
      });

      console.log(response);
      if (response.status === 201) {
        setUserInfo(response.data.user);
        setSuccess(true);
        resetForm();
        navigate('/profile');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        server: error.response?.data?.message || 'Registration failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {success ? (
        <div className="p-4 mb-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            <span>Registration successful! You can now login.</span>
          </div>
        </div>
      ) : null}
      
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div>
          <input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div>
          <input
            id="register-confirm-password"
            type="password"
            placeholder="Confirm your password"
            className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        {errors.server && (
          <p className="text-red-500 text-sm">{errors.server}</p>
        )}

        <button 
          className='btn btn-neutral' 
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Registration;