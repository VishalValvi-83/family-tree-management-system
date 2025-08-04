import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import UpdateTree from './component/updateTree/updateTree.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/update-tree/:_id',
    element: <UpdateTree />
  },
  {
    path: '*',
    element: <div>
      <h1>Page not found</h1>
      <button><a className='backward-link' href="/">Go to Home</a></button>
    </div>
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
