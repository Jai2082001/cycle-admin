import React from 'react'
import {  defaults, Bar, Line } from 'react-chartjs-2';
import classes from './Statics.module.css'
import titleimg from '../images/Background.png'
import { useState, useEffect } from 'react'
import {Table} from 'react-bootstrap'
import { useReducer } from 'react';
import StaticJr from './StaticJr';


defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const BarChart = () => {

  const [subAdmin, changeSubAdmin] = useState([]);
  const [products, changeProducts] = useState([]);
  const [loading, changeLoading] = useState(false);
  const tableStateFunc = (prevState, action) => {
    if(action.users && action.products){
      return {users:action.users, products: action.products}
    }
  }
  const [tableState, dispatch] = useReducer(tableStateFunc, {});

  


  console.log(tableState)
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_FETCH_LINK}/saleStats`).then((response)=>{
      return response.json()
    }).then((response)=>{
      console.log(response)
      dispatch(response.data)
    })
  }, [])

  

  return (
    <div className={classes.parentDiv}>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {tableState.users &&
          <> 
          {tableState.users.map((singleItem, idx) => {
            console.log(idx)
            return (
              <StaticJr info={singleItem} index={idx}></StaticJr>
            )
          })}
          </>
          }
          
        </tbody>
      </Table>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {tableState.products  && 
          <>
            {tableState.products.map((singleItem) => {
            console.log(singleItem)
            return (
              <tr>
                <td>{ singleItem.name }</td>
                <td>{ singleItem.price }</td>
                <td>{ singleItem.quantity }</td>
              </tr>
            )
          })}
          </>}
          
        </tbody>
      </Table>
      <div className={classes.imgContainer}>
        <img src={titleimg} alt="" />
      </div>
  
    </div>
  )
}

export default BarChart
