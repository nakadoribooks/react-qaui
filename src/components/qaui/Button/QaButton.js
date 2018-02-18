import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const colorBase = '#3498db';
// const colorWhite = '#ffffff';
const colorDisabled = '#555555';
const colorBaseDark = '#1478cb';

const Wrapper = styled.div`
    padding:5px 10px;
    border-radius: 5px;
    border:1px solid ${colorBase};
    display:inline-block;
    color: ${colorBase};
    cursor:pointer;

    ${props => {
        // 共通
        const base = `&: hover{
            border-color: ${ colorBaseDark};
        }`;

        // disable
        if (props.disabled) {
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
    transition: transform 300ms ease;
    ${ props => {
        if (props.disabled) {
            return `
            color: ${ colorDisabled};
            `;
        } else {
            return '';
        }
    }}
`;


class QaButton extends Component {
    constructor(props) {
        super(props);
        this.state = { inFocus: false };
    }

    componentDidMount() {
        console.log('mounted');
    }
    render() {
        return (
            <Wrapper
                disabled={this.props.disabled}
                focus={this.state.inFocus}
                onClick={this.onClick.bind(this)}>
                <div>

                </div>
                <Title
                    disabled={this.props.disabled}
                    focus={this.state.inFocus}>{this.props.title}</Title>
            </Wrapper>
        );
    }

    onClick() {
        console.log('onClick');
        this.setState({ inFocus: true });
    }
}

QaButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool
};

export default QaButton;
