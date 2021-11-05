import styles from '../styles/Home.module.css'
import firebase from "../firebase/clientApp";

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Auth from '../components/Auth';
import VoterList from '../components/VoterList';

import Link from 'next/link'

import { useSelector } from "react-redux";


export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [votes, votesLoading, votesError] = useCollection(firebase.firestore().collection('votes'), {})
  // const [fruits, fruitsLoading, fruitsError] = useCollection(firebase.firestore().collection('fruits'), {})
  const { fruits, isLoading } = useSelector(state => state.fruits);
  console.log('fruits111 :>> ', fruits);
  console.log('isLoading :>> ', isLoading);
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
            {
              fruits.map(fruit => (
                <button key={fruit.id} onClick={() => addVoteDocument(fruit.name)}
                  className={styles.btn}>{fruit.emoji}</button>
              ))
            }
          </div>
          <div id='votes'>
            <h2>Votes:</h2>
            {
              fruits?.docs?.map(fruit => (
                <h4 key={fruit.id}>
                  {fruit.data().name}: {votes?.docs?.filter(d => d.data().vote === fruit.data().name).length}</h4>
              ))
            }
          </div>
          {votes?.docs?.map(doc => (
        <>
          <VoterList id={doc.id} key={doc.id} vote={doc.data().vote} />
        </>
      ))}
      <Link href="/CrudFruits" passHref>
        <button>CRUD of fruits</button>
      </Link>
    </>)
}
    </>
  )
}
