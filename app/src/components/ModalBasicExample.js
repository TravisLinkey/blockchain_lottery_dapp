import React, { Component } from 'react'
import {
  Header,
  Segment,
  TransitionablePortal,
} from 'semantic-ui-react'
import '../css/ModalBasicExample.css'

export default class TransitionablePortalExamplePortal extends Component {
  state = { open: false, balance: 0 }
  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })

  // lifecycle methods
  componentDidMount() {
    this.subscribe_to_events()
  }

  componentWillUnmount() {
    this.unsubscribe_guess.unsubscribe()
    this.unsubscribe_win.unsubscribe()
  }

  // component functions
  subscribe_to_events = async () => {
    let contract = this.props.drizzle.contracts.LotteryFactory

    this.unsubscribe_guess = contract.events.GuessMade(async () => {
      let num_guesses = await this.props.drizzle.contracts.LotteryFactory.methods.get_total_guesses().call()
      let balance = await this.props.drizzle.contracts.LotteryFactory.methods.get_balance().call()

      if (num_guesses > 0) {
        this.setState({
          balance: balance
        })
      }
    })

    this.unsubscribe_win = contract.events.LotteryWon(() => {
      this.setState({ popup_is_open: true })
      setTimeout(() => {
        this.setState({ popup_is_open: false })
      }, 3000)

      setTimeout(() => {
        window.location.reload(false);
      }, 3100)
    })
  }

  render() {

    return (
      <div>
        {this.state.popup_is_open ? <div id="blockScreen" className="blockScreen"></div> : null}
        <TransitionablePortal
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          closeOnTriggerClick
          openOnTriggerClick
          open={this.state.popup_is_open}
        // open={true}
        >
          <Segment
            style={{
              position: 'fixed',
              padding: '60px',
              width: 'auto',
              height: 'auto',
              top: '45%',
              left: '50%',
              'zIndex': 101,
              'marginTop': '-200px',
              'marginLeft': '-250px'
            }}
          >
            <div id="modal_segment">
              <Header className="wrapper"><h1>Congratulations</h1></Header>
              <i className="ethereum icon" id="ethereum" />
              <h4>You have guessed the Magic Number!</h4>
              <h4>You will now receive the entire balance:</h4>
              <h2>{this.state.balance / 1000000000000000000} ETH</h2>
            </div>
          </Segment>
        </TransitionablePortal>
      </div>
    )
  }
}
