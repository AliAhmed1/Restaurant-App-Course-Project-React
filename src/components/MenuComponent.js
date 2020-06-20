import React, {Component} from 'react';
import {Card, CardImgOverlay,CardTitle, CardImg} from 'reactstrap';
import DishDetail from './DishDetailComponent';

class Menu extends Component {
    //Definition of constructor of this component 
    constructor(props){
        super(props);
        //state of component 
        this.state = {
            selectedDish: null
        }
    }
    //Change the state of the componente like this:
    onDishSelect(dish){
        this.setState({selectedDish: dish});
    }
 
    render(){
        const menu = this.props.dishes.map((dish)=>{
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={()=>this.onDishSelect(dish)}>
                        <CardImg width="100%" object src={dish.image} alt = {dish.name}/>
                        <CardImgOverlay body className="ml-5">
                            <CardTitle >
                                {dish.name}
                            </CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div>
                <DishDetail dish= {this.state.selectedDish}/>
                </div>
            </div>
        );
    }
} 
export default Menu; 