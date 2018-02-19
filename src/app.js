import React from 'react';
import ReactDOM from 'react-dom';
import QaDemo from './components/qaui/Demo/QaDemo';
import {
    // Route,
    BrowserRouter,
    // NavLink,
    // Router
} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                <QaDemo />
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);