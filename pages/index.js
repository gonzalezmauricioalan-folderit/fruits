import styles from '../styles/Home.module.css'
import firebase from "../firebase/clientApp";

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [votes, votesLoading, votesError] = useCollection(firebase.firestore().collection('votes'), {})
  console.log(`Loading: ${loading}, user: ${user}`);
  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }
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
