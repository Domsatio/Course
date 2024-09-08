import { PaginationProps } from "@/helpers/typeProps";
import {
  Button,
  CardFooter,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuHandler,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";

export const Pagination: React.FC<PaginationProps> = ({
  disabled = false,
  currentPage,
  totalPages,
  onPageChange,
  handleLimit,
  maxButtons,
  limit,
}) => {
  const rangeStart = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const rangeEnd = Math.min(totalPages, rangeStart + maxButtons - 1);
  const pageNumbers = Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );

  return (
    <CardFooter className="flex flex-col border-t border-blue-gray-50 p-4">
      <div className="flex justify-between items-center">
        <p>Showing {limit} data per page</p>
        <Menu>
          <MenuHandler>
            <Button
              size="sm"
              variant="outlined"
              className="flex items-center justify-between gap-4"
            >
              {limit} per page
              <ChevronDownIcon strokeWidth={3} className="h-3 w-3" />
            </Button>
          </MenuHandler>
          <MenuList>
            {[5, 10, 20, 50].map((item) => (
              <MenuItem key={item} onClick={() => handleLimit(item)}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      {totalPages > 1 && (
        <div className="w-full flex justify-center items-center gap-2">
          <Button
            variant="outlined"
            disabled={currentPage - 1 === 0 ? true : false}
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
          </Button>
          <div className="flex items-center gap-2 mx-4">
            {rangeStart > 1 && (
              <IconButton
                variant="text"
                size="sm"
                onClick={() => onPageChange(1)}
              >
                1
              </IconButton>
            )}
            {rangeStart > 2 && <Typography color="gray">...</Typography>}
            {pageNumbers.map((pageNumber) => (
              <IconButton
                key={pageNumber}
                disabled={disabled}
                variant={pageNumber === currentPage ? "filled" : "text"}
                type="button"
                size="sm"
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </IconButton>
            ))}
            {rangeEnd < totalPages - 1 && (
              <Typography className="page-link">...</Typography>
            )}
            {rangeEnd < totalPages && (
              <IconButton
                disabled={disabled}
                variant="text"
                type="button"
                size="sm"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </IconButton>
            )}
          </div>
          <Button
            variant="outlined"
            disabled={currentPage === totalPages ? true : false}
            size="sm"
            className=""
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
          </Button>
          <input
            // placeholder="page"
            className="w-14 outline-none border border-black mx-3 rounded-md text-center py-1"
            type="number"
            max={totalPages}
            min={1}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value > 0 && value <= totalPages) {
                onPageChange(value);
              }
            }}
          />
        </div>
      )}
    </CardFooter>
  );
};
