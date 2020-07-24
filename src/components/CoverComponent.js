import React, { Component } from 'react';
import cover from './cover_picture.svg';
import './cover.css';
import Button from '@material-ui/core/Button'
import  {Link} from 'react-router-dom'


class Cover extends Component {

    render() {
        return (
            <div className = "imgitem">
                <img src = {cover} className = "coverimage"/>
                <p className = "taghead">Take a note now!</p>
                <Button href = "/note"   className = "tagbutton" variant="contained" color="secondary">             
                        Get Started!                           
               </Button> 
            </div>
        );
    }
}

export default Cover;