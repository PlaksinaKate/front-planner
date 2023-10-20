import styles from './fileInput.module.scss'
import { useState, useRef } from 'react';
import clsx from 'clsx';

export function FileInput({ setValue, setErrorImg, errorImg }) {
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInput = useRef(null);

  const handleFile = (file) => {
    if(file?.size / 1000000 < 5) {
      setErrorImg('')
      setValue((value) => [...value, file.name]);
      setPreviewUrl((previewUrl) => [...previewUrl, URL.createObjectURL(file)]);
    } else {
      setErrorImg('Большой размер файла')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleOnDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let imageFile = e.dataTransfer.files[0];
    handleFile(imageFile);
  }

  const handleDeletePreviewImg = (e) => {
    const url = e.target.children[0].src
    const newPreviewUrls = previewUrl.filter((item) => item !== url)
    setPreviewUrl(newPreviewUrls)
    setValue(newPreviewUrls);
  }

  const preview = previewUrl && previewUrl.map((item, index) => {
    return <div className={styles.img} key={index} onClick={handleDeletePreviewImg}>
      <img src={item} alt='image' />
    </div>
  })

  return (
    <div className={clsx(styles.wr, 'row', 'no-wrap', 'space-between')}>
      <div
        className={styles.dragNdrop}
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
        onClick={() => fileInput.current.click()}
      >
        <input
          className={styles.input}
          type="file"
          accept='image/*'
          ref={fileInput}
          onChange={e => handleFile(e.target.files[0])}
        />
        <span className={styles.text}>Выберите фото или перетащите сюда</span>
        <div className={styles.error}>{errorImg}</div>
      </div>
      <div className={clsx(styles.imgs, 'row')}>
        {preview}
      </div>
    </div>
  );
}