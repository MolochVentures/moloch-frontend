import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Icon, Label, Dropdown, Form, Button } from "semantic-ui-react";

const user = {
  "name": "Malcom Jans",
  "shares": 78
};

class MainMenu extends Component {

  render() {
    return (
      <div>
        <Dropdown.Item className="item" onClick={()=> this.props._handleCloseDropdown()}>
          <Link to={`/members/${user.name}`} className="link">
            <p><Icon name="user" ></Icon>View Profile</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item icon="dollar" className="item" content="Withdraw Loot Token" onClick={() => {this.props._handleOpenDropdown(); this.props.onLoadWithdrawLootToken()}} />
        <Dropdown.Divider />
        <Dropdown.Item icon="key" className="item" content="Change Delegate Key" onClick={() => {this.props._handleOpenDropdown(); this.props.onLoadChangeDelegateKey()}} />
        <Dropdown.Divider />
        <Dropdown.Item className="item">
          <Link to="/login" className="link" onClick={() => {this.props._handleCloseDropdown(); localStorage.removeItem("loggedUser");}}>
            <p><Icon name="power off"></Icon>Sign Out</p>
          </Link>
        </Dropdown.Item>
      </div>
    );
  }
}

class ChangeDelegateKeyMenu extends Component {

  render() {
    return (
      <div>
        <Dropdown.Item icon="arrow left" className="item" content="Back to Menu" onClick={() => this.props.onLoadMain()} />
        <Dropdown.Divider />
        <Dropdown.Item className="item">
          <p><Icon name="key"></Icon>Change Delegate Key</p>
          <Form.Input placeholder="Enter new key address"></Form.Input>
          <Button>Save</Button>
        </Dropdown.Item>
      </div>
    );
  }
}

class WithdrawLootTokenMenu extends Component {

  render() {
    return (
      <div>
        <Dropdown.Item icon="arrow left" className="item" content="Back to Menu" onClick={() => this.props.onLoadMain()} />
        <Dropdown.Divider />
        <Dropdown.Item className="item">
          <p><Icon name="dollar"></Icon>Withdraw Loot Token</p>
          <Form.Input placeholder="Enter withdrawal address"></Form.Input>
          <Form.Input placeholder="0"></Form.Input>
          <Button>Withdraw</Button>
        </Dropdown.Item>
      </div>
    );
  }
}

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleMenu: 'main',
      visibleRightMenu: false
    }
  }

  _handleOpenDropdown() {
    this.setState({visibleRightMenu: true});
  }

  _handleCloseDropdown() {
    this.setState({visibleRightMenu: false});
  }

  render() {
    let topRightMenuContent;

    switch(this.state.visibleMenu) {
      case 'main':
        topRightMenuContent = <MainMenu _handleOpenDropdown={() => this._handleOpenDropdown()} _handleCloseDropdown={() => this._handleCloseDropdown()}  onLoadChangeDelegateKey={() => this.setState({visibleMenu: 'changeDelegateKey'})} onLoadWithdrawLootToken={() => this.setState({visibleMenu: 'withdrawLootToken'})}></MainMenu>
        break;
      case 'changeDelegateKey':
        topRightMenuContent = <ChangeDelegateKeyMenu onLoadMain={() => {this._handleOpenDropdown(); this.setState({visibleMenu: 'main'})}}></ChangeDelegateKeyMenu>
        break;
      case 'withdrawLootToken':
        topRightMenuContent = <WithdrawLootTokenMenu onLoadMain={() => {this._handleOpenDropdown(); this.setState({visibleMenu: 'main'})}}></WithdrawLootTokenMenu>
        break;
      default:
        break;
    }

    return(
      <div id="header">
        <Grid columns='equal' verticalAlign="middle">
          <Grid.Column textAlign="left" className="menu">
            <Dropdown icon="bars">
              <Dropdown.Menu className="menu blurred" direction="right">
                <Link to="guildbank" className="item">
                  <p>Guild Bank</p>
                </Link>
                <Dropdown.Divider />
                <Link to="/members" className="item">
                  <p>Members</p>
                </Link>
                <Dropdown.Divider />
                <Link to="/proposals" className="item">
                  <p>Proposals</p>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
          <Grid.Column textAlign="center" className="logo">
            <Link to="/">MOLOCH</Link>
          </Grid.Column>
          <Grid.Column textAlign="right" className="dropdown">
            <Dropdown 
              open={this.state.visibleRightMenu} 
              onBlur={() => this._handleCloseDropdown()}
              onFocus={() => this._handleOpenDropdown()}
              // className="aaa"
              // circular
              text={
                <Label circular color='teal' className="label" >A </Label>}
              // text="A" 
              >
              <Dropdown.Menu className="menu blurred" direction="left">
                {topRightMenuContent}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
