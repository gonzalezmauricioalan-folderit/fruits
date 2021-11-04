import Link from 'next/link'
import { useCollection } from 'react-firebase-hooks/firestore'

const CrudFruits = () => {
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
                    <th>Red apple</th>
                    <th>🍎</th>
                    <th>
                        <button>X</button>
                        <button>U</button>
                    </th>
                </tbody>
                <tfoot>
                    <th>
                        <button>+</button>
                    </th>
                </tfoot>
            </table>
            <Link href="/">
                <a >&#60;- Back to home</a>
            </Link>
        </div>
    )
}

export default CrudFruits
