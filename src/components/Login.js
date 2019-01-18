import React from 'react';
import { Grid, Button, GridColumn } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import Graph from './Graph';

export default () => (
  <div id="login">
    <Grid columns={15} centered verticalAlign="right">
        <Grid.Column style={{"margin-top": "25vh", "margin-left":"-40px"}}>
            <Link to='/' className="link">
                <Button size='large' color='grey'>Login</Button>
            </Link>
        </Grid.Column>
    </Grid>

  </div>
)
