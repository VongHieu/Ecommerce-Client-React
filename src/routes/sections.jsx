import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const HomePage = lazy(() => import('src/pages/home'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ProductCategoryPage = lazy(() => import('src/pages/product-category'));
export const ProductDetailPage = lazy(() => import('src/pages/product-detail'));
export const CartPage = lazy(() => import('src/pages/cart'));
export const CheckoutPage = lazy(() => import('src/pages/checkout'));
export const ProfilePage = lazy(() => import('src/pages/profile'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'gio-hang', element: <CartPage /> },
        { path: 'danh-muc-san-pham/:alias', element: <ProductCategoryPage /> },
        { path: 'san-pham/:alias', element: <ProductDetailPage /> },
        { path: 'thanh-toan', element: <CheckoutPage /> },
        { path: 'customer/:alias', element: <ProfilePage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
