import 'react-native-get-random-values'; // Ensure this is at the very top for uuid
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 here

import TaskListScreen from './screens/TaskListScreen';
import EditTaskScreen from './screens/EditTaskScreen';

const Stack = createNativeStackNavigator();
const ASYNC_STORAGE_KEY = 'my_tasks_app_data';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const saveTasksToStorage = useCallback(async (currentTasks) => {
    try {
      const jsonValue = JSON.stringify(currentTasks);
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, jsonValue);
      console.log('Tasks saved to AsyncStorage');
    } catch (e) {
      console.error('Failed to save tasks to AsyncStorage:', e);
    }
  }, []);

  const loadTasksFromStorage = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
      const loadedTasks = jsonValue != null ? JSON.parse(jsonValue) : [];
      setTasks(loadedTasks);
      console.log('Tasks loaded from AsyncStorage');
    } catch (e) {
      console.error('Failed to load tasks from AsyncStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasksFromStorage();
  }, [loadTasksFromStorage]);

  useEffect(() => {
    if (!isLoading) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, isLoading, saveTasksToStorage]);

  // Modified addTask to generate UUID
  const addTask = useCallback((newTaskTitle) => { // Now accepts just the title
    const newTask = {
      id: uuidv4(), // Generate UUID here
      title: newTaskTitle,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const updateTask = useCallback((updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#a43820', // Aesthetic Header background color (Slate Blue)
          },
          headerTintColor: '#fff', // Header text color
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="TaskList"
          options={{ title: 'My To-Do List' }}
        >
          {(props) => (
            <TaskListScreen
              {...props}
              tasks={tasks}
              addTask={addTask} // Pass the addTask that generates UUID
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="EditTask"
          options={{ title: 'Edit Task' }}
        >
          {(props) => (
            <EditTaskScreen
              {...props}
              updateTask={updateTask}
              tasks={tasks}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}