import { createContext, Context } from 'react';


type ContextValueType = {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the context with the specified type
const StateContext: Context<ContextValueType> = createContext<ContextValueType>({ state: false, setState: () => {} });

export default StateContext;