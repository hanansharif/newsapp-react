import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8f266b6675504f33982bdb24bf0ec259&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    // Filter out articles with titles containing the word "removed"
    const filteredArticles = parsedData.articles.filter(
      (element) => !element.title.toLowerCase().includes("removed")
    );

    this.setState({
      articles: filteredArticles,
      totalResults: filteredArticles.length,
      loading: false,
    });
  }


  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
      }&category=${this.props.category
      }&apiKey=8f266b6675504f33982bdb24bf0ec259&page=${this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    // Filter out articles with titles containing the word "removed"
    const filteredArticles = parsedData.articles.filter(
      (element) => !element.title.toLowerCase().includes("removed")
    );

    this.setState({
      articles: filteredArticles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
      }&category=${this.props.category
      }&apiKey=8f266b6675504f33982bdb24bf0ec259&page=${this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    // Filter out articles with titles containing the word "removed"
    const filteredArticles = parsedData.articles.filter(
      (element) => !element.title.toLowerCase().includes("removed")
    );

    this.setState({
      articles: filteredArticles,
      page: this.state.page + 1,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-3 mb-4">News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles
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
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
