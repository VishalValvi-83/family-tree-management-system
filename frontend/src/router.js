import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import UpdateTree from './pages/updateTree/updateTree.js';
import LoginForm from './pages/Auth/Login.js';
import SignupForm from './pages/Auth/SignUp.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'login',
        element: <LoginForm />
    },
    {
        path: 'signup',
        element: <SignupForm />
    },
    {
        path: '/update-tree/:_id',
        element: <UpdateTree />
    },
    {
        path: '*',
        element: <div className='container'>
            <h1>Page not found</h1>
            <button className='backward-link' onClick={() => window.location.href = '/'}>Go to Home</button>
        </div>
    }
]);

export default router;

