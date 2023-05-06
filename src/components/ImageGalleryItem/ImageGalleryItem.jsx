import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, tags, largeImageURL, onOpenModal }) => {
  return (
    <GalleryItem
      onClick={() => {
        onOpenModal(largeImageURL, tags);
      }}
    >
      <GalleryImage src={url} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
