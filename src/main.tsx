import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store.ts'
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root')!);

const renderApp = () => {
  root.render(
      <Router>
        <Provider store={store}>
        <App />
        </Provider>
      </Router>
  )
}

renderApp()
store.subscribe(renderApp);