import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  return (
    <>
      <ul>
        {props.days.map(eachDay => {
          return <DayListItem name={eachDay.name}
            key={props.id}
            spots={eachDay.spots}
            selected={eachDay.name === props.day}
            setDay={props.setDay} />
        })}
      </ul>
    </>
  )
}
