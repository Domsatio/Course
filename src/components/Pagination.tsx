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
} from "@material-tailwind/react";

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
    <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
      <Button
        disabled={currentPage - 1 === 0 ? true : false}
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
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
            variant={pageNumber === currentPage ? 'outlined' : 'text'}
            type='button'
            size="sm"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </IconButton>
        ))}
        {rangeEnd < totalPages - 1 && (
          <Typography className='page-link'>...</Typography>
        )}
        {rangeEnd < totalPages && (
          <IconButton
            disabled={disabled}
            variant="text"
            type='button'
            size="sm"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </IconButton>
        )}
      </div>
      <Button
        disabled={currentPage === totalPages ? true : false}
        size="sm"
        className="mr-2"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
      <Menu>
        <MenuHandler>
          <Button>{limit}</Button>
        </MenuHandler>
        <MenuList>
          {[5, 10, 20].map((item) => (
            <MenuItem key={item} onClick={() => handleLimit(item)}>
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </CardFooter>
  );
};
