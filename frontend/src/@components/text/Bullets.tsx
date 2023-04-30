import { Fragment } from 'react'

interface Props {
    text: any[]
};

const Bullets = ({text}: Props) => {
  return (
    <>
      {text.map((el, index) => 
        <Fragment key={index}>
            { index+1 !== text.length ? <>{ el} &#x2022; </> : <> {el} </> }
        </Fragment>
      )}
    </>
  )
}

export default Bullets