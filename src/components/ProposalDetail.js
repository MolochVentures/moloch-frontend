import React from 'react';
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

export default (props) => (
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
                <Button className="btn" color='grey' >Vote No</Button>
              </Grid.Column>
              <Grid.Column textAlign="center" mobile={16} tablet={5} computer={5} >
                <Button className="btn" color='grey' >Vote Yes</Button>
              </Grid.Column>
              <Grid.Column textAlign="center" mobile={16} tablet={5} computer={5} >
                <Button className="btn" color='grey' >Process Proposal</Button>
              </Grid.Column>
            </Grid>

          </Grid.Column>
        </Grid>
      </Segment>
    </Grid>
  </div>
)
