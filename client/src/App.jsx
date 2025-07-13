// src/App.jsx
import { lazy, Suspense } from 'react';
import { useDispatch} from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {HashLoader} from "react-spinners";



// Routes
const Login = lazy(() => import('./auth/Login'));
const Signup = lazy(() => import('./auth/Signup'));
const HomeLayout = lazy(() => import('./layouts/HomeLayout'));
const DashboardLayout = lazy(() =>import ('./components/UserDashboard/layout/DashboardLayout'));
const ClientDashboard = lazy(() => import('./components/UserDashboard/dashboard/Client-dashboard'));
const VendorsDashboard = lazy(() => import('./components/UserDashboard/dashboard/Vendor-dashboard'));
const ClientProfile = lazy(() => import('./components/UserDashboard/profiles/Client-profile'));
const EventProfile = lazy(() => import('./components/UserDashboard/profiles/Event-profile'));
const EventDashboard = lazy(() =>import ('./components/UserDashboard/dashboard/Event-dashboard'));
const VendorProfile = lazy(() => import('./components/UserDashboard/profiles/Vendor-profile'))
const ChatAppLayout = lazy(() => import('./chat/layout/ChatAppLayout'));
const TodoLayout = lazy(() => import('./layouts/TodoLayout'));



function App() {


  // const LoadingFallback = () => {
  //   <div className="flex items-center justify-center h-screen bg-black text-white">
  //     <HashLoader/>
  //   </div>
  // };


  const dispatch = useDispatch();
  // const { isCheckingAuth } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

  // if (isCheckingAuth) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>

  //   );
  // }

  const browserRouter = createBrowserRouter([
    { path: '/', element: <HomeLayout /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },

    {
      path: '/dashboard',
      element: (
        <DashboardLayout />

      ),
    },
    {
      path: '/client-dashboard',
      element: (
        <ClientDashboard />
      ),
    },
    {
      path: '/vendor-dashboard',
      element: (
        <VendorsDashboard />
      ),
    },
    {
      path: '/event-dashboard',
      element: (
        <EventDashboard />
      ),
    },
    {
      path: '/chat-app',
      element: (
        <ChatAppLayout />
      ),
    },
    {
      path: '/todo',
      element: (
        <TodoLayout />
      ),
    },

    // These are public or semi-protected, depending on your auth logic
    { path: '/client-profile/:id', element: <ClientProfile /> },
    { path: '/event-profile/:id', element: <EventProfile /> },
    { path: '/vendor-profile/:id', element: <VendorProfile /> },

    // Fallback route for 404
    { path: '*', element: <div className="text-center p-10">404 - Page Not Found</div> },
  ]);

  return (

    <Suspense fallback={<div className='items-center h-screen flex justify-center'><HashLoader/></div>}>
    
      <RouterProvider router={browserRouter} />
     
    </Suspense>
  )
}

export default App;
