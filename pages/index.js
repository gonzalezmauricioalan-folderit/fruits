import firebase from "../firebase/clientApp";

import { useAuthState } from 'react-firebase-hooks/auth'
import Auth from '../components/Auth';
import VoterList from '../components/VoterList';
import { useEffect } from 'react';

import Link from 'next/link'

import { useSelector, useDispatch } from "react-redux";
import { getFruitsFromFirestore } from '../store/fruits';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ListOfVotableFruits from '../components/ListOfVotableFruits';
import VotesInformation from "../components/VotesInformation";



export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFruitsFromFirestore())
  }, [dispatch])

  const [user, loading, error] = useAuthState(firebase.auth())
  // const [fruits, fruitsLoading, fruitsError] = useCollection(firebase.firestore().collection('fruits'), {})
  const { fruits, isLoading } = useSelector(state => state.fruits);


  return (
    <>
      {loading && <h4>Loading...</h4>}
      {!user && <Auth />}

      {user && (
        <>
          <ListOfVotableFruits fruits={fruits} user={user} />
          <VotesInformation fruits={fruits} />
          <Link href="/CrudFruits" passHref>
            <Button variant='secondary'>CRUD of fruits</Button>
          </Link>
        </>)
      }
    </>
  )
}
