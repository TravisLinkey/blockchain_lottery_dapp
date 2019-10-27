import React, { Component } from 'react'
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
} from 'semantic-ui-react'
import '../css/ModalBasicExample.css'

export default class TransitionablePortalExamplePortal extends Component {
  state = { open: false }
  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })

  componentDidMount() {
    this.subscribe_to_events()
  }

  subscribe_to_events = async () => {
    let contract = this.props.drizzle.contracts.LotteryFactory

    this.unsubscribe = contract.events.LotteryWon(() => {
      console.log('Someone Won the Lottery!!!')
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
              <Header><h1>Congratulations</h1></Header>
              <i className="ethereum icon" id="ethereum" />
              <h4>You have guessed the Magic Number!</h4>
              <h4>You will now receive the entire balance:</h4>
              <h2>{this.props.value} ETH</h2>
            </div>
          </Segment>
        </TransitionablePortal>
      </div>
    )
  }
}
