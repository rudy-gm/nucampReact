import React from "react";
import { Link } from "react-router-dom";

function ReturnArrow (props){

    return (
        <Link to='/directory'>
            
            <div>
                <i className="fa fa-arrow-left"></i>
                Return
            </div>

        </Link>
    )
}

export default ReturnArrow; 
