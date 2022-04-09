import React from "react"
import Offices from './Offices'
class Employees extends React.Component {
    constructor(props) {
        super(props)
        this.state={"officecode":"3"}


    }

componentDidMount() {
    this.getAllEmployees()
 }

 componentDidUpdate(prevProps) {
    if (prevProps.officeCode !== this.props.officeCode) {
        this.setState({officecode:this.props.officeCode})
      this.getAllEmployees();
    }else{
         this.getAllEmployees();
    }
  }




getAllEmployees=()=>{

    fetch("http://localhost:8000/offices/"+this.state.officecode+"/employees",
    {
        method: 'GET',
    }
)
    .then((response) => {
        //executes after we get a response from the server
        console.log(response)//show the whole FETCH response object on console
        document.getElementById("status").innerHTML = response.status + ' ' + response.statusText
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
                let employees = data.employees;
                console.log("employees",data.employees)
                //TO DO display all customters in a table
                console.log("reached all offices")
                let html = ''
                html += '<table>'
                for (let i = 0; i < employees.length; i++) {
                    html += '<tr><td>' + employees[i].employeenumber + '</td><td>' + employees[i].lastname + '</td><td>' + employees[i].firstname + '</td><td>' + employees[i].extension + '</td><td>' + employees[i].email + '</td><td>' + employees[i].officecode + '</td><td>' + employees[i].reportsto + '</td><td>' + employees[i].jobtitle + '</td></tr>'
                }
                html += '</table>'
                console.log(html)

                document.getElementById("response_data").innerHTML = html
                document.getElementById("count_data").innerHTML = employees.length
                console.log(employees)// show all on client console
            }
        },

        (error) => {
            // only NO RESPONSE URL errors will trigger this code
            document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
        }
    )

 }
 render() {
     return (
         <div>


    <div id="response_data"></div>

         </div>



     )
 }

}
export default Employees