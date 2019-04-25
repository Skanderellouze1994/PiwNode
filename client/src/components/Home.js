import React, {Component} from 'react';
import {Launcher} from 'react-chat-window'
import axios from "axios";
import Artyom from 'artyom.js';

export class Home extends Component {

    constructor() {
        super();
        this.state = {
            messageList: []
        };
    }

    _onMessageWasSent(message) {
        console.log(message)
        this.setState({
            messageList: [...this.state.messageList, message]
        })
        axios.get('http://localhost:4000/chatbot/'+message.data.text).then(res=>{
            const artyom = new Artyom();
            artyom.initialize({
                lang:"en-US",
                debug:true,
                continuous:true,
                listen:false
            });
            artyom.say(res.data)
            console.log(res.data)
            this._sendMessage(res.data)

        })

    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }

    }

    render() {
        return (


            <section className="height-90vh py-5 flex-center jarallax" data-dark-overlay="6">
                <div className="container">
                    <style>{"\
                .sc-chat-window opened{\
                  height:330;\
                }\
              "}</style>
                    <div className="row">
                        <div className="col-lg-9 mx-auto text-white text-center">
                            <h2 className="display-md-4 font-weight-bold text-primary wow slideInUp">
                                Harvard University
                            </h2>
                            <h1 className="display-md-3 font-weight-bold text-white wow slideInUp">
                                Online Learning
                            </h1>
                            <p className="lead wow slideInUp">
                                This modern and inviting academic template is perfectly suited for school, colleges,
                                university, on-line course, and other educational institutions.
                            </p>
                        </div>
                    </div>
                </div>
                <div >
                    <Launcher
                        agentProfile={{
                            teamName: 'react-chat-window',
                            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                        }}
                        onMessageWasSent={this._onMessageWasSent.bind(this)}
                        messageList={this.state.messageList}
                        showEmoji
                    />
                </div>
            </section>
        )
    }
}
