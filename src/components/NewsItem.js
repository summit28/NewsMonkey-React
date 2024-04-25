import React from 'react'

const NewsItem = (props) => {

  let { title, description, imageUrl, newsurl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card my-3">
        <img src={!imageUrl ? "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <span className="badge text-bg-primary">{source}</span>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {!author ? 'unknown' : author} on {new Date(date).toGMTString()} </small></p>
          <a rel='noreferrer' href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )

}

export default NewsItem
