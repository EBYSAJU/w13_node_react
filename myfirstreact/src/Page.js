import React from "react"
import Header from './Header'
import Footer from './Footer'
import SelectList from './SelectList'

const provinces=[ {code:'QC',name:'Quebec'},{code:'ON',name:'Ontario'},{code:'NB',name:'New-Brunswick'}]
const countries=[{code:'CA',name:'Canada'},{code:'US',name:'USA'},{code:'IN',name:'India'},{code:'MX',name:'Mexixo'}]
class Page extends React.Component{
  render(){
            return (
            <div>
                <Header companyName="blabla.com"/>
                <p>Hello World !</p>
                <SelectList theList={provinces}/>
                <SelectList theList={countries}/>
                <Footer authorName="Stéphane Lapointe"/>
            </div>
        )
    }
}
//
//<SelectList array={countries}/>
export default Page