import React, { Component, ErrorInfo, ReactNode, useState, useEffect } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode; // fallback UI를 전달할 수 있도록 설정
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

 
  const componentDidCatch = (error: Error, errorInfo: ErrorInfo): void => {
    setError(error)
    setErrorInfo(errorInfo)
  }

  if (!isClient) {
    return <>{children}</>
  }

  if (hasError) {
    // 오류가 발생하면 fallback UI를 보여줌
    return <>{fallback}</>
  }

  // 자식 컴포넌트는 정상적으로 렌더링
  return (
    <div>
      {children}
    </div>
  )
}

export default ErrorBoundary
