'use client';
import { useEffect, useState } from 'react';
import { MasonryPhotoAlbum, type Photo } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import styles from './Gallery.module.css';
import 'yet-another-react-lightbox/styles.css';
import "react-photo-album/masonry.css";

export default function Gallery() {
  const [folderName, setFolderName] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    async function fetchGallery() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) {
          throw new Error(`Failed to fetch gallery: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('API response', data);

        const mapped: Photo[] = (data.images || []).map((img: any) => {
          let w = img.width;
          let h = img.height;
          const ratio = w / h;

          // If too tall (portrait), cap ratio to ~3:4
          if (ratio < 0.6) {
            w = 1200;
            h = 1800;
          }
          // If too wide (landscape), cap ratio to ~4:3
          else if (ratio > 1.6) {
            w = 1600;
            h = 1000;
          }

          return { src: img.url, width: w, height: h };
        });
        console.log('Mapped photos', mapped.slice(0, 5));

        setFolderName(data.folderName || 'Gallery');
        setPhotos(mapped);
        console.log('Set photos count', mapped.length);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  useEffect(() => {
    console.log('photos sample', photos.slice(0,3));
  }, [photos]);

  console.log('Rendering Gallery with', photos.length, 'photos');

  if (loading) {
    return (
      <section aria-busy="true" aria-live="polite" className="gallery gallery--loading">
        <h2 className={'h2'}>Loading gallery...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section role="alert" className="gallery gallery--error">
        <h2>Error loading gallery</h2>
        <p>{error}</p>
      </section>
    );
  }

  console.log('photos sample', photos);

  return (
    <section className={styles.gallery}>
      <h2 className={`h2`}>{folderName}</h2>
      <MasonryPhotoAlbum
        photos={photos}
        onClick={({ index }) => setLightboxIndex(index)}
      />

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={photos}
      />
    </section>
  );
}