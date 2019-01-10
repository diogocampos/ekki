import classNames from 'classnames'
import React from 'react'

class Form extends React.Component {
  handleSubmit = event => {
    if (!this.props.onSubmit) return
    event.preventDefault()

    const values = {}
    for (const element of event.target.elements) {
      if (!element.name) continue
      values[element.name] = element.value
    }
    this.props.onSubmit(values)
  }

  render() {
    return (
      <div className="columns is-centered is-mobile">
        <div className="column is-narrow">
          <form {...this.props} onSubmit={this.handleSubmit}>
            {this.props.children}
          </form>
        </div>
      </div>
    )
  }
}

export default Form

export function Field(props) {
  const { errorMessage, ...inputProps } = props
  return (
    <div className="field ekki-field">
      <div className="control">
        <input
          type="text"
          {...inputProps}
          className={classNames(
            'input',
            errorMessage && 'is-danger',
            props.className
          )}
        />
      </div>
      <p className="help is-danger">{errorMessage}</p>
    </div>
  )
}
