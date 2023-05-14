import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Api } from 'services/ApiService';
import { Application } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchGallery(searchQuery, page);
    }
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setGallery([]);
    setPage(1);
    setSearchQuery(searchQuery);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const fetchGallery = async (searchQuery, page) => {
    try {
      setLoading(true);
      const newGallery = await Api(searchQuery, page);
      if (newGallery.length === 0) {
        Notify.warning('There are no pictures for your request');
        return;
      }
      setGallery(prevGallery => [...prevGallery, ...newGallery]);
    } catch (error) {
      Notify.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onOpenModal = (largeImageURL, tags) => {
    setModalOpen(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  const isEndPagination = gallery.length !== page * 12;

  return (
    <Application>
      <Searchbar onSubmit={handleFormSubmit} checkPrevQuery={searchQuery} />
      <ImageGallery images={gallery} onOpenModal={onOpenModal}></ImageGallery>
      {!isLoading && gallery && !isEndPagination && (
        <Button onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onCloseModal={onCloseModal}
        />
      )}
    </Application>
  );
};
