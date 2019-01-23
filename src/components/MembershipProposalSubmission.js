import React, { Component } from 'react';
import {Button, Divider, Dropdown, Form, Grid, Icon, Input, Segment, GridColumn} from "semantic-ui-react";

class AssetsFields extends Component {
    constructor(props) {
        super(props);

        this.handleAsset = this.handleAsset.bind(this);
        this.deleteAsset = this.deleteAsset.bind(this);
    }

    handleAsset(event, {value, name}) {
        this.props.onHandleAsset({value, name, assetIndex: this.props.assetIndex});
    }

    deleteAsset() {
        this.props.onHandleDeleteAsset({assetIndex: this.props.assetIndex});
    }

    render() {
        const assets = [
            {
                'key': 1,
                'value': 'ETH',
                'text': 'ETH'
            },
            {
                'key': 2,
                'value': 'BTC',
                'text': 'BTC'
            },
            {
                'key': 3,
                'value': 'LTC',
                'text': 'LTC'
            }
        ];
        return (
            <Grid.Row>
                <Grid.Column width={7}>
                    <Dropdown name="asset" icon="ethereum" selection options={assets} placeholder="Currency" onChange={this.handleAsset}/>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Input name="amount" placeholder="Enter Amount" type="number" onChange={this.handleAsset}/>
                </Grid.Column>
                <Grid.Column width={2}>
                    <div className="subtext">
                        <Icon name='times' className="delete_icon" link onClick={this.deleteAsset} />
                    </div>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default class MembershipProposalSubmission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            status: '',
            closingTime: '',
            gracePeriod: '',
            title: '',
            shares: 0,
            tribute: 0,
            description: '',
            assets: []
        }

        this.addAsset = this.addAsset.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAsset = this.handleAsset.bind(this);
        this.handleDeleteAsset = this.handleDeleteAsset.bind(this);
    }

    addAsset() {
        let assets = this.state.assets ? this.state.assets : [];
        assets.push({});

        this.setState({assets});
    }

    handleInput(event) {
        if (event.target.name === 'shares') {
            this.setState({[event.target.name]: parseInt(event.target.value)});
        } else {
            this.setState({[event.target.name]: event.target.value});
        }
    }

    handleAsset(event) {
        let assets = this.state.assets;
        assets[event.assetIndex][event.name] = event.value;
        this.setState({assets});
    }

    handleDeleteAsset(event) {
        let assets = this.state.assets;
        assets.splice(event.assetIndex, 1);
        this.setState({assets});
    }

    handleSubmit() {
        let self = this;

        fetch('http://127.0.0.1:3000/proposals/membershipproposal', {
            method: 'POST',
            headers: {'Accept': 'application/json','Content-Type': 'application/json',},
            body: JSON.stringify(this.state)
        }).then(response => response.json()).then(responseJson => {
            if (responseJson.id) {
                console.log('Proposal submitted');
                self.props.history.push('/members');
            } else {
                console.log(this.state);
                console.log('Error processing proposal');
            }
        });
    };

    render() {
        return (
            <div id="proposal_submission">
                <Form>
                    <Grid centered columns={16}>
                        <Grid.Row stretched>
                            <Grid.Column width={10}>
                                <Input name="title" transparent size='big' inverted placeholder='Proposal Title' onChange={this.handleInput} value={this.state.title} />
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row stretched>
                            <Grid.Column width={10}>
                                <Segment className="blurred box">
                                    <Form.Input name="shares" label="Request voting shares" placeholder="Shares" fluid type="number" onChange={this.handleInput} value={this.state.shares}/>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <Grid columns='equal'>
                                    <Grid.Column>
                                        <Segment className="blurred box">
                                            <Form.TextArea name="description" label="Description" placeholder="Type here" rows={15} onChange={this.handleInput} value={this.state.description}></Form.TextArea>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment className="blurred box">
                                            <Grid columns={16}>
                                                <Grid.Column width={14}>
                                                    <div className="subtext">
                                                        Request Amount
                                                    </div>
                                                </Grid.Column>
                                                <Grid.Column width={2}>
                                                    <div className="subtext">
                                                        <Icon name='add' link onClick={this.addAsset} />
                                                    </div>
                                                </Grid.Column>
                                            </Grid>
                                            <Grid columns='equal'>
                                                {this.state.assets.map((row, i) =>
                                                    <AssetsFields key={i} assetIndex={i} onHandleAsset={this.handleAsset} onHandleDeleteAsset={this.handleDeleteAsset}></AssetsFields>
                                                )}
                                            </Grid>
                                            <Divider />
                                            <Grid columns="equal" className="value_shares">
                                                <Grid.Row>
                                                    <Grid.Column textAlign="center">
                                                    <p className="subtext">Tribute Value</p>
                                                    <p className="amount">${this.state.tribute}</p>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Segment>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <GridColumn width={3}>
                                <Button size='large' color='red' onClick={this.handleSubmit}>Submit Proposal</Button>
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div>
        );
    }
}
