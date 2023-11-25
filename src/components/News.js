import React, { Component } from 'react'
import NewsItem from './NewsItem'
export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=8f266b6675504f33982bdb24bf0ec259&page=1&pageSize=18";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    // Filter out articles with titles containing the word "removed"
    const filteredArticles = parsedData.articles.filter(element => !element.title.toLowerCase().includes("removed"));

    this.setState({
      articles: filteredArticles,
      totalResults: filteredArticles.length,
    })
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=8f266b6675504f33982bdb24bf0ec259&page=${this.state.page - 1}&pageSize=18`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    // Filter out articles with titles containing the word "removed"
    const filteredArticles = parsedData.articles.filter(element => !element.title.toLowerCase().includes("removed"));

    this.setState({
      articles: filteredArticles,
      page: this.state.page - 1,
    })
  }

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=8f266b6675504f33982bdb24bf0ec259&page=${this.state.page + 1}&pageSize=18`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    // Filter out articles with titles containing the word "removed"
    const filteredArticles = parsedData.articles.filter(element => !element.title.toLowerCase().includes("removed"));

    this.setState({
      articles: filteredArticles,
      page: this.state.page + 1,
    })

  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Monkey - Top Headlines</h1>
        <div className="row">
          {this.state.articles
            .filter(element => !element.title.toLowerCase().includes("removed"))
            .map(element => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  key={element.url}
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageurl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
