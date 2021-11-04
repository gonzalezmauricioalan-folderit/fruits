import Link from 'next/link'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from '../firebase/clientApp'
import { FaTrash } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';


const CrudFruits = () => {
    const [fruits, fruitsLoading, error] = useCollection(firebase.firestore().collection('fruits'), {})
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Fruit Name</th>
                        <th>Fruit Emoji</th>
                        <th>crud operations</th>
                    </tr>
                </thead>
                <tbody>
                    {fruits?.docs?.map(fruit =>
                    (

                        <tr key={fruit.id}>
                            <th>{fruit.data().name}</th>
                            <th>{fruit.data().emoji}</th>
                            <th>
                                <button><FaTrash style={{color:'#C70000'}}/></button>
                                <button><FaPen style={{color: '#6e8c91'}}/></button>
                            </th>
                        </tr>
                    )
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th>
                            <button><FaPlus style={{color: '#6e8c91'}}/></button>
                        </th>
                    </tr>
                </tfoot>
            </table>
            <Link href="/">
                <a >&#60;- Back to home</a>
            </Link>
        </div>
    )
}

export default CrudFruits
