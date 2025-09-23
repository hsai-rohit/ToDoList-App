import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TaskListScreen({
  navigation,
  tasks,
  addTask, // This now expects just the title string
  updateTask,
  deleteTask,
}) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      Alert.alert('Error', 'Task title cannot be empty.');
      return;
    }
    addTask(newTaskTitle); // Pass only the title to App.js's addTask
    setNewTaskTitle('');
  };

  const toggleTaskCompletion = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      updateTask({ ...taskToUpdate, completed: !taskToUpdate.completed });
    }
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        onPress={() => toggleTaskCompletion(item.id)}
        style={styles.checkboxContainer}>
        {item.completed ? (
          <Feather name="check-circle" size={24} color="#5cb85c" />
        ) : (
          <Feather name="circle" size={24} color="#ced4da" />
        )}
      </TouchableOpacity>
      <Text
        style={[styles.taskTitle, item.completed && styles.completedTaskTitle]}>
        {item.title}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditTask', { taskId: item.id })}
        style={styles.taskActionIcon}>
        <Feather name="edit-2" size={20} color="#b17a50" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.taskActionIcon}>
        <MaterialIcons name="delete-outline" size={24} color="#dc3545" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#a47864"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()} // This should now work as id is guaranteed
        style={styles.taskList}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff7ed', // Creamy off-white background
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#46211a',
  },
  addButton: {
    backgroundColor: '#a43820', // Burnt sienna accent
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  taskList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1.5,
  },
  checkboxContainer: {
    padding: 5,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#46211a',
  },
  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: '#73605B',
  },
  taskActionIcon: {
    marginLeft: 15,
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#73605B',
    fontStyle: 'italic',
  },
});