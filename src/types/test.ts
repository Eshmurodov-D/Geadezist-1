export interface QuestionType {
	id: number
	name: string
	duration: number
	fileId: number | null
	questionCount: number
	retakeDate: number
}

export interface OptionType {
	id: number
	file: number | null
	isCorrect: boolean
	questionId: number
	answer?: string
}

export interface ResultType {
	firstName: string
	lastName: string
	categoryName: string
	correctAnswer: number
	countAnswer: number
	duration: number
	createdAt: string
	testScore: number
}

export interface PaginatedResponse<T> {
	body: T[]
	totalPage: number
	success: boolean
}
