import { render } from "@testing-library/react";
import React, { Component } from "react";

class Sum extends Component {
    constructor(props){
        super(props);
        this.state = {
            numbers: [1,2,3,4,5,6,7,8,9,10],
            initialValue: null
        }
    }

    giv(number){
        this.setState({initialValue: number});
    }

    renderGiv(number){

        if(number){

            return(
                
                <div className="row mt-3 border">
                    <div className="col">{number *1}</div>
                    <div className="col">{number *2}</div>
                    <div className="col">{number *3}</div>
                    <div className="col">{number *4}</div>
                    <div className="col">{number *5}</div>
                    <div className="col">{number *6}</div>
                    <div className="col">{number *7}</div>
                    <div className="col">{number *8}</div>
                    <div className="col">{number *9}</div>
                    <div className="col">{number *10}</div>
                </div>
                
            );
        }

        return <div>Select a Number</div>

    }


    render(){

        const numbersDisplay = this.state.numbers.map(number =>{

            return(
                <div className="col border" onClick={()=>this.giv(number)}>
                    <div className="ml-3">{number}</div>
                </div>
            );
        })

        return(

            <div className="container mb-5">
                <h2>Multiplication Table</h2>
                <div className="row">
                    {numbersDisplay}
                </div>
               
                 {this.renderGiv(this.state.initialValue)}
               

            </div>
        );
    }
}

export default Sum;