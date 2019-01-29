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
                <Grid.Column mobile={14} tablet={5} computer={7} className="asset_field_grid">
                    <Dropdown name="asset" className="asset" icon="ethereum" selection options={assets} placeholder="Currency" onChange={this.handleAsset} />
                </Grid.Column>
                <Grid.Column mobile={2} tablet={1} computer={2} className="asset_field_grid mobile_delete_icon" textAlign="right">
                    <div className="subtext">
                        <Icon name='times' className="delete_icon" link onClick={this.deleteAsset} />
                    </div>
                </Grid.Column>
                <Grid.Column mobile={14} tablet={10} computer={7} className="asset_field_grid" >
                    <Input name="amount" className="asset_amount" placeholder="Enter Amount" type="number" onChange={this.handleAsset} />
                </Grid.Column>
                <Grid.Column mobile={2} tablet={1} computer={2} className="asset_field_grid computer_delete_icon" textAlign="center">
                    <div className="subtext">
                        <Icon name='times' className="delete_icon" link onClick={this.deleteAsset} />
                    </div>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

// class FormErrors extends Component {

//     render() {
//         const formErrors = this.props.formErrors;
//         return (
//             <div className='formErrors'>
//                 {formErrors ? <p>{formErrors}</p> : null}
//             </div>
//         )
//     }

// }

export default class ProjectProposalSubmission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            tribute: 0,
            description: '',
            assets: [],
            formErrors: { title: '', description: '', assets: '' },
            titleValid: false,
            descriptionValid: false,
            assetsValid: false,
            formValid: false
        }

        this.addAsset = this.addAsset.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAsset = this.handleAsset.bind(this);
        this.handleDeleteAsset = this.handleDeleteAsset.bind(this);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let descriptionValid = this.state.descriptionValid;
        let assetsValid = this.state.assetsValid;

        switch (fieldName) {
            case 'title':
                titleValid = value !== '';
                fieldValidationErrors.title = titleValid ? '' : 'Title is invalid';
                break;
            case 'description':
                descriptionValid = value !== '';
                fieldValidationErrors.description = descriptionValid ? '' : 'Description is invalid';
                break;
            case 'assets':
                Object.keys(value).map((key) => {
                    for (var i in value[key]) {
                        if (Object.keys(value[key]).length <= 1) {
                            assetsValid = false;
                            return false;
                        } else {
                            if (value[key][i] === null || value[key][i] === "") {
                                assetsValid = false;
                                return false;
                            }
                        }
                    }
                    assetsValid = true;
                    return true;
                });
                fieldValidationErrors.assets = assetsValid ? '' : 'Asset is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            titleValid: titleValid,
            descriptionValid: descriptionValid,
            assetsValid: assetsValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.titleValid && this.state.descriptionValid && this.state.assetsValid });
    }

    addAsset() {
        let assets = this.state.assets ? this.state.assets : [];
        assets.push({});
        this.setState({ assets });
    }

    handleInput(event) {
        let name = event.target.name;
        let value = event.target.value
        this.setState({ [name]: value },
            () => {
                this.validateField(name, value);
            });
    }

    handleAsset(event) {
        let assets = this.state.assets;
        assets[event.assetIndex][event.name] = event.value;
        this.setState({ assets },
            () => {
                this.validateField('assets', assets);
            });
    }

    handleDeleteAsset(event) {
        let assets = this.state.assets;
        assets.splice(event.assetIndex, 1);
        this.setState({ assets },
            () => {
                this.validateField('assets', assets);
            });
    }

    handleSubmit() {
        let self = this;
        var project = {
            id: this.state.id,
            title: this.state.title,
            tribute: this.state.tribute,
            description: this.state.description,
            assets: this.state.assets
        }
      
        if (this.state.formValid) {
            fetch('http://127.0.0.1:3000/events', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify({ id: '', name: 'Project proposal', payload: project })
            }).then(response => response.json()).then(responseJson => {
                if (responseJson.id) {
                    self.props.history.push('/proposals');
                } else {
                    alert('Error processing proposal');
                }
            });
        } else {
            alert('Please, fill any missing field');
        }
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
                                {/* <FormErrors formErrors={this.state.formErrors.title} /> */}
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
                                            {/* <FormErrors formErrors={this.state.formErrors.description} /> */}
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
                                                        <Icon name='add' className="add_icon" link onClick={this.addAsset} />
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
                                                {/* <FormErrors formErrors={this.state.formErrors.assets} /> */}
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
