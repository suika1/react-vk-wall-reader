import React from 'react';
import {Entry} from "../Entry/Entry";
import PropTypes from 'prop-types'
import {Settings} from "../Settings/Settings";

export class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url: 'itvectorsoc',
        }
    }

    componentDidMount(){
        //for initial rendering current year
        this.props.getEntries(this.props.year, this.props.url);
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
        const onInputChange = e => {
            this.setState({url: e.target.value});
        };

        //Send an action when btn is pressed
        const onSendUrl = e => {
            this.props.setUrlAction(this.state.url);
        };

        const {entries, isFetching, error} = this.props;

        const renderEntriesList = (entries) => {
            if (error){
                return <p className='error'>Во время загрузки записей произошла ошибка</p>
            }else{
                return (
                    <div className='entries'>
                        {this.renderEntries(entries)}
                    </div>
                )
            }
        };

        if (isFetching){
            return <p className='loading'>Загрузка...</p>
        }else{
            return (
                <div>
                    <div className='link-chooser'>
                        <p>https://vk.com/</p>
                        <input type='text' onChange={onInputChange} value={this.state.url}/>
                        <button onClick={onSendUrl}>Go</button>
                    </div>
                    {renderEntriesList(entries)}
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
                    url={this.props.url}
                    sortEntries={this.props.sortEntries}
                    onLogin={this.props.onLogin}
                    isFetching={this.props.isFetching}
                />
            </div>
        );
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    entries: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.string,
    getEntries: PropTypes.func.isRequired,
    sortEntries: PropTypes.func.isRequired,
    setUrlAction: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
};