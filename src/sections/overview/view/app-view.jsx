import Container from '@mui/material/Container';
import { lazy } from 'react';
import AppCardProduct from '../app-card-product';

const LazyLoadedSlider = lazy(() => import('src/components/Slider'));
const LazyLoadedCarousel = lazy(() => import('src/components/Carousel'));
// ----------------------------------------------------------------------

export default function AppView() {
  const productCategoryId = 'f6e9ce01-e474-4270-a207-70d88aad9cb7';
  return (
    <Container sx={{ maxWidth: '1200px' }}>
      <LazyLoadedSlider />
      <LazyLoadedCarousel />
      <AppCardProduct productCa={productCategoryId} />
    </Container>
  );
}
