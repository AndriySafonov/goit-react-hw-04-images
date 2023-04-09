import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, selectedImgCard }) {
  useEffect(() => {
    // добавляем обработчик события нажатия клавиши на окне
    const handleKeyDown = event => {
      // если нажата клавиша Escape
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // удаляем обработчик события нажатия клавиши на окне
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // обработчик клика по заднему фону модального окна
  const handleBackdropClick = event => {
    // если клик был по заднему фону, а не по самому окну
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const { largeImageURL, tags } = selectedImgCard;

  // создаем портал для отображения модального окна
  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedImgCard: PropTypes.shape({}).isRequired,
};