import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Login: React.FC = () => {
	const [username, setUsername] = useState('')
	const [role, setRole] = useState<
		'superadmin' | 'admin' | 'testadmin' | 'client'
	>('admin')
	const { login } = useAuthStore()
	const navigate = useNavigate() // navigate hookini chaqirish

  const handleLogin = () => {
    if (username.trim()) {
      login({ id: "1", name: username, role });
      navigate("/dashboard");
    } else {
      alert("Foydalanuvchi nomini kiriting!");
    }
  };
	

	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<div className='bg-white p-6 shadow rounded w-96'>
				<h2 className='text-lg font-bold mb-4'>Login</h2>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='w-full p-2 border rounded mb-4'
				/>
				<select
					value={role}
					onChange={e =>
						setRole(
							e.target.value as 'superadmin' | 'admin' | 'testadmin' | 'client'
						)
					}
					className='w-full p-2 border rounded mb-4'
				>
					<option value='superadmin'>Super Admin</option>
					<option value='admin'>Admin</option>
					<option value='testadmin'>Test Admin</option>
					<option value='client'>Client</option>
				</select>
				<button
					onClick={handleLogin}
					className='w-full p-2 bg-blue-500 text-white rounded shadow'
				>
					Login
				</button>
			</div>
		</div>
	)
}

export default Login
