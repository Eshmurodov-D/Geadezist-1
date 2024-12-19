export interface Role {
	id: string
	name: string
	role: 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_TESTER' | 'ROLE_USER'
}

export interface AuthState {
	role: Role | null
	login: (role: Role) => void
	logout: () => void
}