import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'  // Fixed typo
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string  // Fixed typo
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("I am constructor for news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0  // Added totalResults to initial state

    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9257e0f626ba47f385ea6528e04dfae0&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedata = await data.json();

    console.log("Fetched data:", parsedata);

    if (parsedata.articles && Array.isArray(parsedata.articles)) {
      this.setState({
        articles: parsedata.articles,
        totalResults: parsedata.totalResults,
        loading: false
      });
      this.props.setProgress(100)

    }
    else {
      console.error("API response doesn't contain articles:", parsedata);
      this.setState({
        loading: false
      });
      this.props.setProgress(100)

    }
  }

  async componentDidMount() {
    console.log('cdm');
    this.updateNews();
  }

  // handlepreclick = async () => {
  //   console.log("previous");
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  // handlenextclick = async () => {
  //   console.log("next");
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9257e0f626ba47f385ea6528e04dfae0&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedata = await data.json();

    console.log("Fetched data:", parsedata);

    if (parsedata.articles && Array.isArray(parsedata.articles)) {
      this.setState({
        articles: this.state.articles.concat(parsedata.articles),
        totalResults: parsedata.totalResults,
      });
    } else {
      console.error("API response doesn't contain articles:", parsedata);
      this.setState({
      });
    }
  };

  render() {
    console.log('render');
    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => (
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
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
