import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: { type: event.target.value }
    })
  };

  onFindPetsClick = () => {
    const url = (this.state.filters.type === 'all') ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          pets: [...data]
        })
      })
  };

  onAdoptPet = (id) => {
    let pets = [...this.state.pets];
    const selectedPet = pets.find(pet => pet.id === id);
    selectedPet.isAdopted = true;

    this.setState({
      pets: [...pets]
    })
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
