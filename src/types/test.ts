export interface QuestionType {
	id: number
	name: string
	duration: number
	fileId: number | null
	questionCount: number
	retakeDate: number
}

export interface QuestionDto {
	id: number;
	attachmentIds: number[];
	categoryId: number;
	categoryName: string;
	createdByName: string;
	difficulty: "HARD" | "MEDIUM" | "EASY";
	finiteError: number;
	name: string;
	optionDtos: OptionType[];
	type: "ANY_CORRECT" | "MANY_CHOICE" | "SUM";
  }

export interface OptionType {
	id: number
	file: number | null
	isCorrect: boolean
	questionId: number
	answer?: string
}

export interface QuizResult {
	questionId: number;
	answer: string | string[];
	optionIds: number[];
  }
  
  

export interface PaginatedResponse<T> {
	body: T[]
	totalPage: number
	success: boolean
}
