import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Api } from 'services/ApiService';
import { Application } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    isModalOpen: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchGallery(searchQuery, page);
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ gallery: [], page: 1, searchQuery });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchGallery = async (searchQuery, page) => {
    try {
      this.setState({ isLoading: true });
      const gallery = await Api(searchQuery, page);
      if (gallery.length === 0) {
        Notify.warning('There are no pictures for your request');
        return;
      }
      this.setState(prevState => ({
        gallery:
          prevState.searchQuery !== searchQuery
            ? gallery
            : [...prevState.gallery, ...gallery],
      }));
    } catch (error) {
      Notify.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onOpenModal = (largeImageURL, tags) => {
    this.setState({ isModalOpen: true, largeImageURL, tags });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { gallery, isLoading, isModalOpen, largeImageURL, tags, page } =
      this.state;
    const isEndPagination = gallery.length !== page * 12;

    return (
      <Application>
        <Searchbar
          onSubmit={this.handleFormSubmit}
          checkPrevQuery={this.state.searchQuery}
        />
        <ImageGallery
          images={gallery}
          onOpenModal={this.onOpenModal}
        ></ImageGallery>
        {!isLoading && gallery && !isEndPagination && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onCloseModal={this.onCloseModal}
          />
        )}
      </Application>
    );
  }
}
