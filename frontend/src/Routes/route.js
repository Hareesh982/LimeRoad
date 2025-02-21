import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Women from '../pages/Women';
import Men from '../pages/Men';
import Kids from '../pages/Kids';
import Offers from '../pages/Offers';
import Vmart from '../pages/Vmart';
import Home from '../pages/Home';
import LoginPage from '../pages/Login'
import Womenclothing from '../pages/Womenclothing';
import Kidsclothing from '../pages/Kidsclothing';
import Details from '../pages/Details';
import CartDetails from '../pages/cartProduct';
import Payment from '../pages/Payment';
import RegisterPage from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import CustomerProfile from '../pages/CustomerProfile';
import VendorProfile from '../pages/VendorProfile';

let AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={<Women/>} />
                    <Route path='/women'    element={<Women/>}       />
                    <Route path='/men'      element={<Men/>}         />
                    <Route path='/kids'     element={<Kids/>}        />
                    <Route path='/home'     element={<Home/>}        />
                    <Route path='/offers'   element={<Offers />}     />
                    <Route path='/vmart'    element={<Vmart />}      />
                    <Route path='/login'    element={<LoginPage/>}   />
                    <Route path='/main-clothing' element={<Womenclothing/>}    />
                    <Route path='/kids-clothing' element={<Kidsclothing/>}  />
                    <Route path='/details'  element={<Details/>}       />
                    <Route path='/cart' element={<CartDetails/>}    />
                    <Route path='/payment' element={<Payment/>} />
                    <Route path='/register' element={<RegisterPage/>} />
                    <Route path='/reset-password' element={<ResetPassword/>} />
                    <Route path='/customerprofile' element={<CustomerProfile/>} />
                    <Route path='/vendorprofile' element={<VendorProfile/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute
