import React, { Component } from 'react';
import './Note.css'
import firebase from '../firebase.js'

class Note extends Component {
constructor(props){
    super(props);
    this.state = {
        title: '',
        itembody: '',
        tag: '',
        items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    }


    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref(' items ');
        const item = {
            itemtitle: this.state.title,
            body: this.state.itembody,
            itemtag: this.state.tag,
            user: this.props.user ? this.props.user.displayName || this.props.user.email : ''     
        }
        itemsRef.push(item);
        this.setState({
            title: '',
            itembody: '',
            tag: ''
        });
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref(' items ');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    itemtitle: items[item].itemtitle,
                    body: items[item].body,
                    itemtag: items[item].itemtag,
                    user: items[item].user
                });
            }
            this.setState({
                items: newState
            });
        });
    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/ items /${itemId}`);
        itemRef.remove();
    }


    render() {
        return (
            <div>
                
                <div className="containeritem"> 
                    <div className = "container">
                            <div className = "row">
                                <div className = "col-12 col-md">
                                    <section className='add-item'>
                                        <form onSubmit = {this.handleSubmit}>
                                            <input className="inputitem" type="text" name="title" placeholder="What's the title?" onChange={this.handleChange} value={this.state.title} />
                                            <input className="inputitem" type="text" name="itembody" placeholder="What to remember?" onChange={this.handleChange} value={this.state.itembody} />
                                            <input className="inputitem" type="text" name="tag" placeholder="Set a Tag" onChange={this.handleChange} value={this.state.tag} />
                                            {this.props.user ?
                                            <button className = "formbutton">Add Item</button> :
                                             <h3 className = "warning">Login to add</h3> 
                                            }
                                        </form>
                                    </section>
                                </div> 
                                 
                                    <section className='display-item'>
                                        <div className='wrapper'>
                                       
                                            <ul className = "myitems">
                                            {this.state.items.map((item) => {
                                            if(this.props.user)
                                               if( item.user === this.props.user.displayName || item.user === this.props.user.email) 
                                                return (
                                                    <li className= "myitem" key={item.id}>
                                                        <h3>{item.itemtitle}</h3>
                                                        <p>{item.body}</p>
                                                        <p><span id="tag">{item.itemtag}</span>
                                                        <button className = "circle" onClick={() => this.removeItem(item.id)}>Remove Item</button>
                                                        </p>
                                                    </li>
                                                )
                                               else
                                                return(
                                                    <div></div>
                                                )
                                                
                                            })}
                                            </ul>
                                      
                                        </div> 
                                    </section> 
                             </div>
                         </div>
                    </div>   
                </div>
           
        );
    }
}

export default Note;