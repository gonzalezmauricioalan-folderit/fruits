import { useDocument } from "react-firebase-hooks/firestore"
import firebase from "../firebase/clientApp"

import Image from 'next/image'

function VoterList({ id, vote }) {

    const [value, loading, error] = useDocument(firebase.firestore().doc(`user/${id}`))

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (error) {
        return null
    }
    return (
        <div key={id} style={{display:'flex',  flexDirection:'row', justifyContent:'space-around'}}>
            <h4>{value.data().displayName}</h4>
            <Image src={value.data().photoURL} width="35rem" height="20rem" alt="user image" />
            <h4>voted: {vote}</h4>
        </div>
    )
}

export default VoterList
