import classNames from 'classnames'
import React from 'react'

export function Button(props) {
  return (
    <button
      type="button"
      {...props}
      className={classNames('button is-primary', props.className)}
    >
      {props.children}
    </button>
  )
}

export function Spinner() {
  return (
    <div className="container has-text-centered">
      <button type="button" className="button is-loading is-white is-large">
        Loading…
      </button>
    </div>
  )
}

export function Subtitle(props) {
  return <h3 className="subtitle">{props.children}</h3>
}

export function Title(props) {
  return <h2 className="title is-4">{props.children}</h2>
}
