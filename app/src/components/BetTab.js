// default imports
import React from 'react'
import '../css/BetTab.css'

// util imports
import { Dropdown, Input } from 'semantic-ui-react';
import { Row } from 'react-bootstrap';

// compnent imports
import { Loader } from 'semantic-ui-react'

class BetTab extends React.Component {
    state = {
        accounts: [],
        selected_account: null,
        total_contract_balance: 0,
        total_guesses: 0,
        drizzle: this.props.drizzle,
        drizzleState: this.props.drizzleState,
        user_guess: '',
        loading: false,
        guess_made: false,
        latest_contract: null
    }

    // lifecycle methods
    componentDidMount() {
        console.log(this.props);
        this.update_lottery_contract();
    }

    // contract functions
    update_lottery_contract = async () => {
        let abi = this.props.drizzle.contracts.LotteryContract.abi;
        let latest_child = await this.props.drizzle.contracts.LotteryFactory.methods.get_latest_child().call();
        let latest_contract = new this.props.drizzle.web3.eth.Contract(abi, latest_child);

        let num_guesses = await latest_contract.methods.get_num_guesses().call();
        let balance = await latest_contract.methods.get_balance_in_contract().call();

        this.setState({
            latest_contract: latest_contract,
            latest_child_address: latest_child,
            total_guesses: num_guesses,
            total_contract_balance: balance
        }, () => {
            this.get_dropdown_accounts();
        })
    }

    // TODO
    get_num_guesses = async () => {
        if (this.state.latest_contract != null) {

            let num_guesses = await this.state.latest_contract.methods.get_num_guesses().call();
            console.log('Updated num of guesses: ', num_guesses);

            this.setState({
                total_guesses: num_guesses
            })
        }
        else {
            this.update_lottery_contract();
        }
    }
    // TODO
    get_contract_balance = async () => {
        if (this.state.latest_contract != null) {

            let balance = await this.state.latest_contract.methods.get_balance_in_contract().call();
            console.log("Contract Balance: ", balance);

            this.setState({
                total_contract_balance: balance
            })
        }
        else {
            this.update_lottery_contract();
        }
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
        console.log('Submitting Guess')

        this.setState({
            loading: true
        })

        let guess = this.state.user_guess;

        if (isNaN(guess)) {
            return
        }

        let value = (250000000000000000);
        await this.state.latest_contract.methods.make_guess(guess).send({ from: this.state.selected_account, value: (value) })

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
                                this.state.total_contract_balance / 1000000000000000000
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

                <Row>
                    {
                        dropdown
                    }
                </Row>

                <div id="guess_segment">

                    <p id="guess_label">Your Guess:</p>

                    <Input
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