import React, { Component } from 'react'

export default class Whether extends Component {

    state = {
        whetherlist: []
      };

    render() {
    return (
            <div>
                <h1>Hello</h1>
            </div>
    )
  }

   async componentDidMount() {
    this.loadData();
  }

}
