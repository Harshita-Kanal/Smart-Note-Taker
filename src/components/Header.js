import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Button, NavLink
} from 'reactstrap';
import { Collapse } from 'reactstrap';
import './header.css';

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
                    <NavLink href="" className="btn"><span className="fa fa-home fa-lg"></span> Home </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="" className="btn"><span className="fa fa-list fa-lg"></span> Tasks </NavLink>  
                </NavItem>
                <NavItem>
                    <NavLink href="" className="btn" ><span className="fa fa-info fa-lg"></span> Discussion </NavLink>
                </NavItem>
               
            </Nav>
            <Nav className="ml-auto" navbar>
                
                <NavItem>
                    <Button outline className="btn"><span className="fa fa-sign-in fa-lg"></span> Login</Button>
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