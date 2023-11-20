import Container from '@mui/material/Container';
import { lazy } from 'react';
import { useSelector } from 'react-redux';

const LazyLoadedSlider = lazy(() => import('src/components/Slider'));
const LazyLoadedCarousel = lazy(() => import('src/components/Carousel'));
const LazyLoadedAppCardProduct = lazy(() => import('../app-card-product'));
const LazyLoadedAppPartner = lazy(() => import('../app-partner'));
// ----------------------------------------------------------------------

export default function AppView() {
  const { productCategories } = useSelector((x) => x.rootReducer.productCategories);
  return (
    <Container sx={{ maxWidth: '1200px' }}>
      <LazyLoadedSlider />
      <LazyLoadedCarousel />
      {productCategories.map((item) => (
        <LazyLoadedAppCardProduct productCa={item.id} key={item.id} />
      ))}
      <LazyLoadedAppPartner />
    </Container>
  );
}
