import React from 'react';

function ListEngines(props) {
    if (!props.engineSelected) {
        const listItems = props.engines.map((name) =>
            <li key={name}>
                {name}
            </li>
        );

        return (
            <ul>{listItems}</ul>
        );
    };
}

export { ListEngines }
