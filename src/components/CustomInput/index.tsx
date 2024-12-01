import {Grid, Input, Note, Spacer} from "@geist-ui/core"
import {FormikErrors, FormikTouched} from "formik"
import * as React from "react"
import mixpanel from "mixpanel-browser";

type Props = {
  label: string
  name: string
  type?: string
  htmlType?: string
  min?: number
  max?: number
  field?: {
    name: string
    value: string
  }
  touched?: FormikTouched<{[field: string]: any}>
  errors?: FormikErrors<{[field: string]: any}>
}

const CustomInput: React.FunctionComponent<Props> = ({
  label,
  name,
  type,
  htmlType,
  min,
  max,
  field,
  touched,
  errors,
  ...rest
}) => {
  const isError = errors?.[name] && touched?.[name]
  return (
    <>
      <Grid>
        <Input
          id={name}
          name={name}
          htmlType={htmlType}
          min={min}
          max={max}
          scale={4 / 3}
          onClick={()=>{
              mixpanel.track(`focus_${name}`)
          }}
          {...rest}
        >
          {label}
        </Input>
        <Spacer h={0.5} />
        {isError && (
          <Note type="error" label="">
            {errors?.[name] as string}
          </Note>
        )}
      </Grid>
    </>
  )
}

export default CustomInput
