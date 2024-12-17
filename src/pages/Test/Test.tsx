import { Link } from 'react-router-dom'

function Testlar() {
	return (
		<>
			<h1 className='text-center text-3xl mt-5  font-bold text-red-500'>
				Йўналишлар
			</h1>
			<a
				href='#'
				className='flex m-6 px-5 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
			>
				<img
					className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-[20%] md:rounded-none md:rounded-s-lg'
					src='https://www.shutterstock.com/image-vector/vector-line-icon-img-260nw-2050481219.jpg'
					alt=''
				/>
				<div className='flex flex-row justify-between w-full p-4 leading-normal'>
					<div>
						<h1 className='mt-2 font-medium text-[#44556A]'>Йўналиш:</h1>
						<h1 className='mt-2 font-medium text-[#44556A]'>
							Тест ишлашга ажратилган вақт:
						</h1>
						<h1 className='mt-2 font-medium text-[#44556A]'>Саволлар сони:</h1>
						<h1 className='mt-2 font-medium text-[#44556A]'>
							Қайта топшириш вақти:
						</h1>
					</div>
					<div className='flex flex-col items-end'>
						<h1 className='mt-2 font-medium text-[#44556A]'>test</h1>
						<h1 className='mt-2 font-medium text-[#44556A]'>10 (дақ)</h1>
						<h1 className='mt-2 font-medium text-[#44556A]'>5 та</h1>
						<h1 className='mt-2 font-medium text-[#44556A]'>О кундан кейин</h1>
						<button className='px-5 rounded-lg py-2 mt-2 bg-[#44556A] font-medium text-white'>
							<Link to={'/tests'}>Бошлаш</Link>
						</button>
					</div>
				</div>
			</a>
		</>
	)
}

export default Testlar
