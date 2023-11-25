import React, { Component } from 'react'
import NewsItem from './NewsItem'
export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=8f266b6675504f33982bdb24bf0ec259";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles })
  }
  render() {
    return (
      <>
        <div className="container my-3">
          <h1>News Monkey - Top Headlines</h1>
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem key={element.url} title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsUrl={element.url} />
              </div>
            })}
          </div>
        </div>
      </>
    )
  }
}

export default News
