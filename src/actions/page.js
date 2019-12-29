import * as AT from '../action-types/page';

export const getEntriesRequest = year => ({
    type: AT.GET_ENTRIES_REQUEST,
    year: year,
});

export const getEntriesSuccess = entries => ({
    type: AT.GET_ENTRIES_SUCCESS,
    entries: entries,
});

export const getEntriesFail = error => ({
    type: AT.GET_ENTRIES_FAIL,
    error: error,
});

export const setUrlAction = newUrl => ({
    type: AT.SET_URL,
    url: newUrl
});
