import React, { Component } from 'react';
import './clock.css';

class Clock extends Component {
    state = {
        time: new Date(),
    }

    componentDidMount() {
        //store the interval's ID, so that it can be later cleared
        //every second calls function tick
        this.intervalID = setInterval(
            () => this.tick(), 
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        //updates the state - it is called every second 
        this.setState({
            time: new Date()
        });
    }

    render() {
        return(
            //display time on one line , then date on the second line
            //for now display also seconds, later just hh:mm
            <div>
                <p className="App-clock">
                    {this.state.time.toLocaleTimeString()}
                </p>
                <p className="App-date">
                    {this.state.time.toDateString()}
                </p>
            </div>
        )
    }
    
};

export default Clock;