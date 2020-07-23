import React, { Component } from 'react';
import './Note.css'

class Note extends Component {
constructor(props){
    super(props);
    this.state = {
        title: '',
        itembody: ''
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
                    <section className='add-item'>
                        <form>
                            <input className="inputitem" type="text" name="title" placeholder="What's the title?" onChange={this.handleChange} value={this.state.title} />
                            <input className="inputitem" type="text" name="itembody" placeholder="What to remember?" onChange={this.handleChange} value={this.state.itembody} />
                            <button className = "formbutton">Add Item</button>
                        </form>
                    </section>
                    <section className='display-item'>
                        <div className='wrapper'>
                            <ul>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Note;