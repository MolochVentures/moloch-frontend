import React from 'react';
import { Divider, Segment, Grid, Progress, Button } from 'semantic-ui-react';
import { Route, Switch, Link } from "react-router-dom";
import moment from 'moment';

import ProposalDetail from "./ProposalDetail";
import { connect } from 'react-redux';
import { fetchProposals, fetchMemberDetail } from './actions';


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
    <div style={{ "position": "relative" }}>
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
  let type = proposal.address ? 'members' : 'projects';
  let id = proposal.shares ? proposal.name : proposal.id;
  return (
    <Grid.Column mobile={16} tablet={8} computer={5}>
      <Link to={`/proposals/${type}/${proposal.status}/${id}`} className="uncolored">
        <Segment className="blurred box">
          <p className="name">{proposal.title}</p>
          <p className="subtext description">{proposal.description}</p>
          <Grid columns="equal" className="value_shares">
            <Grid.Row>
              {proposal.shares ? <Divider vertical /> : null}
              <Grid.Column textAlign="center">
                <p className="subtext">Total USD Value</p>
                <p className="amount">$3,000</p>
              </Grid.Column>
              {proposal.shares ?
                <Grid.Column textAlign="center">
                  <p className="subtext">Voting Shares</p>
                  <p className="amount">{proposal.shares}</p>
                </Grid.Column> : null}
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
          <ProgressBar yes={proposal.votedYes} no={proposal.votedNo} />
        </Segment>
      </Link>
    </Grid.Column>
  )
};


const ProposalList = (props) => (
  <div id="proposal_list">
    {
      Object.keys(props.proposals).map((key, idx) =>
        <React.Fragment key={idx}>
          {props.proposals[key].length > 0 ?
            <>
              <Grid columns={16} verticalAlign="middle">
                <Grid.Column mobile={16} tablet={8} computer={8} textAlign="left">
                  <p className="subtext">{props.proposals[key].length} Proposal{props.proposals[key].length > 1 ? 's' : ''}</p>
                  <p className="title">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                </Grid.Column>
                {idx === 0 ?
                  <Grid.Column mobile={16} tablet={8} computer={4} textAlign="right" floated="right" className="submit_button">
                    <Link to='/projectproposalsubmission' className="link">
                      <Button size='large' color='red' disabled={props.userShare ? false : true}>Project Proposal</Button>
                    </Link>
                  </Grid.Column>
                  : null}
              </Grid>
              <Grid columns={3} >
                {props.proposals[key].map((p, index) => <ProposalCard proposal={p} key={index} />)}
              </Grid> </> : null}
        </React.Fragment>
      )}
  </div>
);

class ProposalListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalShares: parseInt(localStorage.getItem('totalShares')),
      loggedUser: JSON.parse(localStorage.getItem('loggedUser')).address,
      userShare: 0,
    }

    this.calculateVote = this.calculateVote.bind(this);
  }

  componentDidMount() {
    let proposalParams = {
      currentDate: moment(new Date()).format('YYYY-MM-DD')
    }
    this.props.fetchProposals(proposalParams)
    this.props.fetchMemberDetail(this.state.loggedUser)
      .then((responseJson) => {
        this.setState({
          userShare: (responseJson.items.member.shares) ? responseJson.items.member.shares : 0,
          totalShares: responseJson.items.totalShares
        });
      })
  }

  componentWillReceiveProps(props) {
    Object.keys(props.proposals).map((key, idx) => {
      props.proposals[key].map((p) => {
        let calculatedVotes = this.calculateVote(p.voters);
        p.votedYes = calculatedVotes.votedYes;
        p.votedNo = calculatedVotes.votedNo;
      })
    })
  }

  calculateVote(voters) {
    // calculate votes
    let totalNumberVotedYes = 0;
    let totalNumberVotedNo = 0;
    if (voters) {
      voters.map((voter, idx) => {
        if (voter.shares) {
          switch (voter.vote) {
            case 'yes':
              totalNumberVotedYes += voter.shares;
              break;
            case 'no':
              totalNumberVotedNo += voter.shares;
              break;
            default: break;
          }
        }
      });
    }
    let percentYes = typeof ((parseInt((totalNumberVotedYes / this.state.totalShares) * 100))) !== 'number' ? 0 : (parseInt((totalNumberVotedYes / this.state.totalShares) * 100));
    let percentNo = typeof (parseInt(((totalNumberVotedNo / this.state.totalShares) * 100))) !== 'number' ? 0 : parseInt(((totalNumberVotedNo / this.state.totalShares) * 100));
    return {
      votedYes: percentYes,
      votedNo: percentNo
    }
  }
  render() {
    return (
      <Switch>
        <Route exact path="/proposals" render={(props) => <ProposalList proposals={this.props.proposals} userShare={this.state.userShare}/>} />
        <Route path="/proposals/:type/:status/:id" component={ProposalDetail} />
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
    fetchProposals: function (params) {
      dispatch(fetchProposals(params));
    },
    fetchMemberDetail: function (id) {
      return dispatch(fetchMemberDetail(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalListView);
