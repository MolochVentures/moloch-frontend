import React, { Component } from 'react';
import { Button, Divider, Dropdown, Form, Grid, Icon, Input, Segment, GridColumn } from "semantic-ui-react";

class AssetsFields extends Component {
    constructor(props) {
        super(props);

        this.handleAsset = this.handleAsset.bind(this);
        this.deleteAsset = this.deleteAsset.bind(this);
    }

    handleAsset(event, { value, name }) {
        this.props.onHandleAsset({ value, name, assetIndex: this.props.assetIndex });
    }

    deleteAsset() {
        this.props.onHandleDeleteAsset({ assetIndex: this.props.assetIndex });
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
            <Grid.Row className="asset_field_row">
                <Grid.Column mobile={8} tablet={7} computer={7} className="asset_field_grid">
                    <Dropdown name="asset" className="asset" icon="ethereum" selection options={assets} placeholder="Currency" onChange={this.handleAsset} />
                </Grid.Column>
                <Grid.Column mobile={7} tablet={7} computer={7} className="asset_field_grid" >
                    <Input name="amount" className="asset_amount" placeholder="Enter Amount" type="number" onChange={this.handleAsset} />
                </Grid.Column>
                <Grid.Column mobile={1} tablet={2} computer={2} className="asset_field_grid" textAlign="center" >
                    <div className="subtext">
                        <Icon name='times' className="delete_icon" link onClick={this.deleteAsset} />
                    </div>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default class ProjectProposalSubmission extends Component {
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
        this.setState({ assets });
    }

    handleInput(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleAsset(event) {
        let assets = this.state.assets;
        assets[event.assetIndex][event.name] = event.value;
        // let tribute = 0;
        // Object.keys(assets).map((key) => {
        //     tribute+=parseInt(assets[key].amount);
        // });
        // this.setState({tribute: tribute});
        this.setState({ assets });
    }

    handleDeleteAsset(event) {
        let assets = this.state.assets;
        assets.splice(event.assetIndex, 1);
        this.setState({ assets });
    }

    handleSubmit() {
        let self = this;

        fetch('http://127.0.0.1:3000/proposals/projectproposal', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify(this.state)
        }).then(response => response.json()).then(responseJson => {
            if (responseJson.id) {
                console.log('Proposal submitted');
                self.props.history.push('/proposals');
            } else {
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
                            {/* <Grid.Column width={10}> */}
                            <Grid.Column mobile={16} tablet={16} computer={12} >
                                <Input name="title" transparent size='big' inverted placeholder='Proposal Title' onChange={this.handleInput} value={this.state.title} />
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            {/* <Grid.Column width={10}> */}
                            <Grid.Column mobile={16} tablet={16} computer={12} >
                                <Grid columns='equal'>
                                    {/* <Grid.Column> */}
                                    <Grid.Column mobile={16} tablet={16} computer={8} >
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
                                            <Grid columns={3} className="assets_field" >
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
                            <GridColumn mobile={16} tablet={8} computer={8} className="submit_button">
                                <Button size='large' color='red' onClick={this.handleSubmit}>Submit Proposal</Button>
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div>
        );
    }
}
