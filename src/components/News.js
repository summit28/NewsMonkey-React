import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    setloading(true)
    let parsedata = await data.json();
    console.log("Fetched data:", parsedata);
    setarticles(parsedata.articles)
    settotalResults(parsedata.totalResults)
    setloading(false)
    props.setProgress(100)

  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews();
    // eslint-disable-next-line
  }, [])



  // handlepreclick = async () => {
  //   console.log("previous");
  //   setpage(page-1)
  //   updateNews();
  // };

  // handlenextclick = async () => {
  //   console.log("next");
  //   setpage(page+1)
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    setpage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page + 1)
    let data = await fetch(url);
    let parsedata = await data.json();
    setarticles(articles.concat(parsedata.articles))
    settotalResults(parsedata.totalResults)
  };

  return (
    <>
      <h1 className='text-center' style={{ marginTop: '70px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlepreclick}>
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>
            Next &rarr;
          </button>
        </div> */}
    </>
  );

}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'  // Fixed typo
};

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string  // Fixed typo
};
export default News;
