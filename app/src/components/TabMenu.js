// default imports
import React from 'react'
import '../css/TabMenu.css'

// utils imports
import { Menu, Segment } from 'semantic-ui-react'

// component imports
import HomeTab from './HomeTab'
import WalletTab from './WalletTab'
import BetTab from './BetTab'

// drizzle imports
// import { drizzleConnect } from 'drizzle-react';
// const mapStateToProps = (state) => ({state});

class TabMenu extends React.Component {
  state = { active_item: 'home' }

  // lifecycle methods
  componentDidMount() {
    this.setState({
      drizzle: this.props.drizzleState,
      drizzleState: this.props.drizzleState,
      active_item: 'home'
    })
  }

  // component functions
  handleItemClick = (e, { name }) => this.setState({ active_item: name })
  updateState = () => {
    this.setState({
      drizzle: this.props.drizzleState,
      drizzleState: this.props.drizzleState,
      active_item: 'home'
    })
  }

  render() {
    const { active_item } = this.state
    let segment

    if (this.state.active_item === 'home') {
      segment = <HomeTab />
    }
    else if (this.state.active_item === 'wallet') {
      segment = <WalletTab drizzle={this.state.drizzle} drizzleState={this.state.drizzleState}/>
    }
    else if (this.state.active_item === 'bet') {
      segment = <BetTab drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
    }
    return (
      <div id="tab-menu">

        <Menu inverted pointing secondary>
          <Menu.Item name='home' icon='home' active={active_item === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='wallet' icon='ethereum' active={active_item === 'wallet'} onClick={this.handleItemClick} />
          <Menu.Item name='bet' icon='ticket' active={active_item === 'bet'} onClick={this.handleItemClick} />
        </Menu>

        <Segment>{segment}</Segment>

      </div>
    )
  };
}
export default TabMenu;
// export default drizzleConnect(TabMenu, mapStateToProps);