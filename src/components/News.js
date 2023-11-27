import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  }, [])

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    const filteredArticles = parsedData.articles.filter(
      (element) => !element.title.toLowerCase().includes("removed")
    );

    setArticles(filteredArticles)
    setTotalResults(parsedData.length)
    setLoading(false)

    props.setProgress(100);
  }

  const fetchMoreData = () => {
    setTimeout(async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKeyß}&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1)
      let data = await fetch(url);
      let parsedData = await data.json();

      const filteredArticles = parsedData.articles.filter(
        (element) => !element.title.toLowerCase().includes("removed")
      );

      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.length)
    }, 1000);

  };

  return (
    <div className="container">
      <h1 className="text-center" style={{
        margin: '35px 0px', marginTop: '90px'
      }}>News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles
            .filter(
              (element) => !element.title.toLowerCase().includes("removed")
            )
            .map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  key={element.url}
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageurl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );

}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
