import React from 'react';
import { Divider, Segment, Grid, Progress, Button } from 'semantic-ui-react';
import { Route, Switch, Link } from "react-router-dom";
import moment from 'moment';

import ProposalDetail from "./ProposalDetail";
import { connect } from 'react-redux';
import { fetchProposals } from './actions';


// const proposals = Array(6).fill({
//   'id': 1,
//   'name': 'ETH Proposal',
//   'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
//     'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
//     'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
//     'ut aliquip ex ea commodo consequat.',
//   'value': 3000,
//   'shares': 2000,
//   'deadline': '12 days',
//   'grace': '1 day'
// });

const ProgressBar = ({ yes, no }) => (
  <>
    <div style={{"position": "relative"}}>
      <Progress percent={yes + no} color="red" size="small" style={{
        "position": "absolute",
        "top": "0",
        "width": "100%"
      }} />
      <Progress percent={yes} color="green" size="small" />
    </div>
    <Grid columns="equal">
      <Grid.Column floated="left">
        {yes}% Yes
      </Grid.Column>
      <Grid.Column floated="right" textAlign="right">
        {no}% No
      </Grid.Column>
    </Grid>
  </>
);

const ProposalCard = ({ proposal }) => {
  let link = proposal.shares ? 'members' : 'proposals';
  let id = proposal.shares ? proposal.name : proposal.id;
  return (
  <Grid.Column mobile={16} tablet={8} computer={5}>
    <Link to={`/${link}/${id}`} className="uncolored">
      <Segment className="blurred box">
        <p className="name">{proposal.title}</p>
        <p className="subtext description">{proposal.description}</p>
        <Grid columns="equal" className="value_shares">
          <Grid.Row>
            <Divider vertical />
            <Grid.Column textAlign="center">
              <p className="subtext">Total USD Value</p>
              <p className="amount">$3,000</p>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <p className="subtext">Voting Shares</p>
              <p className="amount">{proposal.tribute}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns="equal" className="deadlines">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Segment className="voting pill" textAlign="center">
                <span className="subtext">Voting Ends: </span>
                <span>{proposal.period}</span>
              </Segment>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Segment className="grace pill" textAlign="center">
                <span className="subtext">Grace Period: </span>
                <span>{proposal.period}</span>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ProgressBar yes={30} no={18} />
      </Segment>
    </Link>
  </Grid.Column>
) };


const ProposalList = (props) => (
  <div id="proposal_list">
    <Grid columns={16} verticalAlign="middle">
      <Grid.Column mobile={16} tablet={8} computer={8} textAlign="left">
        <p className="subtext">3 Proposals</p>
        <p className="title">Active</p>
      </Grid.Column>

      <Grid.Column mobile={16} tablet={8} computer={4} textAlign="right" floated="right" className="submit_button">
        <Link to='/projectproposalsubmission' className="link">
          <Button size='large' color='red'>Project Proposal</Button>
        </Link>
      </Grid.Column>
    </Grid>
    
    <Grid columns={3} style={{height: 200}}>
      {props.proposals.map((p, idx) => <ProposalCard proposal={p} key={idx} />)}
    </Grid>
  </div>
);

class ProposalListView extends React.Component {
  componentDidMount() {
    let proposalParams = {
      currentDate: moment(new Date()).format('YYYY/MM/DD')
    }
    this.props.fetchProposals(proposalParams);
  }
  render() {
    return (
      <Switch>
        <Route exact path="/proposals" render={(props) => <ProposalList  proposals={this.props.proposals} /> } />
        <Route path="/proposals/:id" component={ProposalDetail} />
      </Switch>
    )
  }
}

// This function is used to convert redux global state to desired props.
function mapStateToProps(state) {
  return {
    proposals: state.proposals.items
  };
}

// This function is used to provide callbacks to container component.
function mapDispatchToProps(dispatch) {
  return {
    fetchProposals: function(params) {
      dispatch(fetchProposals(params));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalListView);
