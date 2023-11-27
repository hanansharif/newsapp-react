import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async componentDidMount() {
    this.updateNews();
  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    const filteredArticles = parsedData.articles.filter(
      (element) => !element.title.toLowerCase().includes("removed")
    );

    this.setState({
      articles: filteredArticles,
      totalResults: parsedData.length,
      loading: false,
    });

    this.props.setProgress(100);
  }

  // handlePrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
  //     }&category=${this.props.category
  //     }&apiKey=8f266b6675504f33982bdb24bf0ec259&page=${this.state.page - 1
  //     }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();

  //   // Filter out articles with titles containing the word "removed"
  //   const filteredArticles = parsedData.articles.filter(
  //     (element) => !element.title.toLowerCase().includes("removed")
  //   );

  //   this.setState({
  //     articles: filteredArticles,
  //     page: this.state.page - 1,
  //     loading: false,
  //   });
  // };

  // handleNextClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
  //     }&category=${this.props.category
  //     }&apiKey=8f266b6675504f33982bdb24bf0ec259&page=${this.state.page + 1
  //     }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();

  //   // Filter out articles with titles containing the word "removed"
  //   const filteredArticles = parsedData.articles.filter(
  //     (element) => !element.title.toLowerCase().includes("removed")
  //   );

  //   this.setState({
  //     articles: filteredArticles,
  //     page: this.state.page + 1,
  //     loading: false,
  //   });
  // };

  fetchMoreData = () => {
    setTimeout(async () => {
      this.setState({ page: this.state.page + 1 })
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8f266b6675504f33982bdb24bf0ec259&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      const filteredArticles = parsedData.articles.filter(
        (element) => !element.title.toLowerCase().includes("removed")
      );

      this.setState({
        articles: this.state.articles.concat(filteredArticles),
        totalResults: parsedData.length,
      });
    }, 1000);

  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-3 mb-4">News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles
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
}

export default News;
