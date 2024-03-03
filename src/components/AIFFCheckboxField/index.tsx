import {config} from "@app/config"

export const AIFFCheckboxField = ({field, form, label, inputStyle,...props}) => {
  const handleOnChange = (e) => {
    
  }

  return (
    <div style={inputStyle}>
      <input
        type="checkbox"
        {...field}
        checked={field?.value}
        onChange={handleOnChange}
        {...props}
      />
      <label>{label}</label>

    </div>
  )
}
