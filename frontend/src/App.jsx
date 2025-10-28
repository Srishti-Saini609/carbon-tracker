import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from './pages/Dashboard'
import Activities from './pages/Activities'
import Insights from './pages/Insights'
import ProgressInsights from "./pages/ProgressInsights";
import Achievements from './pages/Achievements'
import Progress from './pages/progress'
import Learn from './pages/Learn'
import Guides from './pages/Guides'
import EnvironmentalImpact from './pages/EnviromentalImpact'
import HomePage from './pages/HomePage'
import EmailLoginPage from "./pages/EmailLoginPage";
import EmailSignupPage from './pages/EmailSignupPage';






function App() {
  return (
    <Routes>


        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/activities' element={<Activities/>}/>
        <Route path='/insights'  element={<Insights/>} />
        <Route path="/progress" element={<ProgressInsights />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/guides" element={<Guides/>}/>
        <Route path="/learn/environmental-impact" element={<EnvironmentalImpact />} />
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/emaillogin" element={<EmailLoginPage />} />
        <Route path="/emailsignup" element={<EmailSignupPage/>}/>
       
        



       
    </Routes>
  )
}

export default App