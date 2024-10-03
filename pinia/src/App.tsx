import { About } from './pages/about';
import { PaymentPage } from './pages/payment';
import { WithdrawPage } from './pages/withdraw';
import { Navbar } from './widgets'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>} >
          <Route index element={<PaymentPage/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/withdraw' element={<WithdrawPage/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  )

};

export default App
