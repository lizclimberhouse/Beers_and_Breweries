import axios from 'axios';
export const BEERS = 'BEERS';
export const ALL_BEERS = 'ALL_BEERS';

export const getBeers = (page) => {
  return (dispatch) => {
    axios.get(`/api/all_beers?page=${page}&per_page=10`)
      .then( res => dispatch({ type: BEERS, beers: res.data.entries, page: page, total_pages: res.data.total_pages  }) )
  }
}

export const getAllBeers = () => {
  // debugger
  return (dispatch) => {
    axios.get('/api/all_beers')
      .then( res => dispatch({ type: ALL_BEERS, beers: res.data.entries  }) )
  }
}