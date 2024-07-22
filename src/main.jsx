import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TodosContextProvider } from './context/todosContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TodosContextProvider>
    <App />
  </TodosContextProvider>,
)
