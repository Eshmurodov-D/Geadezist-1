export interface User {
	id: string
	name: string
	role: 'superadmin' | 'admin' | 'testadmin' | 'client'
}

export interface AuthState {
	user: User | null
	login: (user: User) => void
	logout: () => void
}