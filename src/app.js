import React from 'react';
import ReactDOM from 'react-dom';
import { QaButton, QaFocusButton, QaLoadingButton } from './components/qaui/Button';
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
                        disabled={false}
                        onClick={this.onClickQaButton.bind(this)}
                    />
                </ButtonInfo>
                <ButtonInfo>
                    <QaFocusButton title='FocusButton'
                        disabled={false}
                        onClick={this.onClickQaFocusButton.bind(this)}
                        ref={(el) => { this._focusButton = el; }}
                    />
                    <button onClick={this.clickBlurButton.bind(this)}>blur</button>
                </ButtonInfo>
                <ButtonInfo>
                    <QaLoadingButton title='FocusButton'
                        disabled={false}
                        onClick={this.onClickQaLoadingButton.bind(this)}
                        ref={(el) => { this._loadingButton = el; }}
                    />
                    <button onClick={this.clickCancelButton.bind(this)}>Cancel</button>
                    <button onClick={this.clickDoneButton.bind(this)}>Done</button>
                </ButtonInfo>
            </div>
        );
    }

    onClickQaButton() {
        console.log('onClickQaButton');
    }

    onClickQaFocusButton() {
        console.log('onClickQaFocusButton');
    }

    onClickQaLoadingButton() {
        console.log('onClickQaFocusButton');
    }

    clickBlurButton() {
        this._focusButton.blur();
    }

    clickCancelButton() {
        this._loadingButton.cancel();
    }

    clickDoneButton() {
        this._loadingButton.done();
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);