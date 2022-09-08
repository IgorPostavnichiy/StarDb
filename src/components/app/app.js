import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import DummySwapiService from '../../services/dummy-swapi-service';
import SwapiService from '../../services/swapi-service';
import { PeolpePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';
import StarshipDetails from '../sw-components/starship-details';

import './app.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
                      DummySwapiService: SwapiService;
        return {
          swapiService: new Service()
        };
    });
  };

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
               <Header onServiceChange={this.onServiceChange} />
               <RandomPlanet/>

                <Routes>
                  <Route path="/" element={<h2>Welcome to StarDB</h2>}> </Route>
                  <Route path="/people" element={<PeolpePage />}> </Route>
                  <Route path="/planets" element={<PlanetsPage />} > </Route>
                  <Route path="/starships" exact element={<StarshipsPage />} > </Route>
                  <Route path="/starships/:id"
                   render={({ match }) => {
                    const { id } =  match.params;
                    return <StarshipDetails itemId = {id} />
                   }} />               
                </Routes>
            </div> 
          
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
