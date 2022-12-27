// provides a global context for if is being edited or not

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface EditingContextProps {
  editing: boolean;
  setEditing: (isEditing: boolean) => void;
}

const EditingContext = createContext<EditingContextProps>({
  editing: false,
  setEditing: () => {},
});

export let setEditing : React.Dispatch<React.SetStateAction<boolean>>;

export const EditingProvider = ({ children } : {children: ReactNode}) => {
  const [isEditing, setIsEditing] = useState(false);
  setEditing = setIsEditing;

  return (
    <EditingContext.Provider value={{ editing: isEditing, setEditing: setIsEditing }}>
      {children}
    </EditingContext.Provider>
  );
};


export const useEditing = () => useContext(EditingContext);