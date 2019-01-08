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
