import { Toaster} from 'react-hot-toast';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./components/ RootLayout.tsx";


function App() {

    const routes = createBrowserRouter([
        {
            path: "",
            element: <RootLayout/>,
            children: [
                // {path:"/admin",element:<Admin/>},

            ]
        }
    ])

  return (
      <>
          <Toaster
              position="top-right"
              toastOptions={{
                  style: {
                      width: '200px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                  }
              }}
          />
          <RouterProvider router={routes}/>
      </>
  )
}

export default App


