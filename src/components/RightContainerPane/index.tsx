import * as React from 'react'

interface RightContainerPaneProps {
  children: React.ReactNode
}

export const RightContainerPane: React.FunctionComponent<
  RightContainerPaneProps
> = ({ children }) => {
  return (
    <div style={{ width: '80%' }}>
      <h1>가맹점 클래스 관리 페이지</h1>
      {children}
    </div>
  )
}
