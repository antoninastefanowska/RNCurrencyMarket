import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Style from '../../Style';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: this.props.value
        };
    }

    render() {
        return (
            <View style={this.props.style}>
                <Text style={Style.label}>{this.props.title}</Text>
                <input style={{padding: 3}} type="date" value={this.state.selectedDate} onChange={(event) => this.onDatePickerChanged(this, event)} />
            </View> 
        );
    }

    updateStateProperty(property, value) {
        let newState = this.state;
        newState[property] = value;
        this.setState(newState);
    }

    onDatePickerChanged(context, event) {
        let selectedDate = new Date(event.target.value);
        this.updateStateProperty("selectedDate", event.target.value);
        context.props.onDateChanged(selectedDate);
    }
}