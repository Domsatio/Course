import {
  Button,
  CardFooter,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuHandler,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import { FC, useState } from "react";

interface PaginationProps {
  disabled?: boolean;
  currentPage: number;
  totalData: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  handleLimit: (limit: number) => void;
  limit: number;
}

const Pagination: FC<PaginationProps> = ({
  disabled = false,
  currentPage,
  totalData,
  totalPages,
  onPageChange,
  handleLimit,
  limit,
}) => {
  const [pageValue, setPageValue] = useState<number>(0);
  const maxButtons = 5
  const rangeStart: number = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const rangeEnd: number = Math.min(totalPages, rangeStart + maxButtons - 1);
  const pageNumbers: number[] = Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );

  const handlePageChange = () => {
    if (pageValue > 0 && pageValue <= totalPages) {
      onPageChange(pageValue);
    }
  }

  return (
    <CardFooter className="flex flex-col-reverse md:flex-row border-t border-blue-gray-50 p-4 justify-between items-center gap-5">
      <div className="flex items-center gap-3">
        <p>Showing</p>
        <Menu>
          <MenuHandler>
            <Button
              size="sm"
              variant="outlined"
              className="flex items-center justify-between gap-2 px-3 border-gray-400"
            >
              {limit}
              <ChevronDownIcon strokeWidth={3} className="h-3 w-3" />
            </Button>
          </MenuHandler>
          <MenuList>
            {[5, 10, 20, 50].map((item: number) => (
              <MenuItem key={item} onClick={() => handleLimit(item)}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <p>of {totalData} items per page</p>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center gap-4 overflow-x-auto">
          <Button
            variant="text"
            size="sm"
            disabled={currentPage - 1 === 0 ? true : false}
            className="flex items-center gap-2"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeftIcon strokeWidth={2} className="h-3 w-3" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            {rangeStart > 1 && (
              <IconButton
                size="sm"
                variant="text"
                onClick={() => onPageChange(1)}
              >
                1
              </IconButton>
            )}
            {rangeStart > 2 && (
              <Popover>
                <PopoverHandler>
                  <IconButton variant="text" size="sm">...</IconButton>
                </PopoverHandler>
                <PopoverContent className="p-2 flex justify-between gap-2">
                  <input
                    className="outline-none w-20 border border-gray-400 rounded-md text-center py-1.5"
                    type="number"
                    placeholder="..."
                    max={totalPages}
                    min={1}
                    onChange={(e) => setPageValue(parseInt(e.target.value))}
                  />
                  <Button size="sm" onClick={handlePageChange}>
                    Go
                  </Button>
                </PopoverContent>
              </Popover>
            )}
            {pageNumbers.map((pageNumber: number) => (
              <IconButton
                key={pageNumber}
                disabled={disabled}
                size="sm"
                variant={pageNumber === currentPage ? "filled" : "text"}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </IconButton>
            ))}
            {rangeEnd < totalPages - 1 && (
              <Popover>
                <PopoverHandler>
                  <IconButton variant="text" size="sm">...</IconButton>
                </PopoverHandler>
                <PopoverContent className="p-2 flex justify-between gap-2">
                  <input
                    className="outline-none w-20 border border-gray-400 rounded-md text-center py-1.5"
                    type="number"
                    placeholder="..."
                    max={totalPages}
                    min={1}
                    onChange={(e) => setPageValue(parseInt(e.target.value))}
                  />
                  <Button size="sm" onClick={handlePageChange}>
                    Go
                  </Button>
                </PopoverContent>
              </Popover>
            )}
            {rangeEnd < totalPages && (
              <IconButton
                disabled={disabled}
                size="sm"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </IconButton>
            )}
          </div>
          <Button
            variant="text"
            size="sm"
            disabled={currentPage === totalPages ? true : false}
            className="flex items-center gap-2"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next <ChevronRightIcon strokeWidth={2} className="h-3 w-3" />
          </Button>
        </div>
      )}
    </CardFooter>
  );
};

export default Pagination;
