// defaults
import React from 'react';
import ReactDOM from 'react-dom';

// component imports
import App from './components/App';

// drizzle imports
import drizzleOptions from './drizzleOptions';
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';
import LotteryFactory from './contracts/LotteryFactory.json';
import LotteryContract from './contracts/LotteryContract.json';

 // setup drizzle store and drizzle
const options = { contracts: [LotteryFactory, LotteryContract] };

//initialise drizzle store with options
// const drizzleStore = generateStore(options);
const drizzleStore = generateStore(drizzleOptions);

//initialise drizzle object, passing options and store
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

// ReactDOM.render(<App drizzle={drizzle}/>, document.querySelector("#root"));
ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
        <App />
    </DrizzleContext.Provider>,
    document.getElementById('root'));