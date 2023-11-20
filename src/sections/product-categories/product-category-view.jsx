/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import {
  Box,
  Collapse,
  Container,
  List,
  ListItemButton,
  Typography,
  styled as MUIStyled,
} from '@mui/material';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { primary } from 'src/theme/palette';
import { ProductCard } from 'src/components/card';
import { shadows } from 'src/theme/shadows';
import { productAsyncThunk } from 'src/redux/actions/product-action';
import { StyleCardItem, StyleCardProduct } from '../styled';

export default function ProductCategoryView() {
  const { alias } = useParams();
  const [open, setOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { productCategories } = useSelector((x) => x.rootReducer.productCategories);
  const { products } = useSelector((x) => x.rootReducer.products);

  useEffect(() => {
    dispatch(productAsyncThunk.getProductByProductCategory());
  }, [dispatch]);

  const productFilter = useMemo(
    () => products.filter((item) => item.product_category_id === selectedId),
    [products, selectedId]
  );

  const productCategoryFilter = useMemo(
    () => productCategories.find((item) => item.id === selectedId),
    [selectedId, productCategories]
  );
  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (item) => {
    setSelectedId(item.id);
    router.push(`/danh-muc-san-pham/${item.alias}`);
  };

  useEffect(() => {
    const data = productCategories.find((item) => item.alias === alias);
    setSelectedId(data.id);
  }, [alias, productCategories]);

  return (
    <Container sx={{ maxWidth: '1200px', position: 'relative', p: '0 !important' }}>
      <Box display="flex" flexDirection="row" width="100%" borderLeft="1px solid #e0e0e0">
        <Box flex="0 0 auto" width="20%">
          <List
            sx={{ width: '100%', maxWidth: 360, color: 'black' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton
              onClick={handleClick}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="normal" fontSize={14}>
                DANH MỤC SẢN PHẨM
              </Typography>
              {open ? (
                <Iconify icon="ooui:next-ltr" rotate={1} width={15} />
              ) : (
                <Iconify icon="ooui:next-ltr" width={15} />
              )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {productCategories.map((item) => (
                  <StyledListItemButton
                    key={item.id}
                    sx={{ pl: 4 }}
                    selected={selectedId === item.id}
                    onClick={() => handleListItemClick(item)}
                  >
                    <Typography variant="normal" fontSize={13}>
                      {item.name}
                    </Typography>
                  </StyledListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </Box>
        <Box borderLeft="1px solid #e0e0e0" width="100%" pb={2} px={1}>
          <StyleCardProduct $number={4}>
            {productFilter.map((product) =>
              product.status && product.home_flag ? (
                <StyleCardItem key={product.id}>
                  <ProductCard product={product} />
                </StyleCardItem>
              ) : (
                ''
              )
            )}
          </StyleCardProduct>
        </Box>
      </Box>
    </Container>
  );
}

const StyledListItemButton = MUIStyled(ListItemButton)(({ theme }) => ({
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  '&.Mui-selected': {
    backgroundColor: primary.red,
    color: 'white',
    '&:hover': {
      backgroundColor: primary.red,
    },
  },
}));
