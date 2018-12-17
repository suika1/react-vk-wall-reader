import {
    GET_ENTRIES_FAIL,
    GET_ENTRIES_SUCCESS,
    GET_ENTRIES_REQUEST,
    SORT
} from "../actions/PageActions";
import {
    SORT_DESC_LIKES,
} from "../actions/PageActions";

const initialState = {
  year: 2018,
  entries: [],
  isFetching: false,
  sortFunc: SORT_DESC_LIKES,
  error: '',
};

export function pageReducer(state = initialState, action){
    switch (action.type) {
        case GET_ENTRIES_REQUEST:
            return {...state, year: action.year, isFetching: true, error: ''};
        case GET_ENTRIES_SUCCESS:
            return {...state, entries: action.entries, isFetching: false, error: ''};
        case GET_ENTRIES_FAIL:
            return {...state, isFetching: false, error: action.error.message};
        case SORT:
            return {...state, entries: action.entries, sortFunc: action.sortFunc};
        default:
            return state;
    }
}