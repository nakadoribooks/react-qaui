import React from 'react';
import { QaButton, QaFocusButton, QaLoadingButton } from '../Button';
import styled from 'styled-components';

const ButtonInfo = styled.div`
    padding:20px 10px;
`;
const Contents = styled.div`
    padding:10px 20px;
`;
const ContentsTitle = styled.h2`
    color: #2c3e50;
    font-size:25px;
    border-bottom:1px solid #2c3e50;
    padding-bottom:10px;
    font-weight:normal;
`;

class ButtonDemo extends React.Component {
    render() {
        return (
            <Contents>
                <ContentsTitle>Button</ContentsTitle>

                {/* 通常のボタン */}
                <ButtonInfo>
                    <QaButton title='ボタン'
                        onClick={this.onClickQaButton.bind(this)}
                    />
                </ButtonInfo>

                {/* フォーカス残すボタン */}
                <ButtonInfo>
                    <QaFocusButton title='FocusButton'
                        onClick={this.onClickQaFocusButton.bind(this)}
                        ref={(el) => { this._focusButton = el; }}
                    />
                    <button onClick={this.clickBlurButton.bind(this)}>blur</button>
                </ButtonInfo>

                {/* ローディングボタン */}
                <ButtonInfo>
                    <QaLoadingButton title='LoadingButton'
                        onClick={this.onClickQaLoadingButton.bind(this)}
                        ref={(el) => { this._loadingButton = el; }}
                    />
                    <button onClick={this.clickCancelButton.bind(this)}>Cancel</button>
                    <button onClick={this.clickDoneButton.bind(this)}>Done</button>
                </ButtonInfo>
            </Contents>
        );
    }

    onClickQaButton() { console.log('onClickQaButton'); }
    onClickQaFocusButton() { console.log('onClickQaFocusButton'); }
    onClickQaLoadingButton() { console.log('onClickQaFocusButton'); }

    clickBlurButton() { this._focusButton.blur(); }
    clickCancelButton() { this._loadingButton.cancel(); }
    clickDoneButton() { this._loadingButton.done(); }
}

ButtonDemo.propTypes = {
};

export default ButtonDemo;