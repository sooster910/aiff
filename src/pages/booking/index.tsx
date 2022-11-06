import { Spinner } from '@geist-ui/core'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { Suspense } from 'react'

interface ITestProps {}

const SuspenseBooking = dynamic(
  () => import('../../components/SuspenseBooking'),
  { ssr: false }
)

const Test: React.FunctionComponent<ITestProps> = props => {
  return (
    <>
      {/* A component that uses Suspense-based */}
      <SuspenseBooking />
    </>
  )
}
export default Test
