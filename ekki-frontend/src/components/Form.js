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
      <form {...this.props} onSubmit={this.handleSubmit}>
        {this.props.children}
      </form>
    )
  }
}

export default Form

export function Field(props) {
  const { errorMessage, ...inputProps } = props
  return (
    <div className="field">
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

export function SelectField(props) {
  const { name, placeholder, options = [], errorMessage } = props
  return (
    <div className="field">
      <div className="control">
        <div
          className={classNames(
            'select is-fullwidth',
            errorMessage && 'is-danger'
          )}
        >
          <select name={name}>
            <option value="">{placeholder}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="help is-danger">{errorMessage}</p>
    </div>
  )
}
