import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Made with <span aria-label="love">❤️</span> &amp; bad jokes ·{' '}
        <a
          href="https://icanhazdadjoke.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          API by icanhazdadjoke
        </a>
      </p>
    </footer>
  );
}
