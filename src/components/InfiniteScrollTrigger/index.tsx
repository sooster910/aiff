import { useEffect, useRef } from 'react'

export const InfiniteScrollTrigger = ({
  onEndReached,
  hasNext,
  isLoadingNext,
}) => {
  // observer를 이용한 무한 스크롤 구현
  // end에 닿으면 onEndReached 호출
  // 닿는걸 인지하기 위해, ref를 이용해 observer 등록
  const endRef = useRef<HTMLDivElement>(null)

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
          {isLoadingNext ? 'Loading...' : 'end of list'}
        </div>
      }
    </>
  )
}
