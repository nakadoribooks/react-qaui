import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QaButtonHelper from './private/QaButtonHelper';

const colorBase = '#3498db';
// const colorWhite = '#ffffff';
const colorDisabled = '#555555';
const colorBaseDark = '#1478cb';

const animationTime = 300;

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
        // 共通
        const base = `&: hover{
            border-color: ${ colorBaseDark};
        }`;

        // disable
        if (props.state.disabled) {
            return `
            cursor:default ;
            border-color: ${ colorDisabled};
            `;
            // focus
        } else if (props.focus) {
            return `${base}
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
    
    @keyframes QaButtonTitleFocusAnimation{
        0% { transform: scale(1.0); } 
        50% { transform: scale(0.98); } 
        100% { transform: scale(1.0); }
    }

    ${ props => {
        if (props.state.disabled) {
            return `
            color: ${colorDisabled};
            `;
        } else if (props.state.focus) {
            return `
                animation-name: QaButtonTitleFocusAnimation;
                animation-duration: ${animationTime}ms;
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
    top: ${props => props.overlayTop}px;
    left:-20%;
    width: 140%;
    border-radius: calc(140% / 2);
    background: ${colorBase};
    transform: scale(0.0);
    &:before {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    @keyframes QaButtonFocusAnimation{
        0% { transform: scale(0.0); opacity:0.8; } 
        100% { transform: scale(1.0); opacity:0.1 }
    }

    ${ props => {
        if (props.state.disabled) {
            return `
            `;
        } else if (props.state.focus) {
            return `
                animation-name: QaButtonFocusAnimation;
                animation-duration: ${animationTime}ms;
            `;
        }
    }}
`;

class QaButton extends Component {
    constructor(props) {
        super(props);
        this.state = { disabled: props.disabled, focus: false, overlayTop: 0 };
        this.overlayInner = null;
    }

    componentDidMount() {
        QaButtonHelper.fixOverlay.apply(this);
    }

    render() {
        return (
            <div>
                <Wrapper
                    state={this.state}
                    onClick={this.onClick.bind(this)}>
                    <Overlay
                        innerRef={(el) => { this.overlayDom = el; }}
                        state={this.state}>
                        <OverlayInner
                            state={this.state}
                            overlayTop={this.state.overlayTop}
                            disabled={this.props.disabled}
                            innerRef={(el) => { this.overlayInnerDom = el; }}
                        />
                    </Overlay>
                    <Title
                        disabled={this.props.disabled}
                        state={this.state}
                    >{this.props.title}</Title>
                </Wrapper>
            </div>
        );
    }

    onClick() {
        if (this.state.focus) return;
        if (this.props.onClick != null) this.props.onClick.apply(this, arguments);
        this.setState({ focus: true });
        setTimeout(() => {
            this.setState({ focus: false });
        }, animationTime);
    }
}

QaButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default QaButton;
