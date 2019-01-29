import React, { Component } from 'react';
import { Divider, Grid, Icon, Segment, Button, Progress, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import hood from 'assets/hood.png';


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

const elders = [
  {
    "name": "KHJ SS501",
    "shares": 43
  },
  {
    "name": "James Corley",
    "shares": 38
  },
  {
    "name": "Carl Haling",
    "shares": 36
  },
  {
    "name": "Todd Luch",
    "shares": 33
  },
  {
    "name": "Todd Luch",
    "shares": 33
  },
  {
    "name": "Todd Luch",
    "shares": 33
  },
];

const ProgressBar = ({ yes, no }) => (
  <>
    <div style={{ "position": "relative" }}>
      <Progress percent={yes + no} color="red" size="big" style={{
        "position": "absolute",
        "top": "0",
        "width": "100%"
      }} />
      <Progress percent={yes} color="green" size="big" />
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

const MemberAvatar = ({ name, shares }) => (
  <Grid.Column mobile={4} tablet={3} computer={3} textAlign="center" className="member_avatar" >
    <Link to={`/members/${name}`} className="uncolored">
      <Image src={hood} centered />
      <p className="name">{name}</p>
      {/* <p className="subtext">{shares} shares</p> */}
    </Link>
  </Grid.Column>
);

export default class ProposalDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedUser: JSON.parse(localStorage.getItem('loggedUser')).address
    }

    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleProcess = this.handleProcess.bind(this);
    this.sendProposalUpdate = this.sendProposalUpdate.bind(this);
  }
  
  componentDidMount() {
    // Retrieve the data of the proposal. TODO: make this dinamic.
    fetch('http://127.0.0.1:3000/projects/0783d41f-8880-0280-7e77-b76ec0fb52f8').then(response => response.json()).then(responseJson => {
      if (responseJson.id) {
        // Store the proposal data on the state.
        this.setState(responseJson);

        // Check if the user that is currently viewing the proposal has voted before to disable the voting buttons.
        let voters = this.state.voters ? this.state.voters : [];
        let userHasVoted = voters.find(voter => voter.member === this.state.loggedUser) ? true : false;
        this.setState({userHasVoted});
      } else {
        alert('Error retrieving the proposal.');
      }
    });
  }

  handleNo() {
    // Add the voter to the voters of the proposal.
    let voters = this.state.voters ? this.state.voters : [];
    voters.push({
      member: JSON.parse(localStorage.getItem("loggedUser")).address,
      vote: 'no'
    });
    this.setState({voters: voters, userHasVoted: true});
    this.sendProposalUpdate('Project proposal voted', voters);
  }

  handleYes() {
    // Add the voter to the voters of the proposal.
    let voters = this.state.voters ? this.state.voters : [];
    voters.push({
      member: JSON.parse(localStorage.getItem("loggedUser")).address,
      vote: 'yes'
    });
    this.setState({voters: voters, userHasVoted: true});
    this.sendProposalUpdate('Project proposal voted', voters);
  }

  handleProcess() {
    this.sendProposalUpdate('Project proposal processed', null);
  }

  sendProposalUpdate(eventName, voters) {
    let proposal = this.state;
    delete proposal.loggedUser;
    delete proposal.userHasVoted;
    if (voters) {
      proposal.voters = voters;
    }
    fetch('http://127.0.0.1:3000/events', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
        body: JSON.stringify({ id: '', name: eventName, payload: proposal })
    }).then(response => response.json()).then(responseJson => {
        if (responseJson.id) {
          switch(eventName) {
            case 'Project proposal voted':
              alert('Voted on proposal');
              break;
            case 'Project proposal processed':
              alert('Proposal processed');
              break;
          }
        } else {
            alert('Error processing proposal');
        }
    });
  }

  render() {
    return (
      <div id="proposal_detail">
        <Grid centered columns={12}>
          <Segment className="transparent box">
            <Grid centered columns={10}  >
              <Grid.Column mobile={16} tablet={16} computer={12}  >
                <span className="title">ETH Proposal</span>
              </Grid.Column>
            </Grid>
            <Grid centered columns={10}  >
              <Grid.Column mobile={16} tablet={16} computer={4}  >
                <div className="subtext description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiut aliquip ex ea commodo consequat.
                </div>

                <Grid columns="equal" className="tokens">
                  <Grid.Row>
                    {tributes.map((token, idx) => (
                      <Grid.Column key={idx} mobile={16} tablet={8} computer={5} className="tributes">
                        <Segment className="pill" textAlign="center">
                          <Icon name="ethereum" />{token.amount} {token.currency}
                        </Segment>
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                  <Grid.Row>
                    {tributes.map((token, idx) => (
                      <Grid.Column key={idx} mobile={16} tablet={8} computer={5} className="tributes">
                        <Segment className="pill" textAlign="center">
                          <Icon name="ethereum" />{token.amount} {token.currency}
                        </Segment>
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
                <Grid columns="equal">
                  <Grid.Column>
                    <p className="subtext">Total USD Value</p>
                    <p className="amount">$6,000</p>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <p className="subtext voting">Voting Shares (15%)</p>
                    <p className="amount">3,056,128</p>
                  </Grid.Column>
                </Grid>
              </Grid.Column>

              <Grid.Column mobile={16} tablet={16} computer={2}   >
                <Divider vertical />
              </Grid.Column>

              <Grid.Column mobile={16} tablet={16} computer={6} >

                <Grid columns={16}>
                  <Grid.Column textAlign="left" mobile={16} tablet={8} computer={8} className="pill_column" >
                    <span className="pill">
                      <span className="subtext">Voting Ends:</span>&nbsp; 12 days
                  </span>
                  </Grid.Column>
                  <Grid.Column textAlign="right" className="pill_column grace" mobile={16} tablet={8} computer={8}>
                    <span className="pill">
                      <span className="subtext">Grace Period:</span>&nbsp; 12 days
                  </span>
                  </Grid.Column>
                </Grid>
                <Grid columns={16} >
                  <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16} className="pill_column"  >
                      <Grid>
                        <Grid.Row className="members_row" >
                          {/* centered */}
                          {elders.map((elder, idx) => <MemberAvatar {...elder} key={idx} />)}

                          <Grid.Column mobile={4} tablet={3} computer={3} textAlign="center" className="member_avatar">
                            <Button className="caret_btn" circular centered icon='caret down' color='grey' />
                            <p className="name">...</p>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column >
                  </Grid.Row>
                </Grid>
                <Grid>
                  <Grid.Column>
                    <ProgressBar yes={30} no={18}></ProgressBar>
                  </Grid.Column>
                </Grid>

                <Grid columns="equal" centered>
                  <Grid.Column textAlign="center" mobile={16} tablet={5} computer={5} >
                    <Button className="btn" color='grey' disabled={this.state.userHasVoted} onClick={this.handleNo}>Vote No</Button>
                  </Grid.Column>
                  <Grid.Column textAlign="center" mobile={16} tablet={5} computer={5} >
                    <Button className="btn" color='grey' disabled={this.state.userHasVoted} onClick={this.handleYes}>Vote Yes</Button>
                  </Grid.Column>
                  <Grid.Column textAlign="center" mobile={16} tablet={5} computer={5} >
                    <Button className="btn" color='grey' onClick={this.handleProcess}>Process Proposal</Button>
                  </Grid.Column>
                </Grid>

              </Grid.Column>
            </Grid>
          </Segment>
        </Grid>
      </div>
    );
  }
}
