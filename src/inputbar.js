import React from 'react';

class InputBar extends React.Component {
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
        let prefix, engine = '';

        if (this.props.engineSelected) {
            prefix = 'Search'
            engine = this.props.currentEngine
        } else {
            prefix = 'Select engine or search'
            engine = this.props.defaultEngine
        };

        return prefix + ' ' + engine;
    }

    render() {
        return (
            <div className="input-bar">
                <form className='form' onSubmit={this.handleSubmit}>
                    <input
                        placeholder={this.placeholderText()}
                        type="text"
                        value={this.props.formValue}
                        onChange={this.handleFilterTextChange}
                        autoFocus
                    />
                </form>
                <div className="bar-buttons">
                    <button>❓</button>
                    <button>⚙️</button>
                </div>
            </div >
        );
    };
}

export { InputBar }