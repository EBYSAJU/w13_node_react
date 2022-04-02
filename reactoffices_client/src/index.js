import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer'
import Header from './Header'
import Nav from './Nav'
import Offices from './Offices'




ReactDOM.render(
  <React.StrictMode>
   <div>
                <Header companyName="classicmodels.com"/>
                <Nav/>
                <Offices/>
            <Footer authorName="Eby Saju"/>
            </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

