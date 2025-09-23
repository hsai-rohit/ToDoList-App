import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function EditTaskScreen({ navigation, route, updateTask, tasks }) {
  const { taskId } = route.params;
  const [currentTaskTitle, setCurrentTaskTitle] = useState('');
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Find the task to edit based on taskId from navigation params
    const foundTask = tasks.find((t) => t.id === taskId);
    if (foundTask) {
      setTask(foundTask);
      setCurrentTaskTitle(foundTask.title);
    } else {
      Alert.alert('Error', 'Task not found.');
      navigation.goBack();
    }
  }, [taskId, tasks, navigation]);

  const handleSave = () => {
    if (!task) return;

    if (currentTaskTitle.trim() === '') {
      Alert.alert('Error', 'Task title cannot be empty.');
      return;
    }

    const updatedTask = { ...task, title: currentTaskTitle };
    updateTask(updatedTask);
    navigation.goBack(); // Go back to the task list after saving
  };

  if (!task) {
    return <Text style={styles.loadingText}>Loading task...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Task Title:</Text>
      <TextInput
        style={styles.input}
        value={currentTaskTitle}
        onChangeText={setCurrentTaskTitle}
        placeholder="Enter new task title"
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});