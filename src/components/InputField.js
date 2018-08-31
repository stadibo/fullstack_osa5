import React from 'react'

const InputField = (props) => {
  return (
    <tr>
      <td>
        <label htmlFor={props.id}>{props.id}</label>
      </td>
      <td>
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          required
        />
      </td>
    </tr>
  )
}

export default InputField