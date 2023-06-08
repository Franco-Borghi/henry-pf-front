import React from "react"
import { UserRow } from "./UserRow"
import styles from "./Users.module.scss"
import Pagination from "../../Pagination/Pagination"
import AdminSearchBar from "../AdminSearchBar/AdminSearchBar"

export default function Users() {
  const [users, setUsers] = React.useState(null)
  const [filteredUsers, setFilteredUsers] = React.useState(null)
  const [filterRole, setFilterRole] = React.useState("all")
  const [filterActive, setFilterActive] = React.useState("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterWord, setFilterWord] = React.useState("")
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  function convertCamelCase(str) {
    // Add a space before each uppercase letter
    var result = str.replace(/([A-Z])/g, " $1")

    // Capitalize the first letter
    result = result.charAt(0).toUpperCase() + result.slice(1)

    return result
  }

  /* Funcion para traer los usuarios del endpoint GET /users */
  const getUsers = () => {
    fetch(`${process.env.REACT_APP_HOST_NAME}/users`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err.message))
  }

  /* Funcion callback para Pagination */
  const handlePageChange = page => {
    setCurrentPage(page)
  }

  React.useEffect(() => {
    getUsers()
  }, [])

  /* Manejo de filtrado con useEffect */
  React.useEffect(() => {
    if (users) {
      let usersToFilter = [...users]

      /* Filtrado de roles */
      if (filterRole !== "all") {
        usersToFilter = usersToFilter.filter(el => el.role === filterRole)
      }

      /* Filtrado de active */
      if (filterActive !== "all") {
        usersToFilter = usersToFilter.filter(
          el => el.active.toString() === filterActive.toString()
        )
      }

      /* Filtrado de AdminSearchBar */
      if (filterWord) {
        const filterWordArray = filterWord.split(" ")
        const usersToFilterCopy = []

        for (let index = 0; index < filterWordArray.length; index++) {
          usersToFilter.forEach(user => {
            if (
              (user.firstName &&
                user.firstName
                  .toLowerCase()
                  .includes(filterWordArray[index].toLowerCase())) ||
              (user.lastName &&
                user.lastName
                  .toLowerCase()
                  .includes(filterWordArray[index].toLowerCase())) ||
              (user.email &&
                user.email
                  .toLowerCase()
                  .includes(filterWordArray[index].toLowerCase()))
            ) {
              usersToFilterCopy.push(user)
            }
          })
        }

        usersToFilter = [...new Set(usersToFilterCopy)]
      }

      setFilteredUsers(usersToFilter)
      setCurrentPage(1)
    }
  }, [users, filterActive, filterRole, filterWord])

  return (
    <div className={styles.container}>
      <h2>Users Table</h2>

      <section className={styles["filters-section"]}>
        <div className={styles["filters-section-first-child"]}>
          <div>
            <p>Role:</p>
            <select
              value={filterRole}
              onChange={e =>
                setFilterRole(e.target.value === "all" ? "all" : e.target.value)
              }>
              <option value="all">Show all</option>
              <option value="admin">admin</option>
              <option value="client">client</option>
            </select>
          </div>
          <div>
            <p>Active:</p>
            <select
              value={filterActive}
              onChange={e =>
                setFilterActive(
                  e.target.value === "all" ? "all" : e.target.value === "true"
                )
              }>
              <option value="all">Show all</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        </div>

        <div>
          <AdminSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchSubmit={() => setFilterWord(`${searchQuery}`)}
            handleReset={() => {
              setSearchQuery("")
              setFilterWord("")
            }}
          />
        </div>
      </section>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {users && users.length && (
              <>
                {Object.keys(users[0]).map((el, i) => {
                  if (el === "orders") {
                    return (
                      <th key={i} className={styles.th}>
                        Orders Quantity
                      </th>
                    )
                  }
                  return (
                    <th key={i} className={styles.th}>
                      {convertCamelCase(el)}
                    </th>
                  )
                })}
                <th className={styles.th}>Action</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {filteredUsers && filteredUsers.length
            ? filteredUsers
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((el, i) => {
                  return <UserRow key={i} user={el} getUsers={getUsers} />
                })
            : null}
        </tbody>
      </table>

      <div className={styles["pagination-container"]}>
        <div>
          {filteredUsers &&
          filteredUsers.length &&
          filteredUsers.length > itemsPerPage ? (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
              onPageChange={handlePageChange}
              onPreviousPage={() => setCurrentPage(prevState => prevState - 1)}
              onNextPage={() => setCurrentPage(prevState => prevState + 1)}
            />
          ) : null}
        </div>

        <div className={styles["pagination-container__selector"]}>
          <p>Items per page:</p>
          <select
            value={itemsPerPage}
            onChange={e => setItemsPerPage(parseInt(e.target.value))}>
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
