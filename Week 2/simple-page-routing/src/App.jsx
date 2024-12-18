import { Link, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Contact from "./components/Contact"
import About from "./components/About"
import Test from "./components/Test"
import CorrectAnswer from "./components/CorrectAnswer"
import WrongAnswer from "./components/WrongAnswer"

const App = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/test">Assessment</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/test" element={<Test />} >
          <Route path="correct" element={<CorrectAnswer/>}/>
          <Route path="wrong" element={<WrongAnswer/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
