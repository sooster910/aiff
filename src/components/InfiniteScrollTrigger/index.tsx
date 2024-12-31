import { useEffect, useRef } from 'react'

interface Props {
  onEndReached: () => void
  hasNext: boolean
  isLoadingNext: boolean
}

export const InfiniteScrollTrigger = ({
  onEndReached,
  hasNext,
  isLoadingNext,
}: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries[0])
        if (entries[0].isIntersecting && hasNext && !isLoadingNext) {
          console.log('isIntersection')
          onEndReached()
        }
      },
      { threshold: 0.5 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        console.log('unobserve')
        observer.unobserve(observerRef.current)
      }
    }
  }, [])

  return <div ref={observerRef} style={{ height: '10px' }} />
}
