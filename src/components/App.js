import React from 'react'
import { ThemeContextProvider, ThemeContext } from './ThemeContextProvider';
import WeatherSearch from './WeatherSearch';

const App = () => {
  return (
    <ThemeContextProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className="container" style={{backgroundColor: theme.background}}>
            <header>
              <h1>Weather App</h1>
              <h4>Search for a city</h4>
            </header>
            <section>
              <WeatherSearch />
            </section>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContextProvider>
  );
}

export default App;
