import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar: React.FC = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false) // Mobil versiyada sidebarni boshqarish
	const location = useLocation() // Hozirgi yo'nalishni olish
	const role = localStorage.getItem('role')
	const menuItems = [
		{ name: 'Бошқарув панели', path: '/dashboard', roles: ['ROLE_SUPER_ADMIN'] },
		{
			name: 'Категория',
			path: '/categories',
			roles: ['ROLE_SUPER_ADMIN', 'ROLE_TESTER'],
		},
		{
			name: 'Тест',
			path: '/test',
			roles: ['ROLE_SUPER_ADMIN', 'ROLE_TESTER', 'ROLE_CLIENT'],
		},
		{ name: 'Фойдаланувчилар', path: '/users', roles: ['ROLE_SUPER_ADMIN'] },
		{
			name: 'Фойдаланувчилар натижаси',
			path: '/user-results',
			roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
		},
		{ name: 'Ходимлар', path: '/employees', roles: ['ROLE_SUPER_ADMIN'] },
		{ name: 'Манзил', path: '/addresses', roles: ['ROLE_SUPER_ADMIN'] },
		{ name: 'Натижалар булими', path: '/results', roles: ['ROLE_CLIENT'] },
	]
	// Sidebarni ochish-yopish funksiyasi
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}
	return (
		<div>
			{/* Sidebar faqat `admin` bo'lmagan foydalanuvchilar uchun ko'rsatiladi */}
			{role !== 'ROLE_ADMIN	' && (
				<div className='relative'>
					{/* Mobil uchun hamburger tugmasi */}
					<button className='lg:hidden p-4 text-black' onClick={toggleSidebar}>
						☰
					</button>

					{/* Sidebar tarkibi */}
					<div
						className={`lg:block w-64 bg-white text-slate-900 fixed inset-0 lg:relative lg:w-64 transform ${
							isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
						} lg:translate-x-0 transition-transform duration-300`}
					>
						{/* Mobilda yopish tugmasi */}
						<div className='lg:hidden w-full text-right'>
							{' '}
							<button onClick={toggleSidebar} className='mt-4 mr-4'>
								✖
							</button>
						</div>

						{/* Menyu elementlari */}
						<ul className='p-4 flex flex-col w-full bg-white gap-y-5 mt-20'>
							{menuItems
								.filter(item => item.roles.includes(role || ''))
								.map(item => (
									<li key={item.name}>
										<Link
											to={item.path}
											className={`block w-full p-2 rounded border border-slate-400 text-left hover:bg-slate-100 ${
												location.pathname === item.path ? 'bg-slate-200' : ''
											}`}
											onClick={toggleSidebar}
										>
											{item.name}
										</Link>
									</li>
								))}
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default Sidebar
