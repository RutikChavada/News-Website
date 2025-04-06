import React from "react"
import Header from "./components/common/header/Header"
import "./App.css"
import Homepages from "./components/home/Homepages"
import Footer from "./components/common/footer/Footer"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepages} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App
