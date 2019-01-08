import classNames from 'classnames'
import React from 'react'

export function Button(props) {
  return (
    <button
      type="button"
      {...props}
      className={classNames('button is-primary is-medium', props.className)}
    >
      {props.children}
    </button>
  )
}

export function Field(props) {
  return (
    <div className="field">
      <div className="control">
        <input
          type="text"
          {...props}
          className={classNames('input is-primary is-medium', props.className)}
        />
      </div>
    </div>
  )
}

export function Title(props) {
  return <h2 className="title is-4">{props.children}</h2>
}
