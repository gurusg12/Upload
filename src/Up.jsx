import React, { useState } from 'react'

const Up = () => {
    const[uplods , setUploads] = useState([])
  return (
    <div>
      <input type="file" accept='image/*' multiple onChange={(j)=>setUploads((g)=>[...g , ...j.target.files])} />
      {
        uplods.map((r , i)=>(
            <div key={i}>
                {r.type.startsWith('image/')&&(
                    <img src={URL.createObjectURL(r)} alt="image" sizes='200' />
                )}
            </div>
        ))
      }
    </div>
  )
}

export default Up
