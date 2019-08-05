import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const liClass = classnames("li", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <>
      <li className={liClass} onClick={() => props.setDay(props.name)} >
        <h2>{props.name}</h2>
        <h3>{props.spots===0?'no spots remaining':props.spots===1?`${props.spots} spot remaining`:`${props.spots} spots remaining`}</h3>
      </li>
    </>);
}