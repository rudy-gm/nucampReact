import React from "react";
import { Link } from "react-router-dom";


const NextArrow = ({campsite}) => {

    return (
        <div>
            <Link to={`/directory/${campsite.id + 1}`}>
                
                <i className="fa fa-arrow-right"></i>

                Next
                </Link>
        </div>
    );
    
};

export default NextArrow;