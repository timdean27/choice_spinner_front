import React from 'react'

const Wheel = ({choices}) => {
  return (
    <div>
        <ul className="wheel-list">
        {choices.map((choice, index) => (
            <li className= {"wheel-list-item" + index} key={index}>
              <div className="inner-wheel-div">{choice.body}</div>
            </li>
          ))}
        </ul>
    
    </div>
  )
}

export default Wheel