import React from 'react';
import Header from './Header';
import TrackList from './TrackList';
// import Footer from './Footer';
import '../assets/styles/index.scss'

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <TrackList />
      </div>
    )
  }
}
