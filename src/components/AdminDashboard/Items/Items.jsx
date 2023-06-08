import React from "react"
import { ItemRow } from "./ItemRow"
import styles from "./Items.module.scss"
import Pagination from "../../Pagination/Pagination"
import AdminSearchBar from "../AdminSearchBar/AdminSearchBar"
import axios from "axios"

export default function Items() {
  const [items, setItems] = React.useState(null)
  const [filteredItems, setFilteredItems] = React.useState(null)
  const [filterSold, setFilterSold] = React.useState("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterWord, setFilterWord] = React.useState("")
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  /* Funcion para traer los usuarios del endpoint GET /items */
  const getItems = () => {
    axios.get(`${process.env.REACT_APP_HOST_NAME}/items`)
    .then(response => {
      setItems(response.data)
    })
    .catch(err => console.error(err.message))
  }

  /* Funcion callback para Pagination */
  const handlePageChange = page => {
    setCurrentPage(page)
  }

  React.useEffect(() => {
    getItems()
  }, [])

  /* Manejo de filtrado con useEffect */
  React.useEffect(() => {
    if (items) {
      let itemsToFilter = [...items]

      /* Filtrado de active */
      if (filterSold !== "all") {
        itemsToFilter = itemsToFilter.filter(
          el => el.sold.toString() === filterSold.toString()
        )
      }

      /* Filtrado de AdminSearchBar */
      if (filterWord) {
        const filterWordArray = filterWord.split(" ")
        const itemsToFilterCopy = []

        for (let index = 0; index < filterWordArray.length; index++) {
          itemsToFilter.forEach(item => {
            if (
              (item.color &&
                item.color
                  .toLowerCase()
                  .includes(filterWordArray[index].toLowerCase())) ||
              (item.chassisId &&
                item.chassisId
                  .toLowerCase()
                  .includes(filterWordArray[index].toLowerCase())) ||
              (item.motorcycleModel &&
                item.motorcycleModel
                  .toLowerCase()
                  .includes(filterWordArray[index].toLowerCase()))
            ) {
              itemsToFilterCopy.push(item)
            }
          })
        }

        itemsToFilter = [...new Set(itemsToFilterCopy)]
      }

      setFilteredItems(itemsToFilter)
      setCurrentPage(1)
    }
  }, [items, filterSold, filterWord ])

    return (
        <div className={styles.container}>
            <h2>Items List</h2>

            <section className={styles['filters-section']}>
                <div className={styles['filters-section-first-child']}>
                    <div>
                        <p>Sold:</p>
                        <select value={filterSold} onChange={e => setFilterSold(e.target.value === 'all' ? 'all' : e.target.value === 'true')}>
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
                    handleReset={() => {setSearchQuery(''); setFilterWord('')}}
                    />
                </div>
            </section>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                      <th className={styles.th}>Chassis Id</th>
                      <th className={styles.th}>Color</th>
                      <th className={styles.th}>Sold</th>
                      <th className={styles.th}>Motorcycle Model</th>
                      <th className={styles.th}>Order Number</th>
                      <th className={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {
                        filteredItems && filteredItems.length ?
                        filteredItems.slice(indexOfFirstItem, indexOfLastItem).map((el, i) => {
                            return (
                                <ItemRow key={i} item={el} getItems={getItems}/>
                            )
                        })
                        : <tr className={styles.tr}>
                            <td style={{width: '100%', height: '150px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', justifyContent: 'center'}}>
                              <h3 style={{ textAlign: 'center', color: '#fff', fontWeight: '700' }}>No items found</h3>
                              <p style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>No items were found for the search performed. Please try another search.</p>
                            </td>
                          </tr>
                    }
                </tbody>
            </table>

            <div className={styles['pagination-container']}>
                <div>
                    {
                        filteredItems && filteredItems.length && filteredItems.length > itemsPerPage ?
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
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
