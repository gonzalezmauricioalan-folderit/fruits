import styles from '../styles/Home.module.css'
import firebase from "../firebase/clientApp";

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Auth from '../components/Auth';
import VoterList from '../components/VoterList';
import { useEffect } from 'react';

import Link from 'next/link'

import { useSelector, useDispatch } from "react-redux";
import { getFruitsFromFirestore } from '../store/fruits';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';



export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFruitsFromFirestore())
  }, [dispatch])

  const [user, loading, error] = useAuthState(firebase.auth())
  const [votes, votesLoading, votesError] = useCollection(firebase.firestore().collection('votes'), {})
  // const [fruits, fruitsLoading, fruitsError] = useCollection(firebase.firestore().collection('fruits'), {})
  const { fruits, isLoading } = useSelector(state => state.fruits);

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
              fruits?.map(fruit => (
                <Button variant='outline-secondary' size='lg'  key={fruit.id} onClick={() => addVoteDocument(fruit.name)}
                  className={styles.btn}>{fruit.emoji}</Button>
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
            <Button variant='secondary'>CRUD of fruits</Button>
          </Link>
        </>)
      }
    </>
  )
}
