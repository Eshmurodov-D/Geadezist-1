import Checkbox from '@/components/checkbox'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface Question {
	question: string
	options?: string[]
	correctAnswer: string
	type: 'ONE_CHOICE' | 'MULTIPLE_CHOICE' | 'INPUT'
	isCompleted: boolean
	img?: string
	answer?: string | string[]
}

interface QuizState {
	name: string
	questions: Question[]
}

const Quiz = () => {
	const [tests, setTests] = useState<QuizState>({
		name: 'Test nomi',
		questions: [
			{
				question: 'Savol 1: sejirwlejtg',
				options: ['isrug', 'turi', 'srth', 'serg'],
				correctAnswer: 'isrug',
				type: 'ONE_CHOICE',
				isCompleted: false,
			},
			{
				question: "Savol 2: Nima bo'ladi?",
				options: ['javob 1', 'javob 2', 'javob 3', 'javob 4'],
				correctAnswer: 'javob 2',
				type: 'MULTIPLE_CHOICE',
				isCompleted: false,
			},
			{
				question: 'Savol 3: Xatolik qayerda?',
				options: ['Xatolik 1', 'Xatolik 2', 'Xatolik 3', 'Xatolik 4'],
				correctAnswer: 'Xatolik 3',
				img: 'https://github.com/shadcn.png',
				type: 'ONE_CHOICE',
				isCompleted: false,
			},
			{
				question: 'Savol 4: Xatolik qayerda?',
				correctAnswer: 'Xatolik 4',
				type: 'INPUT',
				isCompleted: false,
			},
		],
	})

	const [progress, setProgress] = useState(100)
	const [isTimeUp, setIsTimeUp] = useState(false)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('')
	const navigate = useNavigate()
	const duration = 600

	useEffect(() => {
		if (progress > 0) {
			const interval = setInterval(() => {
				setProgress(prev => Math.max(prev - 100 / duration, 0))
			}, 1000)

			return () => clearInterval(interval)
		} else {
			setIsTimeUp(true)
		}
	}, [progress])

	const remainingTime = Math.ceil((progress / 100) * duration)

	const goToNextQuestion = () => {
		if (
			!selectedAnswer ||
			(Array.isArray(selectedAnswer) && selectedAnswer.length === 0)
		) {
			alert('Please select an answer before proceeding!')
			return
		}

		setTests(prev => ({
			...prev,
			questions: prev.questions.map((question, index) =>
				index === currentQuestionIndex
					? { ...question, isCompleted: true, answer: selectedAnswer }
					: question
			),
		}))

		if (currentQuestionIndex < tests.questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1)
			setSelectedAnswer('')
		} else {
			navigate('/result')
		}
	}

	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1)
			setSelectedAnswer(tests.questions[currentQuestionIndex - 1].answer || '')
		}
	}

	const handleMultipleChoice = (option: string) => {
		setSelectedAnswer(prev => {
			if (Array.isArray(prev)) {
				return prev.includes(option)
					? prev.filter(item => item !== option)
					: [...prev, option]
			}
			return [option]
		})
	}

	const renderQuestionInput = () => {
		const currentQuestion = tests.questions[currentQuestionIndex]

		if (currentQuestion.type === 'INPUT') {
			return (
				<Input
					placeholder='Enter your answer.'
					value={selectedAnswer as string}
					onChange={e => setSelectedAnswer(e.target.value)}
				/>
			)
		}

		return currentQuestion.options?.map((option, index) => (
			<Checkbox
				key={index}
				type={currentQuestion.type === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'}
				label={option}
				value={option}
				checked={
					Array.isArray(selectedAnswer)
						? selectedAnswer.includes(option)
						: selectedAnswer === option
				}
				onChange={() =>
					currentQuestion.type === 'MULTIPLE_CHOICE'
						? handleMultipleChoice(option)
						: setSelectedAnswer(option)
				}
			/>
		))
	}

	return (
		<div className='px-10 flex flex-col w-full h-screen justify-center bg-[#F1F5F9] relative'>
			<div className='bg-white px-10 py-[30px] rounded-2xl mb-6'>
				<div className='relative h-2 bg-gray-200 rounded-lg overflow-hidden'>
					<div
						className='absolute top-0 left-0 h-2 bg-blue-500 rounded-lg transition-all duration-1000 ease-linear'
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>

			<div className='w-full h-max flex items-center justify-center'>
				<div className='w-full h-full rounded-2xl bg-white p-8'>
					<h1 className='text-center text-2xl font-semibold text-red-500 mb-6'>
						{tests.name}
					</h1>
					<p className='text-lg font-medium text-gray-700 mb-4'>
						Qiyinlik darajasi: <span className='font-bold'>O'rta</span>
					</p>
					<p className='text-lg text-center font-medium mb-6'>
						{tests.questions[currentQuestionIndex].question}
					</p>
					{tests.questions[currentQuestionIndex].img && (
						<div className='w-full flex justify-center my-5'>
							<img
								className='w-52 h-52 rounded-lg object-cover'
								src={tests.questions[currentQuestionIndex].img}
								alt='Savol rasmi'
							/>
						</div>
					)}
					<form className='space-y-4'>{renderQuestionInput()}</form>
					<div className='flex items-center justify-between mt-8'>
						<p className='text-[#6B7886] text-lg'>
							Қолган вақт: {remainingTime}s
						</p>
						<div className='flex justify-center space-x-4'>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button className='bg-red-500 border-none px-20 py-7 hover:bg-red-700 rounded-xl'>
										{currentQuestionIndex + 1}/{tests.questions.length}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='flex bg-red-500 p-3 rounded-xl'>
									{tests.questions.map((__, i) => (
										<DropdownMenuItem key={i}>
											<Button
												onClick={() => setCurrentQuestionIndex(i)}
												className={`${
													tests.questions[i].isCompleted
														? 'bg-green-500 text-white'
														: 'bg-white text-black'
												} hover:bg-transparent hover:text-black`}
											>
												{i + 1}
											</Button>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div>
							<Button
								className='px-5 py-3 bg-[#7E8898] text-white rounded-lg hover:bg-gray-400'
								onClick={goToPreviousQuestion}
								disabled={currentQuestionIndex === 0}
							>
								Orqaga
							</Button>
							<Button
								className={`px-7 py-3 cursor-pointer ${
									currentQuestionIndex === tests.questions.length - 1
										? 'bg-green-500'
										: 'bg-[#44556A]'
								} text-white rounded-lg ml-2`}
								onClick={goToNextQuestion}
								// disabled={currentQuestionIndex === tests.questions.length - 1}
							>
								{currentQuestionIndex === tests.questions.length - 1
									? 'Yuborish'
									: 'Keyingisi'}
							</Button>
						</div>
					</div>
				</div>
			</div>

			{isTimeUp && (
				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50'>
					<div className='bg-white rounded-xl p-8 w-[90%] md:w-[50%] lg:w-[40%]'>
						<h2 className='text-3xl font-bold text-red-500 mb-6 text-center'>
							Вақт тугади!
						</h2>
						<p className='text-lg text-gray-700 mb-8 text-center'>
							Тест вақти тугади. Илтимос, натижаларни текширинг.
						</p>
						<div className='flex justify-center'>
							<Button className='px-7 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg'>
								<Link to='/result'>Натижаларни кўриш</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Quiz
