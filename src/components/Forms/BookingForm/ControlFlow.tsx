import * as React from 'react'
type ControlFlowProps = {
  if?: boolean
  switch?: boolean
  children?: React.ReactNode
}

export const ControlFlow: React.FunctionComponent<ControlFlowProps> = props => {
  if (Object?.prototype?.hasOwnProperty.bind(props)('if') && props?.if) {
    return <>{props.children}</>
  }
  if (props?.switch) {
    // TODO
  }
  return <></>
}
