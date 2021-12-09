import React from "react";
import "./Cards.css";

export const Cards = (props) => {
  return (
    <article className="card">
      <div className="card__media">
        <img
          src={props.url}
          alt="Card"
        />
        <div className="card__date">
          <span className="date--day">27</span>
          <span className="date--month">Mar</span>
        </div>
        <span className="card__category">Photos</span>
      </div>
      <div className="card__content">
        <header className="card__header">
          <h2 className="card__title">City Lights in New York</h2>
          <div className="card__subtitle">The city that never sleeps</div>
        </header>
        <p className="card__excerpt">
          New York, the largest city in the U.S., is an architectural marvel
          with plenty of historic monuments, magnificent buildings and countless
          dazzling skyscrapers.
        </p>
        <footer className="card__meta" role="contentinfo">
          <span className="card__post-date">6 min ago</span>
          <span className="card__comments">39 comments</span>
        </footer>
      </div>
    </article>
  );
};
