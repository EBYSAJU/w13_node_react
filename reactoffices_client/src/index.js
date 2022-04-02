import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer'
import Header from './Header'
import Nav from './Nav'
import Offices from './Offices'
class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state={noOffice:false}
    }

noOffice=()=>{

    this.setState({noOffice:true})
}
render(){
    if(this.state.noOffice){
        return(
            <div>
                <Header companyName="classicmodels.com"/>
                <Nav/>
    <button  onClick={()=>this.noOffice()}>remove office component</button>
    <Footer authorName="Eby Saju"/>
            </div>

        )
    }
    else{
        return(
            <div>
                    <Header companyName="classicmodels.com"/>
                <Nav/>
                <Offices/>
    <button  onClick={()=>this.noOffice()}>remove office component</button>
    <Footer authorName="Eby Saju"/>

            </div>

        )
    }
}

}



ReactDOM.render(
  <React.StrictMode>


                <Page/>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

