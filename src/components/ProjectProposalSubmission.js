import React, { Component } from 'react';
import {Button, Divider, Dropdown, Form, Grid, Icon, Input, Segment, GridColumn} from "semantic-ui-react";

class AssetsFields extends Component {
    constructor(props) {
        super(props);

        this.deleteAsset = this.deleteAsset.bind(this);
    }

    deleteAsset() {
        console.log('Does nothing yet');
    }

    handleAsset(event, data, process) {
        data.item.currency = data.value;
        console.log('handleAsset', data);
    }

    guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    render() {
        const assets = [
            {
                'amount': 10,
                'text': 'ETH',
                'value': 'ETH',
            },
            {
                'amount': 10,
                'text': 'BTC',
                'value': 'BTC',
            },
            {
                'amount': 11,
                'text': 'LTC',
                'value': 'LTC',
            }
        ];

        return (
            // <Grid columns={3}>
                <Grid.Row key={this.guidGenerator()} >
                    <Grid.Column width={7} key={this.guidGenerator()}>
                        <Dropdown key={this.guidGenerator()} name="currency" value={this.props.values.currency} item={this.props.values} icon="ethereum" selection options={assets} placeholder="Currency" onChange={(event, data) => this.props.updateAsset(this.props.values, 'currency', data.value)}/>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Input name="amount" placeholder="Enter Amount" value={this.props.values.amount} type="number" onChange={(e) => this.props.updateAsset(this.props.values, 'amount', Number(e.target.value))}/>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <div className="subtext">
                            <Icon name='times' className="delete_icon" link onClick={this.deleteAsset} />
                        </div>
                    </Grid.Column>
                </Grid.Row>
            // </Grid>
        );
    }
}

export default class ProjectProposalSubmission extends Component {
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
        this.updateAsset = this.updateAsset.bind(this);
    }

    addAsset() {
        let assets = this.state.assets ? this.state.assets : [];
        assets.push({
            // address: '',
            // symbol: '',
            // amount: 0,
            // price: 0,
            // logo: '',
            currency: '',
            amount: 0,
            id: this.guidGenerator()
        });

        this.setState({assets});
    }

    updateAsset(item, el, value){
    let assetsCopy = this.state.assets;
    let matches = assetsCopy.find(v => v.id.includes(item['id']));
    matches[el] = value;
    let total = 0;
    assetsCopy.map((row, i) => {
        total+=row.amount
    });
    console.log(total)
    this.setState({assetsCopy});
    }

    handleInput(event) {
        console.log('handleinput::', event.target)
        this.setState({[event.target.name]: event.target.value});
        console.log('statesss::', this.states)
    }

    handleSubmit = () => console.log(this.state);

    guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    render() {
        return (
            <div id="proposal_submission" key={this.guidGenerator()}>
                <Form key={this.guidGenerator()}>
                    <Grid centered columns={16} key={this.guidGenerator()}>
                        <Grid.Row stretched>
                            <Grid.Column width={10}>
                                <Input name="title" transparent size='big' inverted placeholder='Proposal Title' onChange={this.handleInput} value={this.state.title} />
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row key={this.guidGenerator()}>
                            <Grid.Column width={10} key={this.guidGenerator()}>
                                <Grid columns='equal' key={this.guidGenerator()}>
                                    <Grid.Column>
                                        <Segment className="blurred box">
                                            <Form.TextArea name="description" label="Description" placeholder="Type here" rows={15} onChange={this.handleInput} value={this.state.description}></Form.TextArea>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column key={this.guidGenerator()}>
                                        <Segment className="blurred box" >
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
                                            <Grid columns={3} style={{'overflow-y': 'auto', 'height': 200}} key={this.guidGenerator()}>
                                                {this.state.assets.map((row, i) =>
                                                    <AssetsFields values={row} key={row.id} updateAsset={this.updateAsset}></AssetsFields>
                                                )}
                                                    {/* <AssetsFields key={0}></AssetsFields>
                                                    <AssetsFields key={1}></AssetsFields> */}
                                            </Grid>
                                            <Divider />
                                            <Grid columns="equal" className="value_shares">
                                                <Grid.Row>
                                                    <Grid.Column textAlign="center">
                                                    <p className="subtext">Total USD Value</p>
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
