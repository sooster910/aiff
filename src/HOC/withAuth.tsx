/* eslint-disable react/display-name */
import { useAuth } from '@app/hooks/useAuth'
import { useRouter } from 'next/router'

type Props = {}

const withAuth = (WrappedComponent: any) => {
  return (props: Props) => {
    if (typeof window !== 'undefined') {
      console.log('window is detected', window)
      const Router = useRouter()
      const auth = useAuth()

      if (!auth?.user) {
        Router.replace('/login')
        return null
      }
      return <WrappedComponent {...props} />
    }
    return null
  }
}

export default withAuth
