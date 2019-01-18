import React, { Component } from 'react';
import {Button, Divider, Dropdown, Form, Grid, Icon, Input, Segment, GridColumn} from "semantic-ui-react";

class AssetsFields extends Component {
    constructor(props) {
        super(props);

        this.handleAsset = this.handleAsset.bind(this);
        this.deleteAsset = this.deleteAsset.bind(this);
    }

    handleAsset(event, {value, name}) {
        this.props.onHandleAsset({value, name});
    }

    deleteAsset() {
        console.log('Does nothing yet');
    }

    render() {
        const assets = [
            {
                'key': 1,
                'value': 10,
                'text': 'ETH'
            },
            {
                'key': 2,
                'value': 10,
                'text': 'BTC'
            },
            {
                'key': 3,
                'value': 11,
                'text': 'LTC'
            }
        ];
        return (
            <Grid columns={16}>
                <Grid.Column width={7}>
                    <Dropdown name="currency" icon="ethereum" selection options={assets} placeholder="Currency" onChange={this.handleAsset}/>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Input name="amount" placeholder="Enter Amount" type="number" onChange={this.handleAsset}/>
                </Grid.Column>
                <Grid.Column width={2}>
                    <div className="subtext">
                        <Icon name='times' className="delete_icon" link onClick={this.deleteAsset} />
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}

export default class MembershipProposalSubmission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            shares: '',
            tribute: 0,
            description: '',
            assets: []
        }

        this.addAsset = this.addAsset.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAsset = this.handleAsset.bind(this);
    }

    addAsset() {
        let assets = this.state.assets ? this.state.assets : [];
        assets.push({
            address: '',
            symbol: '',
            amount: 0,
            price: 0,
            logo: ''
        });

        this.setState({assets});
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleAsset(event) {
        console.log(event);
    }

    handleSubmit = () => console.log(this.state);

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
                                                    <AssetsFields key={i} currency={row.symbol} amount={row.amount} onHandleAsset={this.handleAsset}></AssetsFields>
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
