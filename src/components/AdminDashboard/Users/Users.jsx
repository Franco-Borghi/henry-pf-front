import React from "react";
import { UserRow } from "./UserRow";
import styles from './Users.module.scss';

export default function Users(){

    const [users, setUsers] = React.useState(null);

    function convertCamelCase(str) {
        // Add a space before each uppercase letter
        var result = str.replace(/([A-Z])/g, ' $1');
        
        // Capitalize the first letter
        result = result.charAt(0).toUpperCase() + result.slice(1);
        
        return result;
      }

    const getUsers = () => {
        fetch(`${process.env.REACT_APP_HOST_NAME}/users`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err.message));
    }

    React.useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className={styles.container}>
            <h2>Users Table</h2>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        {
                            users && users.length &&
                            <>
                                {
                                    Object.keys(users[0]).map(el => {
                                        if (el === 'orders') {
                                            return <th className={styles.th}>Orders Number</th>
                                        }
                                        return <th className={styles.th}>{convertCamelCase(el)}</th>
                                    })
                                }
                                <th className={styles.th}>Action</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {
                        users && users.length &&
                        users.map((el, i) => {
                            return (
                                <UserRow key={i} user={el} getUsers={getUsers}/>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}