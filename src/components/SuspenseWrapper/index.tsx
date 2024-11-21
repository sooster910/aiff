import React, { Suspense } from 'react'
import dynamic from "next/dynamic";

interface SuspenseWrapperProps {
	fallback: JSX.Element
	children: React.ReactNode
}

interface SuspenseWrapperProps {
	fallback: JSX.Element
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

