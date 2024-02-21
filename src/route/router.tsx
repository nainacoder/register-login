import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import RegistrationForm from '../components/Registration';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '200px', marginBottom: '120px' }}>
        {localStorage.getItem('currentUser') ? (
          <Outlet />
        ) : (
          <Navigate to={'/login'} />
        )}
      </div>
      <Footer />
    </>
  );
};

const UnAuthorisedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    element: <UnAuthorisedLayout />,
    children: [
      {
        path: '/register',
        element: <RegistrationForm />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
    ],
  },
]);

export default router;
