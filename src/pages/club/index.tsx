import PostCard from '@/components/client/PostCard'
import { categoryServices, postServices } from '@/services/serviceGenerator'
import { GetCategory } from '@/types/category.type'
import { GetPost } from '@/types/post.type'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button, IconButton, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
  where?: string;
}

const ClientView = () => {
  const [posts, setPosts] = useState<Omit<GetPost, 'published' | 'createdAt'>[]>([])
  const [categories, setCategories] = useState<Omit<GetCategory, 'posts'>[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activePage, setActivePage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    const postParams: Params = {
      skip: activePage * 12 - 12,
      take: 12,
      where: activeCategory !== null ? activeCategory : undefined,
    }

    const categoryParams: Params = {
      skip: 0,
      take: 'all',
    }

    postServices.getItems(postParams).then(({ data: { totalData, data } }) => {
      setPosts(data)
      setTotalPages(Math.ceil(totalData / 12))
    })

    categoryServices.getItems(categoryParams).then(({ data: { data } }) => {
      setCategories(data)
    })
  }, [activePage, activeCategory])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex container flex-col justify-center flex-wrap gap-10 pt-10 pb-32 px-24">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Blog Page
        </Typography>

        <div className="flex gap-2 flex-wrap">
          {categories.map(({ id, name }) => (
            <Button
              key={id}
              size='sm'
              variant={`${activeCategory === id ? 'filled' : 'outlined'}`}
              className="rounded-full cursor-pointer capitalize border-gray-400"
              onClick={() => setActiveCategory(activeCategory === id ? null : id)}
            >
              {name}
            </Button>
          ))}
        </div>

        <div className="flex justify-center flex-wrap gap-6">
          {posts.map(({ id, title, slug, body, categories }) => (
            <PostCard key={id} title={title} slug={slug} body={body} categories={categories} />
          ))}
        </div>

        <div className='flex justify-center items-center gap-20'>
          <IconButton
            className='rounded-full border-gray-300 hover:border-black'
            variant='outlined'
            disabled={activePage === 1}
            onClick={() => setActivePage(activePage - 1)}
          >
            <ChevronLeftIcon className="h-5 w-5 text-black" />
          </IconButton>
          <div className='flex gap-3'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <IconButton
                key={page}
                className='rounded-full border-gray-300 hover:border-black'
                variant={`${activePage === page ? 'filled' : 'outlined'}`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </IconButton>
            ))}
          </div>
          <IconButton
            className='rounded-full border-gray-300 hover:border-black'
            variant='outlined'
            disabled={activePage === totalPages}
            onClick={() => setActivePage(activePage + 1)}
          >
            <ChevronRightIcon className="h-5 w-5 text-black" />
          </IconButton>
        </div>
      </section>
    </main>
  )
}

export default ClientView