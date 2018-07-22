import React, { Component } from 'react';
import './clock.css';

class Clock extends Component {

    toggleClock = this.toggleClock.bind(this)
    state = {
        time: '',
        date: '', 
        timeOfDay: '',
        is24hourFormat: true
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
        // Get current hour&minutes from Date object
        // then add leading zero to minutes if <10
        let date = new Date();
        let hour = date.getHours(); 
        let minutes = date.getMinutes();
        minutes = (minutes < 10 ? '0' : '') + minutes;

        //prepare 24-hour format
        let displayTime24 = hour.toString() + ':' + minutes.toString();

        // Checking if AM or PM and convert to 12h format
        let timeOfDay = (hour < 12) ? "am" : "pm";

        //if hour is greater then 12 => substract 12
        hour = (hour > 12) ? hour - 12 : hour;

        //if hour is 0 then it is in fact 12am
        hour = (hour == 0) ? 12 : hour;

        //prepare 12-hour format
        let displayTime12 = hour.toString() + ':' + minutes.toString();

        //prepare date format - longer style
        let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        this.setState(() => {
            return {
                //conditional statement
                //when this.state.is24hourFormat is true display time in 24h, else in 12h format
                time: this.state.is24hourFormat ? displayTime24 : displayTime12, 
                timeOfDay: this.state.is24hourFormat ? '' : timeOfDay, 
                date: date.toLocaleDateString('en-US', dateOptions)
            }
        });
    }

    toggleClock() {
        //toggle the is24hourFormat flag
        this.setState(prevState => ({
            is24hourFormat: !prevState.is24hourFormat
          }));
    }

    render() {
        return(
            //display time on one line , then date on the second line

            <div id="App-clock" onDoubleClick={this.toggleClock}>
                <span id="App-time">
                    {this.state.time}
                </span>
                <span id="timeOfDay">
                    {this.state.timeOfDay}
                </span>
                <p id="App-date">
                    {this.state.date}
                </p>
            </div>
        )
    }
    
};

export default Clock;