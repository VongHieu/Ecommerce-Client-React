/* eslint-disable arrow-body-style */
// import { Stack } from '@mui/material';
// import { ProductCardView } from 'src/components/card';
import PropTypes from 'prop-types';
import ProductCardView from './product-card-view';

const AppCardProduct = ({ productCa }) => {
  return <ProductCardView productCa={productCa} />;
};

export default AppCardProduct;

AppCardProduct.propTypes = {
  productCa: PropTypes.string,
};
