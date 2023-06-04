import React from "react";
import styles from '../ItemsTable/ItemsTable.module.css'

export default function Users(){

    const [users, setUsers] = React.useState(null)

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST_NAME}/users`)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(err => console.error(err.message));
    }, [])
    return (
        <div>USERS
            <table className={styles.table}>
                <thead>
                <tr>
                    {
                        users && users.length &&
                        Object.keys(users[0]).map(el => (
                            <th>{el}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody className={styles.font}>
                    {
                        users && users.length &&
                        users.map((el, i) => {
                            console.log(el);
                            return (
                                <tr>
                                    <td>{el.id}</td>
                                    <td>{el.firstName}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}