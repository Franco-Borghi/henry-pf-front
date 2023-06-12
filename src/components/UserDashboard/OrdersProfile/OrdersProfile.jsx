import styles from "../ProfileForm/ProfileForm.module.css"

export default function OrdersProfile({profileData, toggleItems, selectedOrders}) {
    return <ul className={styles['orders-list']}>
    {profileData?.orders ? (
      profileData.orders.map((o) => (
        <li className={styles['order-item']}>
          <div>
            <p className={styles['order-info']}>Order Number: {o?.orderNumber}</p>
            <p className={styles['order-info']}>Date: {o?.date}</p>
            <p className={styles['order-info']}>Amount: ${o?.amountPaid}</p>
            <p
              onClick={() => toggleItems(o.orderNumber)}
              className={styles['order-details-toggle']}
            >
              Details:
            </p>
            {selectedOrders.includes(o.orderNumber) && (
              <table className={styles['order-details-table']}>
                <thead>
                  <tr className={styles['order-item-row']}>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Transmission</th>
                    <th>CC</th>
                    <th>Year</th>
                    <th>Color</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {o?.items?.map((item, index) => (
                    <tr className={styles['order-item-row']} key={index}>
                      <td>{item?.motorcycle?.brand}</td>
                      <td>{item?.motorcycle?.model}</td>
                      <td>{item?.motorcycle?.transmission}</td>
                      <td>{item?.motorcycle?.cc}</td>
                      <td>{item?.motorcycle?.year}</td>
                      <td>{item?.color}</td>
                      <td>{item?.motorcycle?.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </li>
      ))
    ) : (
      <h4 className={styles['no-orders-message']}>You don't have any orders</h4>
    )}
  </ul>
}