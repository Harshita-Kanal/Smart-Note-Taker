import React, { Component } from 'react';
import './discussion.css';
import firebase from '../firebase.js';

class Discussion extends Component {
    constructor(props){
        super(props);
        this.state = {
            project: '',
            comment: '',
            username: '',
            items: [],
            user: null
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
        const itemsRef = firebase.database().ref(' projects ');
        const item = {
            projectitle: this.state.project,
            commentbody: this.state.comment,
            name: this.state.username
        }
        itemsRef.push(item);
        this.setState({
            project: '',
            comment: '',
            username: ''
        });
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref(' projects ');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    projectitle: items[item].projectitle,
                    commentbody: items[item].commentbody,
                    name: items[item].name
                });
            }
            this.setState({
                items: newState
            });
        });
    }


    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/ projects /${itemId}`);
        itemRef.remove();
    }



    render() {
        return (
            <div>
                {/* <h1>Discussion</h1> */}
        <div className = "containeritem">
            
                <div className = "container" >
                    <div className = "row">
                                <div className = "col-12 col-md-4">
                                    <section className='add-project'>
                                        <form onSubmit={this.handleSubmit}>
                                            <input className="project" type="text" name="project" placeholder="Add a project" onChange={this.handleChange} value={this.state.project} />
                                            <input className="project" type="text" name="comment" placeholder="Add a comment" onChange={this.handleChange} value={this.state.comment}/>
                                            <input className="project" type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username}/>
                                            <button className="addit">Add project</button>
                                        </form>
                                    </section>
                                </div>
                                <div className = "col-12 col-md">
                                        <ul className="myprojects">
                                            {this.state.items.map((item) => {
                                                return (
                                                    <li className="myproject" key={item.id}>
                                                        <h3>{item.projectitle}</h3>
                                                        <p>{item.commentbody}</p>
                                                        <p><span id="tag">{item.name}</span> 
                                                            <button className="circle" onClick={() => this.removeItem(item.id)}>Remove Item</button>
                                                        </p>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                </div>
                         </div>           
                    </div>
            </div>
        </div>
       
        );
    }
}

export default Discussion;