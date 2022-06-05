import { SearchBar } from './searchbar.js'
import { ListEngines } from './listengines.js'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            currentEngineNames: this.props.allEngineNames,
            currentEngine: this.props.defaultEngine,
            engineSelected: false,
        };

        this.handleFormInput = this.handleFormInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    openUrl(url, urlSuffix) {
        window.open(url + urlSuffix);
    }

    // getEngineNames() {
    //     return Object.values(this.props.engines).map(
    //         (engine) => engine.name
    //     ).sort();
    // }

    getUrl(engineName) {
        const engineIdx = this.props.engines.findIndex(
            item => item.name === engineName
        );

        return this.props.engines[engineIdx].url;
    }

    handleFormInput(input) {
        let names = this.props.allEngineNames;

        if (!this.state.engineSelected && input !== '') {
            let coupling = [];
            for (let name of names) {
                const idx = name.toLowerCase().replace(/ /g, '').indexOf(
                    input.toLowerCase()
                );

                if (idx !== -1) {
                    coupling.push({ name: name, index: idx })
                };
            };

            coupling.sort(function (a, b) { return a.index - b.index });
            names = coupling.map((item) => item.name);
        };

        this.setState({
            currentEngineNames: names,
            inputText: input
        });
    }

    handleSearch() {
        if (!this.state.engineSelected) {
            let engine = this.state.currentEngineNames[0];

            if (!engine) { // Search with default engine
                this.openUrl(
                    this.getUrl(this.props.defaultEngine),
                    this.state.inputText
                );
            } else { // Set selected engine
                this.setState({
                    engineSelected: true,
                    currentEngine: engine,
                });
            };
        } else { // Search with already selected engine
            let url = this.getUrl(this.state.currentEngine);

            if (this.state.inputText === '') {
                // Go to home page if query is empty
                const arr = url.split('/');
                arr.pop()
                url = arr.join('/');
            };

            this.openUrl(url, this.state.inputText);

            this.setState({
                engineSelected: false,
                currentEngine: this.props.defaultEngine,
            });
        };

        this.setState({
            inputText: '',
            currentEngineNames: this.props.allEngineNames
        });
    }

    render() {
        console.log("rendered")
        return (
            <div className="app">
                <div className="search-bar">
                    <SearchBar
                        engineSelected={this.state.engineSelected}
                        currentEngine={this.state.currentEngine}

                        formValue={this.state.inputText}
                        handleFormInput={this.handleFormInput}
                        handleSearch={this.handleSearch}
                    />
                    <div className="menu">
                        <button>❓</button>
                        <button>⚙️</button>
                    </div>
                </div>
                <div className="engine-list">
                    <ListEngines
                        engineSelected={this.state.engineSelected}
                        engines={this.state.currentEngineNames}
                    />
                </div>
            </div>
        );
    }
}

const ENGINES = [
    { name: 'Qwant', url: 'https://www.qwant.com/?q=' },
    { name: 'Brave', url: 'https://search.brave.com/search?q=' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
    { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
    { name: 'eBay', url: 'https://www.ebay.com/sch/i.html?&_nkw=' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com/search?q=' },
    { name: 'ArchWiki', url: 'https://wiki.archlinux.org/index.php?search=' },
    { name: 'GitHub', url: 'https://github.com/search?q=' },
    { name: 'Odysee', url: 'https://odysee.com/$/search?q=' },
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App
        engines={ENGINES}
        allEngineNames={
            Object.values(ENGINES).map((engine) => engine.name).sort()
        }
        defaultEngine='Qwant'
    />
);
