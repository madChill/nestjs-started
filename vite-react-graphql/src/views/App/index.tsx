import { RouterProvider } from 'react-router-dom';
import { createRouter } from "../../router";

const App = () => {
    const router = createRouter()
    return <RouterProvider router={router} />;
};

export default App;
