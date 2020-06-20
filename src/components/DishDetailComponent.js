import React, {Component} from 'react';
import {Card,CardText,CardBody,CardTitle, CardImg} from 'reactstrap';

class DishDetail extends Component{ 

    renderDish(dish) {
        return(
          <Card key={dish.id}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        );
      }
      renderComments(comments){
          return(
            //   <ul className="list-unstyled">
                  comments.map((comment)=>{
                      return(
                          <ul key={comment.id} className="list-unstyled">
                              <li>
                                  {comment.comment}
                              </li>
                              <br></br>
                              <li>
                                  {comment.author} ,
                                  {comment.date}
                              </li>
                              <br></br>
                              
                          </ul>
                      );
                  })
            //   </ul>
          );
      }

    //using functions here
    render(){
        const dish = this.props.dish;
        if (dish!=null && dish.comments!=null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>
                            Comments
                        </h4>
                        {this.renderComments(dish.comments)}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                </div>
            );
        }
    }
}
// exporting DishDetail 
export default DishDetail;