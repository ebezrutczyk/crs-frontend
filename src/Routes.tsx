import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "./App";
import CarList from "./CarList";
import CarDetails from "./CarDetails";
import CarEdit from "./CarEdit";
import NotFound from "./NotFound";
import CarDelete from "./CarDelete";
import CarAdd from "./CarAdd";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {path: 'cars', element: <CarList />},
            {path: 'cars/:id', element: <CarDetails />},
            {path: 'edit/:id', element: <CarEdit />},
            {path: 'delete/:id', element: <CarDelete />},
            {path: 'not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to='/not-found' />},
            {path: 'cars/add', element: <CarAdd />}
        ]
    }
]

export const router = createBrowserRouter(routes);