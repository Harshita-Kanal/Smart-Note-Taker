import React, { Component } from 'react';
import firebase from '../firebase.js';


class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
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
        const itemsRef = firebase.database().ref(' tasks ');
        const item = {
            tasktitle: this.state.title,
            body: this.state.description,
            user: this.props.user ? this.props.user.displayName || this.props.user.email : '' 
        }
        itemsRef.push(item);
        this.setState({
            title: '',
            description: '',

        });
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref(' tasks ');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    tasktitle: items[item].tasktitle,
                    body: items[item].body,
                    user: items[item].user
            
                });
            }
            this.setState({
                items: newState
            });
        });
    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/ tasks /${itemId}`);
        itemRef.remove();
    }


    render() {
        const timestamp = new Date();
        let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp).toString();
        return (
            <div>

                <div className="containeritem">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md">
                                <section className='add-item'>
                                    <form onSubmit={this.handleSubmit}>
                                        <input className="inputitem" type="text" name="title" placeholder="Add a task" onChange={this.handleChange} value={this.state.title} />
                                        <input className="inputitem" type="text" name="description" placeholder="Add the description" onChange={this.handleChange} value={this.state.description} />
                                        {
                                        this.props.user ?
                                        <button className="formbutton">Add task</button> :
                                         <h3 className = "warning">Login to add</h3> 
                                        }
                                    </form>
                                </section>
                            </div>

                            <section className='display-item'>
                                <div className='wrapper'>

                                    <ul className="myitems">
                                        {this.state.items.map((item) => {
                                            if (this.props.user)
                                                if (item.user === this.props.user.displayName || item.user === this.props.user.email) 
                                            return (
                                                <li className="myitem" key={item.id}>
                                                    <h3>{item.tasktitle}</h3>
                                                    <p>{item.body}</p>
                                                    <p> {date}
                                                        <button className="circle" onClick={() => this.removeItem(item.id)}>Remove Task</button>
                                                    </p>
                                                </li>
                                            )
                                            else
                                            return (
                                               
                                                <div key={item.id}></div>
                                               
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

export default Task;