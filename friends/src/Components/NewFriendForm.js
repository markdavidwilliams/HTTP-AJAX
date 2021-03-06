import React from 'react';
import axios from 'axios';
import FriendsList from './FriendsList';

const URL = "http://localhost:5000/friends";

class NewFriendForm extends React.Component {
    constructor() {
        super();
        this.state = {
            friends: [],
            friendName: '',
            friendAge: 0,
            friendEmail: '',
        }
    }

    componentDidMount () {
        axios
        .get(URL)
        .then(response => {
            this.setState({friends: response.data});
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleFormChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleFormSubmit = () => {
        const friend = {
            name: this.state.friendName,
            age: Number(this.state.friendAge),
            email: this.state.friendEmail,
        }
        if(!this.state.friendName || this.state.friendAge === 0 || !this.state.friendEmail) {
            return;
        }
        axios
            .post(URL, friend)
            .then(response => {
                console.log(response.data);
                this.setState({friends: response.data, friendName: '', friendAge: 0, friendEmail: ''});
            })
            .catch(err => console.log(err));
    };

    updateFriend = id => {
        const friend = {
            name: this.state.friendName,
            age: Number(this.state.friendAge),
            email: this.state.friendEmail,
        }
        if(!this.state.friendName || this.state.friendAge === 0 || !this.state.friendEmail) {
            return;
        }
        axios
            .put(`${URL}/${id}`, friend)
            .then(response => {
                this.setState({friends: response.data, friendName: '', friendAge: 0, friendEmail: ''})
            })
            .catch(err => console.log(err))
    }

    deleteFriend = id => {
        axios
            .delete(`${URL}/${id}`)
            .then(response => {
                this.setState({friends: response.data})
            })
    }

    render() {
        return (
            <div>
                <form onChange={this.handleFormChange}>
                    <input type="text" placeholder="Enter Friend's Name" name="friendName" />
                    <input type="number" placeholder="Enter Friend's Age" name="friendAge" />
                    <input type="text" placeholder="Enter Friend's Email" name="friendEmail" />
                    <button type="submit" onClick={this.handleFormSubmit}>Submit</button>
                </form>
                <FriendsList friends={this.state.friends} updateFriend={this.updateFriend} handleFormChange={this.handleFormChange} deleteFriend={this.deleteFriend} />
            </div>
        )
    }
}

export default NewFriendForm;