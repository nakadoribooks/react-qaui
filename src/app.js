import React from 'react';
import ReactDOM from 'react-dom';
import QaButton from './components/qaui/Button/QaButton';

class App extends React.Component {
    render() {
        return (
            <div>
                <QaButton title='ボタン' disabled={false} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);