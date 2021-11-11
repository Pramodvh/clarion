import React, { PureComponent } from 'react';
// import shallowCompare from 'react-addons-shallow-compare'; // ES6

export default class Child2 extends PureComponent {
  //   shouldComponentUpdate(nextProps, nextState) {
  //     //   if(this.props !== nextProps || this.state !== nextState) {
  //     //       return true
  //     //   }
  //     //   return false
  //     return shallowCompare(this, nextProps, nextState);
  //   }
  state = {
    counter: 0,
  };

  componentDidMount() {
    // document.addEventListener("mousemove", this.mouseMove);
    // this.interval = setInterval(() => {
    //   console.log("interval");
    // }, 1000);
  }

  componentWillUnmount() {
    // document.removeEventListener("mousemove", this.mouseMove);
    // clearInterval(this.interval);
  }

  mouseMove = () => {
    console.log('mouse move');
  };

  incrementCounter = () => {
    // this.setState({
    //   counter: this.state.counter + 1,
    // });
    this.setState(
      ({ counter }) => ({
        counter: counter + 1,
      }),
      () => {
        // console.log(this.state.counter);
      },
    );
  };

  render() {
    console.log('Child 2 Render');
    const { counter } = this.state;
    if (counter > 5) throw new Error('something went wrong');
    return (
      <div>
        <h1>Child 2 Component</h1>
        {counter}
        <button type="button" onClick={this.incrementCounter}>
          Increment Counter
        </button>
      </div>
    );
  }
}