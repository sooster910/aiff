import * as React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: React.FunctionComponent<PageLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <div
        style={{
          position: 'relative',
          margin: '0 auto',
          width: '90%',
        }}
      >
        {children}
      </div>
    </>
  )
}

export default PageLayout
