// default imports
import React from 'react'
import '../css/BetTab.css'

// util imports
import { Dropdown, Input } from 'semantic-ui-react';
import { Row } from 'react-bootstrap';

// compnent imports
import { Loader } from 'semantic-ui-react'
import ModalBasicExample from '../components/ModalBasicExample';

class BetTab extends React.Component {
    state = {
        accounts: [],
        selected_account: null,
        balance: 0,
        total_guesses: 0,
        drizzle: this.props.drizzle,
        drizzleState: this.props.drizzleState,
        user_guess: '',
        loading: false,
        guess_made: false,
        contract: null,
    }

    // lifecycle methods
    componentDidMount() {
        this.update_lottery_contract();
    }

    // contract functions
    update_lottery_contract = async () => {
        let contract = this.props.drizzle.contracts.LotteryFactory;
        let num_guesses = await contract.methods.get_total_guesses().call();
        let balance = await contract.methods.get_balance().call();
        let magic_number = await contract.methods.get_magic_number().call();
        console.log('Magic Number: ', magic_number)

        this.setState({
            contract: contract,
            total_guesses: num_guesses,
            balance: balance
        }, () => {
            this.get_dropdown_accounts();
        })
    }
    get_dropdown_accounts = () => {
        var dropdown_selection = [];
    
        const accounts = Object.values(this.props.drizzleState.accounts)

        if (accounts.length > 0) {
            for (var i = 0; i < accounts.length; i++) {
                var element = { key: i, text: accounts[i], value: accounts[i], image: {} };
                dropdown_selection.push(element);
            }
        }

        this.setState({
            accounts: dropdown_selection,
        })
    }

    // component functions
    update_input_value = (event, value) => {
        let guess_made = value == null ? false : true

        this.setState({
            user_guess: event.target.value,
            guess_made: guess_made
        })
    }
    update_selected_account = (event, data) => {
        this.setState({
            selected_account: data.value
        })
    }
    clear_fields = () => {
        this.setState({
            user_guess: '',
            selected_account: null,
            guess_made: false
        })
    }
    make_guess = async () => {
        this.setState({
            loading: true
        })

        let guess = this.state.user_guess;

        if (isNaN(guess)) {
            return
        }

        let value = (250000000000000000);
        await this.state.contract.methods.make_guess(guess).send(
            { from: this.state.selected_account, value: (value), gas:3000000 })

        this.setState({
            loading: false
        })

        this.update_lottery_contract()
        this.clear_fields()
    }
    handleItemClick = (e, { name }) => this.setState({ selected_address: name })

    render() {

        let dropdown

        if (this.state.accounts.length > 0) {
            dropdown = <Dropdown
                placeholder={"Select Address. . ."}
                fluid
                id="dropdown_menu"
                selection
                value={this.state.selected_account}
                options={this.state.accounts}
                onChange={this.update_selected_account}
            />
        }
        else { dropdown = <Loader>Loading Accounts. . . </Loader> }

        return (
            <div id="tab_segment">
                <div id="label_header">
                    <Row id="header_row">
                        <h2>Total ETH in Contract: </h2>
                        <div id="contract_balance">
                            {
                                this.state.balance / 1000000000000000000
                            }
                        </div>

                    </Row>

                    <Row id="header_row">
                        <h3>Total number of guesses: </h3>
                        <div id="contract_guesses">
                            {
                                this.state.total_guesses
                            }
                        </div>
                    </Row>
                </div>

                <Row> { dropdown } </Row>
                <Row>
                    <ModalBasicExample
                        drizzle={this.props.drizzle}
                        guesses={this.state.total_guesses}
                        balance={this.state.balance}
                    />
                </Row>

                <div id="guess_segment">

                    <p id="guess_label">Your Guess:</p>

                    <Input
                        type="number"
                        placeholder='your guess'
                        id="guess_input"
                        value={this.state.user_guess}
                        onChange={this.update_input_value}
                    />

                </div>

                <Loader size='big' active={this.state.loading} inline>Placing Guess...</Loader>

                <Row id="button_segment">
                    <button
                        className="ui button"
                        type="Reset"
                        onClick={this.clear_fields}
                        disabled={this.state.loading}>
                        Clear
                    </button>

                    <button
                        className="ui violet button"
                        type="button"
                        onClick={this.make_guess}
                        disabled={!this.state.guess_made || this.state.loading || this.state.selected_account == null}>
                        Place Guess
                    </button>
                </Row>
            </div>
        );
    }
};

export default BetTab;