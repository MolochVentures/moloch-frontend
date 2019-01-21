import React, { Component } from 'react';
import { Grid, Button } from "semantic-ui-react";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.loginWithMetamask = this.loginWithMetamask.bind(this);
    }

    loginWithMetamask() {
        if (window.ethereum) { // Modern DApp browsers need to enable Metamask access.
            let web3 = window.web3;
            let ethereum = window.ethereum;
            let message = "Please, sign the following one-time message to authenticate: " + Math.floor(Math.random() * 1000000);
            let self = this;
    
            // Request account access if needed.
            try {
                ethereum.enable().then(() => {
                    return new Promise((resolve, reject) =>
                        web3.personal.sign(web3.fromUtf8(message), web3.eth.coinbase, (error, signature) => {
                                if (error) {
                                    console.log("The message needs to be signed.");
                                    return reject(error);
                                }
                                return resolve(signature);
                            }
                        )
                    ).then((signature) => {
                        web3.personal.ecRecover(message, signature, function(error, result){
                            if (!error) {
                                self.props.history.push('/');
                            } else {
                                console.log("Error while retrieving your public key.");
                            }
                        });
                    });
                });
            } catch (error) {
                console.log("Metamask needs to be enabled.");
            }
        } else if (window.web3) { // Legacy DApp browsers don't need to enable access.
            let web3 = window.web3;
            let message = "Please, sign the following one-time message to authenticate: " + Math.floor(Math.random() * 1000000);
            let self = this;
    
            // Acccounts always exposed, so the message can be sent to be signed directly.
            return new Promise((resolve, reject) =>
                    web3.personal.sign(web3.fromUtf8(message), web3.eth.coinbase, (error, signature) => {
                        if (error) {
                            console.log("The message needs to be signed.");
                            return reject(error);
                        }
                        return resolve(signature);
                    }
                )
            ).then((signature) => {
                web3.personal.ecRecover(message, signature, function(error, result){
                    if (!error) {
                        self.props.history.push('/');
                    } else {
                        console.log("Error while retrieving your public key.");
                    }
                });
            });
        } else { // Non-DApp browsers won't work.
            console.log("Metamask needs to be installed and configured.");
        }
    }

    render() {
        return (
            <div id="login">
                <Grid columns={15} centered>
                    <Grid.Column style={{"marginTop": "25vh", "marginLeft":"-40px"}}>
                        <Button size='large' color='grey' onClick={this.loginWithMetamask}>Login</Button>
                    </Grid.Column>
                </Grid>

            </div>
            );
        }
    }
