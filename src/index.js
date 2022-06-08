import { InputBar } from './inputbar.js'
import { Cards } from './cards.js'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            currentEngineNames: this.props.allEngineNames,
            engineSelected: false,
        };

        this.handleFormInput = this.handleFormInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // search is to be used with urls like https://www.qwant.com/?q=
    search(url, query) {
        let urlMod = '';
        let queryMod = query.trim(); // Removing outer whitespace

        if (queryMod === '') {
            // Go to home page if query is empty
            const arr = url.split('/');
            arr.pop();
            urlMod = arr.join('/');
        } else {
            urlMod = url;
        };

        window.open(urlMod + queryMod);
    }

    getUrl(engineName) {
        const engineIdx = this.props.engines.findIndex(
            item => item.name === engineName
        );

        return this.props.engines[engineIdx].url;
    }

    handleFormInput(input) {
        if (!this.state.engineSelected) {
            let names = this.props.allEngineNames;

            if (input !== '') {
                let coupling = [];
                for (let name of names) {
                    const idx = name.toLowerCase().indexOf(
                        input.toLowerCase()
                    );

                    if (idx !== -1) {
                        coupling.push({ name: name, index: idx })
                    };
                };

                coupling.sort(function (a, b) { return a.index - b.index });
                names = coupling.map((item) => item.name);
            }

            this.setState({ currentEngineNames: names });
        };

        this.setState({ inputText: input });
    }

    handleSearch() {
        if (!this.state.engineSelected) {
            let engine = this.state.currentEngineNames[0];

            if (!engine) { // Search with default engine
                this.search(
                    this.getUrl(this.props.defaultEngine),
                    this.state.inputText
                );

                this.setState({ currentEngineNames: this.props.allEngineNames })
            } else { // Set selected engine
                this.setState({ engineSelected: true });
            };

        } else { // Search with already selected engine
            let url = this.getUrl(this.state.currentEngineNames[0]);
            this.search(url, this.state.inputText);
            this.setState({
                engineSelected: false,
                currentEngineNames: this.props.allEngineNames
            });
        };

        this.setState({ inputText: '' });
    }

    render() {
        return (
            <div className="app">
                <InputBar
                    currentEngine={this.state.currentEngineNames[0]}
                    defaultEngine={this.props.defaultEngine}
                    engineSelected={this.state.engineSelected}

                    formValue={this.state.inputText}
                    handleFormInput={this.handleFormInput}
                    handleSearch={this.handleSearch}
                />
                <div className='cards'>
                    <Cards
                        engineSelected={this.state.engineSelected}
                        engines={this.state.currentEngineNames}
                    />
                </div>

            </div >
        );
    }
}

const ENGINES = require("./engines.json");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App
        engines={ENGINES}
        defaultEngine='Qwant'
        allEngineNames={
            Object.values(ENGINES).map((engine) => engine.name).sort()
        }
    />
);
