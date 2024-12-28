import { useEffect, useRef } from 'react'

export const InfiniteScrollTrigger = ({
  onEndReached,
  hasNext,
  isLoadingNext,
}) => {
  const endRef = useRef<HTMLDivElement>(null)
  //TODO: refactor custom hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('entries', entries)

        if (entries[0].isIntersecting && hasNext) {
          console.log('touched')
          onEndReached()
        }
      },
      { threshold: 0.5 }
    )

    const isEnd = endRef.current
    if (endRef && isEnd) {
      observer.observe(isEnd)
    }

    return () => {
      if (endRef && isEnd) {
        observer.unobserve(isEnd)
      }
    }
  }, [hasNext, onEndReached])

  return (
    <>
      {
        <div className="w-full absolute bottom-0" ref={endRef}>
          {isLoadingNext && 'Loading...'}
        </div>
      }
    </>
  )
}
