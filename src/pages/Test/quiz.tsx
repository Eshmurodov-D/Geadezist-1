// import Checkbox from '@/components/checkbox'
// import { Button } from '@/components/ui/button'
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Input } from '@/components/ui/input'
// import { BASE_URL } from '@/services/api'
// import axiosConfiguration from '@/services/axios'
// import useTestStore from '@/store/tets.store'
// import { OptionType } from '@/types/test'
// import { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// // import { toast } from 'sonner'

// interface QuestionDto {
// 	id: number
// 	attachmentIds: number[]
// 	categoryId: number
// 	categoryName: string
// 	createdByName: string
// 	difficulty: 'HARD' | 'MEDIUM' | 'EASY'
// 	finiteError: number
// 	name: string
// 	optionDtos: OptionType[]
// 	type: 'ANY_CORRECT' | 'MANY_CHOICE' | 'INPUT'
// }

// const Quiz = () => {
// 	const { id } = useParams()
// 	const navigate = useNavigate()
// 	const { setData } = useTestStore()

// 	const [tests, setTests] = useState<QuestionDto[] | null>(null)
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [progress, setProgress] = useState(100)
// 	const [isTimeUp, setIsTimeUp] = useState(false)
// 	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
// 	const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('')
// 	const [duration, setDuration] = useState(500)
// 	const [result, setResult] = useState([])

// 	const getTests = async () => {
// 		setIsLoading(true)
// 		try {
// 			const { data } = await axiosConfiguration.get<any>(`quiz/start/${id}`)
// 			if (data.success) {
// 				setTests(data.body.questionDtoList)
// 				setDuration(data.body.duration)
// 			}
// 		} catch (error) {
// 			console.error(error)
// 			// toast.error('Failed to fetch quiz data')
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}

// 	useEffect(() => {
// 		getTests()
// 	}, [id])

// 	useEffect(() => {
// 		if (progress > 0) {
// 			const interval = setInterval(() => {
// 				setProgress(prev => Math.max(prev - 100 / duration, 0))
// 			}, 1000)
// 			return () => clearInterval(interval)
// 		} else {
// 			setIsTimeUp(true)
// 		}
// 	}, [progress, duration])

// 	const remainingTime = Math.ceil((progress / 100) * duration)

// 	const goToNextQuestion = () => {
// 		if (
// 			!selectedAnswer ||
// 			(Array.isArray(selectedAnswer) && selectedAnswer.length === 0)
// 		) {
// 			toast.warning('Please select an answer before proceeding!')
// 			return
// 		}
// 		if (tests && selectedAnswer) {
// 			const optionIds =
// 				tests && tests[currentQuestionIndex].optionDtos?.map(item => item.id)

// 			setResult((prev): any => [
// 				...prev,
// 				{
// 					questionId: tests[currentQuestionIndex].id,
// 					answer: selectedAnswer,
// 					optionIds,
// 				},
// 			])
// 		}
// 		if (tests) {
// 			setCurrentQuestionIndex(currentQuestionIndex + 1)
// 			setSelectedAnswer('')
// 		}
// 	}

// 	const goToPreviousQuestion = () => {
// 		if (currentQuestionIndex > 0) {
// 			setCurrentQuestionIndex(currentQuestionIndex - 1)
// 			setSelectedAnswer('')
// 		}
// 	}

// 	const renderQuestionInput = () => {
// 		if (!tests) return null

// 		const currentQuestion = tests[currentQuestionIndex]
// 		const currentOptions = currentQuestion.optionDtos

// 		if (currentQuestion.type === 'INPUT') {
// 			return (
// 				<Input
// 					placeholder='Enter your answer.'
// 					value={selectedAnswer as string}
// 					onChange={e => setSelectedAnswer(e.target.value)}
// 				/>
// 			)
// 		}

// 		return currentOptions.map(
// 			(option, index) =>
// 				option.answer && (
// 					<Checkbox
// 						key={index}
// 						type={currentQuestion.type === 'MANY_CHOICE' ? 'checkbox' : 'radio'}
// 						label={option.answer}
// 						value={option.answer}
// 						checked={
// 							Array.isArray(selectedAnswer)
// 								? selectedAnswer.includes(option.answer)
// 								: selectedAnswer === option.answer
// 						}
// 						onChange={() => {
// 							if (currentQuestion.type === 'MANY_CHOICE') {
// 								setSelectedAnswer((prev): any => {
// 									if (Array.isArray(prev)) {
// 										return prev.includes(option.answer)
// 											? prev.filter(a => a !== option.answer)
// 											: [...prev, option.answer]
// 									}
// 									return [option.answer]
// 								})
// 							} else {
// 								setSelectedAnswer(option.answer)
// 							}
// 						}}
// 					/>
// 				)
// 		)
// 	}
	
// 	const sendResult = async () => {
// 		try {
// 			const { data } = await axiosConfiguration.post(
// 				`quiz/pass/${id}?duration=${duration}&countAnswers=${tests?.length}`,
// 				result
// 			)
// 			setData(data.body)
// 			navigate('/result')
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	if (isLoading) {
// 		return <div>Loading...</div>
// 	}

// 	return (
// 		<div className='px-10 flex flex-col w-full h-screen justify-center bg-[#F1F5F9] relative'>
// 			<div className='bg-white px-10 py-[30px] rounded-2xl mb-6'>
// 				<div className='relative h-2 bg-gray-200 rounded-lg overflow-hidden'>
// 					<div
// 						className='absolute top-0 left-0 h-2 bg-blue-500 rounded-lg transition-all duration-1000 ease-linear'
// 						style={{ width: `${progress}%` }}
// 					></div>
// 				</div>

// 				{tests && (
// 					<div className='w-full h-max flex items-center justify-center'>
// 						<div className='w-full h-full rounded-2xl bg-white p-8'>
// 							<h1 className='text-center text-2xl font-semibold text-red-500 mb-6'>
// 								{tests[currentQuestionIndex].name}
// 							</h1>
// 							<p className='text-lg font-medium text-gray-700 mb-4'>
// 								Qiyinlik darajasi:{' '}
// 								<span className='font-bold capitalize'>
// 									{tests[currentQuestionIndex].difficulty}
// 								</span>
// 							</p>
// 							<p className='text-lg text-center font-medium mb-6'>
// 								{tests[currentQuestionIndex].name}
// 							</p>
// 							{tests[currentQuestionIndex].attachmentIds &&
// 								tests[currentQuestionIndex].attachmentIds.map(item => (
// 									<div key={item} className='w-full flex justify-center my-5'>
// 										<img
// 											className='w-52 h-52 rounded-lg object-cover'
// 											src={`${BASE_URL}/api/videos/files/${item}`}
// 											alt='Savol rasmi'
// 										/>
// 									</div>
// 								))}
// 						</div>
// 					</div>
// 				)}
// 				{tests && (
// 					<>
// 						<form className='space-y-4'>{renderQuestionInput()}</form>
// 						<div className='flex items-center justify-between mt-8'>
// 							<p className='text-[#6B7886] text-lg'>
// 								Қолган вақт: {remainingTime}s
// 							</p>
// 							<div className='flex justify-center space-x-4'>
// 								<DropdownMenu>
// 									<DropdownMenuTrigger asChild>
// 										<Button className='bg-red-500 border-none px-20 py-7 hover:bg-red-700 rounded-xl'>
// 											{currentQuestionIndex + 1}/{tests.length}
// 										</Button>
// 									</DropdownMenuTrigger>
// 									<DropdownMenuContent className='flex bg-red-500 p-3 rounded-xl'>
// 										{tests.map((item, i) => (
// 											<DropdownMenuItem key={i}>
// 												<Button
// 													onClick={() => setCurrentQuestionIndex(i)}
// 													className={`${result.some(r => r.questionId === item.id) ? 'bg-green-500 text-white' : 'bg-white text-black'} hover:bg-transparent hover:text-black`}
// 												>
// 													{i + 1}
// 												</Button>
// 											</DropdownMenuItem>
// 										))}
// 									</DropdownMenuContent>
// 								</DropdownMenu>
// 							</div>
// 							<div>
// 								<Button
// 									className='px-5 py-3 bg-[#7E8898] text-white rounded-lg hover:bg-gray-400'
// 									onClick={goToPreviousQuestion}
// 									disabled={currentQuestionIndex === 0}
// 								>
// 									Orqaga
// 								</Button>
// 								<Button
// 									className={`px-7 py-3 cursor-pointer ${
// 										currentQuestionIndex === tests.length - 1
// 											? 'bg-green-500'
// 											: 'bg-[#44556A]'
// 									} text-white rounded-lg ml-2`}
// 									onClick={() =>
// 										currentQuestionIndex === tests.length - 1
// 											? sendResult()
// 											: goToNextQuestion()
// 									}
// 								>
// 									{currentQuestionIndex === tests.length - 1
// 										? 'Yuborish'
// 										: 'Keyingisi'}
// 								</Button>
// 							</div>
// 						</div>
// 					</>
// 				)}
// 			</div>
// 			{isTimeUp && (
// 				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50'>
// 					<div className='bg-white rounded-xl p-8 w-[90%] md:w-[50%] lg:w-[40%]'>
// 						<h2 className='text-3xl font-bold text-red-500 mb-6 text-center'>
// 							Вақт тугади!
// 						</h2>
// 						<p className='text-lg text-gray-700 mb-8 text-center'>
// 							Тест вақти тугади. Илтимос, натижаларни текширинг.
// 						</p>
// 						<div className='flex justify-center'>
// 							<Button onClick={sendResult} className='px-7 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg'>
// 								<Link to='/result'>Натижаларни кўриш</Link>
// 							</Button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default Quiz
import Checkbox from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { BASE_URL } from '@/services/api'
import axiosConfiguration from '@/services/axios'
import useTestStore from '@/store/tets.store'
import { OptionType } from '@/types/test'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
// import { toast } from 'sonner'

interface QuestionDto {
	id: number
	attachmentIds: number[]
	categoryId: number
	categoryName: string
	createdByName: string
	difficulty: 'HARD' | 'MEDIUM' | 'EASY'
	finiteError: number
	name: string
	optionDtos: OptionType[]
	type: 'ANY_CORRECT' | 'MANY_CHOICE' | 'INPUT'
}

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setData } = useTestStore();

  const [tests, setTests] = useState<QuestionDto[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>("");
  const [duration, setDuration] = useState(500);
  const [result, setResult] = useState([]);

	const getTests = async () => {
		setIsLoading(true)
		try {
			const { data } = await axiosConfiguration.get<any>(`quiz/start/${id}`)
			if (data.success) {
				setTests(data.body.questionDtoList)
				setDuration(data.body.duration)
			}
		} catch (error) {
			console.error(error)
			// toast.error('Failed to fetch quiz data')
		} finally {
			setIsLoading(false)
		}
	}
  const getTests = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosConfiguration.get(`quiz/start/${id}`);
      if (data.success) {
        setTests(data.body.questionDtoList);
        setDuration(data.body.duration);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch quiz data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTests();
  }, [id]);

  useEffect(() => {
    if (progress > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 100 / duration, 0));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsTimeUp(true);
    }
  }, [progress, duration]);

  const remainingTime = Math.ceil((progress / 100) * duration);

  const goToNextQuestion = () => {
    if (tests && selectedAnswer) {
      const optionIds =
        tests && tests[currentQuestionIndex].optionDtos?.map((item) => item.id);

      setResult((prev): any => [
        ...prev,
        {
          questionId: tests[currentQuestionIndex].id,
          answer: Array.isArray(selectedAnswer)
            ? selectedAnswer.join(",")
            : selectedAnswer,
          optionIds,
        },
      ]);
    }
    if (tests) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer("");
    }
  };

  const renderQuestionInput = () => {
    if (!tests) return null;

    const currentQuestion = tests[currentQuestionIndex];
    const currentOptions = currentQuestion.optionDtos;

    if (currentQuestion.type === "SUM") {
      return (
        <Input
          placeholder="Enter your answer."
          value={selectedAnswer as string}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        />
      );
    }

    return currentOptions.map(
      (option, index) =>
        option.answer && (
          <Checkbox
            key={index}
            type={
              currentQuestion.type === "MANY_CHOICE" ||
              currentQuestion.type === "ANY_CORRECT"
                ? "checkbox"
                : "radio"
            }
            label={option.answer}
            value={option.answer}
            checked={
              Array.isArray(selectedAnswer)
                ? selectedAnswer.includes(option.answer)
                : selectedAnswer === option.answer
            }
            onChange={() => {
              if (
                currentQuestion.type === "MANY_CHOICE" ||
                currentQuestion.type === "ANY_CORRECT"
              ) {
                setSelectedAnswer((prev): any => {
                  if (Array.isArray(prev)) {
                    return prev.includes(option.answer)
                      ? prev.filter((a) => a !== option.answer)
                      : [...prev, option.answer];
                  }
                  return [option.answer];
                });
              } else {
                setSelectedAnswer(option.answer);
              }
            }}
          />
        )
    );
  };

  const sendResult = async () => {
    try {
      if (!result.length) toast.warning("Siz javob tanlamagansiz");
      const { data } = await axiosConfiguration.post(
        `quiz/pass/${id}?duration=${duration}&countAnswers=${tests?.length}`,
        result
      );
      setData(data.body);
      navigate("/result");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10 flex flex-col w-full h-screen justify-center bg-[#F1F5F9] relative">
      <div className="bg-white px-10 py-[30px] rounded-2xl mb-6">
        <div className="relative h-2 bg-gray-200 rounded-lg overflow-hidden">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-lg transition-all duration-1000 ease-linear"
            // If the request is successful, set the data in the state to the response
            style={{ width: `${progress}%` }}

            // Navigate to the results page
          ></div>
        </div>

        {tests && (
          <div className="w-full h-max flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-white p-8">
              <h1 className="text-center text-2xl font-semibold text-red-500 mb-6">
                {tests[currentQuestionIndex].name}
              </h1>
              <p className="text-lg font-medium text-gray-700 mb-4">
                Qiyinlik darajasi:{" "}
                <span className="font-bold capitalize">
                  {tests[currentQuestionIndex].difficulty}
                </span>
              </p>
              <p className="text-lg text-center font-medium mb-6">
                {tests[currentQuestionIndex].name}
              </p>
              {tests[currentQuestionIndex].attachmentIds &&
                tests[currentQuestionIndex].attachmentIds.map((item) => (
                  <div key={item} className="w-full flex justify-center my-5">
                    <img
                      className="w-52 h-52 rounded-lg object-cover"
                      src={`${BASE_URL}/api/videos/files/${item}`}
                      alt="Savol rasmi"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
        {tests && (
          <>
            <form className="space-y-4">{renderQuestionInput()}</form>
            <div className="flex items-center justify-between mt-8">
              <p className="text-[#6B7886] text-lg">
                Қолган вақт: {remainingTime}s
              </p>
              <div className="flex justify-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-red-500 border-none px-20 py-7 hover:bg-red-700 rounded-xl">
                      {currentQuestionIndex + 1}/{tests.length}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex bg-red-500 p-3 rounded-xl">
                    {tests.map((item, i) => (
                      <DropdownMenuItem key={i}>
                        <Button
                          onClick={() => setCurrentQuestionIndex(i)}
                          className={`${
                            result.some((r) => r.questionId === item.id)
                              ? "bg-green-500 text-white"
                              : "bg-white text-black"
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
                  className="px-5 py-3 bg-[#7E8898] text-white rounded-lg hover:bg-gray-400"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Orqaga
                </Button>
                <Button
                  disabled={
                    currentQuestionIndex === tests.length - 1 && !result.length
                  }
                  className={`px-7 py-3 cursor-pointer ${
                    currentQuestionIndex === tests.length - 1
                      ? "bg-green-500"
                      : "bg-[#44556A]"
                  } text-white rounded-lg ml-2`}
                  onClick={() =>
                    currentQuestionIndex === tests.length - 1
                      ? sendResult()
                      : goToNextQuestion()
                  }
                >
                  {currentQuestionIndex === tests.length - 1
                    ? "Yuborish"
                    : "Keyingisi"}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      {isTimeUp && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-[90%] md:w-[50%] lg:w-[40%]">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
              Вақт тугади!
            </h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Тест вақти тугади. Илтимос, натижаларни текширинг.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => result.length && sendResult}
                className="px-7 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
              >
                {result.length ? (
                  <Link to="/result">Натижаларни кўриш</Link>
                ) : (
                  <Link to="/test">Bosh sahifa</Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
