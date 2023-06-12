import styles from "../ProfileForm/ProfileForm.module.scss"
import { convertirNumero } from '../../../utils';

export default function OrdersProfile({profileData, toggleItems, selectedOrders}) {
    return (
      <ul className={styles['orders-list']}>
        {profileData?.orders ? (
          profileData.orders.map((o) => (
            <li className={styles['order-item']}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <p className={styles['order-info']}>Order Number: <span>{o?.orderNumber}</span></p>
                <p className={styles['order-info']}>Date: <span>{o?.date}</span></p>
                <p className={styles['order-info']}>Amount: <span>$USD {convertirNumero(o?.amountPaid)}</span></p>
                <p onClick={() => toggleItems(o.orderNumber)} className={styles['order-details-toggle']}>
                  Details
                </p>
                {selectedOrders.includes(o.orderNumber) && (
                  <div className={styles['order-details-table-container']}>
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
                            <td>{convertirNumero(item?.motorcycle?.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <h4 className={styles['no-orders-message']}>You don't have any orders</h4>
        )}
      </ul>
    )
}