import React, { useState } from 'react'

const Upload = () => {
    const [file  , setfile] = useState([])

    function change (e){
         console.log(e.target.files); // 👈 check this

        // setfile([...e.target.files])

        setfile((g)=>[...g, ...e.target.files])
    }

    // function upload(){
    //     if(!file) return alert("select the file and upload")

    //         const formdata = new FormData()
    //         formdata.append("file", file);
    // }
  return (
    <div>
        <input type="file" accept='image/*' multiple onChange={change} />

        {
            file.map((r,d)=>( 
                <div key={d}>
                    <p>{r.name}</p>
                    {r.type.startsWith('image/')&&(
                        <img src={URL.createObjectURL(r)} alt="images" width="200" />
                    )}
                </div>
            ))
        }
        
    </div>
  )
}
export default Upload
