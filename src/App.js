import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import './App.css';
import Navigator from './Navigator';
import Home from './Home';
import Proposals from './Proposals';
import Members from './Members';
import ProposalCreation from './ProposalCreation';
import ProposalDetail from './ProposalDetail';
import MemberDetail from './MemberDetail';

//#2a060e

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedView: 'Home'
    }

    this.loadProposals = this.loadProposals.bind(this);
    this.loadMembers = this.loadMembers.bind(this);
    this.loadProposalCreation = this.loadProposalCreation.bind(this);
    this.loadProposalDetail = this.loadProposalDetail.bind(this);
    this.loadMemberDetail = this.loadMemberDetail.bind(this);
  }

  loadProposals() {
      this.setState({ loadedView: 'Proposals' });
  }

  loadMembers() {
    this.setState({ loadedView: 'Members' });
  }

  loadProposalCreation() {
    this.setState({ loadedView: 'ProposalCreation' });
  }

  loadProposalDetail() {
    this.setState({ loadedView: 'ProposalDetail' });
  }

  loadMemberDetail() {
    this.setState({ loadedView: 'MemberDetail' });
  }

  render() {
    let loadedViewElement;

    switch(this.state.loadedView) {
      case 'Home':
        loadedViewElement = <Home onLoadProposals={this.loadProposals} onLoadMembers={this.loadMembers} onLoadProposalCreation={this.loadProposalCreation}></Home>;
        break;
      case 'Proposals':
        loadedViewElement = <Proposals onLoadProposalDetail={this.loadProposalDetail}></Proposals>;
        break;
      case 'Members':
        loadedViewElement = <Members onLoadMemberDetail={this.loadMemberDetail}></Members>;
        break;
      case 'ProposalCreation':
        loadedViewElement = <ProposalCreation></ProposalCreation>;
        break;
      case 'ProposalDetail':
        loadedViewElement = <ProposalDetail></ProposalDetail>;
        break;
      case 'MemberDetail':
        loadedViewElement = <MemberDetail></MemberDetail>;
        break;
    }

    return (
      <div className="ContainerMoloch">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"></link>
        <Navigator></Navigator>
        <div className="ContentMoloch">
          {loadedViewElement}
        </div>
      </div>
    );
  }
}

export default App;
