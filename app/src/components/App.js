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

    render() {
        return (
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;

                    if (!initialized) { return ("Loading. . . ") }
                    else {
                        console.log(Object.values(drizzleState.accountBalances));
                        return (<TabMenu drizzle={drizzle} drizzleState={drizzleState} />)
                    }
                }}
            </DrizzleContext.Consumer>
        )
    }
}

export default App;