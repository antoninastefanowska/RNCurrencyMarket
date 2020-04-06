import React, { Component } from 'react';
import { View, FlatList, TextInput, Text } from 'react-native';
import Flag from 'react-native-flags';
import { LinearGradient } from 'expo-linear-gradient';

import Style, { GRADIENT_COLORS } from '../Style';
import Data from '../Data';

class ExchangeRates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            originalData: [],
            filteredData: []
        }
        Data.getInstance().loadTableData((data) => {
            this.updateStateProperties(
                {name: "data", value: data},
                {name: "originalData", value: data}
            )
        });
    }

    render() {
        return (
            <LinearGradient colors={GRADIENT_COLORS} style={Style.container}>
                <View style={Style.elementContainer}>
                    <TextInput style={Style.input} placeholder="Szukaj" autoCapitalize="none" onChangeText={(text) => this.onSearchInputChanged(this, text)} />
                </View>
                <FlatList 
                    data={this.state.data} 
                    renderItem={({item}) => <CurrencyItem currencyItem={item} />}
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

    onSearchInputChanged(context, text) {
        text = text.toUpperCase();
        if (text) {
            let filteredData = context.state.originalData.filter((rate) => rate.currency.toUpperCase().includes(text) || rate.code.toUpperCase().includes(text));
            context.updateStateProperty("data", filteredData);
        } else
            context.updateStateProperty("data", context.state.originalData);
    }
}

function CurrencyItem({currencyItem}) {
    return (
        <View style={Style.elementContainer}>
            <View style={Style.verticalContainer}>
                <Text style={Style.label}>{currencyItem.currency}</Text>
                <View style={Style.horizontalContainer}>
                    <View style={Style.cell}>
                        <Flag code={currencyItem.code.substring(0, 2)} size={64} />
                    </View>
                    <View style={Style.cell}>
                        <Text style={Style.bigLabel}>{currencyItem.code}</Text>
                    </View>           
                    <View style={Style.verticalContainer}>
                        <Text style={Style.smallLabel}>Sprzedaż</Text>
                        <View style={Style.horizontalContainer}>
                            <Text style={Style.smallLabel}>{currencyItem.ask}</Text>
                            {currencyItem.askIncrease && (<Text style={Style.greenArrow}>▲</Text>)}
                            {currencyItem.askDecrease && (<Text style={Style.redArrow}>▼</Text>)}
                        </View>
                     </View>
                    <View style={Style.verticalContainer}>
                        <Text style={Style.smallLabel}>Kupno</Text>
                        <View style={Style.horizontalContainer}>
                            <Text style={Style.smallLabel}>{currencyItem.bid}</Text>
                            {currencyItem.bidIncrease && (<Text style={Style.greenArrow}>▲</Text>)}
                            {currencyItem.bidDecrease && (<Text style={Style.redArrow}>▼</Text>)}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ExchangeRates;