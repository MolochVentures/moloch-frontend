import React, { Component } from 'react';
import './App.css';

class Members extends Component {
    constructor(props) {
        super(props);

        this.loadMemberDetail = this.loadMemberDetail.bind(this);
    }

    loadMemberDetail() {
        this.props.onLoadMemberDetail();
    }

    render() {
      return (
        <div>
            <p>Members</p>
            <div onClick={this.loadMemberDetail}>
                <h3>KHJ</h3>
                <p>43 Shares</p>
                <h3>SS501</h3>
            </div>
        </div>
      );
    }
}

export default Members;