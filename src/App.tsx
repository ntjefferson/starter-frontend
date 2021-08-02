import React from 'react';
import { useDispatch } from 'react-redux';
import Button from './components/core/Button/Button';
import { loginUser, logoutUser } from './redux/features/authSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* eslint-disable-next-line react/button-has-type */}
        <Button onClick={() => dispatch(loginUser({ email: 'str@str.com', password: 'stsa' }))}> Login </Button>
        {/* eslint-disable-next-line react/button-has-type */}
        <Button onClick={() => dispatch(logoutUser())}> Logout </Button>

      </header>
    </div>
  );
};

export default App;
