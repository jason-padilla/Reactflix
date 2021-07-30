import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = (props) => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <p className={styles.footerTitle}>Questions? Call 1-800-REACTFLIX</p>
        <div className={styles.footerRow}>
          <div className={styles.footerColumn}>
            <span>FAQ</span>
            <span>Investors</span>
            <span>Ways to Watch</span>
            <span>Legal Notices</span>
          </div>
          <div className={styles.footerColumn}>
            <span>Help Center</span>
            <span>Jobs</span>
            <span>Terms of Use</span>
            <span>Contact Us</span>
          </div>
          <div className={styles.footerColumn}>
            <span>Account</span>
            <span>Careers</span>
            <span>Privacy</span>
            <span>Speed Test</span>
          </div>
          <div className={styles.footerColumn}>
            <span>Media Center</span>
            <span>Buy Gift Cards</span>
            <span>Cookie Preferences</span>
            <span>Corporate Information</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;