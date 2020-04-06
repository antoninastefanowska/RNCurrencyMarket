import React, { Component } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDatePickerVisible: false
        };
    }

    render() {
        return (
            <View style={this.props.style}>
                <Button title={this.props.title} onPress={() => this.onPickDateButtonPressed(this)} />
                {this.state.isDatePickerVisible && (
                    <DateTimePicker value={this.props.value} onChange={(event, selectedDate) => this.onDatePickerChanged(this, event, selectedDate)} />
                )}
            </View>
        );
    }

    updateStateProperty(property, value) {
        let newState = this.state;
        newState[property] = value;
        this.setState(newState);
    }

    onPickDateButtonPressed(context) {
        context.updateStateProperty("isDatePickerVisible", true);
    }

    onDatePickerChanged(context, event, selectedDate) {
        context.updateStateProperty("isDatePickerVisible", false);
        context.props.onDateChanged(selectedDate);
    }
}
