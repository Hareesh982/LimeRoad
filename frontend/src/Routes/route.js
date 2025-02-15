import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Women from '../pages/Women';
import Men from '../pages/Men';
import Kids from '../pages/Kids';
import Offers from '../pages/Offers';
import Vmart from '../pages/Vmart';
import Home from '../pages/Home';
import LoginPage from '../pages/Login'
import Menclothing from '../pages/Menclothing';
import Womenclothing from '../pages/Womenclothing';
import Kidsclothing from '../pages/Kidsclothing';
import Details from '../pages/Details';

let AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={<Home/>} />
                    <Route path='/women'    element={<Women/>}       />
                    <Route path='/men'      element={<Men/>}         />
                    <Route path='/kids'     element={<Kids/>}        />
                    <Route path='/offers'   element={<Offers />}     />
                    <Route path='/vmart'    element={<Vmart />}      />
                    <Route path='/login'    element={<LoginPage/>}   />
                    <Route path='/men-clothing' element={<Menclothing/>}    />
                    <Route path='/women-clothing' element={<Womenclothing/>}    />
                    <Route path='/kids-clothing' element={<Kidsclothing/>}  />
                    <Route path='/details'  element={<Details/>}     />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute
