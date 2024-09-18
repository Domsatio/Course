import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@material-tailwind/react'

type PaginationProps = {
    activePage: number;
    setActivePage: (page: number) => void;
    totalPages: number;
}

export default function Pagination({ activePage, setActivePage, totalPages }: PaginationProps) {
  return (
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
  )
}
