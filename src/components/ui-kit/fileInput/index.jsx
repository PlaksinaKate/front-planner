import styles from './fileInput.module.scss'
import { useState, useRef } from 'react';
import clsx from 'clsx';

export function FileInput({ value, setValue }) {
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInput = useRef(null);

  const handleFile = (file) => {
    setValue((value) => [...value, file]);
    setPreviewUrl((previewUrl) => [...previewUrl, URL.createObjectURL(file)]);
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
      </div>
      <div className={clsx(styles.imgs, 'row')}>
        {preview}
      </div>
    </div>
  );
}