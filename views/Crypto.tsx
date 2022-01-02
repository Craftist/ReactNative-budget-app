import {Button, StyleSheet, Text, View} from "react-native";
import {Row, Rows, Table} from "react-native-table-component";


export default function Crypto() {
    type AvailableCryptoTableEntry = [string, [number, number], number, [number, number]];

    function transformCryptoEntry(entry: AvailableCryptoTableEntry) {
        return [
            entry[0].toString(),
            `$${entry[1][0].toFixed(2)}\n₽${entry[1][1].toFixed(2)}`,
            entry[2].toString(),
            `$${entry[3][0].toFixed(2)}\n₽${entry[3][1].toFixed(2)}`,
        ];
    }

    const availableCryptoTable: { head: string[]; body: AvailableCryptoTableEntry[] } = {
        head: ['Name', 'Current Price', 'You Have', 'Total'],
        body: [
            ['ETH', [3752.44, 280650.99], 2, [3752.44*2, 280650.99*2]],
            ['BTC', [47125.49, 3524590.8], 0.51234121, [47125.49*0.51234121, 3524590.8*0.51234121]],
        ]
    }

    const historyTable = {
        head: ['Time', 'Action', 'Crypto', 'Amount', 'Amount in $'],
        body: [
            ['19.12.2021 13:51', 'Bought', 'ETH', '0.1', '$375.29'],
            ['17.12.2021 17:26', 'Sold', 'ETH', '0.2', '$750.58'],
            ['11.12.2021 23:43', 'Sold', 'BTC', '0.765', '$36,050.78'],
            ['05.12.2021 09:43', 'Bought', 'BTC', '1.13', '$53,251.48'],
        ],
        styles: [
            {backgroundColor: '#d5e5d6'},
            {backgroundColor: '#e5d5d5'},
            {backgroundColor: '#e5d5d5'},
            {backgroundColor: '#d5e5d6'},
        ]
    }

    const totalUsd = availableCryptoTable.body.reduce((a, v) => a + v[3][0], 0).toLocaleString('en-US', {maximumFractionDigits: 2});
    const totalRub = availableCryptoTable.body.reduce((a, v) => a + v[3][1], 0).toLocaleString('en-US', {maximumFractionDigits: 2});

    return (
        <View style={styles.container}>
            <Table borderStyle={styles.table}>
                <Row data={availableCryptoTable.head} style={styles.incomeTableHead} textStyle={styles.incomeTableCell} />
                <Rows data={availableCryptoTable.body.map(transformCryptoEntry)} textStyle={styles.incomeTableCell} />
            </Table>

            <View style={{height: 10}} />

            <Text>You have in total:</Text>
            <Text>${totalUsd} or ₽{totalRub}</Text>

            <View style={{height: 10}} />

            <View style={{flexDirection: "row"}}>
                <Button onPress={()=>{}} title="I bought more crypto" />
                <View style={{width: 10}} />
                <Button onPress={()=>{}} title="I sold some crypto" />
            </View>

            <View style={{height: 10}} />

            <Table borderStyle={styles.table}>
                <Row data={historyTable.head} style={styles.incomeTableHead} textStyle={styles.incomeTableCell} />
                {
                    historyTable.body.map((row, i) => (
                        <Row data={row} textStyle={styles.incomeTableCell} style={row[1] === 'Bought'
                            ? {backgroundColor: '#bdd9be'}
                            : {backgroundColor: '#d9bdbd'}} />
                    ))
                }
            </Table>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    table: {
        borderWidth: 0.75,
        borderColor: 'black'
    },
    incomeTableHead: {
        width: 350,
        height: 30,
        backgroundColor: '#e8e8e8'
    },
    incomeTableCell: {
        margin: 6,
        fontSize: 8
    },
});