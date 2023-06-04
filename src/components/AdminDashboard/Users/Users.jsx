import React from "react";
import { UserRow } from "./UserRow";
import styles from './Users.module.scss';
import { Paginado } from "../Paginado/Paginado";

export default function Users(){

    const [users, setUsers] = React.useState(null);
    const [filteredUsers, setFilteredUsers] = React.useState(null);
    const [filterRole, setFilterRole] = React.useState('all');
    const [filterActive, setFilterActive] = React.useState('all');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    React.useEffect(() => {
        getUsers();
    }, [])

    React.useEffect(() => {
        if (users) {
            let usersToFilter = users;

            if (filterRole !== 'all') {
                usersToFilter = usersToFilter.filter(el => el.role === filterRole);
            }

            if (filterActive !== 'all') {
                usersToFilter = usersToFilter.filter(el => el.active.toString() === filterActive.toString());
            }

            setFilteredUsers(usersToFilter);
            setCurrentPage(1);
        }
    }, [users, filterActive, filterRole])

    React.useEffect(() => {
        // getUsers();
        console.log(filterActive);
        console.log(filterRole);
        console.log(filteredUsers);
    }, [filteredUsers])

    return (
        <div className={styles.container}>
            <h2>Users Table</h2>

            <section className={styles['filters-section']}>
                <div>
                    <p>Role:</p>
                    <select value={filterRole} onChange={e => setFilterRole(e.target.value === 'all' ? 'all' : e.target.value)}>
                        <option value="all">Show all</option>
                        <option value="admin">admin</option>
                        <option value="client">client</option>
                    </select>
                </div>

                <div>
                    <p>Active:</p>
                    <select value={filterActive} onChange={e => setFilterActive(e.target.value === 'all' ? 'all' : e.target.value === 'true')}>
                        <option value="all">Show all</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </div>
            </section>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        {
                            users && users.length &&
                            <>
                                {
                                    Object.keys(users[0]).map((el, i) => {
                                        if (el === 'orders') {
                                            return <th key={i} className={styles.th}>Orders Quantity</th>
                                        }
                                        return <th key={i} className={styles.th}>{convertCamelCase(el)}</th>
                                    })
                                }
                                <th className={styles.th}>Action</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {
                        filteredUsers && filteredUsers.length ?
                        filteredUsers.slice(indexOfFirstItem, indexOfLastItem).map((el, i) => {
                            return (
                                <UserRow key={i} user={el} getUsers={getUsers}/>
                            )
                        })
                        : null
                    }
                </tbody>
            </table>

            <div className={styles['pagination-container']}>
                <Paginado
                    totalItems={filteredUsers ? filteredUsers.length : 0}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />

                <div className={styles['pagination-container__selector']}>
                    <p>Items per page:</p>
                    <select value={itemsPerPage} onChange={e => setItemsPerPage(parseInt(e.target.value))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    )
}