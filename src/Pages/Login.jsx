import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import PageNav from '../Components/PageNav';
import { useAuth } from '../Context/FakeAuthitication';
import { useNavigate } from 'react-router';
import Button from '../Components/Button';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');
  const { login, isAuth } = useAuth();
  const navigation = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  }

  useEffect(
    function () {
      if (isAuth) {
        navigation('/app', { replace: true });
      }
    },
    [isAuth, navigation]
  );
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" action={handleLogin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
