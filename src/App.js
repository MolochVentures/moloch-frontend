import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Background from './components/Background';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Home from './components/Home';
import ProposalList from './components/ProposalList';
import MemberList from './components/MemberList';
import ProjectProposalSubmission from './components/ProjectProposalSubmission';
import MembershipProposalSubmission from './components/MembershipProposalSubmission';
import GuildBank from './components/GuildBank';
import Login from './components/Login';
import NotFound from './components/NotFound';


const App = () => (
  <Router>
    <>
      <Background />
      <Header />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/proposals" component={ProposalList} />
          <Route path="/members" component={MemberList} />
          <Route path="/projectproposalsubmission" component={ProjectProposalSubmission} />
          <Route path="/membershipproposalsubmission" component={MembershipProposalSubmission} />
          <Route path="/guildbank" component={GuildBank} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Wrapper>
    </>
  </Router>
);

export default App;
