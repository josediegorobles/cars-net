import './App.css';
import { client } from "./ApolloClient/client";
import { ApolloProvider } from '@apollo/client';
import { Cars } from './Cars/cars';
import { Edit } from './Cars/edit';
import { Route, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Route path="/" component={Cars} exact />
          <Route path="/edit" component={Edit} exact />
          <Route path="/edit/:id" component={Edit} exact />
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
