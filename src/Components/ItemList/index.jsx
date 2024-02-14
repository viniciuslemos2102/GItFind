import React from 'react'
import './styles.css'

function ItenList({tittle, description}) {
  return (
    <div className='itemList'>
        <strong>{tittle}</strong>
        <p>{description}</p>
        <hr/>
    </div>
  )
}

export default ItenList;
