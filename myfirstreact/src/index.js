import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import App from './App'
import Nav from './Nav'
import Page from './Page'


import reportWebVitals from './reportWebVitals'
function Message(){
    return(
        <div>Hello World</div>
    )
}
const name = 'eby'
const msg=<h1>hello {name}</h1>
const message =[
    <b>Bonjour</b>,
    <i>HELLO</i>,
    <h2>Bye Bye</h2>
]
const numbers =[1,2,3,4,5]

const updateNums=numbers.map(
    (number,index) =>{
        return<li key={index} >{number}</li>
    }
)

ReactDOM.render(
  <React.StrictMode>
     <Page/>



 </React.StrictMode>,
 //<ul>{updateNums}</ul>,


  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
