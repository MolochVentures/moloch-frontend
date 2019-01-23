import React from 'react';
import { Divider, Grid, Segment, Image, Icon, Label, Header } from 'semantic-ui-react';

import bull from 'assets/bull.png';


const tributes = [
  {
    'amount': 10,
    'currency': 'ETH'
  },
  {
    'amount': 10,
    'currency': 'BTC'
  },
  {
    'amount': 11,
    'currency': 'LTC'
  }
];

const proposals = [
  {
    "name": "ETH Proposal",
    "date": "12/01/2018",
    "action": "Voted Yes"
  },
  {
    "name": "BTC Proposal",
    "date": "12/01/2018",
    "action": "Voted No"
  },
  {
    "name": "New Proposal Design",
    "date": "12/01/2018",
    "action": "Submitted"
  },
  {
    "name": "1,203 Tokens",
    "date": "12/01/2018",
    "action": "Voted Yes"
  },
  {
    "name": "1,203 Tokens",
    "date": "12/01/2018",
    "action": "Withdrawn"
  },
  {
    "name": "1,203 Tokens",
    "date": "12/01/2018",
    "action": "Voted Yes"
  },
  {
    "name": "1,203 Tokens",
    "date": "12/01/2018",
    "action": "Voted Yes"
  },
  {
    "name": "1,203 Tokens",
    "date": "12/01/2018",
    "action": "Voted Yes"
  },
  {
    "name": "1,203 Tokens",
    "date": "12/01/2018",
    "action": "Voted Yes"
  },
  {
    "name": "1,203 Tokens",
    "date": "12/01/2018",
    "action": "Voted Yes"
  },
  {
    "name": "1,203 Tokens",
    "date": "12/01/2018",
    "action": "Voted Yes"
  },
  {
    "name": "1,203 Tokens",
    "date": "12/01/2018",
    "action": "Voted Yes"
  },
];

export default (props) => (
  <div id="member_detail">
    <p className="title"> {props.match.params.name} </p>
    <Divider />
    <Grid columns={16}>
      <Grid.Row className="details">
        <Grid.Column mobile={16} tablet={8} computer={8} className="user" >
          <Segment className="blurred box">
            <Grid columns="equal">
              <Grid.Column>
                <p className="subtext">Total USD Value</p>
                <p className="amount">$6,000</p>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <p className="subtext">Voting Shares (15%)</p>
                <p className="amount">3,056,128</p>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column textAlign="center" className="avatar">
                <Image centered src={bull} size='tiny' />
              </Grid.Column>
            </Grid>
            <p className="subtext">Token Tribute</p>
            <Grid columns="equal">
              <Grid.Row>
                {tributes.map((token, idx) => (
                  <Grid.Column key={idx}>
                    <Segment className="pill" textAlign="center">
                      <Icon name="ethereum" />{ token.amount } { token.currency }
                    </Segment>
                  </Grid.Column>
                ))}
              </Grid.Row>
              <Grid.Row>
                {tributes.map((token, idx) => (
                  <Grid.Column key={idx}>
                    <Segment className="pill" textAlign="center">
                      <Icon name="ethereum" />{ token.amount } { token.currency }
                    </Segment>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8} className="proposals" >
          <Segment className="blurred box">
            <Grid columns="equal">
              <Grid.Row className="header">
                <Grid.Column textAlign="left">
                  <p className="subtext">Proposal</p>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <p className="subtext">Date</p>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <p className="subtext">Action</p>
                </Grid.Column>
              </Grid.Row>
              {proposals.map((p, idx) => (
                <>
                <Grid.Row verticalAlign="middle">
                  <Grid.Column textAlign="left">
                    { p.action === "Voted Yes" && <Label className="dot" circular color="green" empty /> }
                    { p.action === "Voted No" && <Label className="dot" circular color="red" empty /> }
                    { p.action === "Submitted" && <Label className="dot" circular color="grey" empty /> }
                    { p.name }
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <p className="subtext date">{ p.date }</p>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Header as="p"
                            color={p.action === "Voted Yes" ? "green" : p.action === "Voted No" ? "red" : "white"}>
                      { p.action }
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Divider />
                </>
              ))}
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)
