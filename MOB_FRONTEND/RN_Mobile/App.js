import { StyleSheet, View, Button, TextInput, FlatList } from 'react-native';
import {default as GoalItem} from './components/GoalItem'
import {default as GoalInput} from './components/Goalinput'
import { useState } from 'react';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('')
  const [courseGoals, setCourseGoals] = useState([])

  function goalinputHandler(enteredText) {
    setEnteredGoalText(enteredText)
  }

  function addGoalHandler() {
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, {text: enteredGoalText, key: Math.random().toString()}]);
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput/>
      <View style={styles.listContainer}>
        <FlatList data={courseGoals} renderItem={itemData => {
          return <GoalItem text={itemData.item.text}/>
        }}
        // keyExtractor={(item, index) => {
        //   return item.id
        // }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
    flex: 1
  },
  listContainer: {
    flex: 5,
  },
  
});
