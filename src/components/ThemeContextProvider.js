import React from 'react';

const theme = {
  light: {
    background: 'darksalmon',
  },
  dark: {
    background: '#222222',
  },
  freezing: {
    background: '#B84BFF',
  },
  cold: {
    background: '#4CB1F7',
  },
  perfect: {
    background: '#93DFCB',
  },
  warm: {
    background: '#F26A4B',
  },
  hot: {
    background: '#FF1A6B',
  }
}

const ThemeContext = React.createContext({
  theme: theme.light,
  changeTheme: () => {},
});

const ThemeContextProvider = ({ children }) => {
  const changeTheme = (theme) => {
    setState({...state, theme: theme});
  }
  const initialState = {
    theme: theme.light,
    changeTheme: changeTheme,
  }
  const [state, setState] = React.useState(initialState)
  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  );
}

export { theme, ThemeContext, ThemeContextProvider};
