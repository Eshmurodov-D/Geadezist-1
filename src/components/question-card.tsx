import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BASE_URL } from '@/services/api'
import { QuestionType } from '@/types/test'
import { Link } from 'react-router-dom'

interface QuestionCardProps {
	question: QuestionType
	onImageClick: (fileId: number) => void
}

export function QuestionCard({ question, onImageClick }: QuestionCardProps) {
	const imageUrl = question.fileId
		? `${BASE_URL}/api/videos/files/${question.fileId}`
		: 'https://www.shutterstock.com/image-vector/vector-line-icon-img-260nw-2050481219.jpg'

	return (
		<Card className='transition-shadow hover:shadow-lg'>
			<CardContent className='p-0'>
				<div className='flex flex-col md:flex-row'>
					<Button
						className='bg-transparent hover:bg-transparent p-0 m-0 w-full h-48 md:h-auto md:w-72 relative overflow-hidden'
						onClick={() => question.fileId && onImageClick(question.fileId)}
					>
						<img
							src={imageUrl}
							alt={question.name}
							className='object-cover'
							sizes='(max-width: 768px) 100vw, 288px'
						/>
					</Button>
					<div className='flex flex-col md:flex-row justify-between w-full p-4 md:p-6 space-y-4 md:space-y-0'>
						<div className='space-y-2'>
							<InfoRow label='Йўналиш' value={question.name} />
							<InfoRow
								label='Тест ишлашга ажратилган вақт'
								value={`${question.duration} (дақ)`}
							/>
							<InfoRow
								label='Саволлар сони'
								value={`${question.questionCount} та`}
							/>
							<InfoRow
								label='Қайта топшириш вақти'
								value={`${question.retakeDate} кундан кейин`}
							/>
						</div>
						<div className='flex items-end justify-end md:ml-6'>
							<Button
								asChild
								className='w-full md:w-auto bg-[#44556A] hover:bg-[#2f3b4a] text-white'
							>
								<Link to={`/tests/${question.id}`}>Бошлаш</Link>
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

function InfoRow({ label, value }: { label: string; value: string }) {
	return (
		<div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
			<span className='font-medium text-[#44556A]'>{label}:</span>
			<span className='font-medium text-[#44556A]'>{value}</span>
		</div>
	)
}
