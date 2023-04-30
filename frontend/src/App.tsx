import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

import Global from 'global';
import Themes from 'themes';
import Pages from 'pages';
import Navbar from 'constant/navbar';
import Alert from 'constant/alert';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
        <Themes>
          <Global />
          <Alert  />
          <Navbar />
          <Pages  />
        </Themes>
    </BrowserRouter>
  </Provider>
);

export default App;
