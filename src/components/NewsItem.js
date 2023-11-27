import React from "react";

const NewsItem = (props) => {
  let { title, description, imageurl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: -5,
          top: -10
        }}><span class="badge rounded-pill bg-danger"> {source}</span></div>
        <img
          src={
            !imageurl
              ? "https://media.cnn.com/api/v1/images/stellar/prod/231122134141-02-niagara-falls-explosion-112223.jpg?c=16x9&q=w_800,c_fill"
              : imageurl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              by {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            className="btn btn-sm btn-dark"
            target="_blank"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
