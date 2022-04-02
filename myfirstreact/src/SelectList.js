import React from 'react'
class SelectList extends React.Component{
    render (){
        let array = this.props.theList.map(
             (element)=>{
                return(
                    <option value={element.code}>{element.name}</option>
                )
            }
        )
        return(
            <select  >{array}</select>
        )
    }
}
export default SelectList