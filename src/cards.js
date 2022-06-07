import React from 'react';

class Cards extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    // loadFavicons() {

    // }

    // componentDidMount() {
    //     // call a function that loads in the favicons
    //     // insert into list
    // }

    cards() {
        return (
            this.props.engines.map((name) =>
                <li key={name}>
                    <div className='list-logo'>
                        <img src="https://www.github.com/favicon.ico"></img>
                    </div>
                    <div className='list-name'>
                        {name}
                    </div>
                </li>
            )
        );
    }

    render() {
        if (!this.props.engineSelected) {
            return (
                <ul>{this.cards()}</ul>
            );

        };
    }

}

export { Cards }
