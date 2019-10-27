// defaults
import React from 'react';
import ReactDOM from 'react-dom';

// component imports
import App from './components/App';

// drizzle imports
import drizzleOptions from './drizzleOptions';
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';

const drizzleStore = generateStore(drizzleOptions);

//initialise drizzle object, passing options and store
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
        <App />
    </DrizzleContext.Provider>,
    document.getElementById('root'));