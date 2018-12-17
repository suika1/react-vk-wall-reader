import React from 'react';
import {Entry} from "./Entry";
import PropTypes from 'prop-types'
import {Settings} from "./Settings";

export class Page extends React.Component{
    componentDidMount(){
        //for initial rendering current year
        this.props.getEntries(this.props.year);
    }

    renderEntries = (entries) => {
        if (entries && entries.length === 0)
            return (<h2>Записей за данный год не обнаружено</h2>);
        if (entries)
            return entries.map(entry =>
                <Entry
                    key={entry.id}
                    entry={entry}
                />
            );
        else
            return '';
    };

    //rendering entries
    renderTemplate = () => {
        const {entries, isFetching, error} = this.props;
        if (error){
            return <p className='error'>Во время загрузки записей произошла ошибка</p>
        }

        if (isFetching){
            return <p className='loading'>Загрузка...</p>
        }else{
            return (
                <div className='entries'>
                    {this.renderEntries(entries)}
                </div>
            )
        }
    };

    render(){
        const {year} = this.props;
        return (
            <div className='page'>
                {this.renderTemplate()}
                <Settings
                    currentYear={year}
                    currentSort={this.props.sortFunc}
                    getEntries={this.props.getEntries}
                    sortEntries={this.props.sortEntries}
                />
            </div>
        );
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    entries: PropTypes.array,
    getEntries: PropTypes.func.isRequired,
    sortEntries: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
};