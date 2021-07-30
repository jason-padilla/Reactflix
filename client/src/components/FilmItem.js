import React from 'react'
import styles from '../styles/FilmItem.module.css'

const ListItem = (props) => {
  return (
      <div className={styles.listItem}>
        <img src={window.location.origin + "/img/" + props.imageName + ".jpeg"} alt=""/>
      </div>
  )
}

export default ListItem;