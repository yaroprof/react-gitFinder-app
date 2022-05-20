import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import {GithubProvider} from './context/github/GithubContext'



function App() {
  return (
    <GithubProvider>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar/>
          <main className='container mx-auto px-3 pb-12'>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/About' element={<About/>}></Route>
              <Route path='/NotFound' element={<NotFound/>}></Route>
              <Route path='/*' element={<NotFound/>}></Route>
            </Routes>

          </main>
          <Footer/>
        </div>
      </Router>
    </GithubProvider>

        

  );
}

export default App;
