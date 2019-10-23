// defaults
import React from 'react';
import '../css/WalletTab.css';

// components used
import AccountList from './AccountList';

// imports
import { Row, Col, Container } from 'react-bootstrap';

class WalletTab extends React.Component {

    render() {
        return (
            <div id="wallet_tab">
                <div id="header">
                    <Container>
                        <Row>
                            <Col><h3>Account</h3></Col>
                            <Col><h3>Balance</h3></Col>
                        </Row>
                    </Container>
                </div>
    
                <div>
                    <AccountList drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
                </div>
            </div>
        );
    }    
};

export default WalletTab