import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageurl, newsUrl } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageurl ? "https://media.cnn.com/api/v1/images/stellar/prod/231122134141-02-niagara-falls-explosion-112223.jpg?c=16x9&q=w_800,c_fill" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel='noreferrer' href={newsUrl} className="btn btn-sm btn-dark" target='_blank'>Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
