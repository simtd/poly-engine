import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFilterTextChange(event) {
        this.props.handleFormInput(event.target.value);
    }

    handleSubmit(event) {
        this.props.handleSearch();
        event.preventDefault();
    }

    placeholderText() {
        let prefix = '';

        if (this.props.engineSelected) {
            prefix = 'Search'
        } else {
            prefix = 'Select engine or search'
        };

        return prefix + ' ' + this.props.currentEngine;
    }

    render() {
        return (
            <form className='form' onSubmit={this.handleSubmit}>
                <input
                    placeholder={this.placeholderText()}
                    type="text"
                    value={this.props.formValue}
                    onChange={this.handleFilterTextChange}
                    autoFocus
                />
            </form>
        );
    };
}

export { SearchBar }