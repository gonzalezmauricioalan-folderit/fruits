import firebase from "../firebase/clientApp";

import styles from '../styles/Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { Column } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';


const ListOfVotableFruits = ({ fruits, user }) => {

    const db = firebase.firestore();
    const addVoteDocument = async (vote) => {
        await db.collection('votes').doc(user.uid).set({ vote })
    }
    return (
        <Card  className="m-3 d-flex">
            <Card.Header > <h1 className="d-flex justify-content-center"> Choice your favorite fruit</h1> </Card.Header>
                    <Card.Body className="d-flex justify-content-around"  >
                        {
                            fruits?.map(fruit => (
                                <Button variant='outline-secondary' size='lg' key={fruit.id} onClick={() => addVoteDocument(fruit.name)}
                                    className={styles.btn}>{fruit.emoji}</Button>
                            ))
                        }
                    </Card.Body>
        </Card>
    )
}

export default ListOfVotableFruits
