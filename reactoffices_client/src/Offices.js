import React from "react"
class Offices extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            "isLoaded":false,
            "officecode":-1,
            "city":"",
            "country":"",
            "addressline1":"",
            "addressline2":"",
            "state":"",
            "phone":"",
            "postalcode":"",
            "territory":""





    }
}
componentDidMount(){
    this.getOffice(3)
}
componentWillUnmount(){
    alert("offices component will be removed from DOM ")
}
    handleChange=(event)=>{

        this.setState({[event.target.name]:event.target.value})

       // onChange={()=>this.getOffice(this.state.officecode)}

     }
       //code =this.state.officecode
    // twofunctions = code =>{
       // this.handleChange()
       // this.getOffice(code)


     //}
clearForm=()=>{
    this.setState({

        "officecode":"",
        "city":"",
        "country":"",
        "addressline1":"",
        "addressline2":"",
        "state":"",
        "phone":"",
        "postalcode":"",
        "territory":"",
        "data":"",
        "code":""
    }
    )
}

     saveOffice=()=>{


let country = this.state.country
let officecode = this.state.officecode
let city=this.state.city
let state = this.state.state
let phone = this.state.phone
let postalcode = this.state.postalcode
let territory = this.state.territory
let addressline1 = this.state.addressline1
let addressline2 = this.state.addressline2


let updateData ={'country':country,'city':city,'officecode':officecode,'territory':territory,'state':state,'phone':phone,'postalcode':postalcode,'addressline1':addressline1,'addressline2':addressline2}
console.log("data",updateData)
//let updateDataJson=JSON.stringify(updateData)
//console.log("objectdata",updateDataJson)
//console.log("objectdatacoun",updateDataJson.country)
       console.log("new:",this.state.country)
        fetch("http://localhost:8000/update/",
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },


            body: JSON.stringify(updateData)
        }
    )

        .then((response) => {
            // execute after we get the response from the server
            console.log(response)//show the whole FETCH response object on console
            document.getElementById("status").innerHTML = response.status + ' ' + response.statusText+'  data has been updated'
            if (!response.ok) {
                // handle response code other than 200 because
                return ""
            } else {
                //here server responds with text/html, get the text
                return response.text()
            }
            //execute second .then when done
        })
        .then(
            //executes after the first .then is complete
            (server_text) => {// catch what is returned from first .then
                // show text reply on page
                document.getElementById("response_data").innerHTML = server_text
            },

            (error) => {
                // only NO RESPONSE URL errors will trigger this code
                document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
            }
        )



     }

    getOffice=(code)=>{
        document.getElementById("status").innerHTML = "waiting for server reply"


        fetch("http://localhost:8000/offices/" + code,
            {
                method: 'GET',
            }
        )
            .then((response) => {
                //executes after we get a response from the server
                console.log(response)//show the whole FETCH response object on console
              //  document.getElementById("status").innerHTML = response.status + ' ' + response.statusText
                if (!response.ok) {
                    // handle errors, response code other than 200 because
                    return {} //empty object, no data
                } else {
                    //ok code 200, convert data in FETCH response to JSON data
                    return response.json()
                }
                //execute second .then when done
            })
            .then(
                //executes after the first .then
                (data) => {// catch the data returned by first .then
                    //check for not empty data object
                    if (Object.keys(data).length !== 0) {
                        // execute only when code is 200
                        let offices = data.offices;
                        //TO DO display all customters in a table
                        this.setState({
                            "isLoaded":true,
                            "officecode":offices[0].officecode,
                            "country":  offices[0].country,
                            "city":offices[0].city,
                            "addressline1":offices[0].addressline1,
                            "addressline2":offices[0].addressline2,
                            "state":offices[0].state,
                            "phone":offices[0].phone,
                            "postalcode":offices[0].postalcode,
                            "territory":offices[0].territory,
                            "data":{
                                "officecode":offices[0].officecode,
                                "country":  offices[0].country,
                                "city":offices[0].city,
                                "addressline1":offices[0].addressline1,
                                "addressline2":offices[0].addressline2,
                                "state":offices[0].state,
                                "phone":offices[0].phone,
                                "postalcode":offices[0].postalcode,
                                "territory":offices[0].territory
                            }
                        }

                           )

                        console.log("here",offices)// show all on client console
                    }
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }
            )

    }
render(){
if(!this.state.isLoaded){
    return (
<div>

<h1>offices from classicmodels database</h1> <br/>
<button onClick={()=>this.getOffice(3)}>Get office no.3</button>
server status<div id="status">click on button above</div>

</div>
    )
}else{



    return (
        <div>
            <h1>offices from classicmodels database</h1> <br/>
            {/*officeCode: {this.state.officecode} <br/>
            city: {this.state.city} <br/>
            country: {this.state.country}
            <br/>*/}
            <input type="text"name="code"id=""value={this.state.code}onChange={(event)=>this.handleChange(event)} />
    <button onClick={()=>this.getOffice(this.state.code)}>Get selected offices</button>
    server status<div id="status">click on button above</div>
    <form>
OfficeCode:<input type="text"name="officecode"id=""value={this.state.officecode}onChange={(event)=>this.handleChange(event)} /><br/>
AddressLine1:<input type="text"name="addressline1"id=""value={this.state.addressline1}onChange={(event)=>this.handleChange(event)}/><br/>
AddressLine2:<input type="text"name="addressline2"id=""value={this.state.addressline2}onChange={(event)=>this.handleChange(event)}/><br/>
Country:<input type='text'name='country'id=""value={this.state.country}onChange={(event)=>this.handleChange(event)}/><br/>
City:<input type='text'name='city'id=""value={this.state.city}onChange={(event)=>this.handleChange(event)}/><br/>
State:<input type='text'name='state'id=""value={this.state.state}onChange={(event)=>this.handleChange(event)}/><br/>
Phone:<input type='text'name='phone'id=""value={this.state.phone}onChange={(event)=>this.handleChange(event)}/><br/>
PostalCode:<input type='text'name='postalcode'id=""value={this.state.postalcode}onChange={(event)=>this.handleChange(event)}/><br/>
Territory:<input type='text'name='territory'id=""value={this.state.territory}onChange={(event)=>this.handleChange(event)}/><br/>


{/*this.setState("data":[{this.state.officecode},{this.state.addressline1},{this.state.addressline2},{this.state.country},{this.state.city},{this.state.state},{this.state.phone},{this.state.postalcode},{this.state.territory}])*/}


 <button type='button' onClick={()=>this.saveOffice()}>save</button>
 <button type='button' onClick={()=>this.clearForm()}>clearForm</button>
</form>

        </div>
    )
}


}
}
export default Offices