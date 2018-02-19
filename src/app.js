import React from 'react';
import ReactDOM from 'react-dom';
import QaButton from './components/qaui/Button/QaButton';
import QaFocusButton from './components/qaui/Button/QaFocusButton';
import styled from 'styled-components';

const ButtonInfo = styled.div`
    padding:20px 20px;
`;

class App extends React.Component {
    render() {
        return (
            <div>
                <ButtonInfo>
                    <QaButton title='ボタン'
                        disabled={false} />
                </ButtonInfo>
                <ButtonInfo>
                    <QaFocusButton title='Focusボタン'
                        disabled={false}
                        ref={(el) => { this._focusButton = el; }}
                    /><br />
                    <button onClick={this.clickFocusButton.bind(this)}>blur</button>
                </ButtonInfo>
            </div>
        );
    }

    clickFocusButton() {
        console.log('clickFocusButton');
        console.log(this._focusButton);
        this._focusButton.blur();
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);