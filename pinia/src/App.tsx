import { ListWidget } from './widgets'
import { Navbar } from './widgets'

const Main = () => (
  <main className="main">
    <ListWidget />
  </main>
);


function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
    <div className="app">
      <Navbar />
      <Main />
    </div>
    </>
  )

};

export default App
