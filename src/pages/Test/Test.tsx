'use client'

import { QuestionCard } from '@/components/question-card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from '@/components/ui/pagination'
import { BASE_URL } from '@/services/api'
import axiosConfiguration from '@/services/axios'
import { QuestionType } from '@/types/test'
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

const PAGE_SIZE = 10

export default function Testlar() {
	const [imageModal, setImageModal] = useState({
		isOpen: false,
		imageId: null as number | null,
	})
	const [questions, setQuestions] = useState<QuestionType[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)

	const getQuestions = useCallback(async () => {
		setIsLoading(true)
		try {
			const { data } = await axiosConfiguration.get<any>(
				`/category?page=${currentPage}&size=${PAGE_SIZE}`
			)
			if (data.success) {
				setQuestions(data.body.body)
				setTotalPages(data.body.totalPage)
			} else {
				toast.error('Failed to fetch questions')
			}
		} catch (error) {
			console.error('Error fetching questions:', error)
			toast.error('An error occurred while fetching questions')
		} finally {
			setIsLoading(false)
		}
	}, [currentPage])

	useEffect(() => {
		getQuestions()
	}, [getQuestions])

	const handleImageClick = useCallback((imageId: number) => {
		setImageModal({ isOpen: true, imageId })
	}, [])

	const handleCloseModal = useCallback(() => {
		setImageModal({ isOpen: false, imageId: null })
	}, [])

	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-center text-3xl mb-8 font-bold text-red-500'>
				Йўналишлар
			</h1>

			{isLoading ? (
				<div className='flex justify-center items-center min-h-[200px]'>
					<Loader className='w-8 h-8 animate-spin text-primary' />
				</div>
			) : (
				<div className='space-y-6'>
					{questions.length > 0 ? (
						questions.map(question => (
							<QuestionCard
								key={question.id}
								question={question}
								onImageClick={handleImageClick}
							/>
						))
					) : (
						<div className='text-center py-8 text-gray-500'>
							No questions found
						</div>
					)}
				</div>
			)}

			{totalPages > 1 && (
				<div className='mt-8 flex justify-start w-full'>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<Button
									variant='outline'
									size='icon'
									disabled={currentPage === 0}
									onClick={() => handlePageChange(currentPage - 1)}
									aria-label='Previous page'
								>
									<ChevronLeft className='h-4 w-4' />
								</Button>
							</PaginationItem>

							{Array.from({ length: totalPages }).map((_, index) => (
								<PaginationItem key={index}>
									<Button
										variant={currentPage === index ? 'default' : 'outline'}
										onClick={() => handlePageChange(index)}
										aria-label={`Page ${index + 1}`}
										aria-current={currentPage === index ? 'page' : undefined}
									>
										{index + 1}
									</Button>
								</PaginationItem>
							))}

							<PaginationItem>
								<Button
									variant='outline'
									size='icon'
									disabled={currentPage === totalPages - 1}
									onClick={() => handlePageChange(currentPage + 1)}
									aria-label='Next page'
								>
									<ChevronRight className='h-4 w-4' />
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}

			<Dialog open={imageModal.isOpen} onOpenChange={handleCloseModal}>
				<DialogContent className='sm:max-w-[800px]'>
					<div className='relative w-full aspect-video'>
						<img
							src={
								imageModal.imageId
									? `${BASE_URL}/api/videos/files/${imageModal.imageId}`
									: ''
							}
							alt='Question attachment'
							className='w-full h-full object-contain'
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
