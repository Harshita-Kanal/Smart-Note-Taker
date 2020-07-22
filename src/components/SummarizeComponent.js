import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import {Row} from 'reactstrap'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import './Summarize.css';

class Summarize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            item: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value
         });
    }

   
    handleSubmit(event) {
        alert('Submitted note: ' + this.state.value);
        event.preventDefault();
        console.log(this.state.value)
        this.setState({
            value: ""

        });

        console.log(this.state.value)
        
    }

    render() {
        return (                                   
            <div>                            
                <form onSubmit={this.handleSubmit}>                        
                    <TextareaAutosize className="textarea" aria-label="minimum height" rows= "5" cols = "40"  value={this.state.value} onChange={this.handleChange} />
                        <div  className="text"> 
                            <Button  type = "submit" variant="contained" color="secondary">
                                    Add Item
                            </Button>                           
                        </div>    
                 </form>                  
            </div>          
        );
    }
}

export default Summarize;