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

export function Field(props) {
  const { errorMessage, ...inputProps } = props
  return (
    <div className="field">
      <div className="control">
        <input
          type="text"
          {...inputProps}
          className={classNames(
            'input is-primary is-medium',
            errorMessage && 'is-danger',
            props.className
          )}
        />
      </div>
      <p className="help is-danger">{errorMessage}</p>
    </div>
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

/**
 * Formats a number as currency with thousands and decimal separators.
 * @param {number} valueInCents The amount, in cents
 * @returns {string} The resulting string
 */
export function formatCurrency(valueInCents) {
  const [integer, fraction] = (valueInCents / 100).toFixed(2).split('.')
  const modulo = integer.length % 3
  const thousands = modulo ? [integer.slice(0, modulo)] : []
  for (let i = modulo; i < integer.length; i += 3) {
    thousands.push(integer.slice(i, i + 3))
  }
  return thousands.join(',') + '.' + fraction
}
