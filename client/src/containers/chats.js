import React, {Component} from 'react'
import {render} from 'react-dom'
import {Launcher} from '../components/chats/index'
import io from 'socket.io-client';
import {connect} from "react-redux";

const axios = require('axios');
const socket = io();


class Chats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            newMessagesCount: 0,
            isOpen: false
        };
        this.messageReceive = this.messageReceive.bind(this);

    }

    componentDidMount() {
        socket.on('newmsg', this.messageReceive);

    }

    componentWillReceiveProps(nextProps, nextContext) {
            const {user} = this.props.user
/        console.log(user)


        axios.get('http://localhost:4000/chats/detail/'+this.props.id)
            .then(res => {
                var list = []
                res.data.forEach(function (data) {
                    list.push({
                        author: 1 === 1 ? 'me' : 'them',
                        type: data.type,
                        data: {
                            text: data.data
                        }
                    })
                })
                //console.log(list);
                //console.log(res.data);
                //this.setState({messageList: list});
                //this.props.messages=res.data;
            })

    }

    messageReceive(msg) {
        //console.log("aaaaa")
        //console.log(msg)
        const {user} = this.props.user
        const {newMessagesCount} = this.state
        console.log(user._id)
        console.log(msg.author._id)
        if (!(user._id === msg.author._id)){
            console.log(this.props.id)
            console.log(msg.chatId)
            if(this.props.id===msg.chatId) {
                this.setState({
                    messageList: [...this.state.messageList, {
                        author: 'them',
                        type: msg.type,
                        data: msg.data,
                        photo: msg.author.profile_photo,
                        name: msg.author.name
                    }],
                    newMessagesCount: newMessagesCount + 1
                })
            }}
        //console.log(msg)

    }

    _onFilesSelected(fileList) {
        const objectURL = window.URL.createObjectURL(fileList[0]);
        this.setState({
            messageList: [...this.state.messageList, {
                type: 'file', author: "me",
                data: {
                    url: objectURL,
                    fileName: fileList[0].name
                }
            }]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
            this.setState({
                newMessagesCount: newMessagesCount,
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: {text}
                }]
            })
        }
    }

    _onMessageWasSent(message) {
        //console.log(message);
        const {user} = this.props
        var m = {
            ...message,
            author: user.user._id,
            chatId:this.props.id

        }
        axios.post('http://localhost:4000/chats/addMsg/'+this.props.id, m).then(function (res) {
            //console.log(res)
            socket.emit('msg', m)
        });
        this.setState({
            messageList: [...this.state.messageList, {...message,photo:user.profile_photo}]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: {text}
                }]
            })
        }
    }

    _handleClick() {
        const {user} = this.props.user;
        axios.get('http://localhost:4000/chats/detail/'+this.props.id)
            .then(res => {
                /*var list = []
                res.data.forEach(function (data) {
                    list.push({
                        author: 1 === 1 ? 'me' : 'them',
                        type: data.type,
                        data: {
                            text: data.data
                        }
                    })
                })
                */
                 console.log(user)

                this.setState({
                    messageList: res.data.map((chat)=>{return{
                        author:user._id===chat.author._id?'me':'them',
                        type:chat.type,
                        data:chat.data,
                        photo:chat.author.profile_photo,
                        name:chat.author.name

                    }})
                })
                //console.log(list);
                //console.log(res.data);
                //this.setState({messageList: list});
                //this.props.messages=res.data;
            })

        this.setState({
            isOpen: !this.state.isOpen,
            newMessagesCount: 0,
            //messageList: list
        })
    }

    render() {
        return <div>

            <Launcher
                agentProfile={{
                    teamName: this.props.name,
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                onFilesSelected={this._onFilesSelected.bind(this)}
                messageList={this.state.messageList}
                newMessagesCount={this.state.newMessagesCount}
                handleClick={this._handleClick.bind(this)}
                isOpen={this.state.isOpen}
                showEmoji
            />

        </div>
    }
}

function mapStateToProps(state) {
    //console.log(state)
    const {user} = state.authentication;
    const {alert} = state;

    return {
        user,
        alert
    };
}

const connectedLoginPage = connect(mapStateToProps)(Chats);
export {connectedLoginPage as Chats};

