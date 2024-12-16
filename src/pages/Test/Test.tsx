import Button from '@/components/Button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Testlar() {
	const [toggleModal, setToggleModal] = useState(false)

	const toggleImageModal = () => setToggleModal(!toggleModal)

	return (
		<>
			<h1 className='text-center text-3xl my-5  font-bold text-red-500'>
				Йўналишлар
			</h1>
			<Card>
				<CardContent className='flex items-center '>
					<Button
						className='bg-transparent hover:bg-transparent p-0 m-0 w-full rounded-t-lg h-96 md:h-auto md:w-[20%] md:rounded-none md:rounded-s-lg'
						onClick={toggleImageModal}
					>
						<img
							className='object-cover'
							src='https://www.shutterstock.com/image-vector/vector-line-icon-img-260nw-2050481219.jpg'
							alt=''
						/>
					</Button>
					<div className='flex flex-row justify-between w-full p-4 leading-normal'>
						<div>
							<h1 className='mt-2 font-medium text-[#44556A]'>Йўналиш:</h1>
							<h1 className='mt-2 font-medium text-[#44556A]'>
								Тест ишлашга ажратилган вақт:
							</h1>
							<h1 className='mt-2 font-medium text-[#44556A]'>
								Саволлар сони:
							</h1>
							<h1 className='mt-2 font-medium text-[#44556A]'>
								Қайта топшириш вақти:
							</h1>
						</div>
						<div className='flex flex-col items-end'>
							<h1 className='mt-2 font-medium text-[#44556A]'>test</h1>
							<h1 className='mt-2 font-medium text-[#44556A]'>10 (дақ)</h1>
							<h1 className='mt-2 font-medium text-[#44556A]'>5 та</h1>
							<h1 className='mt-2 font-medium text-[#44556A]'>
								О кундан кейин
							</h1>
							<button className='px-5 rounded-lg py-2 mt-2 bg-[#44556A] font-medium text-white'>
								<Link to={'/tests'}>Бошлаш</Link>
							</button>
						</div>
					</div>
				</CardContent>
			</Card>
			<Dialog open={toggleModal} onOpenChange={toggleImageModal}>
				<DialogContent className='justify-center'>
					<img
						src='https://www.shutterstock.com/image-vector/vector-line-icon-img-260nw-2050481219.jpg'
						alt='Image'
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Testlar
