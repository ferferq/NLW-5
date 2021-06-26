//OTHERS
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/authContexts';
import { LightOrDarkThemeContext } from './contexts/lightOrDark';
import { AdminRoom } from './pages/AdminRoom';

//PAGES
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

function App() {

  return (
    <BrowserRouter>
    <LightOrDarkThemeContext>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/news" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
      </LightOrDarkThemeContext>
    </BrowserRouter>
  );
}

export default App;
