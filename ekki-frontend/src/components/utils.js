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
  const { className, name, type = 'text', placeholder, errorMessage } = props
  return (
    <div className="field">
      <div className="control">
        <input
          className={classNames(
            'input is-primary is-medium',
            errorMessage && 'is-danger',
            className
          )}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
      <p className="help is-danger">{errorMessage}</p>
    </div>
  )
}

export function Title(props) {
  return <h2 className="title is-4">{props.children}</h2>
}
