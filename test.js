import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Grid from "react-native-grid-component";
const COLOR_COUNT = 10;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: addColorOnGrid(COLOR_COUNT),
      refreshing: false,
    };
  }
  dorenderItem = (data) => (
    <View style={[{ backgroundColor: data }, styles.item]} />
  );
  dorenderPlaceholder = () => <View style={styles.item} />;
  render() {
    return (
      <Grid
        style={styles.list}
        renderItem={this.dorenderItem}
        renderPlaceholder={this.dorenderPlaceholder}
        data={this.state.data}
        // define number of columns on grid
        numColumns={3}
        keyExtractor={(item, n) => n.toString()}
        refreshing={this.state.refreshing}
        // do actions on refresh
        onRefresh={() => {
          this.setState({
            data: addColorOnGrid(COLOR_COUNT),
            refreshing: false,
          });
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  item: {
    flex: 2,
    height: 120,
    margin: 1.5,
  },
  list: {
    flex: 2,
  },
});
// Helper functions
// thanks materialuicolors.co
const colors_arr = [
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];
function addColorOnGrid(length) {
  return Array.from(Array(length)).map(
    () => colors_arr[Math.floor(Math.random() * colors_arr.length)]
  );
}
