import React, { createContext, useContext, useState } from 'react';

export const CampaignWizardContext = createContext(null);

export const  CampaignWizardProvider = ({ children }) => {
    const [currentSegment, setCurrentSegment] = useState('');

    const contextValue = {
        currentSegment,
        setCurrentSegment,
    };

    return (
        <CampaignWizardContext.Provider value={contextValue}>
            {children}
        </CampaignWizardContext.Provider>
    );
};
