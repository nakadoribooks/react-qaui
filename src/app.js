import React from 'react';
import ReactDOM from 'react-dom';
import QaButton from './components/qaui/Button/QaButton';
import QaFocusButton from './components/qaui/Button/QaFocusButton';
import QaLoadingButton from './components/qaui/Button/QaLoadingButton';
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
                    <QaFocusButton title='FocusButton'
                        disabled={false}
                        ref={(el) => { this._focusButton = el; }}
                    />
                    <button onClick={this.clickBlurButton.bind(this)}>blur</button>
                </ButtonInfo>
                <ButtonInfo>
                    <QaLoadingButton title='LoadingButton'
                        disabled={false}
                        ref={(el) => { this._loadingButton = el; }}
                    />
                    <button onClick={this.clickCancelButton.bind(this)}>Cancel</button>
                    <button onClick={this.clickDoneButton.bind(this)}>Done</button>
                </ButtonInfo>
            </div>
        );
    }

    clickBlurButton() {
        this._focusButton.blur();
    }

    clickCancelButton() {
        console.log('clickCancelButton');
        this._loadingButton.cancel();
    }

    clickDoneButton() {
        console.log('clickCancelButton');
        this._loadingButton.done();
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);