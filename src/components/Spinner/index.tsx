export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

export const Spinner = ({ size = 'md' }: SpinnerProps) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size]

  return (
    <div
      className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${sizeClass}`}
    />
  )
}
