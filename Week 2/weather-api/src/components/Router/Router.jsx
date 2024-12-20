import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Weather from '../Weather/Weather';
import Error404 from '../Error/Error404';

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/:location" element={<Weather />} />
            <Route path="/" element={<Weather />} />
            <Route path="*" element={<Error404 error={{message: "404 Not found"}}/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router;