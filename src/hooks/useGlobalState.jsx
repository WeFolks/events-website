import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';

export const GlobalStateContext = React.createContext({});

export function GlobalStateProvider({children}) {
    const [eventRegistrationConfirmed, setEventRegistrationConfirmed] = useState(false);

    const contextValue = {
        eventRegistrationConfirmed,
        setEventRegistrationConfirmed
    };

    return (
        <GlobalStateContext.Provider value={contextValue}>
            {children}
        </GlobalStateContext.Provider>
    );
}

GlobalStateProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function useGlobalState() {
    const {setEventRegistrationConfirmed, ...globalState} =
        useContext(GlobalStateContext);

    return {
        ...globalState,
        setEventRegistrationConfirmed
    };
}
