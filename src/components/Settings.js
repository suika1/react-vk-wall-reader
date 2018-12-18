import React from 'react';
import PropTypes from 'prop-types'
import {
    SORT_DESC_DATE,
    SORT_INC_DATE,
    SORT_DESC_LIKES,
    SORT_INC_LIKES,
    SORT_DESC_REPOSTS,
    SORT_INC_REPOSTS
} from "../actions/PageActions";

//Settings pane class
export class Settings extends React.Component{

    isChecked = type => {
      return type === this.props.currentSort;
    };

    onRadioChange = e => {
        if (!this.props.isFetching)
            this.props.sortEntries(this.props.currentYear, e.target.value);
    };

    onChangeYear = e => {
        if (!this.props.isFetching)
            this.props.getEntries(parseInt(e.target.value), this.props.url);
    };

    render(){
        const renderYear = () => {
            let year = new Date().getFullYear();
            return (
                <div className="year-div">
                    <label>
                        <p className='bold'>Год:</p>
                        <select defaultValue={this.props.currentYear} onChange={this.onChangeYear}>
                            <option value={year}>{year}</option>
                            <option value={year-1}>{year-1}</option>
                            <option value={year-2}>{year-2}</option>
                            <option value={year-3}>{year-3}</option>
                        </select>
                    </label>
                </div>
            );
        };

        const renderDateSorts = () => {
            return (
                <div className='date-sortings'>
                    <p className='bold'>Дата:</p>
                    <label className='sortings'>
                        <input type='radio' name='sort' value={SORT_INC_DATE} onChange={this.onRadioChange}
                               checked={this.isChecked(SORT_INC_DATE)} className='radio'/>
                        <p>По возрастанию</p>
                    </label>
                    <label className='sortings'>
                        <input type='radio' name='sort' value={SORT_DESC_DATE} onChange={this.onRadioChange}
                               checked={this.isChecked(SORT_DESC_DATE)} className='radio'/>
                        <p>По убыванию</p>
                    </label>
                </div>
            );
        };

        const renderLikesSorts = () => {
            return (
                <div className='likes-sortings'>
                    <p className='bold'>Лайки:</p>
                    <label className='sortings'>
                        <input type='radio' name='sort' value={SORT_INC_LIKES} onChange={this.onRadioChange}
                               checked={this.isChecked(SORT_INC_LIKES)} className='radio'/>
                        <p>По возрастанию</p>
                    </label>
                    <label className='sortings'>
                        <input type='radio' name='sort' value={SORT_DESC_LIKES} onChange={this.onRadioChange}
                               checked={this.isChecked(SORT_DESC_LIKES)} className='radio'/>
                        <p>По убыванию</p>
                    </label>
                </div>
            );
        };

        const renderRepostsSorts = () => {
            return(
                <div className='reposts-sortings'>
                    <p className='bold'>Репосты:</p>
                    <label className='sortings'>
                        <input type='radio' name='sort' value={SORT_INC_REPOSTS} onChange={this.onRadioChange}
                               checked={this.isChecked(SORT_INC_REPOSTS)} className='radio'/>
                        <p>По возрастанию</p>
                    </label>
                    <label className='sortings'>
                        <input type='radio' name='sort' value={SORT_DESC_REPOSTS} onChange={this.onRadioChange}
                               checked={this.isChecked(SORT_DESC_REPOSTS)} className='radio'/>
                        <p>По убыванию</p>
                    </label>
                </div>
            );
        };

        return (
            <div className='settings'>
                <p className='settings-header'>Параметры сортировки</p>
                {renderYear()}
                {renderDateSorts()}
                {renderLikesSorts()}
                {renderRepostsSorts()}
                <button className='login-btn' onClick={this.props.onLogin}>Login</button>
            </div>
        )
    }
}

Settings.propTypes = {
    currentYear: PropTypes.number.isRequired,
    currentSort: PropTypes.string.isRequired,
    getEntries: PropTypes.func.isRequired,
    sortEntries: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

