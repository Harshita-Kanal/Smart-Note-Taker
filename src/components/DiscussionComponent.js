import React, { Component } from 'react';
import './discussion.css';
import firebase, {auth, provider} from '../firebase.js';
import { Button } from 'reactstrap';

class Discussion extends Component {
    constructor(props){
        super(props);
        this.state = {
            project: '',
            comment: '',
            username: '',
            items: [],
            // user: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.login = this.login.bind(this); 
        // this.logout = this.logout.bind(this);
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
            name: this.state.username,
            user: this.props.user.displayName || this.props.user.email
            
        }
        itemsRef.push(item);
        this.setState({
            project: '',
            comment: '',
            username: ''
        });
    }

    componentDidMount() {
        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         this.setState({ user });
        //     }
        // });
        const itemsRef = firebase.database().ref(' projects ');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    projectitle: items[item].projectitle,
                    commentbody: items[item].commentbody,
                    name: items[item].name,
                    user: items[item].user
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
                {this.props.user ?
                    <div className='user-profile'>
                        <img src={this.props.user.photoURL} />
                    </div>
                :
                   <div></div>
                }
                <div className = "container" >
                    <div className = "row">
                                <div className = "col-12 col-md-4">
                                    <section className='add-project'>
                                        <form onSubmit={this.handleSubmit}>
                                            <input className="project" type="text" name="project" placeholder="Add a project" onChange={this.handleChange} value={this.state.project} />
                                            <input className="project" type="text" name="comment" placeholder="Add a comment" onChange={this.handleChange} value={this.state.comment}/>
                                        <input className="project" type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.props.user ? this.props.user.displayName || this.props.user.email : this.state.username}/>
                                           
                                           {this.props.user ?
                                            <button  className="addit">Add project</button>
                                            :
                                            <div></div>
                                           }
                                        </form>
                                    {
                                    this.props.user ?    
                                            <table><button onClick={this.props.logout} className = "login">Logout</button></table>    
                                    :
                                            <table><button onClick={this.props.login} className="login">Login to discuss</button></table>
                                    }
                                    </section>
                                         

                                </div>
                                <div className = "col-12 col-md">
                                        <ul className="myprojects">
                                            {this.state.items.map((item) => {
                                                return (
                                                    <li className="myproject" key={item.id}>
                                                        <h3>{item.projectitle}</h3>
                                                        <p>{item.commentbody}</p>
                                                        <p><span id="tag">{item.user}</span> 
                                                            {this.props.user ?
                                                                item.user === this.props.user.displayName || item.user === this.props.user.email ? 
                                                             <button className="circle" onClick={() => this.removeItem(item.id)}>Remove Item</button> : null
                                                             :
                                                             <div></div>
                                                 
                                                             }
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