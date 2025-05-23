import { createBrowserRouter } from 'react-router-dom' // Removed Route
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>,
    },
    {
      path: '/pastes',
      element: <div>
        <Navbar/>
        <Paste/>
      </div>,
    },
    {
      path: '/pastes/:id',
      element: <div>
        <Navbar/>
        <ViewPaste/>
      </div>,
    },
  ]
);
function App() {
  return (
    <div>
       <RouterProvider router={router}/>
       <ToastContainer
         position="top-right"
         autoClose={3000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
         icon={true} // ensure icon is enabled
       />
    </div>
  )
}

export default App
