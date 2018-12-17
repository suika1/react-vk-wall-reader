import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page } from '../components/Page'
import { getEntries, sortEntries } from '../actions/PageActions'
import {store} from '../store/configureStore'

class App extends Component{
    render(){
        const {page, getEntriesAction, sortEntriesAction } = this.props;
        return (
            <div className='app'>
                <Page
                isFetching={page.isFetching}
                entries={page.entries}
                getEntries={getEntriesAction}
                sortEntries={sortEntriesAction}
                sortFunc={page.sortFunc}
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
        getEntriesAction: year => dispatch(getEntries(year)),
        sortEntriesAction: (year, type) => dispatch(sortEntries(year, type)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);