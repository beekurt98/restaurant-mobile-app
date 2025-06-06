import { createContext, useContext, useEffect, useState } from 'react'
import './App.css'
import './css/Products.css'
import './css/Settings.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { createClient } from '@supabase/supabase-js'
import Navbar from './components/Navbar'
import Checkout from './pages/Checkout'
import Profile from './profile-pages/Profile'
import PaymentMethods from './profile-pages/PaymentMethods'
import Addresses from './profile-pages/Addresses'
import PasswordMgmt from './profile-pages/PasswordMgmt'
import PastOrders from './profile-pages/PastOrders'

// Todo:
// ekstralar: notifications
// "sipariş oluşturuldu"
// supabase signup için trigger eklenecek
// profiles policy değiştir (enable users to view their data only)
// eğer supabase kioska hata veriyorsa user_id kısmını gözden geçir
// loading ekle

export const supabase = createClient('https://sxkbwpcardxrhfuqzvzc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4a2J3cGNhcmR4cmhmdXF6dnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzQ3MjAsImV4cCI6MjA1ODA1MDcyMH0.f6pWVT3SGve_Xmcs_m2lH0YDX9anp3hI915eNgjfgTI')

export const SupabaseContext = createContext(null)

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartObj, setCartObj] = useState(() => {
    const savedCart = localStorage.getItem("cartObj");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event)
      if (event === 'SIGNED_IN') {
        setAuthUser(session.user.user_metadata);
        setUserId(session.user.user_metadata.sub);
      }

      if (event === 'SIGNED_OUT') {
        setAuthUser(null);
      }
    })


    return () => data.subscription.unsubscribe();
  }, []);


  return (
    <>
      <SupabaseContext.Provider value={{ supabase, cart, setCart, cartObj, setCartObj, authUser, userId }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/password-management" element={<PasswordMgmt />} />
          <Route path="/past-orders" element={<PastOrders />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </SupabaseContext.Provider>
      <Navbar />
    </>
  )
}

export default App
