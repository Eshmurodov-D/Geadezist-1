import useTestStore from "@/store/tets.store";

const ResultPage = () => {
  const { data } = useTestStore();

  return (
    <div className="w-full h-screen bg-[#F1F5F9] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-[90%] md:w-[60%] lg:w-[40%] p-8">
        <h1 className="text-center text-3xl font-bold text-red-500 mb-6">
          Табриклаймиз!
        </h1>
        <p className="text-center text-gray-700 mb-4">
          Тест ишлаш жараёни муваффақиятли якунланди.{" "}
          <a href="/" className="text-blue-500 underline">
            Бош саҳифага қайтиш
          </a>
        </p>

        <div className="border border-gray-300 rounded-lg p-6">
          <h2 className="text-center text-2xl font-semibold mb-6">
            {data?.categoryName}
          </h2>

          <div className="space-y-4 text-lg">
            <div className="flex justify-between border-b pb-2">
              <span>Исм:</span>
              <span>{data?.firstName}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Фамилия:</span>
              <span>{data?.lastName}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Натижа:</span>
              <span>
                {data?.correctAnswer}/{data?.countAnswer}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Тўпланган балл:</span>
              <span>{data && data?.testScore.toFixed(2)} (балл)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Ишлашга кетган вақт:</span>
              <span>{data?.duration}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Ишланган сана:</span>
              <span>{data?.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
