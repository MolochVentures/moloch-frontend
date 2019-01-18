import React from 'react';
import { Divider, Segment, Grid, Progress, Button } from 'semantic-ui-react';
import { Route, Switch, Link } from "react-router-dom";

import ProposalDetail from "./ProposalDetail";



const proposals = Array(6).fill({
  'id': 1,
  'name': 'ETH Proposal',
  'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
    'ut aliquip ex ea commodo consequat.',
  'value': 3000,
  'shares': 2000,
  'deadline': '12 days',
  'grace': '1 day'
});

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

const ProposalCard = ({ proposal }) => (
  <Grid.Column>
    <Link to={`/proposals/${proposal.id}`} className="uncolored">
      <Segment className="blurred box">
        <p className="name">{proposal.name}</p>
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
              <p className="amount">2000</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns="equal" className="deadlines">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Segment className="voting pill" textAlign="center">
                <span className="subtext">Voting Ends: </span>
                <span>{proposal.deadline}</span>
              </Segment>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Segment className="grace pill" textAlign="center">
                <span className="subtext">Grace Period: </span>
                <span>{proposal.grace}</span>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ProgressBar yes={30} no={18} />
      </Segment>
    </Link>
  </Grid.Column>
);


const ProposalList = () => (
  <div id="proposal_list">
    <Grid columns={16} verticalAlign="middle">
      <Grid.Column width={8} textAlign="left">
        <p className="subtext">3 Proposals</p>
        <p className="title">Active</p>
      </Grid.Column>

      <Grid.Column width={4} textAlign="right" floated="right" className="submit_button">
        <Link to='/projectproposalsubmission' className="link">
          <Button size='large' color='red'>Project Proposal</Button>
        </Link>
      </Grid.Column>
    </Grid>
    
    <Grid columns={3}>
      {proposals.map((p, idx) => <ProposalCard proposal={p} key={idx} />)}
    </Grid>
  </div>
);

export default (props) => (
  <Switch>
    <Route exact path="/proposals" component={ProposalList}/>
    <Route path="/proposals/:id" component={ProposalDetail}/>
  </Switch>
)

