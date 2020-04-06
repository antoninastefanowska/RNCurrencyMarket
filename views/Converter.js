import React, { Component } from 'react';
import { View, Picker, TextInput, Text, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Style, { GRADIENT_COLORS } from '../Style';
import Data from '../Data';

class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDictionary: {},
            convertFrom: null,
            convertTo: null,
            inputValue: 0.0,
            outputValue: 0.0
        };
        Data.getInstance().loadTableData((data) => {
            let newData = {};
            for (let rate of data)
                newData[rate.code] = rate;

            newData.PLN = {
                currency: "złoty polski",
                ask: 1.0,
                bid: 1.0,
                askIncrease: false,
                bidIncrease: false,
                askDecrease: false,
                bidDecrease: false,
                code: "PLN"
            }

            this.updateStateProperties(
                {name: "dataDictionary", value: newData},
                {name: "convertFrom", value: newData.PLN},
                {name: "convertTo", value: newData.USD}
            );
        });
    }

    render() {
        return (
            <LinearGradient colors={GRADIENT_COLORS} style={Style.container}>
                <View style={Style.elementContainer}>                 
                    <Button style={Style.input} onPress={() => this.onSwitchSelectedPressed(this)} title="Zamień" />
                </View>
                <View style={Style.elementContainer}>
                    <View style={Style.horizontalContainer}>
                        <Picker style={Style.picker} selectedValue={this.state.convertFrom} onValueChange={(itemValue, itemPosition) => this.onSelectedValueChanged(this, itemPosition, itemValue, "selectFrom")}>
                            {this.generateOptions(this.state.dataDictionary, this.state.convertFrom, this.state.convertTo, "selectFrom")}
                        </Picker>
                        <Text style={Style.convertArrow}>→</Text>
                        <Picker style={Style.picker} selectedValue={this.state.convertTo} onValueChange={(itemValue, itemPosition) => this.onSelectedValueChanged(this, itemPosition, itemValue, "selectTo")}>
                            {this.generateOptions(this.state.dataDictionary, this.state.convertFrom, this.state.convertTo, "selectTo")}
                        </Picker>
                    </View>
                </View>
                <View style={Style.elementContainer}>
                    <View>
                        <TextInput style={Style.input} placeholder="0" keyboardType="number-pad" onChangeText={(text) => this.onInputTextChanged(this, text)} />
                        <Button style={Style.input} onPress={() => this.onConvertPressed(this)} title="Konwertuj" />
                    </View>
                </View>
                <View style={Style.elementContainer}>
                    <View style={Style.horizontalContainer}>
                        <Text style={Style.label}>{this.state.outputValue}</Text>
                    </View>
                </View>
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

    generateOptions(data, convertFrom, convertTo, name) {
        let excluded = name === "selectFrom" ? convertTo : convertFrom;
        let items = [];
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let item = data[keys[i]];
            if (item != excluded)
                items.push(<Picker.Item value={item} label={keys[i]} key={i} />);
        }
        return items;
    }

    onSwitchSelectedPressed(context) {
        context.updateStateProperties(
            {name: "convertFrom", value: context.state.convertTo},
            {name: "convertTo", value: context.state.convertFrom}
        );
    }

    onSelectedValueChanged(context, itemPosition, itemValue, name) {
        if (name === "selectFrom")
            context.updateStateProperty("convertFrom", itemValue);
        else
            context.updateStateProperty("convertTo", itemValue);
    }

    onInputTextChanged(context, text) {
        let value = parseFloat(text);
        if (Number.isNaN(value))
            value = 0;
        context.updateStateProperty("inputValue", value);
    }

    onConvertPressed(context) {
        let convertFrom = context.state.convertFrom;
        let convertTo = context.state.convertTo;
        let inputValue = context.state.inputValue;
        let pln = inputValue * convertFrom.bid;
        let result = pln / convertTo.bid;

        context.updateStateProperty("outputValue", Math.round(result * 100) / 100);
    }
}

export default Converter;