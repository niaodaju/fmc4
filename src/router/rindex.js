import React from 'react'
import {Route,Routes } from 'react-router-dom'
import Login2 from '../views/login/login2'
import AuthLogin from '../utils/AuthLogin'
import Main from '../views/main/main'
import Contact from '../views/contact'
import TeacherMain from '../views/teacher/teacherMain'
import ImageUpload from '../views/uploadExercise/upload'
export default function MRoute() {
  return (
    <Routes>
    <Route index element={<Login2/>}/>
    <Route path = "/contact" element = {<Contact/>}></Route>
    <Route path = "/login" element = {<Login2/>}></Route>
    <Route path = "/main" element = {<AuthLogin><Main/></AuthLogin>}></Route>
    <Route path = "/tmain" element = {<TeacherMain/>}></Route>
    <Route path = "/upload" element = {<ImageUpload></ImageUpload>}></Route>

  </Routes>
  )
}
