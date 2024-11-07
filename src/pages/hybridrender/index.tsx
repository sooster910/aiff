import React from 'react'
import useSWR from 'swr';

type Props = {
    initialData: any;
}
type PostData = {
    id: string | number;
    title: string;
  };

const HybridRender = (props: Props) => {
  const {data} = useSWR<PostData[], Error>('/api/posts', fetcher, { fallbackData: props.initialData, revalidateOnFocus:false });
  return (
    <div>
    <h1>Posts</h1>
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  </div>
  )
}

const fetcher = async (url) => {
    // 실제 API 호출을 시뮬레이션하기 위해 지연 추가
    await new Promise(resolve => setTimeout(resolve, 1000));
    // 50% 확률로 데이터 변경을 시뮬레이션
    if (Math.random() > 0.5) {
      return [{ id: 'new', title: 'New Post' }, { id: 1, title: 'Post 1' }];
    }
    return [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
  };
export async function getServerSideProps() {
    const initialData = await fetcher('/api/posts');
    return { props: { initialData } };
  }
export default HybridRender