import styles from './Style3.module.scss';
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  selected?: boolean,
};

const Container = ({children, selected, ...props}: Props) => {
  return (
    <div {...props} className={`${styles.container} ${selected ? styles.selected: ""}`}>
      {children}
    </div>
  )
}

export default Container