// defaults
import React from 'react';

// util imports
import "semantic-ui-css/semantic.min.css"
import 'bootstrap/dist/css/bootstrap.min.css';

// component imports
import TabMenu from './TabMenu';

// drizzle imports
import { DrizzleContext } from 'drizzle-react';

class App extends React.Component {
    state = {
        child_contract: null
    }

    subscribe_to_events = async (drizzleContext) => {
        const { drizzle } = drizzleContext;
        let contract = drizzle.contracts.LotteryFactory

        this.unsubscribe = contract.events.GuessMade(() => {
            // window.location.reload(false); 
        })
    }

    render() {
        return (
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;

                    if (!initialized) { return ("Loading. . . ") }
                    else {
                        this.subscribe_to_events(drizzleContext)
                        
                        return (<TabMenu drizzle={drizzle} drizzleState={drizzleState} />)
                    }
                }}
            </DrizzleContext.Consumer>
        )
    }
}

export default App;