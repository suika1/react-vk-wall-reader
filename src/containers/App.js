import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page } from '../components/Page'
import { getEntries, sortEntries, setUrl } from '../actions/PageActions'
import {handleLogin} from "../actions/LoginActions";

class App extends Component{
    render(){
        const {page, getEntriesAction,
            sortEntriesAction, setUrlAction, onLoginAction } = this.props;
        return (
            <div className='app'>
                <Page
                isFetching={page.isFetching}
                entries={page.entries}
                url={page.url}
                getEntries={getEntriesAction}
                sortEntries={sortEntriesAction}
                setUrlAction={setUrlAction}
                sortFunc={page.sortFunc}
                onLogin={onLoginAction}
                year={parseInt(page.year)}
                error={page.error}
                />
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        page: store,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getEntriesAction: (year, url) => dispatch(getEntries(year, url)),
        sortEntriesAction: (year, type) => dispatch(sortEntries(year, type)),
        setUrlAction: newUrl => dispatch(setUrl(newUrl)),
        onLoginAction: () => dispatch(handleLogin()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);