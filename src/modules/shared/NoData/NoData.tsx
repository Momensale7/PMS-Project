import React from 'react'
import noDataImg from '../../../assets/nodata.png'
const NoData = () => {
  return (
    <div className="nodata-container text-center d-flex flex-column align-items-center justify-content-center py-5">
        <div>
            <img src={noDataImg } className='w-75' alt="" />
        </div>
        <h5 className='w-100 pt-3'>No Data !</h5>
        <p className='text-muted w-75 px-3'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}

export default NoData