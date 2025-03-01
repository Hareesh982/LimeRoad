import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Women from '../pages/Women';
import Men from '../pages/Men';
import Kids from '../pages/Kids';
import Offers from '../pages/Offers';
import Vmart from '../pages/Vmart';
import Home from '../pages/Home';
import LoginPage from '../pages/Login'
import Mainclothing from '../pages/Mainclothing';
import Details from '../pages/Details';
import CartDetails from '../pages/cartProduct';
import Payment from '../pages/Payment';
import RegisterPage from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import CustomerProfile from '../pages/CustomerProfile';
import VendorProfile from '../pages/VendorProfile';
import Cancel from '../pages/Cancel';
import Success from '../pages/Success';

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
                    <Route path='/main-clothing' element={<Mainclothing/>}    />
                    <Route path='/details'  element={<Details/>}       />
                    <Route path='/cart' element={<CartDetails/>}    />
                    <Route path='/payment' element={<Payment/>} />
                    <Route path='/register' element={<RegisterPage/>} />
                    <Route path='/reset-password' element={<ResetPassword/>} />
                    <Route path='/customerprofile' element={<CustomerProfile/>} />
                    <Route path='/vendorprofile' element={<VendorProfile/>} />
                    <Route path='/cancel' element={<Cancel/>} />
                    <Route path='/success' element={<Success/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute
