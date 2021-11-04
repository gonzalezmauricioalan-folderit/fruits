import styles from '../styles/Home.module.css'
import firebase from "../firebase/clientApp";

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Auth from '../components/Auth';
import VoterList from '../components/VoterList';


export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [votes, votesLoading, votesError] = useCollection(firebase.firestore().collection('votes'), {})
  console.log(`Loading: ${loading}, user: ${user}`);

  const db = firebase.firestore();
  const addVoteDocument = async (vote) => {
    await db.collection('votes').doc(user.uid).set({ vote })
  }
  return (
    <>
      {loading && <h4>Loading...</h4>}
      {!user && <Auth />}

      {user && (
        <>
          <div className={styles.container} id='fruit-buttons'>
            <h1>Choice your favorite fruit</h1>
            <button onClick={() => addVoteDocument('Watermelon')} className={styles.btn}>🍉</button>
            <button onClick={() => addVoteDocument('Tangerine')} className={styles.btn}>🍊</button>
            <button onClick={() => addVoteDocument('Banana')} className={styles.btn}>🍌</button>
            <button onClick={() => addVoteDocument('Mango')} className={styles.btn}>🥭</button>
            <button onClick={() => addVoteDocument('Grapes')} className={styles.btn}>🍇</button>
            <button onClick={() => addVoteDocument('Red Apple')} className={styles.btn}>🍎</button>
          </div>
          <div id='votes'>
            <h2>Votes:</h2>
            <h4>Watermelon: {votes?.docs?.filter(d => d.data().vote === 'Watermelon').length}</h4>
            <h4>Tangerine:  {votes?.docs?.filter(d => d.data().vote === 'Tangerine').length}</h4>
            <h4>Banana:  {votes?.docs?.filter(d => d.data().vote === 'Banana').length}</h4>
            <h4>Mango:  {votes?.docs?.filter(d => d.data().vote === 'Mango').length}</h4>
            <h4>Grapes:  {votes?.docs?.filter(d => d.data().vote === 'Grapes').length}</h4>
            <h4>Red Apple: {votes?.docs?.filter(d => d.data().vote === 'Red Apple').length}</h4>
          </div>
          {votes?.docs?.map(doc => (
            <>
              <VoterList id={doc.id} key={doc.id} vote={doc.data().vote} />
            </>
          ))}
        </>)}
    </>
  )
}
