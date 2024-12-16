import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

function Results() {
	return (
		<div>
			<Card className='max-w-md border border-black'>
				<CardHeader>
					<img
						className='w-full h-72 bg-cover bg-center object-cover'
						src='https://github.com/shadcn.png'
						alt=''
					/>
					<CardTitle className='text-center text-2xl font-bold text-red-500'>
						Test
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex justify-between space-y-2 text-gray-500 text-lg'>
						<p>Adsfsf</p>
						<p>1/3</p>
					</div>
					<div className='flex justify-between space-y-2 text-gray-500 text-lg'>
						<p>Adsfsf</p>
						<p>1/3</p>
					</div>
					<div className='flex justify-between space-y-2 text-gray-500 text-lg'>
						<p>Adsfsf</p>
						<p>1/3</p>
					</div>
					<div className='flex justify-between space-y-2 text-gray-500 text-lg'>
						<p>Adsfsf</p>
						<p>1/3</p>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col gap-y-3'>
					<h4 className='text-center text-xl font-bold text-red-500'>
						Кушимча йуналишпардан ишланганлар
					</h4>
					<Button className='w-full py-5 bg-orange-500 hover:bg-orange-700'>
						Кутилмокда
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default Results
