import React, { Component } from 'react';
import { Grid, Button } from "semantic-ui-react";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.loginWithMetamask = this.loginWithMetamask.bind(this);
        this.signWithAccessRequest = this.signWithAccessRequest.bind(this);
        this.signWithoutAccessRequest = this.signWithoutAccessRequest.bind(this);
    }

    loginWithMetamask() {
        if (window.ethereum) { // Modern DApp browsers need to enable Metamask access.
            let web3 = window.web3;
            let address = web3.eth.coinbase;
            let self = this;

            // Try getting a user by their public address.
            fetch('http://127.0.0.1:3000/members/' + address).then(response => response.json()).then(responseJson => {
                if (responseJson.error && responseJson.error.code === "ENTITY_NOT_FOUND") { // If the user didn't exist.
                    // Create it.
                    fetch('http://127.0.0.1:3000/members', {
                        method: 'POST',
                        headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                        body: JSON.stringify({address: address,nonce:0})
                    }).then(response => response.json()).then(responseJson => {
                        // Ask for a signature.
                        self.signWithAccessRequest(responseJson.nonce);
                    });
                } else { // If the user exists, ask for a signature.
                    self.signWithAccessRequest(responseJson.nonce);
                }
            });
        } else if (window.web3) { // Legacy DApp browsers don't need to enable access.
            let web3 = window.web3;
            let address = web3.eth.coinbase;
            let self = this;

            // Try getting a user by their public address.
            fetch('http://127.0.0.1:3000/members/' + address).then(response => response.json()).then(responseJson => {
                if (responseJson.error && responseJson.error.code === "ENTITY_NOT_FOUND") { // If the user didn't exist.
                    // Create it.
                    fetch('http://127.0.0.1:3000/members', {
                        method: 'POST',
                        headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                        body: JSON.stringify({address: address,nonce:0})
                    }).then(response => response.json()).then(responseJson => {
                        // Ask for a signature.
                        self.signWithoutAccessRequest(responseJson.nonce);
                    });
                } else { // If the user exists, ask for a signature.
                    self.signWithoutAccessRequest(responseJson.nonce);
                }
            });
        } else { // Non-DApp browsers won't work.
            console.log("Metamask needs to be installed and configured.");
        }
    }

    signWithAccessRequest(nonce) {
        let web3 = window.web3;
        let ethereum = window.ethereum;
        let self = this;
        let message = "Please, sign the following one-time message to authenticate: " + nonce;
        
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
                            localStorage.setItem("loggedUser", JSON.stringify({address: result, nonce}));
                            self.props.history.push('/');
                        } else {
                            console.log("Error while retrieving your public key.");
                        }
                    });
                });
            });
        } catch (error) {
            console.log("Metamask needs to be enabled.");
        };
    }

    signWithoutAccessRequest(nonce) {
        let web3 = window.web3;
        let self = this;
        let message = "Please, sign the following one-time message to authenticate: " + nonce;
        
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
                    localStorage.setItem("loggedUser", JSON.stringify({address: result, nonce}));
                    self.props.history.push('/');
                } else {
                    console.log("Error while retrieving your public key.");
                }
            });
        });
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
