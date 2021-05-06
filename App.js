/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const deleteTask = (taskId) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== taskId));
  };
  return (
    <>
      <View style={{paddingTop: 50}}>
        <Button title="Add new task" onPress={() => setAddMode(true)} />
        <Modal visible={addMode} animationType="slide">
          <View style={styles.container}>
            <TextInput
              placeholder="Enter your task  here"
              onChangeText={(x) => setInput(x)}
              style={{
                borderColor: 'black',
                width: '100%',
                borderWidth: 1,
                margin: 10,
              }}
              value={input}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: 200,
              }}
            >
              <View style={styles.buttonWidth}>
                <Button
                  title="ADD"
                  onPress={() => {
                    setTasks((tasks) => [
                      ...tasks,
                      {id: Math.random().toString(), value: input},
                    ]);
                    setAddMode(false);
                    setInput('');
                  }}
                />
              </View>
              <View style={styles.buttonWidth}>
                <Button
                  title="Cancel"
                  color="red"
                  onPress={() => {
                    setAddMode(false);
                    setInput('');
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <TouchableOpacity onPress={deleteTask.bind(this, itemData.item.id)}>
            <View
              style={{
                padding: 10,
                margin: 10,
                backgroundColor: 'lightblue',
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 1,
              }}
            >
              <Text>{itemData.item.value}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonWidth: {
    width: '40%',
  },
});
