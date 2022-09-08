import React, { Component } from "react";
import { PersonList } from "../sw-components";
import { PersonDetails } from "../sw-components";

import Row from "../row";

export default class PeolpePage extends Component {

    state = {
        selectedItem: null
    };

    onItemSelected = (selectedItem) => {
        this.setState({ selectedItem });
    };

    render() {
        const { selectedItem } = this.state;

        return (
            <Row
              left={<PersonList onItemSelected={this.onItemSelected} />}
              right={<PersonDetails itemId={selectedItem} />}  />
        );
    }

}