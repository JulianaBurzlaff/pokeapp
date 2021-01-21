import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Routes from './routes';
import './style.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e7262c',
    },
    // secondary: {
    //   main: green[500],
    // },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
