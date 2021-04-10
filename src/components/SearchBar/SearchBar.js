/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count' 
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    getSortByClass(sortByOption) {
        if(this.state.sortBy === sortByOption) {
            return 'active';
        } 
        return "";
    }

    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption,
            }, () => {
            if (this.state.term && this.state.location) {
                this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            }
        });
    }

    handleTermChange(event) {
        this.setState({
            term: event.target.value
        });
    } 

    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        });
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        }
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (
                <li className={this.getSortByClass(sortByOptionValue)} 
                    key={sortByOptionValue} 
                    onClick={this.handleSortByChange.bind(this, sortByOptionValue)} 
                >
                    {sortByOption}
                </li>
            );
        });
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div class="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} />
                    <input placeholder="Where?" onChange={this.handleLocationChange} onKeyPress={this.handleKeyPress} />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch }>Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;