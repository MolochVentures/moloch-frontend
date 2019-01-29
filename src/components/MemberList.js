import React from 'react';
import { Grid, Image, Divider, Button } from 'semantic-ui-react';
import { Switch, Route, Link } from 'react-router-dom';

import MemberDetail from './MemberDetail';
import bull from 'assets/bull.png';
import hood from 'assets/hood.png';

const user = {
  "name": "Malcom Jans",
  "shares": 78
};
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
    "name": "Yan Agis",
    "shares": 21
  }
];
const contributors = elders;

const MemberAvatar = ({ name, shares }) => (
  <Grid.Column mobile={5} tablet={3} computer={3} textAlign="center" className="member_avatar" >
    <Link to={`/members/${name}`} className="uncolored">
      <Image src={hood} centered size='tiny' />
      <p className="name">{name}</p>
      <p className="subtext">{shares} shares</p>
    </Link>
  </Grid.Column>
);

const MemberList = () => (
  <div id="member_list">
    <Grid columns={16} verticalAlign="middle">
      <Grid.Column mobile={16} tablet={6} computer={6} textAlign="left" className="member_list_header">
        <p className="subtext">57 Members</p>
        <p className="title">Ranking</p>
      </Grid.Column>

      <Grid.Column mobile={16} tablet={10} computer={10} textAlign="right" className="submit_button">
        <Link to='/membershipproposalsubmission' className="link">
          <Button size='large' color='red'>Membership Proposal</Button>
        </Link>
      </Grid.Column>
    </Grid>
    
    <Grid>
      <Grid.Column textAlign="center">
        <Link to={`/members/${user.name}`} className="uncolored">
          <Image centered src={bull} size='tiny' />
          <p className="name">{user.name}</p>
          <p className="subtext">{user.shares} shares</p>
        </Link>
      </Grid.Column>
    </Grid>
    <Grid className="member_item">
      <Grid.Row>
        <p>Elders</p>
      </Grid.Row>
      <Divider />
      <Grid.Row className="members_row" centered>
        { elders.map((elder, idx) => <MemberAvatar {...elder} key={idx} />) }
      </Grid.Row>
    </Grid>
    <Grid className="member_item">
      <Grid.Row>
        <p>Contributors</p>
      </Grid.Row>
      <Divider />
      <Grid.Row className="members_row" centered>
        { contributors.map((contributor, idx) => <MemberAvatar {...contributor} key={idx} />) }
      </Grid.Row>
    </Grid>
  </div>
);

export default (props) => (
  <Switch>
    <Route exact path="/members" component={MemberList}/>
    <Route path="/members/:name" component={MemberDetail}/>
  </Switch>
)
