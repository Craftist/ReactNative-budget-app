import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React from "react";
import {Table, Row, Rows} from 'react-native-table-component';


export default function Budget() {
    const addIncomeButtonClicked = () => {};
    const incomeTable: { head: string[]; rows: [string, number, string][] } = {
        head: ['Income Name', '₽/month', '% of Total Income'],
        rows: [
            ['Salary', 120000, '']
        ]
    };
    const totalIncome = incomeTable.rows.reduce((a, v) => a + v[1], 0);
    for (const incomeEntry of incomeTable.rows) {
        incomeEntry[2] = `${(incomeEntry[1] / totalIncome * 100).toFixed(2)}%`;
    }

    const addExpenseButtonClicked = () => {};
    const expenseTable: { head: string[]; rows: [string, number, string][] } = {
        head: ['Expense Name', '₽/month', '% of Total Expenses'],
        rows: [
            ['Rent', 20000, ''],
            ['Appliances', 10000, ''],
            ['Crypto', 10000, ''],
            ['Food', 10000, ''],
            ['For future tech', 30000, ''],
        ]
    };
    const totalExpenses = expenseTable.rows.reduce((a, v) => a + v[1], 0);
    for (const expenseEntry of expenseTable.rows) {
        expenseEntry[2] = `${(expenseEntry[1] / totalExpenses * 100).toFixed(2)}%`;
    }

    const daysInAMonth = (() => {
        const dt = new Date();
        const month = dt.getMonth();
        const year = dt.getFullYear();
        return new Date(year, month, 0).getDate();
    })();

    const totalSpareMoney = totalIncome - totalExpenses;
    const canSpendInADay = totalSpareMoney / daysInAMonth;

    const dailyBudgetTable: { head: string[]; rows: [string, string, string, string][] } = {
        head: ['Date', 'Spent this day', 'Daily budget', 'Saldo'],
        rows: []
    };

    let budgetForADay = canSpendInADay;
    for (let day = 0; day < daysInAMonth; day++) {
        const date = new Date();
        date.setDate(day + 1);

        const dd = date.getDate().toString().padStart(2, '0');
        const mm = (date.getMonth() + 1).toString().padStart(2, '0');
        const YYYY = date.getFullYear().toString().padStart(2, '0');

        const spent = 0;
        const dailyBudget = budgetForADay;
        const saldo = dailyBudget - spent;
        dailyBudgetTable.rows.push([
            `${dd}.${mm}.${YYYY}`,
            `${spent.toFixed(2)}₽`,
            `${budgetForADay.toFixed(2)}₽`,
            `${saldo.toFixed(2)}₽`
        ]);

        budgetForADay += canSpendInADay;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>

            <Table borderStyle={styles.table}>
                <Row data={incomeTable.head} style={styles.incomeTableHead} textStyle={styles.incomeTableCell} />
                <Rows data={incomeTable.rows} textStyle={styles.incomeTableCell} />
            </Table>
            <View style={{height: 10}} />

            <Table borderStyle={styles.table}>
                <Row data={expenseTable.head} style={styles.expenseTableHead} textStyle={styles.expenseTableCell} />
                <Rows data={expenseTable.rows} textStyle={styles.expenseTableCell} />
            </Table>
            <View style={{height: 10}} />

            <View style={{flexDirection: "row"}}>
                <Button onPress={addIncomeButtonClicked} title="Add monthly income"/>
                <View style={{width: 10}} />
                <Button onPress={addExpenseButtonClicked} title="Add required expense"/>
            </View>

            <View style={{height: 10}} />
            <View style={{alignItems: "center", marginLeft: 30, marginRight: 30}}>
                <Text>You have {totalSpareMoney}₽ of spare money every month</Text>
                <Text style={{textAlign: "center"}}>That leaves you with {canSpendInADay.toFixed(2)}₽ to spend every day</Text>
            </View>

            <View style={{height: 10}} />
            <Button title="Add daily expense" onPress={() => {}} color="gray" />
            <View style={{height: 10}} />
            <ScrollView style={{marginBottom: 20}}>
                <Table borderStyle={styles.table}>
                    <Row data={dailyBudgetTable.head} style={styles.dailyBudgetTableHead} textStyle={styles.dailyBudgetTableCell} />
                    <Rows data={dailyBudgetTable.rows} textStyle={styles.dailyBudgetTableCell} />
                </Table>
            </ScrollView>
        </SafeAreaView>
    );
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
        width: 300,
        height: 30,
        backgroundColor: '#f1f8ff'
    },
    incomeTableCell: {
        margin: 6,
        fontSize: 8
    },
    expenseTableHead: {
        width: 300,
        height: 30,
        backgroundColor: '#fae7e7'
    },
    expenseTableCell: {
        margin: 6,
        fontSize: 8
    },
    dailyBudgetTableHead: {
        width: 300,
        height: 30,
        backgroundColor: '#feffe5'
    },
    dailyBudgetTableCell: {
        margin: 6,
        fontSize: 8
    }
});
