import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Assuming Expo or if you have react-native-vector-icons installed

export default function TaskItem({ item, toggleComplete, deleteTask, onEdit }) {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.checkboxContainer}>
        {item.completed ? (
          <AntDesign name="checkcircle" size={24} color="#4CAF50" />
        ) : (
          <AntDesign name="checkcircleo" size={24} color="#666" />
        )}
      </TouchableOpacity>
      <Text style={item.completed ? styles.completedTaskText : styles.taskText}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <AntDesign name="edit" size={20} color="#007BFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <AntDesign name="delete" size={20} color="#DC3545" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  completedTaskText: {
    flex: 1,
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  editButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
});