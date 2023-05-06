import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.baseURL = `https://pixabay.com/api/`;
axios.defaults.params = {
  key: '34675961-3292246094f20b380874b474f',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const Api = async (query, page) => {
  const response = await axios.get(`?q=${query}&page=${page}`);
  return response.data.hits;
};

Api.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
