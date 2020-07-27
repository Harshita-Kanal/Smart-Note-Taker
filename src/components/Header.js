import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Button, NavLink
} from 'reactstrap';
import { Collapse } from 'reactstrap';
import './header.css';
import firebase, {auth, provider} from '../firebase.js'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
           
           
        };

        this.toggleNav = this.toggleNav.bind(this);
  
        
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

 

render()
{
return (
<div>
<React.Fragment>
<Navbar dark color = "primary" expand="md" className = "navbar" >
    
    <div className="container">
                    <NavbarBrand className="ml-1" href="/"><div> </div>SmartNote <span></span> </NavbarBrand>
        <NavbarToggler onClick={this.toggleNav} />
        
        <Collapse isOpen={this.state.isNavOpen} navbar >
            <Nav navbar className = "item">
                <NavItem >
                    <NavLink href="/note" className="btn">
                        <span className="fa fa-home fa-lg"></span> Notes </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/tasks" className="btn"><span className="fa fa-list fa-lg"></span> Tasks </NavLink>  
                </NavItem>
                <NavItem>
                    <NavLink href="/discussions" className="btn" ><span className="fa fa-info fa-lg"></span> Discussion </NavLink>
                </NavItem>
               
            </Nav>

            <Nav className="ml-auto" navbar>
                
                <NavItem>
                    { this.props.user ?
                    <Button outline onClick  = {this.props.logout} className="btn"><span className="fa fa-sign-in fa-lg"></span> Logout</Button>
                    :
                    <Button outline onClick={this.props.login} className="btn"><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                }
                </NavItem>
            </Nav>
        </Collapse>
    </div>
</Navbar>
         </React.Fragment>
         </div> 
     )
}
}


export default Header;