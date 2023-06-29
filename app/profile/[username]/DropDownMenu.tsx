'use client';

import React, { useEffect, useState } from 'react';
import styles from './DropDownMenu.module.scss';

type Option = {
  value: string;
  label: string;
};

type DropDownMenuProps = {
  options: Option[];
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({ options }) => {
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

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
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
            <li
              key={`option-${option.value}`}
              className={styles.dropdownItem}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleOptionClick(option);
                }
              }}
              tabIndex={0}
              role="button"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;
