
import { AppProvider } from './contexts/app.context'
import App from './App'

export default function MainApp() {

  return (
    <AppProvider>
        <App />
    </AppProvider>
  );
}
