/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, CardActions, CardContent, CardMedia, Chip, Tooltip, Typography } from '@mui/material';
import { primary } from 'src/theme/palette';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { productAsyncThunk } from 'src/redux/actions/product-action';
import { fNumber } from 'src/utils/format-number';
import { Link } from 'react-router-dom';

const BAKEND_URL = import.meta.env.VITE_BACKEND_URL;
const data = [
  {
    id: 1,
    name: 'Thịt heo xịn xòn',
    price: 200000,
    image: 'carousel_1.jpg',
    weight: 0.4,
  },
  {
    id: 2,
    name: 'Thịt heo xịn xòn',
    price: 200000,
    weight: 0.4,
    image: 'carousel_2.jpg',
  },
  {
    id: 3,
    name: 'Thịt heo xịn xòn',
    price: 200000,
    weight: 0.4,
    image: 'carousel_3.jpg',
  },
  {
    id: 4,
    name: 'Thịt heo xịn xòn',
    price: 200000,
    weight: 0.4,
    image: 'carousel_4.jpg',
  },
  {
    id: 5,
    name: 'Thịt heo xịn xòn',
    price: 200000,
    weight: 0.4,
    image: 'carousel_4.jpg',
  },
  {
    id: 6,
    name: 'Thịt heo xịn xòn',
    price: 200000,
    weight: 0.4,
    image: 'carousel_4.jpg',
  },
];

const ProductCard = ({ product }) => {
  const handleClickProduct = (id) => {
    console.log(id);
  };

  return (
    <BoxShadowCardItem onClick={() => handleClickProduct(product.id)}>
      <CardMedia
        sx={{ height: 145, width: 145, margin: '0 auto', mb: 0.5, position: 'relative' }}
        image={`${BAKEND_URL}images/products${product.avatar}`}
        title={product.name}
      >
        <Chip
          label={`${product.discount}%`}
          sx={{
            position: 'absolute',
            top: 20,
            left: -30,
            textAlign: 'center',
            backgroundColor: primary.red,
            color: 'white',
            fontSize: '12px',
          }}
          size="small"
        />
      </CardMedia>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          padding: '0 !important',
          mb: 0.3,
        }}
      >
        <Tooltip title={product.name}>
          <Typography
            variant="normal"
            fontSize="14px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {product.name}
          </Typography>
        </Tooltip>
        <Typography variant="normal" fontSize="13px">
          {`ĐVT: ${product.weight} KG`}
        </Typography>
      </CardContent>
      <CardContent sx={{ padding: '0 !important', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="normal" fontSize="13px" color={primary.red}>
          {`${fNumber(product.price)}đ`}
        </Typography>
        <Typography
          variant="normal"
          sx={{ color: primary.priceSale, fontSize: '13px', textDecoration: 'line-through' }}
        >
          {`${fNumber(product.price_sale)}đ`}
        </Typography>
      </CardContent>
      <CardActions>
        <StyleButton>THÊM VÀO GIỎ</StyleButton>
      </CardActions>
    </BoxShadowCardItem>
  );
};

const ProductCardView = ({ productCa }) => {
  const dispatch = useDispatch();
  const { productCategories } = useSelector((x) => x.rootReducer.productCategories);
  const { products } = useSelector((x) => x.rootReducer.products);

  useEffect(() => {
    dispatch(productAsyncThunk.getProductByProductCategory(productCa));
  }, [dispatch, productCa]);

  const productFilter = useMemo(() => {
    return products.filter((item) => item.product_category_id === productCa);
  }, [productCa, products]);

  const productCategoryFilter = useMemo(() => {
    return productCategories.find((item) => item.id === productCa);
  }, [productCa, productCategories]);

  return (
    <Box mb={3}>
      <TitleCard to={productCategoryFilter?.alias}>{productCategoryFilter?.name}</TitleCard>
      <Box gap={1} display="flex" flexDirection="column" mb={4}>
        <StyleCardProduct>
          {productFilter.map((product, index) => {
            return product.status && product.home_flag ? (
              <StyleCardItem key={product.id}>
                <ProductCard product={product} />
              </StyleCardItem>
            ) : (
              ''
            );
          })}
        </StyleCardProduct>
      </Box>
    </Box>
  );
};

export default ProductCardView;

ProductCard.propsType = {
  product: PropTypes.any,
};

const StyleCardProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  background-color: white;
`;

const StyleCardItem = styled.div`
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  border-radius: 0px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 12px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  &:hover {
    box-shadow: rgba(153, 153, 153, 0.6) 0px 0px 6px 0px;
  }
`;

const StyleButton = styled.button`
  margin: 0 auto;
  width: 100%;
  font-size: 13px;
  border: 1px solid #e4222e;
  padding: 7px 0;
  background-color: transparent;
  color: #e4222e;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    background-color: #e4222e;
    color: white;
  }
`;

const BoxShadowCardItem = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleCard = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 24px;
  display: inline-block;
  margin: 10px 0;
`;
