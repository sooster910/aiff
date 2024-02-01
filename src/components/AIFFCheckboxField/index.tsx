import {config} from "@app/config"

export const AIFFCheckboxField = ({field, form, label, ...props}) => {
  const handleOnChange = (e) => {
    const isDiscounted = e.target.checked
    form.setFieldValue("isDiscounted", e.target.checked)
    form.setFieldValue(
      "totalAmount",
      isDiscounted
        ? form.values.qty * config.DISCOUNT_PRICE
        : form.values.qty * form.values.classPrice
    )
  }

  return (
    <div style={{display: "flex", alignItems: "center"}}>
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
