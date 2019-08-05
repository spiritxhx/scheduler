import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  return (
    <>
      <ul>
        {props.days.map(eachDay => {
          return <DayListItem name={eachDay.name} spots={eachDay.spots} selected={eachDay === props.day} setDay={props.setDay} />
        })}
      </ul>
    </>
  )
}
