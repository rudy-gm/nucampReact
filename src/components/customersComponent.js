import { render } from "@testing-library/react";
import React, { Component } from "react";

class Test extends Component{

    constructor(props){
      super(props);
    
    
        this.state = {
        customers:[
            {
            id:0,
             name: 'rudy'
            },
            {
             id:1,
            name:'pablo'
            }
        ],

        product:[{item:'coffee'},{weight:'300gr'},{price:3.5}]
    };
};
  
    render(){
  
      const customersList = this.state.customers.map( names => {
          return(
                <div className="col">
                    <div>
                        {names.name}
                    </div>
                    <div>
                        {names.id}
                    </div>

                </div>

            );
        });

        const displayProduct = this.state.product.map(item =>{

            return(
                <p>
                    {item.item}{item.price}
                </p>
            );

        });
        
      
  
  
  
      return(
  
        <div className="container">
          <div className="row border">
            {customersList}
          </div>
          <div>
              {displayProduct}
          </div>
        </div>
  
      );
    }
}

export default Test;