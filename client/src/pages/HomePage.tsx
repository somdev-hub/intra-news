import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const HomePage = (): JSX.Element => {
  interface Article {
    source: {
      id: string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }

  interface TopHeadlines {
    [category: string]: Article[];
  }

  const [news, setNews] = useState<Article[]>([]);
  const [topHeadlines, setTopHeadlines] = useState<TopHeadlines>();
  // const shortcuts: string[] = [
  //   "Sports",
  //   "Entertainment",
  //   "Technology",
  //   "Business",
  //   "Politics",
  //   "Health",
  //   "Science",
  //   "World"
  // ];

  useEffect(() => {
   /**
    * The function `getNews` is an asynchronous function that fetches news data from an API and sets
    * the retrieved data as state.
    */
    const getNews: () => Promise<void> = async () => {
      try {
        const response = await axios.get(
          "https://intra-news.onrender.com/api/news"
        );
        if (!response.data) {
          alert("No data found");
        }
        setNews(response.data as Article[]);
      } catch (error) {
        console.error(error);
      }
    };


   /**
    * The function `getHeadlines` is an asynchronous function that fetches top headlines from an API
    * and sets the retrieved data as the top headlines.
    */
    const getHeadlines: () => Promise<void> = async () => {
      try {
        const response = await axios.get(
          "https://intra-news.onrender.com/api/top-headlines"
        );
        if (!response.data) {
          alert("No data found");
        }
        setTopHeadlines(response.data as TopHeadlines);
      } catch (error) {
        console.error(error);
      }
    };
    getNews();
    getHeadlines();
  }, []);

  const [leftSidebar, setLeftSidebar] = useState<boolean>(false);

  return (
    <div className="text-[24px]">
      <Navbar
        setLeftSidebar={setLeftSidebar}
        // setRightSidebar={setRightSidebar}
        leftSidebar={leftSidebar}
        // rightSidebar={rightSidebar}
      />
      <div className="flex flex-1 h-full mt-16">
        <div
          className={` w-full bg-[#242424] fixed md:static h-full md:w-[40%] md:pl-4 px-4 md:px-0 ${
            leftSidebar ? "left-[0%]" : "left-[-100%]"
          } overflow-y-scroll md:overflow-hidden md:mr-4 mr-0`}
        >
          <h4 className="text-[1.125rem]">Latest headlines</h4>
          {
            <div className="mt-8">
              {topHeadlines &&
                Object.keys(topHeadlines).map((category, index) => {
                  return (
                    <div key={index}>
                      <h3 className="text-[1.125rem] mb-4">{category}</h3>
                      {topHeadlines[category]?.map(
                        (article: Article, index: number) => {
                          return (
                            <div
                              className="mb-4 border-b-2 border-white pb-4 w-full"
                              key={index}
                            >
                              <div className="flex gap-5 ">
                                <img
                                  src={
                                    article?.urlToImage
                                      ? article?.urlToImage
                                      : "https://via.placeholder.com/150"
                                  }
                                  className="w-[5rem] h-[5rem] object-cover rounded-lg"
                                  alt=""
                                />
                                <div className="flex flex-col justify-between">
                                  <div className="">
                                    <h3 className="text-[12px] font-[500]">
                                      {article?.title?.length > 150
                                        ? article?.title.slice(0, 150) + "..."
                                        : article?.title}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between mt-4 items-center w-full text-left">
                                <p className="text-[14px]">{article?.author}</p>
                                <p className="text-[14px]">
                                  {new Date(
                                    article?.publishedAt
                                  ).toDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                })}
            </div>
          }
        </div>
        <div className=" mx-4 md:mx-8">
          <h4 className="text-[1.125rem]">News</h4>
          <div className="mt-8 w-full">
            {news?.map((article, index) => {
              return (
                <div
                  className="flex-col items-center md:flex-row md:flex-start md:flex gap-5 mb-6 border-b-2 border-white pb-5 w-full "
                  key={index}
                >
                  <img
                    src={
                      article?.urlToImage
                        ? article?.urlToImage
                        : "https://via.placeholder.com/150"
                    }
                    className="md:w-[7rem] md:h-[7rem] object-cover rounded-lg"
                    alt=""
                  />
                  <div className="flex flex-col justify-between mt-4 md:mt-0 w-full">
                    <div className="">
                      <h3 className="text-[1.125rem]">
                        {article?.title?.length > 150
                          ? article?.title.slice(0, 150) + "..."
                          : article?.title}
                      </h3>
                      <p className="text-[14px] mt-2">
                        {article?.description?.length > 500
                          ? article?.description.slice(0, 500) + "..."
                          : article?.description}
                      </p>
                    </div>
                    <div className="flex justify-between w-full mt-4">
                      <p className="text-[14px]">{article?.author}</p>
                      <p className="text-[14px]">
                        {new Date(article?.publishedAt).toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
