import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { checkAuth } from './redux/slices/authSlice';
import { Loader } from 'lucide-react';

import Login from './auth/Login';
import Signup from './auth/Signup';
import HomeLayout from './layouts/HomeLayout';
import DashboardLayout from './components/UserDashboard/layout/DashboardLayout';
import ClientDashboard from './components/UserDashboard/dashboard/Client-dashboard';
import VendorsDashboard from './components/UserDashboard/dashboard/Vendor-dashboard';
import ClientProfile from './components/UserDashboard/profiles/Client-profile';
import EventProfile from './components/UserDashboard/profiles/Event-profile';
import EventDashboard from './components/UserDashboard/dashboard/Event-dashboard';
import VendorProfile from './components/UserDashboard/profiles/Vendor-profile';
import ChatAppLayout from './chat/layout/ChatAppLayout';

function App() {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth()); // ✅ correct place
  }, [dispatch]);
  

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const browserRouter = createBrowserRouter([
    { path: '/', element: <HomeLayout /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/dashboard', element: authUser ? <DashboardLayout /> : <HomeLayout /> },
    { path: '/client-dashboard', element: authUser ? <ClientDashboard /> : <HomeLayout /> },
    { path: '/vendor-dashboard', element: authUser ? <VendorsDashboard /> : <HomeLayout /> },
    { path: '/client-profile/:id', element: <ClientProfile /> },
    { path: '/event-profile/:id', element: <EventProfile /> },
    { path: '/event-dashboard', element: authUser ? <EventDashboard /> : <HomeLayout /> },
    { path: '/vendor-profile/:id', element: <VendorProfile /> },
    { path: '/chat-app', element: authUser ? <ChatAppLayout /> : <HomeLayout /> },
  ]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
