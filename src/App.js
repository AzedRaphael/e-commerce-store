import './App.css';
import { BrowserRouter as Router,Routes, Route,Navigate } from 'react-router-dom'
import {Navbar, Sidebar,Footer,Hero} from "./components"
import {Home, Checkout,Singleproduct, Cart, Error,Login,Register,ProductSec,ForgotPassword,Verify,ResetPassword} from "./pages"
import { useGlobalContext } from './context/authContext';

function App() {
  //const user = false;
  // const { isLoading } = useGlobalContext();
  // if (isLoading) {
  //   return (
  //     <section className='page page-center'>
  //       <div className='loading'></div>
  //     </section>
  //   );
  // }
  return (
    
    <Router>
      <Navbar/>
      <Hero/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        {/* <Private  path="/checkout"><Checkout /></Private>
        <Route  path="/private"><Private /></Route> */}
         <Route  path="/checkout" element={<Checkout/>} />
         <Route  path="/products/:category" element={<ProductSec/>} />
        <Route  path="/products/:category/:id" element={<Singleproduct />} />
        {/* <Route exact path="/products/:id" children={<Singleproduct/>} /> */}
        <Route  path="/cart" element={<Cart />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route  path="/user/verify-email" element={<Verify />} />
        <Route  path="/user/reset-password" element={<ResetPassword />} />
        <Route  path="*"element={<Error />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
