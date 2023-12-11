import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function () {
    const navigate = useNavigate();
    var logged = false;
    useEffect(()=>{
        if (!localStorage.getItem("user")){
            navigate('/Login');
        }
    },[]);
  return (
    <>
    
    </>
  )
}
