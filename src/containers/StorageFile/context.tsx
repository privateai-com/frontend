import React, {
  createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useMemo, 
} from 'react';

interface FileContextProps {
  nameFile: string;
  setNameFile: Dispatch<SetStateAction<string>>;
  fieldFile: string;
  setFieldFile: Dispatch<SetStateAction<string>>;
  articleAccess: 'open' | 'closed';
  setArticleAccess: Dispatch<SetStateAction<'open' | 'closed'>>;
  isOpen: boolean;
}

export const FileContext = createContext<FileContextProps | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [nameFile, setNameFile] = useState('');
  const [fieldFile, setFieldFile] = useState('');
  const [articleAccess, setArticleAccess] = useState<'open' | 'closed'>('closed');
  const isOpen = articleAccess === 'open';

  const value: FileContextProps = useMemo(() => ({
    nameFile,
    setNameFile,
    fieldFile,
    setFieldFile,
    articleAccess,
    setArticleAccess,
    isOpen,
  }), [articleAccess, fieldFile, isOpen, nameFile]);

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = (): FileContextProps => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileContextProvider');
  }
  return context;
};

export { MyProvider, useFileContext };
