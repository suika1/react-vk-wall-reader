export const GET_ENTRIES_REQUEST = 'GET_ENTRIES_REQUEST';
export const GET_ENTRIES_SUCCESS = 'GET_ENTRIES_SUCCESS';
export const GET_ENTRIES_FAIL = 'GET_ENTRIES_FAIL';
export const SORT = 'SORT';
export const SORT_DESC_LIKES = 'SORT_DESC_LIKES';
export const SORT_INC_LIKES = 'SORT_INC_LIKES';
export const SORT_DESC_DATE = 'SORT_DESC_DATE';
export const SORT_INC_DATE = 'SORT_INC_DATE';
export const SORT_DESC_REPOSTS = 'SORT_DESC_REPOSTS';
export const SORT_INC_REPOSTS = 'SORT_INC_REPOSTS';
export const SET_URL = 'SET_URL';

const NETWORK_ERROR = 'NETWORK_ERROR';


let entriesArr = []; //array of current year's entries
let entriesYearMap = new Map(); //mapping year to it's entries

const getEntriesRequest = year => ({
    type: GET_ENTRIES_REQUEST,
    year: year,
});

const getEntriesSuccess = entries => ({
    type: GET_ENTRIES_SUCCESS,
    entries: entries,
});

const getEntriesFail = error => ({
    type: GET_ENTRIES_FAIL,
    error: error,
});

const setUrlAction = newUrl => ({
    type: SET_URL,
    url: newUrl
});

//Dispatch received url & call getEntries action
export const setUrl = newUrl => {
    return dispatch => {
        dispatch(setUrlAction(newUrl));
        entriesYearMap = new Map();
        dispatch(getEntries(new Date().getFullYear(), newUrl));
    }
};

function makeYearEntries(entries, year){
    let createdYear,
        yearEntries = [];

    entries.forEach(item => {
        createdYear = new Date(item.date * 1000).getFullYear();
        if (createdYear === year) {
            yearEntries.push(item);
        }
    });

    return yearEntries;
}

function getMoreEntries(dispatch, year, count, offset, url){
    let urlPropName;
    if (/-?\d+/.test(url)){
        urlPropName = 'owner_id';
    }else{
        urlPropName = 'domain';
    }
// eslint-disable-next-line no-undef
    VK.Api.call(
        'wall.get', //method for request to API
        { //params for request to API
            [urlPropName]: url,
            extended: 1,
            count: count,
            offset: offset,
            v: '5.80'
        },
        r => {
            try {
                entriesArr = entriesArr.concat(r.response.items);
                if (offset <= r.response.count){ //if end of wall isn't yet reached
                    getMoreEntries(dispatch, year, count, offset+100, url);
                }else{ //if all entries are present
                    let entries = makeYearEntries(entriesArr, year);
                    entriesYearMap.set(year, entries);
                    dispatch(getEntriesSuccess(entries));
                    dispatch(sortEntries(year, SORT_DESC_LIKES));
                }
            } catch (e) {
                entriesYearMap.set(year, NETWORK_ERROR);
                dispatch(getEntriesFail(NETWORK_ERROR));
            }
        }
    )
}

export function getEntries(year = new Date().getFullYear(), url = 'itvectorsoc'){
    return dispatch => {
        let mapValue = entriesYearMap.get(year);
        dispatch(getEntriesRequest(year));
        if (mapValue && mapValue !== NETWORK_ERROR){ //if current year is cached
            dispatch(getEntriesSuccess(mapValue));
            dispatch(sortEntries(year, SORT_DESC_LIKES));
        }else{ //if need to send request to server
            entriesArr = [];
            getMoreEntries(dispatch, year, 100, 0, url);
        }
    }
}

export function sortEntries(year, type){
    let sortFunc;
    switch (type) {
        case SORT_DESC_DATE:
            sortFunc = (a, b) => b.date - a.date;
            break;
        case SORT_INC_DATE:
            sortFunc = (a, b) => a.date - b.date;
            break;
        case SORT_DESC_LIKES:
            sortFunc = (a, b) => b.likes.count - a.likes.count;
            break;
        case SORT_INC_LIKES:
            sortFunc = (a, b) => a.likes.count - b.likes.count;
            break;
        case SORT_INC_REPOSTS:
            sortFunc = (a, b) => a.reposts.count - b.reposts.count;
            break;
        case SORT_DESC_REPOSTS:
            sortFunc = (a, b) => b.reposts.count - a.reposts.count;
            break;
        default:
            sortFunc = (a, b) => b.likes.count - a.likes.count;
    }
    let sorted = entriesYearMap.get(year).sort((a, b) => sortFunc(a, b));
    return {
        type: SORT,
        entries: sorted,
        sortFunc: type,
    }
}

