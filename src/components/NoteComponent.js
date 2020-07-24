import React, { Component } from 'react';
import './Note.css'

class Note extends Component {
constructor(props){
    super(props);
    this.state = {
        title: '',
        itembody: '',
        tag: ''
    }
    this.handleChange = this.handleChange.bind(this);
}

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>Notes</h1>

                <div className="containeritem"> 
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-12 col-md-6">
                    <section className='add-item'>
                        <form>
                            <input className="inputitem" type="text" name="title" placeholder="What's the title?" onChange={this.handleChange} value={this.state.title} />
                            <input className="inputitem" type="text" name="itembody" placeholder="What to remember?" onChange={this.handleChange} value={this.state.itembody} />
                                        <input className="inputitem" type="text" name="tag" placeholder="Set a Tag" onChange={this.handleChange} value={this.state.tag} />
                            <button className = "formbutton">Add Item</button>
                        </form>
                    </section>
                            </div>
                            <div className="col-12 col-md-6">
                    <section className='display-item'>
                        <div className='wrapper'>
                            <ul>
                                <li>Hekko</li>
                            </ul>
                        </div>
                    </section>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        );
    }
}

export default Note;