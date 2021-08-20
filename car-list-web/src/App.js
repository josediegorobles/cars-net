import logo from './logo.svg';
import './App.css';
import { client } from "./ApolloClient/client";
import { ApolloProvider } from '@apollo/client';
import { Cars } from './Cars/cars';
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Cars />
      </div>
    </ApolloProvider>
  );
}

export default App;
