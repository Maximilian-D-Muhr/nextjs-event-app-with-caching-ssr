import { Suspense } from 'react';
import { Counter, PostsList, PostsListSkeleton } from '@/components';
import { getPosts } from '@/data/posts';

export default function Blog() {
  const postsPromise = getPosts();

  return (
    <main className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold'>Blog</h1>

      <section>
        <h2 className='text-xl font-semibold'>Try the Counter</h2>
        <Counter />
      </section>

      <section>
        <h2 className='text-xl font-semibold'>Posts</h2>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList postsPromise={postsPromise} />
        </Suspense>
      </section>
    </main>
  );
}
