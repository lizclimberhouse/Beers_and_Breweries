import React from 'react';
import { connect } from 'react-redux';
import { getBeers } from '../actions/beers';
import { Link } from 'react-router-dom';
import { Container, Divider, Button, Grid, Comment, Icon, Card } from 'semantic-ui-react';
import i1 from '../images/1.png';
import i2 from '../images/2.png';
import i3 from '../images/3.png';
import i4 from '../images/4.png';
import i5 from '../images/5.png';
import i6 from '../images/6.png';
import i7 from '../images/7.png';
import i8 from '../images/8.png';
import i9 from '../images/9.png';
import i10 from '../images/10.png';
import i11 from '../images/11.png';
import i12 from '../images/12.png';
import i13 from '../images/13.png';
import BeerRandom from './BeerRandom';
import InfiniteScroll from 'react-infinite-scroller';

const images = { i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13 }

const styles = {
  btn: {
    marginBottom: '30px',
    width: '150px',
  },
  font: {
    color: 'white',
  },
  container: {
    height: '80vh',
  }
}

class Beers extends React.Component {
  state = { page: 1 } // , total_pages: 0 if you want the natural limit you can doctor it here

  componentDidMount() {
    let { page } = this.state;
    const { dispatch } = this.props;
    dispatch(getBeers(page))
  }

  loadMore = () => {
    const { dispatch } = this.props;
    const page = this.props.page + 1
    dispatch(getBeers(page))
  }

  prevPage = () => {
    const { dispatch } = this.props;
    const page = this.props.page - 1
    dispatch(getBeers(page)) // I'll admit that I couldn't figure out a normal way to do pagination, so I hacked it.
  }

  nextPage = () => {
    const { dispatch } = this.props;
    const page = this.props.page + 1
    dispatch(getBeers(page))
  }

  prevButton = () => {
    const { page } = this.props;
    return ( page === 1 ?
      <Button disabled style={styles.btn} color='blue' onClick={() => this.prevPage()}>Previous Page</Button>
      :
      <Button style={styles.btn} color='blue' onClick={() => this.prevPage()}>Previous Page</Button>
    )
  }

  nextButton = () => {
    const { page } = this.props;
    return ( page === 5 ?
      <Button disabled style={styles.btn} color='green' onClick={() => this.nextPage()}>Next Page</Button>
      :
      <Button style={styles.btn} color='green' onClick={() => this.nextPage()}>Next Page</Button>
    )
  }

  showImage = (id) => {
    return ( id ?
      <Comment.Avatar as='a' src={images[`i${id}`]} />
      :
      <Comment.Avatar as='a' src={images[`i${13}`]} />
    )
  }

  render() {
    const { beers, page } = this.props;
    return (
      <Container style={styles.container}>
        <Divider hidden />
        <h1>Beers</h1>
        <Divider />
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Card.Group>
              <BeerRandom />
            </Card.Group>
          </Grid.Column>            
          <Grid.Column mobile={16} tablet={16} computer={12}>
            {/* <Button style={styles.btn} color='blue' onClick={() => this.prevPage()}>Previous Page</Button>
            <Button style={styles.btn} color='green' onClick={() => this.nextPage()}>Next Page</Button> */}
            { this.prevButton() }
            { this.nextButton() }
            {/* <InfiniteScroll 
              pageStart={0}
              loadMore={this.loadMore}
              hasMore={this.props.page < this.props.total_pages}
              useWindow={true}
            >
            { */}
            <Comment.Group>
              { beers.map( beer => 
              <Comment key={beer.id}>
              <Divider />
                { this.showImage(Math.floor(beer.abv)) }
                  <Comment.Content>
                  <Comment.Author style={styles.font}>{beer.name}</Comment.Author>
                  <Comment.Text>
                    {/* <p style={styles.font}>{beer.style.category.name}</p> */}
                  </Comment.Text>
                  <Comment.Action>
                    <Link to={`/beer/${beer.id}`}><Icon name='eye'/>More Info</Link>
                  </Comment.Action>
                </Comment.Content>
              </Comment>
              )
            }
          </Comment.Group>
          {/* }
          </InfiniteScroll> */}
        </Grid.Column>
      </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { beers: state.beers.beers, total_pages: state.beers.total_pages, page: state.beers.page }  //beer.beers see below 
}

// becuase we need total pages from redux, we need to destructure our data that is coming back.
// it was an array of 70000 beers, now it is a 7000 "total_pages" of 10 "beers" each
// had to change the intial state of state from an empty array to an object so that we can set it as we need to as an object with two different pieces of data

export default connect(mapStateToProps)(Beers);