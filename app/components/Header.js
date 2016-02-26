import React from 'react';


export default class Header extends React.Component {
  render() {
    return (
      <section className="header">
        <div>
          <h1 className="header-title">React | Soundcloud</h1>
          <p className="header-description">Playing around with ReactJS and the Soundcloud API</p>
        </div>
      </section>

    )
  }
}
