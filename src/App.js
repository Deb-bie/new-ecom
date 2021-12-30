import {BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/context';
import AddProducts from './pages/addproducts';
import Home from './pages/Home';
import PageNotFound from './pages/pagenotfound';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Products from './pages/products/products.js'




function App() {
  return (
    <AuthProvider>
      <Router>

        <Routes>

          <Route exact path="/" element={<Home />} />

          <Route path="signin" element={<Signin />} />

          <Route path="signup" element={<Signup />} />

          <Route path="addproducts" element={<AddProducts />} />

          <Route path="products" element={<Products />}  />

          <Route path='*' element={<PageNotFound />} /> 


        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
