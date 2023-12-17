import React, { ReactNode } from 'react';

interface ButtonPanelProps {
  children: ReactNode;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({ children }) => {
  return (
    <div className="buttonpanel flex flex-col space-y-2">
      {children}
    </div>
  );
}

export default ButtonPanel;