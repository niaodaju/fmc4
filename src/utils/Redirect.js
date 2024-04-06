import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export default function Redirect({to}) {
    const nav = useNavigate()
    useEffect(()=>{
        nav(to,{replace:true})
    })
  return null
}
