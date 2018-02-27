import React from 'react';
import { QaButton, QaFocusButton, QaLoadingButton } from '../Button';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';

class ButtonDemo extends React.Component {

    constructor() {
        super();
        this.state = {
            buttonDisabled: false
        };
    }

    render() {
        return (
            <Contents>
                <ContentsTitle>Button</ContentsTitle>
                <Excerpt>
                    各種ボタン
                </Excerpt>
                <SubTitle>Demo</SubTitle>
                {/* disable / enable */}
                <div>
                    <button onClick={this.clickDisableButton.bind(this)}>Disable</button>
                    <button onClick={this.clickEnableButton.bind(this)}>Enable</button>
                </div>

                <ButtonInfo>
                    <p>
                        <b>QaButton</b>
                        <br />disable() / enable()
                    </p>
                    <QaButton title='Button'
                        disabled={this.state.buttonDisabled}
                        onClick={this.onClickQaButton.bind(this)}
                    />
                </ButtonInfo>

                <ButtonInfo>
                    <p>
                        <b>QaFocusButton</b>
                        <br />focus() / blur() / disable() / enable()
                    </p>
                    <QaFocusButton title='FocusButton'
                        disabled={this.state.buttonDisabled}
                        onClick={this.onClickQaFocusButton.bind(this)}
                        ref={(el) => { this._focusButton = el; }}
                    />
                    <div>
                        <button onClick={this.clickBlurButton.bind(this)}>blur</button>
                    </div>
                </ButtonInfo>

                <ButtonInfo>
                    <p>
                        <b>QaLoadingButton</b>
                        <br />focus() / cancel() / done() / disable() / enable()
                    </p>
                    <QaLoadingButton title='LoadingButton'
                        disabled={this.state.buttonDisabled}
                        onClick={this.onClickQaLoadingButton.bind(this)}
                        ref={(el) => { this._loadingButton = el; }}
                    />
                    <div>
                        <button onClick={this.clickCancelButton.bind(this)}>Cancel</button>
                        <button onClick={this.clickDoneButton.bind(this)}>Done</button>
                    </div>
                </ButtonInfo>

                <SubTitle>Usage</SubTitle>
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

    clickDisableButton() { this.setState({ buttonDisabled: true }); }
    clickEnableButton() { this.setState({ buttonDisabled: false }); }
}

export default ButtonDemo;


// style

const ButtonInfo = styled.div`
    padding:20px 10px;
    padding-bottom: 0px;
    & > p{
        margin:10px 0px;
        line-height:1.4;
    }
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

/* 以下、code */

const codeString =
    `import React from 'react';
import { QaButton, QaFocusButton, QaLoadingButton } from '../Button';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';

class ButtonDemo extends React.Component {

    constructor() {
        super();
        this.state = {
            buttonDisabled: false
        };
    }

    render() {
        return (
            <Contents>
                <ContentsTitle>Button</ContentsTitle>
                <Excerpt>
                    各種ボタン
                </Excerpt>
                <SubTitle>Demo</SubTitle>
                {/* disable / enable */}
                <div>
                    <button onClick={this.clickDisableButton.bind(this)}>Disable</button>
                    <button onClick={this.clickEnableButton.bind(this)}>Enable</button>
                </div>

                <ButtonInfo>
                    <p>
                        <b>QaButton</b>
                        <br />disable() / enable()
                    </p>
                    <QaButton title='Button'
                        disabled={this.state.buttonDisabled}
                        onClick={this.onClickQaButton.bind(this)}
                    />
                </ButtonInfo>

                <ButtonInfo>
                    <p>
                        <b>QaFocusButton</b>
                        <br />focus() / blur() / disable() / enable()
                    </p>
                    <QaFocusButton title='FocusButton'
                        disabled={this.state.buttonDisabled}
                        onClick={this.onClickQaFocusButton.bind(this)}
                        ref={(el) => { this._focusButton = el; }}
                    />
                    <div>
                        <button onClick={this.clickBlurButton.bind(this)}>blur</button>
                    </div>
                </ButtonInfo>

                <ButtonInfo>
                    <p>
                        <b>QaLoadingButton</b>
                        <br />focus() / cancel() / done() / disable() / enable()
                    </p>
                    <QaLoadingButton title='LoadingButton'
                        disabled={this.state.buttonDisabled}
                        onClick={this.onClickQaLoadingButton.bind(this)}
                        ref={(el) => { this._loadingButton = el; }}
                    />
                    <div>
                        <button onClick={this.clickCancelButton.bind(this)}>Cancel</button>
                        <button onClick={this.clickDoneButton.bind(this)}>Done</button>
                    </div>
                </ButtonInfo>

                <SubTitle>Usage</SubTitle>
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

    clickDisableButton() { this.setState({ buttonDisabled: true }); }
    clickEnableButton() { this.setState({ buttonDisabled: false }); }
}
`;