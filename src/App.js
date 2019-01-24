import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

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
          <Route exact path="/" render={() => localStorage.getItem("loggedUser") ? <Home/> : <Redirect to={{pathname: '/login'}} />} />
          <Route path="/proposals" render={() => localStorage.getItem("loggedUser") ? <ProposalList/> : <Redirect to={{pathname: '/login'}} />} />
          <Route path="/members" render={() => localStorage.getItem("loggedUser") ? <MemberList/> : <Redirect to={{pathname: '/login'}} />} />
          <Route path="/projectproposalsubmission" render={() => localStorage.getItem("loggedUser") ? <ProjectProposalSubmission/> : <Redirect to={{pathname: '/login'}} />} />
          <Route path="/membershipproposalsubmission" render={() => localStorage.getItem("loggedUser") ? <MembershipProposalSubmission/> : <Redirect to={{pathname: '/login'}} />} />
          <Route path="/guildbank" render={() => localStorage.getItem("loggedUser") ? <GuildBank/> : <Redirect to={{pathname: '/login'}} />} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Wrapper>
    </>
  </Router>
);

export default App;
