// defaults
import React from 'react';
import '../css/AccountList.css'

// components used
import AccountSegment from './AccountSegment';

// drizzle imports
// import { drizzleConnect } from 'drizzle-react';
// const mapStateToProps = (state) => ({state});

class AccountList extends React.Component {
    state = {
        account_balance: {}
    };

    // lifecycle methods
    componentDidMount() {
        this.set_accounts(this.props.drizzleState.accountBalances)
    }
    componentDidUpdate(prevProps) {
        if(prevProps.drizzleState.accountBalances !== this.props.drizzleState.accountBalances) {
            console.log('Resetting Wallet Accounts')
            this.set_accounts(this.props.drizzleState.accountBalances)
        }
    }

    // component functions
    calculate_balance(old_balance) {
        return (parseFloat(old_balance)/10**18);
    }
    set_accounts = (accountBalances) => {
        const account = Object.keys(accountBalances)
        const balance = Object.values(accountBalances)

        var account_balance = {}

        for (var i = 0; i < account.length; i++) {
            account_balance[account[i]] = balance[i];
        }

        this.setState({
            account_balance: account_balance
        })
    }

    render() {
        var size = Object.keys(this.state.account_balance).length;

        if (size < 1) {
            return (
                <div>No Content Here</div>
            );
        }
        else {
            return(
            <ul id="account_list">
                {
                    Object.keys(this.state.account_balance).map((key, i) => {
                        return <AccountSegment
                        key={i}
                        account={key}
                        balance={
                            this.calculate_balance(this.state.account_balance[key])
                        }/>
                    })
                }
            </ul>
            )
        }
    }
};

export default AccountList;
// export default drizzleConnect(AccountList, mapStateToProps);