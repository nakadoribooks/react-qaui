import React from 'react';
import { QaButton, QaFocusButton, QaLoadingButton } from '../Button';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';

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
const Excerpt = styled.p`
    margin:10px 0px;
    color: #333333;
    line-height:1.4;
    font-size:16px;
`;

const SubTitle = styled.h3`
    color: #2c3e50;
    font-size:20px;
    border-left:5px solid #2c3e50;
    padding-left:10px;
    margin-top:30px;
    font-weight:normal;
`;
const Code = styled(SyntaxHighlighter) `
    padding:20px !important;
    font-size:14px;
    margin:20px 10px;
`;

class ButtonDemo extends React.Component {
    render() {
        return (
            <Contents>
                <ContentsTitle>Button</ContentsTitle>
                <Excerpt>
                    各種ボタン<br />
                    普通のやつ、フォーカス残すやつ、ローディング
                </Excerpt>
                <SubTitle>Demo</SubTitle>

                {/* 通常のボタン */}
                <ButtonInfo>
                    <QaButton title='QaButton'
                        onClick={this.onClickQaButton.bind(this)}
                    />
                </ButtonInfo>

                {/* フォーカス残すボタン */}
                <ButtonInfo>
                    <QaFocusButton title='QaFocusButton'
                        onClick={this.onClickQaFocusButton.bind(this)}
                        ref={(el) => { this._focusButton = el; }}
                    />
                    <button onClick={this.clickBlurButton.bind(this)}>blur</button>
                </ButtonInfo>

                {/* ローディングボタン */}
                <ButtonInfo>
                    <QaLoadingButton title='QaLoadingButton'
                        onClick={this.onClickQaLoadingButton.bind(this)}
                        ref={(el) => { this._loadingButton = el; }}
                    />
                    <button onClick={this.clickCancelButton.bind(this)}>Cancel</button>
                    <button onClick={this.clickDoneButton.bind(this)}>Done</button>
                </ButtonInfo>

                <SubTitle>Code</SubTitle>
                <Code language='javascript'>
                    {codeString}
                </Code>
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



/* 以下、code */

const codeString =
    `import React from 'react';
import { QaButton, QaFocusButton, QaLoadingButton } from '../Button';
import styled from 'styled-components';

const ButtonInfo = styled.div'';
const Contents = styled.div'';
const ContentsTitle = styled.h2'';
const Code = styled(SyntaxHighlighter) '';

class ButtonDemo extends React.Component {
    render() {
        return (
            <Contents>
                <ContentsTitle>Button</ContentsTitle>

                {/* 通常のボタン */}
                <ButtonInfo>
                    <QaButton title='QaButton'
                        onClick={this.onClickQaButton.bind(this)}
                    />
                </ButtonInfo>

                {/* フォーカス残すボタン */}
                <ButtonInfo>
                    <QaFocusButton title='QaFocusButton'
                        onClick={this.onClickQaFocusButton.bind(this)}
                        ref={(el) => { this._focusButton = el; }}
                    />
                    <button onClick={this.clickBlurButton.bind(this)}>blur</button>
                </ButtonInfo>

                {/* ローディングボタン */}
                <ButtonInfo>
                    <QaLoadingButton title='QaLoadingButton'
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
`;