import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleClickOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return (
      <Overlay onClick={this.handleClickOverlay}>
        <ModalContainer>
          <img src={largeImageURL} alt={tags} />
        </ModalContainer>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
