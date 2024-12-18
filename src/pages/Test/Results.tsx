import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_URL } from "@/services/api";
import axiosConfiguration from "@/services/axios";
import { useEffect, useState } from "react";

function Results() {
  const [data, setData] = useState();

  const getResults = async () => {
    try {
      const { data } = await axiosConfiguration.get(
        `statistic/user-dashboard/?page=0&size=10`
      );
      setData(data.body.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);
  
  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-5">
      {data?.map((item: any) => (
        <Card className="max-w-md border border-black">
          <CardHeader>
            <img
              className="w-full h-72 bg-cover bg-center object-cover"
              src={item.fileId	
					? `${BASE_URL}/api/videos/files/${item.fileId}`
					: 'https://www.shutterstock.com/image-vector/vector-line-icon-img-260nw-2050481219.jpg'}
              alt=""
            />
            <CardTitle className="text-center text-2xl font-bold text-red-500">
              {item.categoryName ? item.categoryName : "Категория"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between space-y-2 text-gray-500 text-lg">
              <p>Тўғри жавоблар:</p>
              <p>{item.correctAnswers}/{item.countAnswers}</p>
            </div>
            <div className="flex justify-between space-y-2 text-gray-500 text-lg">
              <p>Вақт давомийлиги:</p>
              <p>{item.durationTime} (дак.)</p>
            </div>
            <div className="flex justify-between space-y-2 text-gray-500 text-lg">
              <p>Тўпланган балл:</p>
              <p>{item.testScore}</p>
            </div>
            <div className="flex justify-between space-y-2 text-gray-500 text-lg">
              <p>Тест топширилган сана:</p>
              <p>{item.createdAt}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-y-3">
            <h4 className="text-center text-xl font-bold text-red-500">
              Кушимча йуналишпардан ишланганлар
            </h4>
            <Button className="w-full py-5 bg-orange-500 hover:bg-orange-700">
              Кутилмокда
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Results;
