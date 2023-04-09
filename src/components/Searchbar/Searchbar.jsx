import React, { useState, useRef, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { IoSearchSharp } from 'react-icons/io5';
import css from './Searchbar.module.css';

export function Searchbar(props) {
  // useState и useRef хуки для хранения и обновления 
  // значения текстового поля
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(inputValue);


  // функция handleChange, вызывается при изменении 
  // значения текстового поля и обновляет значение 
  // inputValue.
  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
     // Проверяем значения текстового поля.  Если 
    // значение пустое, отображается уведомление 
    // об ошибке 
    if (inputValue.trim() === '') {
      Notify.warning('Opss...try again');
      return;
    }
    // Если значение не пустое, вызывается функция 
    // onSubmit, передавая ей обрезанное значение 
    // текстового поля, и обновляется значение inputValue.
    props.onSubmit(inputValue.trim());
    setInputValue('');
  }

  // Используем useEffect хук для обновления значения 
  // inputRef при изменении значения inputValue.
  useEffect(() => {
    inputRef.current = inputValue;
  }, [inputValue]);

  // Используем useEffect хук для получения значения 
  // inputRef при первом рендере компонента и 
  // обновления значения inputValue, если значение inputRef не пустое.
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



