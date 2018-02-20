import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
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

        if (state.disabled) {
            return `
            border-color: ${buttonColor.disabled};
            `;
        } else if (state.focus) {
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

const TitleFocus = keyframes`
    0% { transform: translateX(0px) scale(1.0); color:${buttonColor.base}; } 
    100% { transform: translateX(12px) scale(0.95); color:${buttonColor.lightText}; }
`;
const TitleBlur = keyframes`
    0% { transform: translateX(12px) scale(0.95); color:${buttonColor.lightText}; } 
    100% { transform: translateX(0px) scale(1.0); color:${buttonColor.base}; }
`;

const Title = BaseTitleStyle.extend`

    ${ props => {
        let state = props.state;

        if (state.disabled) {
            return `
            color: ${buttonColor.disabled};
            `;
        } else if (state.focus) {
            return `
                animation-name: ${TitleFocus};
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: ${TitleBlur};
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
                animation-name: ${TitleBlur};
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

const Overlay = BaseOverlayStyle.extend``;

const LoadingFocus = keyframes`
    0% { transform: translateY(calc(-50% + 16px)) scale(0.0); opacity:0.0; } 
    100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0 }
`;

const LoadingBlur = keyframes`
    0% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0; } 
    100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:0.0 }
`;

const LoadingDone = keyframes`
    0% { transform: translateY(calc(-50% + 16px)) scale(0.0); opacity:1.0; background:${buttonColor.base}; } 
    100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0;  background:${buttonColor.base}; }
`;

const LoadingEndDone = keyframes`
    0% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0; background:${buttonColor.base}; } 
    100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:0.0;  background:${buttonColor.base}; }
`;

const OverlayInner = BaseOverlayInnerStyle.extend`
    background: ${buttonColor.disabled};

    ${ props => {
        let state = props.state;

        if (state.disabled) {
            return `
            `;
        } else if (state.focus) {
            return `
                animation-name: ${LoadingFocus};
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: ${LoadingBlur};
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.done) {
            return `
                animation-name: ${LoadingDone};
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.endDone) {
            return `
                animation-name: ${LoadingEndDone};
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
        this.state = {
            disabled: props.disabled,
            focus: false,
            blur: false,
            done: false,
            endDone: false,
            overlayTop: 0
        };
        this.overlayInner = null;
        this.overlayDom = null;
    }

    // interface

    focus() { this._focus(); }

    cancel() { this._cancel(); }

    done() { this._done(); }

    disable() { this._disable(); }

    enable() { this._enable(); }

    // lifeCycle

    // componentDidMount() { }
    // componentWillMount() { }
    // componentWillUpdate(nextProps, nextState) { }
    // componentDidUpdate(prevProps, prevState) { }
    // shouldComponentUpdate() { return true; }
    // componentWillUnmount() { }

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled == this.state.disabled) return;

        if (nextProps.disabled) {
            this._disable();
        } else {
            this._enable();
        }
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

    _disable() {
        this.setState({
            disabled: true,
            focus: false,
            blur: false,
            done: false,
            endDone: false,
        });
    }

    _enable() {
        this.setState({
            disabled: false,
            focus: false,
            blur: false,
            done: false,
            endDone: false,
        });
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
        if (this.state.disabled) return false;
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
