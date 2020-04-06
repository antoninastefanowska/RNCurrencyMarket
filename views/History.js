import React, { Component } from 'react';
import { View, Picker, FlatList, Text, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import DatePicker from '../custom/DatePicker/DatePicker';
import Style, { GRADIENT_COLORS } from '../Style';
import Data from '../Data';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyCodes: [],
            dateFrom: null,
            dateTo: null,
            selectedCode: "USD",
            data: []
        };
        Data.getInstance().loadTableData((data) => {
            let codes = data.map((rate) => (rate.code));
            this.updateStateProperty("currencyCodes", codes);
        });
    }

    render() {
        return (
            <LinearGradient colors={GRADIENT_COLORS} style={Style.container}>
                <View style={Style.elementContainer}>
                    <Picker style={Style.input} selectedValue={this.state.selectedCode} onValueChange={(itemValue, itemPosition) => this.onCurrencyCodeChanged(this, itemValue, itemPosition)}>
                        {this.generateOptions(this.state.currencyCodes)}
                    </Picker>
                </View>
                <View style={Style.elementContainer}>
                    <View style={Style.horizontalContainer}>
                        <View style={Style.verticalContainer}>
                            <DatePicker style={Style.datePicker} value={this.state.dateFrom ? this.state.dateFrom : new Date()} title="Od" onDateChanged={(selectedDate) => this.onDateChanged(this, selectedDate, "dateFrom")} />
                            {this.state.dateFrom && (<Text style={Style.smallLabel}>{this.formatDate(this.state.dateFrom)}</Text>)}
                        </View>
                        <View style={Style.verticalContainer}>
                            <DatePicker style={Style.datePicker} value={this.state.dateTo ? this.state.dateTo : new Date()} title="Do" onDateChanged={(selectedDate) => this.onDateChanged(this, selectedDate, "dateTo")} />
                            {this.state.dateTo && (<Text style={Style.smallLabel}>{this.formatDate(this.state.dateTo)}</Text>)}
                        </View>                       
                    </View>
                </View>
                <View style={Style.elementContainer}>
                    <Button style={Style.input} title="Pokaż" onPress={() => this.onShowButtonPressed(this)} />
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (<HistoryItem historyItem={item} />)}
                    keyExtractor={item => this.state.data.indexOf(item).toString()} />
            </LinearGradient>
        );
    }

    updateStateProperty(property, value) {
        let newState = this.state;
        newState[property] = value;
        this.setState(newState);
    }

    updateStateProperties(...properties) {
        let newState = this.state;
        for (let i = 0; i < properties.length; i++)
            newState[properties[i].name] = properties[i].value;
        this.setState(newState);
    }

    generateOptions(data) {
        let items = [];
        for (let i = 0; i < data.length; i++)
            items.push(<Picker.Item value={data[i]} label={data[i]} key={i} />);
        return items;
    }

    formatDate(date) {
        let year = date.getFullYear().toString();
        let month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        let day = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString();
        return year + "-" + month + "-" + day;
    }

    onCurrencyCodeChanged(context, itemValue, itemPosition) {
        context.updateStateProperty("selectedCode", itemValue);
    }

    onDateChanged(context, selectedDate, name) {
        context.updateStateProperty(name, selectedDate);
    }

    onShowButtonPressed(context) {
        if (context.state.dateFrom && context.state.dateTo && context.state.dateFrom < context.state.dateTo) {
            let code = context.state.selectedCode;
            let startDate = context.formatDate(context.state.dateFrom);
            let endDate = context.formatDate(context.state.dateTo); 
            Data.getInstance().loadCurrencyData(code, startDate, endDate, (data) => {
                context.updateStateProperty("data", data);
            });
        }
    }
}

function HistoryItem({historyItem}) {
    return (
        <View style={Style.elementContainer}>
            <View style={Style.verticalContainer}>
                <Text style={Style.label}>{historyItem.effectiveDate}</Text>
                <View style={Style.horizontalContainer}>
                    <View style={Style.verticalContainer}>
                        <Text style={Style.smallLabel}>Sprzedaż</Text>
                        <Text style={Style.smallLabel}>{historyItem.ask}</Text>
                    </View>
                    <View style={Style.verticalContainer}>
                        <Text style={Style.smallLabel}>Kupno</Text>
                        <Text style={Style.smallLabel}>{historyItem.bid}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default History;