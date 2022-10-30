import React from "react";

import styles from "./Content.module.css";
import LoginContent from "./LoginContent";

const Content = (props) => {
  return <div className={styles.content}>
    <LoginContent/>
  </div>;
};

export default Content;
