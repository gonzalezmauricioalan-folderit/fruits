import firebase from "../firebase/clientApp";
import { useCollection } from 'react-firebase-hooks/firestore'

import VoterList from "./VoterList";

import { Card } from "react-bootstrap";

const VotesInformation = ({ fruits }) => {

    const [votes, votesLoading, votesError] = useCollection(firebase.firestore().collection('votes'), {})
    return (
        <div>
            <Card className="m-3" >
                <Card.Header > <h2 className="d-flex justify-content-center">Votes</h2> </Card.Header>
                {
                    fruits?.map(fruit => (
                        <div key={`fruit-vote${fruit.id}`} className="d-flex justify-content-between p-2">
                            <h4 key={fruit.id}>

                                {fruit.name}

                            </h4>
                            <h4 key={fruit.id}>
                                {votes?.docs?.filter(d => d.data().vote === fruit.name).length}
                            </h4>
                        </div>
                    ))
                }
            </Card>
            <Card className="m-3">
                <Card.Header> <h2 className="d-flex justify-content-center">Votes information</h2> </Card.Header>
                <Card.Body >
                    {votes?.docs?.map(doc => (
                        <>
                            <VoterList id={doc.id} key={doc.id} vote={doc.data().vote} />
                        </>
                    ))}
                </Card.Body>
            </Card>
        </div>
    )
}

export default VotesInformation
