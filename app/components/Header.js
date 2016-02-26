import React from 'react';


export default class Header extends React.Component {
  render() {
    return (
      <section className="header flex flex-column flex-v-c">
        <div className="container">
          <div>
            <h1 className="header-title">React | Soundcloud</h1>
            <p className="header-description">Playing around with ReactJS and the Soundcloud API</p>
          </div>
          <div className="alert alert-warning">
            This is an ongoing project. More features like search and infinite scrolling will be coming soon.
          </div>
        </div>
      </section>

    )
  }
}
