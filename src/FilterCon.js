import React, { createContext, useContext, useReducer,useState,useEffect } from 'react'
import {mini} from "./SideNav";
export const FilterContext=createContext("");
const FilterCon = ({children},{props}) => {
    // const datasetter=(minnr)=>{
    //     setMin(minnr);
    // }
    // console.log({props.data});
    const[min,setMin]= useState('');      
    const[max,setMax]=useState("");
    return (
        <>
        <p>{props}</p>
           <FilterContext.Provider value={{min,setMin}}>
         {children}
        </FilterContext.Provider> 
        </>
    );
}
// export const FilterState = () => {
//     return useContext(FilterContext);
//   };
export default FilterCon;
