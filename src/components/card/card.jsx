import { CardActions, CardContent, CardMedia, Chip, Tooltip, Typography } from '@mui/material';
import { primary } from 'src/theme/palette';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fNumber } from 'src/utils/format-number';

const BAKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProductCard({ product }) {
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
        {product.discount > 0 ? (
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
        ) : (
          ''
        )}
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
        {product.price_sale > 0 ? (
          <>
            <Typography variant="normal" fontSize="13px" color={primary.red}>
              {`${fNumber(product.price_sale)}đ`}
            </Typography>
            <Typography
              variant="normal"
              sx={{ color: primary.priceSale, fontSize: '13px', textDecoration: 'line-through' }}
            >
              {`${fNumber(product.price)}đ`}
            </Typography>
          </>
        ) : (
          <Typography variant="normal" fontSize="13px" color={primary.red}>
            {`${fNumber(product.price)}đ`}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <StyleButton>THÊM VÀO GIỎ</StyleButton>
      </CardActions>
    </BoxShadowCardItem>
  );
}

ProductCard.propTypes = {
  product: PropTypes.any,
};

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
