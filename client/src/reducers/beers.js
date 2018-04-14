import {
  BEERS,
  ALL_BEERS,
} from '../actions/beers';

const initialState = {
  beers: [], total_pages: 0
}

// becuase we need total pages from redux, we need to destructure our data that is coming back.
// it was an array of 70000 beers, now it is a 7000 "total_pages" of 10 "beers" each
// had to change the intial state of state from an empty array to an object so that we can set it as we need to as an object with two different pieces of data

const beers = ( state = initialState, action ) => {
  switch (action.type) {
    case BEERS:
      return {...state, beers: action.beers, page: action.page, total_pages: action.total_pages}
    case ALL_BEERS:
      return action.beers
    default:
      return state
  }
}

export default beers;