import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FiSearch } from 'react-icons/fi';
import {
  SearchContainer,
  Form,
  SubmitButton,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleNameChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    const { checkPrevQuery, onSubmit } = this.props;

    if (searchQuery.trim() === '') {
      return Notify.warning('Please enter your search query');
    }
    if (checkPrevQuery.toLowerCase() === searchQuery.toLowerCase()) {
      return Notify.warning('Please enter a new search query');
    }

    onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchContainer>
        <Form onSubmit={this.handleSubmit}>
          <SubmitButton type="submit">
            <FiSearch style={{ fontSize: '2em' }} />
          </SubmitButton>
          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
          />
        </Form>
      </SearchContainer>
    );
  }
}

Searchbar.propTypes = {
  checkPrevQuery: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
