import React from 'react'

import './utils.css'

export function Button(props) {
  return (
    <button className="Button" type="button" {...props}>
      {props.children}
    </button>
  )
}

export function Input(props) {
  return <input className="Input" type="text" {...props} />
}
