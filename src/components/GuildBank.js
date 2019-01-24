import React from 'react';
import { Grid, Image, Divider, Button } from 'semantic-ui-react';

import xIcon from 'assets/0xIcon.png';
import aragonIcon from 'assets/aragonIcon.png';
import bitcoinIcon from 'assets/bitcoinIcon.png';
import district0xIcon from 'assets/district0xIcon.png';
import ethereumIcon from 'assets/ethereumIcon.png';
import funfairIcon from 'assets/funfairIcon.png';
import makerIcon from 'assets/makerIcon.png';
import spankchainIcon from 'assets/spankchainIcon.png';
import stellarIcon from 'assets/stellarIcon.png';
import stormIcon from 'assets/stormIcon.png';

const currencies = [
  {
    "name": "BT",
    "shares": 508,
    "value": 32000,
    "icon": bitcoinIcon
  },
  {
    "name": "ET",
    "shares": 508,
    "value": 32000,
    "icon": ethereumIcon
  },
  {
    "name": "SPANK",
    "shares": 508,
    "value": 32000,
    "icon": spankchainIcon
  },
  {
    "name": "Aragon",
    "shares": 508,
    "value": 32000,
    "icon": aragonIcon
  },
  {
    "name": "District0x",
    "shares": 508,
    "value": 32000,
    "icon": district0xIcon
  },
  {
    "name": "XLM",
    "shares": 508,
    "value": 32000,
    "icon": stellarIcon
  },
  {
    "name": "MKR",
    "shares": 508,
    "value": 32000,
    "icon": makerIcon
  },
  {
    "name": "FUN",
    "shares": 508,
    "value": 32000,
    "icon": funfairIcon
  },
  {
    "name": "STORM",
    "shares": 508,
    "value": 32000,
    "icon": stormIcon
  },
  {
    "name": "ZRX",
    "shares": 508,
    "value": 32000,
    "icon": xIcon
  }
];

const CurrencyElement = ({ name, shares, icon, value }) => (
  <Grid.Column mobile={5} tablet={3} computer={3} textAlign="center" className="currency_element" >
    <Image src={icon} centered size='tiny' circular/>
    <p className="name">{name}</p>
    <p className="shares">{shares}</p>
    <p className="subtext">{'$' + value}</p>
  </Grid.Column>
);

export default (props) => (
  <div id="guild_bank">
    <Grid>
      <Grid.Column textAlign="center" className="guild_value">
        <p className="subtext">Guild Bank Value</p>
        <p className="amount">$53,640,918</p>
        <Button size='large' color='grey'>Redeem Loot Token</Button>
      </Grid.Column>
    </Grid>
    
    <Grid>
      <Grid.Row>
      </Grid.Row>
      <Divider />
      <Grid.Row centered>
        { currencies.map((elder, idx) => <CurrencyElement {...elder} key={idx} />) }
      </Grid.Row>
    </Grid>
  </div>
);