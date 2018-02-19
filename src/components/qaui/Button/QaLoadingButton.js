import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QaButtonHelper from './private/QaButtonHelper';
import {
    buttonColor
    , buttonTime
    , BaseWrapperStyle
    , BaseOverlayStyle
    , BaseOverlayInnerStyle
    , BaseTitleStyle
    , LoaderStyle
} from './private/QaButtonStyle';

const Wrapper = BaseWrapperStyle.extend`
    padding-left: 20px;
    padding-right : 20px;
    ${props => {
        let state = props.state;

        if (state.focus) {
            return `
            border-color: ${buttonColor.disabled};
            `;
        } else if (state.done) {
            return `
            background-color: ${buttonColor.disabled};
            `;
        }

        // defualt
        else if (!state.focus && !state.blur && !state.done && !state.endDone) {
            return `
            cursor:pointer;
            &: hover{
                border-color: ${ buttonColor.baseDark};
            }`;
        }
    }}
`;

const Title = BaseTitleStyle.extend`
    
    @keyframes QaLoadingButtonTitleFocusAnimation{
        0% { transform: translateX(0px) scale(1.0); color:${buttonColor.base}; } 
        100% { transform: translateX(12px) scale(0.9); color:${buttonColor.lightText}; }
    }

    @keyframes QaLoadingButtonTitleBlurAnimation{
        0% { transform: translateX(12px) scale(0.9); color:${buttonColor.lightText}; } 
        100% { transform: translateX(0px) scale(1.0); color:${buttonColor.base}; }
    }

    ${ props => {
        let state = props.state;

        if (state.disabled) {
            return `
            color: ${buttonColor.disabled};
            `;
        } else if (state.focus) {
            return `
                animation-name: QaLoadingButtonTitleFocusAnimation;
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: QaLoadingButtonTitleBlurAnimation;
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.done) {
            return `
                color: ${buttonColor.lightText};
                transform: translateX(12px) scale(0.9);
            `;
        } else if (state.endDone) {
            return `
                animation-name: QaLoadingButtonTitleBlurAnimation;
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

const Overlay = BaseOverlayStyle.extend``;

const OverlayInner = BaseOverlayInnerStyle.extend`
    background: ${buttonColor.disabled};
    // left:-20%;
    
    @keyframes QaLoadingFuttonFocusAnimation{
        0% { transform: translateY(calc(-50% + 16px)) scale(0.0); opacity:0.0; } 
        100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0 }
    }
    @keyframes QaLoadingButtonBlurAnimation{
        0% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0; } 
        100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:0.0 }
    }

    @keyframes QaLoadingButtonDoneAnimation{
        0% { transform: translateY(calc(-50% + 16px)) scale(0.0); opacity:1.0; background:${buttonColor.base}; } 
        100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0;  background:${buttonColor.base}; }
    }

    @keyframes QaLoadingButtonEndDoneAnimation{
        0% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0; background:${buttonColor.base}; } 
        100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:0.0;  background:${buttonColor.base}; }
    }

    ${ props => {
        let state = props.state;

        if (state.disabled) {
            return `
            `;
        } else if (state.focus) {
            return `
                animation-name: QaLoadingFuttonFocusAnimation;
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: QaLoadingButtonBlurAnimation;
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.done) {
            return `
                animation-name: QaLoadingButtonDoneAnimation;
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.endDone) {
            return `
                animation-name: QaLoadingButtonEndDoneAnimation;
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

const LoadingContainer = styled.div`
    position:absolute;
    top:8px;
    left:8px;
    width:18px;
    height:18px;
`;

const Loader = LoaderStyle.extend`
    opacity:0.0;
    transition: opacity 200ms ease;

    ${ props => {
        let state = props.state;

        if (state.focus) {
            return `
                opacity: 1.0;
            `;
        }
    }}
`;

const DoneContainer = styled.div`
    position:absolute;
    top:5px;
    left:5px;
    width:24px;
    height:24px;
    opacity: 0;
    transition: opacity 200ms ease;

    ${ props => {
        let state = props.state;

        if (state.done) {
            return `
                opacity: 1.0;
            `;
        }
    }}
`;

class QaLoadingButton extends Component {

    constructor(props) {
        super(props);
        this.state = { disabled: props.disabled, focus: false, blur: false, done: false, endDone: false, overlayTop: 0 };
        this.overlayInner = null;
    }

    // interface

    focus() { this._focus(); }

    cancel() { this._cancel(); }

    done() { this._done(); }

    // lifeCycle

    componentDidMount() {
        QaButtonHelper.fixOverlay.apply(this);
    }

    render() {

        return (
            <div>
                <Wrapper
                    state={this.state}
                    onClick={this._onClick.bind(this)}>
                    <Overlay
                        state={this.state}
                        innerRef={(el) => { this.overlayDom = el; }}>
                        <OverlayInner
                            state={this.state}
                            innerRef={(el) => { this.overlayInnerDom = el; }}
                        />
                    </Overlay>
                    <LoadingContainer>
                        <Loader
                            state={this.state}
                        />
                    </LoadingContainer>
                    <DoneContainer
                        state={this.state}
                    >
                        <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                        </svg>
                    </DoneContainer>
                    <Title
                        state={this.state}
                    >{this.props.title}</Title>
                </Wrapper>
            </div>
        );
    }

    // private

    _onClick() {
        if (!this._canClick()) return;
        if (this.props.onClick != null) this.props.onClick.apply(this, arguments);
        this._focus();
    }

    _focus() {
        if (this.state.focus) return;

        this.setState({ focus: true });
    }

    _cancel() {
        if (!this.state.focus) return;

        this.setState({ blur: true, focus: false });
        this._cancelState();
    }

    _done() {
        if (!this.state.focus) return;

        this.setState({ done: true, focus: false, blur: false });
        setTimeout(() => {
            this.setState({ done: false, endDone: true });
            setTimeout(() => {
                this._cancelState();
            }, buttonTime.animaion);
        }, buttonTime.showingDone);
    }

    _cancelState() {
        setTimeout(() => {
            this.setState({ focus: false, blur: false, done: false, endDone: false });
        }, buttonTime.animation);
    }

    _canClick() {
        if (this.props.disabled) return false;
        if (this.state.focus || this.state.done || this.state.endDone || this.blur) return false;

        return true;
    }
}

QaLoadingButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default QaLoadingButton;
