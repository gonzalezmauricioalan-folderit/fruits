import styles from '../styles/Home.module.css'
import firebase from "../firebase/clientApp";

import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth())
  console.log('user :>> ', user);
  console.log('loading :>> ', loading);
  return (
    <div className={styles.container}>
      <h1>Choice your favorite fruit</h1>
      <button className={styles.btn}>🍉</button>
      <button className={styles.btn}>🍊</button>
      <button className={styles.btn}>🍌</button>
      <button className={styles.btn}>🥭</button>
      <button className={styles.btn}>🍇</button>
      <button className={styles.btn}>🍎</button>
    </div>
  )
}
