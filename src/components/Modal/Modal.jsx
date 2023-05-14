import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from './Modal.styled';

export const Modal = props => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      props.onCloseModal();
    }
  };

  const handleClickOverlay = e => {
    if (e.currentTarget === e.target) {
      props.onCloseModal();
    }
  };

  return (
    <Overlay onClick={handleClickOverlay}>
      <ModalContainer>
        <img src={props.largeImageURL} alt={props.tags} />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
