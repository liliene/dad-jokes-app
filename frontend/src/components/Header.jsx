import React from 'react';
import styles from './Header.module.css';

/**
 * Header
 * App-wide top bar with title and tagline.
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <span className={styles.emoji} role="img" aria-label="comedy mask">🎭</span>
          <div>
            <h1 className={styles.title}>Dad Jokes</h1>
            <p className={styles.tagline}>The world's finest groan-worthy humor</p>
          </div>
        </div>
        <div className={styles.badge}>
          <span>Powered by</span>
          <a
            href="https://icanhazdadjoke.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.apiLink}
          >
            icanhazdadjoke.com
          </a>
        </div>
      </div>
    </header>
  );
}
