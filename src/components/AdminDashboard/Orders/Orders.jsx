import React from "react"
import { OrderRow } from "./OrderRow"
import styles from './Orders.module.scss'
import Pagination from "../../Pagination/Pagination"
import AdminSearchBar from "../AdminSearchBar/AdminSearchBar"
import axios from "axios"

export default function Orders() {
  const [orders, setOrders] = React.useState(null)
  const [filteredOrders, setFilteredOrders] = React.useState(null)
  const [filterStatus, setFilterStatus] = React.useState("all")
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

  /* Funcion para traer las ordenes del endpoint GET /orders */

  const getOrders = () => {
    axios.get(`${process.env.REACT_APP_HOST_NAME}/orders`)
    .then(response => setOrders(response.data))
  }

  /* Funcion callback para Pagination */
  const handlePageChange = page => {
    setCurrentPage(page)
  }

  React.useEffect(() => {
    getOrders();
  }, [])

  /* Manejo de filtrado con useEffect */
  React.useEffect(() => {
    if (orders) {
      let ordersToFilter = [...orders]

      /* Filtrado de status */
      if (filterStatus !== "all") {
        ordersToFilter = ordersToFilter.filter(el => el.orderStatus === filterStatus)
      }

    //   /* Filtrado de active */
    //   if (filterActive !== "all") {
    //     ordersToFilter = ordersToFilter.filter(
    //       el => el.active.toString() === filterActive.toString()
    //     )
    //   }

      /* Filtrado de AdminSearchBar */
      if (filterWord) {
        const filterWordArray = filterWord.split(" ")
        const ordersToFilterCopy = []

        for (let index = 0; index < filterWordArray.length; index++) {
          ordersToFilter.forEach(order => {
            if (
              (order.orderNumber && order.orderNumber.toLowerCase().includes(filterWordArray[index].toLowerCase())) ||
              (order.userId && order.userId.toLowerCase().includes(filterWordArray[index].toLowerCase()))
            ) {
              ordersToFilterCopy.push(order)
            }
          })
        }

        ordersToFilter = [...new Set(ordersToFilterCopy)]
      }

      setFilteredOrders(ordersToFilter)
      setCurrentPage(1)
    }
  }, [orders, filterActive, filterStatus, filterWord])

    return (
        <div className={styles.container}>
            <h2>Orders List</h2>

            <section className={styles['filters-section']}>
                <div className={styles['filters-section-first-child']}>
                    <div>
                        <p>Status:</p>
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value === 'all' ? 'all' : e.target.value)}>
                            <option value="all">Show all</option>
                            <option value="Completed">Completed</option>
                            {/* <option value="Cancelled">Cancelled</option> */}
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                    {/* <div>
                        <p>Active:</p>
                        <select value={filterActive} onChange={e => setFilterActive(e.target.value === 'all' ? 'all' : e.target.value === 'true')}>
                            <option value="all">Show all</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div> */}
                </div>

                <div>
                    <AdminSearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    searchSubmit={() => setFilterWord(`${searchQuery}`)}
                    handleReset={() => {setSearchQuery(''); setFilterWord('')}}
                    />
                </div>
            </section>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        {
                            orders && orders.length &&
                            <>
                                <th className={styles.th}>Order Number</th>
                                <th className={styles.th}>Order Status</th>
                                <th className={styles.th}>User ID</th>
                                <th className={styles.th}>Date</th>
                                <th className={styles.th}>Items Quantity</th>
                                <th className={styles.th}>Amount Paid</th>
                                <th className={styles.th}>Action</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {
                        filteredOrders && filteredOrders.length ?
                        filteredOrders.slice(indexOfFirstItem, indexOfLastItem).map((el, i) => {
                            return (
                                <OrderRow key={i} order={el} getOrders={getOrders}/>
                            )
                        })
                        : <tr className={styles.tr}>
                            <td style={{width: '100%', height: '150px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', justifyContent: 'center'}}>
                            <h3 style={{ textAlign: 'center', color: '#fff', fontWeight: '700' }}>No orders found</h3>
                            <p style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>No orders were found for the search performed. Please try another search.</p>
                            </td>
                          </tr>
                    }
                </tbody>
            </table>

            <div className={styles['pagination-container']}>
                <div>
                    {
                        filteredOrders && filteredOrders.length && filteredOrders.length > itemsPerPage ?
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredOrders.length / itemsPerPage)}
                            onPageChange={handlePageChange}
                            onPreviousPage={() => setCurrentPage(prevState => prevState - 1)}
                            onNextPage={() => setCurrentPage(prevState => prevState + 1)}
                        />
                        : null
                    }
                </div>

                <div className={styles['pagination-container__selector']}>
                    <p>Items per page:</p>
                    <select value={itemsPerPage} onChange={e => {setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1)}}>
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
