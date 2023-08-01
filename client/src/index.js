import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import Error from "./components/Error"
import Main from "./components/Main"
import Students from "./components/Students"
import StudentDetails from "./components/StudentDetails"
import SessionForm from "./components/SessionForm.js"
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Error />,
    children:[
      {
        path:"/",
        element:<Main />,
        errorElement:<Error />
      },
      {
        path:"/students",
        element:<Students />,
        errorElement:<Error />
      },
      {
        path:"/students/:studentId",
        element:<StudentDetails />,
        errorElement:<Error />
      },
      {
        path:"/sessions/add",
        element:<SessionForm />,
        errorElement:<Error />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
