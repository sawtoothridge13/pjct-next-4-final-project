'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './DropDownMenu.module.scss';

type Option = {
  value: string;
  label: string;
};

type DropDownMenuProps = {
  options: Option[];
  onOptionClick: (option: Option) => void;
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  options,
  onOptionClick,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClick = (option: Option) => {
    setSelectedOption(option);
    onOptionClick(option); // Call onOptionClick instead of handleOptionClick
    setIsOpen(false);
  };

  return (
    <div>
      <section>
        <div className={styles.dropdown}>
          <button
            className={styles.dropdownToggle}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setIsOpen(!isOpen);
              }
            }}
            aria-expanded={isOpen}
          >
            {selectedOption ? selectedOption.label : 'My Trips'}
          </button>
        </div>
      </section>
      {isOpen && (
        <ul>
          {options.map((option) => (
            <li key={`option-${option.value}`} className={styles.dropdownItem}>
              <a
                href={`/trips/${option.value}`}
                onClick={() => handleClick(option)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleClick(option);
                  }
                }}
                tabIndex={0}
              >
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;
