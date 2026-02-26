import React, { useEffect, useRef, useState } from 'react';
import Input from 'components/Input';
import classes from './MultiDropdown.module.scss';
import classNames from 'classnames';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { type Option } from 'shared/types/types';

type DropdownOptionProps = {
    optionKey: string;
    name: string;
    selected: boolean;
    onClick: () => void;
};

const DropdownOption: React.FC<DropdownOptionProps> = ({ optionKey, name, selected, onClick }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            key={optionKey}
            className={classes.optionContainer}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onClick={onClick}
        >
            <Text
                tag="p"
                view="p-16"
                weight="normal"
                color={selected ? 'accent' : hovered ? 'secondary' : 'primary'}
            >
                {name}
            </Text>
        </div>
    );
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
    className?: string;
    /** Массив возможных вариантов для выбора */
    options: Option[];
    /** Текущие выбранные значения поля, может быть пустым */
    value: Option[];
    /** Callback, вызываемый при выборе варианта */
    onChange: (value: Option[]) => void;
    /** Заблокирован ли дропдаун */
    disabled?: boolean;
    /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
    getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
    className,
    options,
    value,
    onChange,
    disabled,
    getTitle,
}) => {
    const [filter, setFilter] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownClassName = classNames(classes.dropdownContainer, className);
    const selectedKeys = new Set(value.map((opt) => opt.key));

    const handleOptionClick = (option: Option) => {
        const isSelected = selectedKeys.has(option.key);
        let newValue: Option[];
        if (isSelected) {
            newValue = value.filter((item) => item.key !== option.key);
        } else {
            newValue = [...value, option];
        }
        onChange(newValue);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setFilter('');
                setIsTyping(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputFocus = () => {
        if (!disabled) {
            setIsOpen(true);
        }
    };
    const handleInputChange = (val: string) => {
        setFilter(val);
        setIsTyping(true);
        if (!disabled) {
            setIsOpen(true);
        }
    };

    const filteredOptions = options.filter((option) =>
        option.value.toLowerCase().includes(filter.toLowerCase())
    );
    let displayValue;
    if (isTyping) {
        displayValue = filter;
    } else {
        displayValue = value.length > 0 ? getTitle(value) : '';
    }
    const placeholder = value.length === 0 ? getTitle(value) : '';
    return (
        <div className={dropdownClassName} ref={containerRef}>
            <Input
                value={displayValue}
                onChange={handleInputChange}
                disabled={disabled}
                placeholder={placeholder}
                onFocus={handleInputFocus}
                onBlur={() => {
                    setIsTyping(false);
                }}
            />
            <ArrowDownIcon color="secondary" className={classes.arrowDownIcon} />

            {isOpen && !disabled && (
                <div className={classes.dropdownOptionsContainer}>
                    {filteredOptions.map((option) => (
                        <DropdownOption
                            key={option.key}
                            optionKey={option.key}
                            name={option.value}
                            selected={selectedKeys.has(option.key)}
                            onClick={() => handleOptionClick(option)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiDropdown;
