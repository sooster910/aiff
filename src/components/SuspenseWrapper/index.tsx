import React, { Suspense } from 'react'
interface SuspenseWrapperProps {
	fallback: JSX.Element
	children: React.ReactNode
}
const isBrowser = typeof window !== 'undefined'
const SuspenseWrapper: React.FunctionComponent<SuspenseWrapperProps> = ({
	fallback,
	children,
	...restProps
}) => {
	if (isBrowser) {
		console.log('isBrowser', isBrowser)
		return <Suspense fallback={fallback}>{children}</Suspense>
	}
	console.log("not browser")
	return <>{fallback}</>
}
export default SuspenseWrapper