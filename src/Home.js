import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import './App.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.loadProposals = this.loadProposals.bind(this);
        this.loadMembers = this.loadMembers.bind(this);
        this.loadProposalCreation = this.loadProposalCreation.bind(this);
    }

    loadProposals() {
        this.props.onLoadProposals();
    }

    loadMembers() {
        this.props.onLoadMembers();
    }

    loadProposalCreation() {
        this.props.onLoadProposalCreation();
    }

    render() {
      return (
        <div>
            <div className="GraphOptionsMoloch">
                <div className="GraphOptionMoloch">
                    <p>Guild Bank Value</p>
                    <h1>$53,640,918</h1>
                </div>
                <div className="GraphOptionMoloch">
                    <Button className="MarginLeft20 MarginRight10" bsStyle="default" bsSize="large" onClick={this.loadMembers}>53 Members</Button>
                    <Button bsStyle="default" bsSize="large" onClick={this.loadProposals}>13 Proposals</Button>
                </div>
                <div className="GraphOptionMoloch">
                    <Button className="PullRight" bsStyle="danger" bsSize="large" onClick={this.loadProposalCreation}>Submit Proposal</Button>
                </div>
            </div>
            <Image className="GraphMoloch" src={require('./assets/MolochGraph.PNG')} rounded />
        </div>
      );
    }
}

export default Home;