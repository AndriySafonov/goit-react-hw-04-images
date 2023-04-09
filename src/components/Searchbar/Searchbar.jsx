import React, { useState, useRef, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { IoSearchSharp } from 'react-icons/io5';
import css from './Searchbar.module.css';

export function Searchbar(props) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(inputValue);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedInputValue = inputValue.trim();
    if (trimmedInputValue === '') {
      Notify.warning('Opss...try again');
      return;
    }
    props.onSubmit(trimmedInputValue);
    setInputValue('');
  }

  useEffect(() => {
    inputRef.current = inputValue;
  }, [inputValue]);

  useEffect(() => {
    const savedInputValue = inputRef.current;
    if (savedInputValue) {
      setInputValue(savedInputValue);
    }
  }, []);

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <span>
            <IoSearchSharp size={24} />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};



