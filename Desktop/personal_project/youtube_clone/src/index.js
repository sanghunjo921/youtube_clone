import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { VideoDetail } from './pages/VideoDetail';
import { Videos } from './pages/Videos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound />,
    children: [
      {index: true, element: <Videos/>}, //대표페이지 
      {path: 'videos', element: <Videos/>},
      {path: 'videos/:keyword', element: <Videos/>},
      {path: 'videos/watch/:videoId', element: <VideoDetail/>}
    ]
  }
]);
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode> 이거 쓰면 리액트 랜더링 2번씩 일어남
  <RouterProvider router = {router} />
  // </React.StrictMode>
);

