import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QaButtonHelper from './private/QaButtonHelper';

const colorBase = '#3498db';
const colorBaseDark = '#1478cb';
const colorLightText = '#ffffff';
const colorDisabled = '#555555';

const animationTime = 300;
const showDoneTIme = 1500;

const Wrapper = styled.div`
    padding:5px 10px;
    border-radius: 5px;
    border:1px solid ${colorBase};
    display:inline-block;
    color: ${colorBase};
    cursor:pointer;
    position:relative;
    overflow:hidden;

    ${props => {
        let state = props.state;

        // 共通
        const base = `&: hover{
            border-color: ${ colorBaseDark};
        }`;

        // disable
        if (state.disabled) {
            return `
            cursor:default ;
            border-color: ${ colorDisabled};
            `;
            // focus
        } else if (state.focus) {
            return `
            border-color: ${colorDisabled};
            `;
            // done
        } else if (state.done) {
            return `
            background-color: ${colorDisabled};
            `;
            // default
        } else {
            return `${base}
            `;
        }
    }}
`;

const Title = styled.p`
    position:relative;
    user-select: none;
    
    @keyframes QaLoadingButtonTitleFocusAnimation{
        0% { transform: translateX(0px) scale(1.0); color:${colorBase}; } 
        100% { transform: translateX(15px) scale(0.85); color:${colorLightText}; }
    }

    @keyframes QaLoadingButtonTitleBlurAnimation{
        0% { transform: translateX(15px) scale(0.85); color:${colorLightText}; } 
        100% { transform: translateX(0px) scale(1.0); color:${colorBase}; }
    }

    ${ props => {
        let state = props.state;

        if (state.disabled) {
            return `
            color: ${colorDisabled};
            `;
        } else if (state.focus) {
            return `
                animation-name: QaLoadingButtonTitleFocusAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: QaLoadingButtonTitleBlurAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.done) {
            return `
                color: ${colorLightText};
                transform: translateX(15px) scale(0.85);
            `;
        } else if (state.endDone) {
            return `
                animation-name: QaLoadingButtonTitleBlurAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

const Overlay = styled.div`
    position: absolute;
    top:0px;
    left:0px;
    width:100%;
    height: 100%;
`;

const OverlayInner = styled.div`
    position: relative;
    top: ${props => props.state.overlayTop}px;
    left:-20%;
    width: 140%;
    border-radius: calc(140% / 2);
    background: ${colorDisabled};
    transform: scale(0.0);
    &:before {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    @keyframes QaLoadingFuttonFocusAnimation{
        0% { transform: scale(0.0); opacity:0.0; } 
        100% { transform: scale(1.0); opacity:1.0 }
    }
    @keyframes QaLoadingButtonBlurAnimation{
        0% { transform: scale(1.0); opacity:1.0; } 
        100% { transform: scale(1.0); opacity:0.0 }
    }

    @keyframes QaLoadingButtonDoneAnimation{
        0% { transform: scale(0.0); opacity:1.0; background:${colorBase}; } 
        100% { transform: scale(1.0); opacity:1.0;  background:${colorBase}; }
    }

    @keyframes QaLoadingButtonEndDoneAnimation{
        0% { transform: scale(1.0); opacity:1.0; background:${colorBase}; } 
        100% { transform: scale(1.0); opacity:0.0;  background:${colorBase}; }
    }

    ${ props => {
        let state = props.state;

        if (state.disabled) {
            return `
            `;
        } else if (state.focus) {
            return `
                animation-name: QaLoadingFuttonFocusAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: QaLoadingButtonBlurAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.done) {
            return `
                animation-name: QaLoadingButtonDoneAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.endDone) {
            return `
                animation-name: QaLoadingButtonEndDoneAnimation;
                animation-duration: ${animationTime}ms;
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

// thank you!
// https://codepen.io/nuconeco/pen/ZXJOGK
const Loader = styled.div`
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid white;
    border-radius: 50%;
    animation: QaLoadingButtonSpinAnimation 0.75s infinite linear;
    border-top-color: transparent;
    opacity:0.0;
    transition: opacity 200ms ease;

    &:before,  &:after{
        left: -2px;
        top: -2px;
        display: none;
        position: absolute;
        content: "";
        width: inherit;
        height: inherit;
        border: inherit;
        border-radius: inherit;
    }
    &:after{
        display: block;
        left: -2px;
        top: -2px;
        border: inherit;
        transform: rotate(65deg);
    }

    @keyframes QaLoadingButtonSpinAnimation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

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
            }, animationTime);
        }, showDoneTIme);
    }

    _cancelState() {
        setTimeout(() => {
            this.setState({ focus: false, blur: false, done: false, endDone: false });
        }, animationTime);
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
