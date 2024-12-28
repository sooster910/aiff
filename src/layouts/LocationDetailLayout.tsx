import React from 'react'

type LocationDetailLayoutProps = {
  children: React.ReactNode
}

export const LocationDetailLayout: React.FunctionComponent<
  LocationDetailLayoutProps
> = ({ children }) => {
  return <div className={'flex flex-col'}>{children}</div>
}
