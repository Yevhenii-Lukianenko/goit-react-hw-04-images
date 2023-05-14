import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FiSearch } from 'react-icons/fi';
import {
  SearchContainer,
  Form,
  SubmitButton,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { checkPrevQuery, onSubmit } = props;

    if (searchQuery.trim() === '') {
      return Notify.warning('Please enter your search query');
    }
    if (checkPrevQuery.toLowerCase() === searchQuery.toLowerCase()) {
      return Notify.warning('Please enter a new search query');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchContainer>
      <Form onSubmit={handleSubmit}>
        <SubmitButton type="submit">
          <FiSearch style={{ fontSize: '2em' }} />
        </SubmitButton>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleNameChange}
        />
      </Form>
    </SearchContainer>
  );
};

Searchbar.propTypes = {
  checkPrevQuery: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
