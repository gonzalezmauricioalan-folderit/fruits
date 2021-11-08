import { useDocument } from "react-firebase-hooks/firestore"
import firebase from "../firebase/clientApp"

import { Image } from "react-bootstrap"

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
        <div className="d-flex justify-content-between p-1 m-1">
            <h4>{value.data().displayName}</h4>
            <Image src={value.data().photoURL} alt="user image" roundedCircle width="50" height="50"  />
            <h4>{vote}</h4>
        </div>
    )
}

export default VoterList
