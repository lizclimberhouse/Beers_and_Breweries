import React from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Image, Grid } from 'semantic-ui-react';
import { getBreweries } from '../actions/breweries';

const styles = {
  center: {
    textAlign: 'center',
  },
  image: {
    float: 'left',
    marginRight: '30px',
    marginBottom: '15px',
  },
}
class BreweryPage extends React.Component {
  state = { brewery: {} }

  componentDidMount() {
    const { breweries, page } = this.props;
    const { dispatch } = this.props;
    dispatch(getBreweries(page))
    this.setState({brewery: breweries.find( b => b.id === this.props.match.params.id  ) })
  }

  imageShow = (brewery) => {
    return ( brewery.images ?
      <Image style={styles.image} src={brewery.images.square_large} />
      :
      <Image style={styles.image} src={"data:image/png;base64,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"} />
    )
  }

  privatelyOwned = (brewery) => {
    return ( brewery.is_mass_owned === 'N' ?
      <h4>Chain Brewery</h4>
      :
      <h4>Privately Owned Brewery</h4>
    )
  }

  establishedYear = (brewery) => {
    return ( brewery.established ? 
      <h3>Established: {brewery.established}</h3>
      :
      <div></div>
    )
  }

  showWebsite = (brewery) => {
    return ( brewery.website ? 
      <h5><a href={brewery.website} target="_blank">{brewery.website}</a></h5>
      :
      <div></div>
    )
  }

  showDesc = (brewery) => {
    return ( brewery.description ? 
      <h5>{brewery.description}</h5>
      :
      <div></div>
    )
  }

  render() {
    const { brewery = {} } = this.state;
    return (
      <Container>
        <Divider hidden />
        <h1 style={styles.center}>{brewery.name}</h1>
        <Divider />
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            { this.imageShow(brewery) }
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            { this.establishedYear(brewery) }
            { this.showWebsite(brewery) }
            { this.privatelyOwned(brewery) }
            { this.showDesc(brewery) }
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { breweries: state.breweries }
}

export default connect(mapStateToProps)(BreweryPage);