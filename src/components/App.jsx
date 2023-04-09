import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { FetchApi } from './servises/Api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [imageCards, setImageCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImgCard, setSelectedImgCard] = useState(null);

  //  хук используется для отправки запроса на сервер с помощью 
  // FetchApi и обработки результата.Если запрос не удался, то 
  // уведомляет пользователя об ошибке с помощью Notify.
  useEffect(() => {
    if (searchQuery !== '' && page > 0) {
      setLoading(true);
      setTotalHits(0);

      const fetchResponse = FetchApi(searchQuery, page);
      fetchResponse
        .then(resp => {
          console.log(resp);
          if (resp.data.hits.length === 0) {
            setLoading(false);
            Notify.warning('Oops! Find better)');
            return;
          }

          setImageCards(prevImageCards => [
            ...prevImageCards,
            ...resp.data.hits,
          ]);
          setTotalHits(resp.data.totalHits);

          if (resp.data.total === 0) {
            Notify.warning(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
        })
        .catch(error => {
          console.log(error);
          Notify.failure('Something went wrong...');
        })
        .finally(() => setLoading(false));
    }
  }, [searchQuery, page]);

  // onSubmit()вызываем при отправке формы поиска. Он устанавливает
  // новое значение для searchQuery, если оно отличается от предыдущего значения.
  const onSubmit = inputValue => {
    if (searchQuery !== inputValue) {
      setSearchQuery(inputValue);
      setImageCards([]);
      setPage(1);
    }
  };

  // при нажатии кнопки "Load more...", увеличиваем значение page на 1
  const onLoadBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  // переключает значение showModal между true и false
  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  // вызываем при клике на картинку,  устанавливаем ее как
  // selectedImgCard и отображаем в модальном окне
  const onImgClick = imgId => {
    const imageCard = imageCards.find(imageCard => imageCard.id === imgId);

    setSelectedImgCard(imageCard);
    setShowModal(true);
  };
  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {/* проверяем, есть ли imageCards, и если да, то отображаем галерею */}
      {imageCards.length > 0 && (
        <ImageGallery imageCardsArray={imageCards} onImgClick={onImgClick} />
      )}

      {showModal && (
        <Modal onClose={toggleModal} selectedImgCard={selectedImgCard} />
      )}

      {/*  Если loading true, то отображаем индикатор загрузки Loader */}
      {loading && <Loader />}

      {/* если картинок пришло больше 12, отображается кнопка "Load more..." */}
      {page * 12 <= totalHits && <Button onClick={onLoadBtnClick} />}
    </div>
  );
}
