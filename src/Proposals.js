import React, { Component } from 'react';
import './App.css';

class Proposals extends Component {
    constructor(props) {
        super(props);

        this.loadProposalDetail = this.loadProposalDetail.bind(this);
    }

    loadProposalDetail() {
        this.props.onLoadProposalDetail();
    }

    render() {
      return (
        <div>
            <p>Proposals</p>
            <div onClick={this.loadProposalDetail}>
                <h3>ETH Proposal</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli minim veniam, quis nostrud exercitation ull lorem ipsuolor sit amet.</p>
            </div>
        </div>
      );
    }
}

export default Proposals;