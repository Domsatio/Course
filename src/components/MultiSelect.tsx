import React, { FC, useEffect, useState, useMemo } from 'react';
import { Button, Chip, Input, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: Option[];
  label: string;
  name: string;
  selected: any;
  onChange?: (e: any) => void;
}

const MultiSelect: FC<MultiSelectProps> = ({ options, label, name, selected, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredOptions = useMemo(() =>
    options.filter(option =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [options, searchTerm]
  );

  const handleClosePopover = (): void => {
    setIsOpen(false);
    setSearchTerm('');
  }

  const handleSelect = (optionId: string): void => {
    setSelectedOptions(prev => {
      const newSelected = prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId];
      onChange?.({
        target: {
          name: name,
          value: newSelected
        }
      });
      return newSelected;
    });
  };

  const handleSelectAll = (): void => {
    const allIds = options.map(option => option.id);
    setSelectedOptions(allIds);
    onChange?.({
      target: {
        name: name,
        value: allIds
      }
    });
  }

  const handleRemove = (optionId: string): void => {
    setSelectedOptions(prev => {
      const newSelected = prev.filter(id => id !== optionId);
      onChange?.({
        target: {
          name: name,
          value: newSelected
        }
      });
      return newSelected;
    });
  };

  const handleRemoveAll = (): void => {
    setSelectedOptions([]);
    onChange?.({
      target: {
        name: name,
        value: []
      }
    });
  }

  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  return (
    <div className="w-96">
      <Popover open={isOpen} handler={setIsOpen}>
        <PopoverHandler>
          <div className="border border-gray-300 text-sm items-center flex rounded-lg cursor-pointer min-h-[42px]">
            {selectedOptions.length > 0 ? (
              <div className='w-full flex gap-2 justify-between items-center py-2 pl-2 pr-3'>
                <div className="flex flex-wrap gap-1">
                  {selectedOptions.map((optionId) => {
                    const option = options.find(opt => opt.id === optionId);
                    return option && (
                      <Chip
                        key={optionId}
                        value={option.name}
                        onClose={() => handleRemove(optionId)}
                        className="bg-blue-500 text-white"
                      />
                    );
                  })}
                </div>
                <div className='w-fit'>
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </div>
            ) : (
              <div className='px-3 py-1.5 flex justify-between items-center w-full'>
                <span className="text-gray-500">Select {label}...</span>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
            )}
          </div>
        </PopoverHandler>
        <PopoverContent className="w-96 p-0">
          <Input
            crossOrigin={undefined}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg rounded-b-none shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
          />
          <ul className="w-full mt-2 max-h-60 overflow-y-auto px-2">
            <li
              key='all'
              className="hover:bg-gray-100 p-2 text-black uppercase rounded flex justify-between items-center cursor-pointer"
              onClick={handleSelectAll}
            >
              (Select All)
            </li>
            {filteredOptions.map(({ id, name }) => (
              <li
                key={id}
                onClick={() => handleSelect(id)}
                className={`hover:bg-gray-100 p-2 text-black capitalize rounded flex justify-between items-center cursor-pointer 
                  ${selectedOptions.includes(id) ? 'bg-gray-100' : ''}`}
              >
                {name}
                {selectedOptions.includes(id) && (
                  <span className="text-blue-500">✓</span>
                )}
              </li>
            ))}
          </ul>
          <hr className="mt-2 border-gray-300" />
          <div className='flex'>
            {selectedOptions.length > 0 && (
              <>
                <Button
                  variant='text'
                  // size='sm'
                  ripple={false}
                  fullWidth
                  onClick={handleRemoveAll}
                  className='rounded-t-none rounded-br-none'
                >
                  Clear All
                </Button>
                <div className='border-r border-gray-300'></div>
              </>
            )}
            <Button
              variant='text'
              // size='sm'
              ripple={false}
              fullWidth
              onClick={handleClosePopover}
              className={`rounded-tr-none ${selectedOptions.length > 0 ? 'rounded-tl-none rounded-bl-none' : 'rounded-tl-none'}`}
            >
              Close
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelect;