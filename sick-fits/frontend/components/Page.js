import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div>
      <p>page</p>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
