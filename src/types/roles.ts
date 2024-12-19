export interface User {
	id: string
	name: string
	role: 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_TESTER' | 'ROLE_USER'
}

export interface AuthState {
	user: User | null
	login: (user: User) => void
	getMe: () => void
	logout: () => void
}