import React, {ReactNode, Suspense} from 'react'
import dynamic from "next/dynamic";

interface SuspenseWrapperProps {
	fallback: ReactNode
	children: React.ReactNode
}
const SuspenseWrapper = dynamic(
	() =>Promise.resolve(({ children, fallback }: SuspenseWrapperProps) => (
		<Suspense fallback={fallback}>{children}</Suspense>
	)),
	{
		ssr: false,
	}
)
export default SuspenseWrapper

