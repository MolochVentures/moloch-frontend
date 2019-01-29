import React from 'react';
import { Divider, Grid, Segment, Image, Icon, Label, Header } from 'semantic-ui-react';

import bull from 'assets/bull.png';

import { connect } from 'react-redux';
import { fetchMemberDetail } from './actions';

// const tributes = [
//   {
//     'amount': 10,
//     'currency': 'ETH'
//   },
//   {
//     'amount': 10,
//     'currency': 'BTC'
//   },
//   {
//     'amount': 11,
//     'currency': 'LTC'
//   }
// ];

// const proposals = [
//   {
//     "name": "ETH Proposal",
//     "date": "12/01/2018",
//     "action": "Voted Yes"
//   },
//   {
//     "name": "BTC Proposal",
//     "date": "12/01/2018",
//     "action": "Voted No"
//   },
//   {
//     "name": "New Proposal Design",
//     "date": "12/01/2018",
//     "action": "Submitted"
//   },
//   {
//     "name": "1,203 Tokens",
//     "date": "12/01/2018",
//     "action": "Voted Yes"
//   },
//   {
//     "name": "1,203 Tokens",
//     "date": "12/01/2018",
//     "action": "Withdrawn"
//   },
//   {
//     "name": "1,203 Tokens",
//     "date": "12/01/2018",
//     "action": "Voted Yes"
//   },
//   {
//     "name": "1,203 Tokens",
//     "date": "12/01/2018",
//     "action": "Voted Yes"
//   },
//   {
//     "name": "1,203 Tokens",
//     "date": "12/01/2018",
//     "action": "Voted Yes"
//   },
//   {
//     "name": "1,203 Tokens",
//     "date": "12/01/2018",
//     "action": "Voted Yes"
//   },
//   {
//     "name": "1,203 Tokens",
//     "date": "12/01/2018",
//     "action": "Voted Yes"
//   },
//   {
//     "name": "1,203 Tokens",
//     "date": "12/01/2018",
//     "action": "Voted Yes"
//   },
//   {
//     "name": "1,203 Tokens",
//     "date": "12/01/2018",
//     "action": "Voted Yes"
//   },
// ];

class MemberDetail extends React.Component {

  componentDidMount() {
    this.props.fetchMemberDetail(this.props.match.params.name);
  }

  render() {
    return (
      <div id="member_detail">
        <p className="title"> {this.props.match.params.name} </p>
        <Divider />
        <Grid columns={16}>
          <Grid.Row className="details">
            <Grid.Column mobile={16} tablet={16} computer={6} className="user" >
              <Segment className="blurred box">
                <Grid columns="equal">
                  <Grid.Column>
                    <p className="subtext">Total USD Value</p>
                    <p className="amount">{this.props.member_detail.shares}</p>
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
                    {this.props.member_detail.assets.map((token, idx) => (
                      <Grid.Column key={idx}>
                        <Segment className="pill" textAlign="center">
                          <Icon name="ethereum" />{token.amount} {token.asset}
                        </Segment>
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                  {/* <Grid.Row>
                    {this.props.member_detail.assets.map((token, idx) => (
                      <Grid.Column key={idx}>
                        <Segment className="pill" textAlign="center">
                          <Icon name="ethereum" />{token.amount} {token.asset}
                        </Segment>
                      </Grid.Column>
                    ))}
                  </Grid.Row> */}
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={10} className="proposals" >
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
                  {this.props.member_detail.proposals.map((p, idx) => (
                    <React.Fragment key={idx}>
                      <Grid.Row verticalAlign="middle">
                        <Grid.Column textAlign="left">
                          {p.status === "Voted Yes" && <Label className="dot" circular color="green" empty />}
                          {p.status === "Voted No" && <Label className="dot" circular color="red" empty />}
                          {p.status === "Submitted" && <Label className="dot" circular color="grey" empty />}
                          {p.title}
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <p className="subtext date">{p.period}</p>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                          <Header as="p"
                            color={p.status === "Voted Yes" ? "green" : p.status === "Voted No" ? "red" : null}>
                            {p.status}
                          </Header>
                        </Grid.Column>
                      </Grid.Row>
                      <Divider />
                    </React.Fragment>
                  ))}
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

// This function is used to convert redux global state to desired props.
function mapStateToProps(state) {
  return {
    member_detail: state.memberDetail.items
  };
}

// This function is used to provide callbacks to container component.
function mapDispatchToProps(dispatch) {
  return {
    fetchMemberDetail: function (name) {
      dispatch(fetchMemberDetail(name));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetail);
