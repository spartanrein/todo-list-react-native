import { ComponentProps, useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, Button, Keyboard } from "react-native";
import { PaperProvider, IconButton, TextInput } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [textInput, setTextInput] = useState('')
  const [todoItems, setTodoItems] = useState <TodoItem[]>([])
 
  async function storeData(value : Array<TodoItem>) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('todoItems', jsonValue);
    } catch (r) {
      console.log(r)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('todoItems');
        jsonValue != null ? console.log(JSON.parse(jsonValue)) : null
        jsonValue != null ? setTodoItems(JSON.parse(jsonValue)) : null;
      } catch (e) {
        console.log(e)
      }
    };
    getData()
  },[])

  function handlePress(todoItems: Array<TodoItem>, textInput: string) {
    let todoItemsCopy = [...todoItems];
    const newTodoItem: TodoItem = {
      text: textInput,
      id: uuidv4(),
      todoStatus: TodoStatus.Todo
      // Other properties as needed
    };
    todoItemsCopy.push(newTodoItem);
    setTodoItems(todoItemsCopy);
    setTextInput("")
    Keyboard.dismiss()
    storeData(todoItemsCopy)
  }

  function handleDeleteTask(uuid: string, todoItems: TodoItem[], setTodoItems: Function){
    let todoItemsCopy = [...todoItems]
    const objectToRemove = todoItems.find(i => i.id === uuid);
    if (objectToRemove) {
      const indexToRemove = todoItemsCopy.indexOf(objectToRemove);
      todoItemsCopy.splice(indexToRemove, 1);
      console.log(`Object with ID ${uuid}  removed.`);
      setTodoItems(todoItemsCopy)
      storeData(todoItemsCopy)
    } else {
      console.log(`Object with ID ${uuid} not found.`);
    }
  }

  function handleCompleteTask(uuid: string, todoItems: TodoItem[], setTodoItems: Function){
    let todoItemsCopy = [...todoItems]
    const objectToChange = todoItems.find(i => i.id === uuid);
    if (objectToChange) {
      const indexToChange = todoItemsCopy.indexOf(objectToChange);
      todoItemsCopy[indexToChange].todoStatus = TodoStatus.Completed
      setTodoItems(todoItemsCopy)
    }
  }

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          style={{
            flex:0.6,
            paddingHorizontal:12
          }}
        >
          {todoItems && todoItems.map((todoItem) => {
          return <TodoItem key={todoItem.id} text={todoItem.text} id={todoItem.id} todoStatus={todoItem.todoStatus} handleDeleteTask={handleDeleteTask} setTodoItems={setTodoItems} todoItems={todoItems} handleCompleteTask={handleCompleteTask}/>
          })}
        </ScrollView>
        <View
        >
          <TextInput
            placeholder={"What do you need to do?"}
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <View>
          <Button
            title="Save"
            disabled={textInput === ""}
            onPress={() => handlePress(todoItems, textInput)}
          />
        </View>
      </View>
    </PaperProvider>
  );
}

interface TodoItem {
  text: string | null;
  id: string | null;
  todoStatus: string | null
  // Other properties as needed
}

enum TodoStatus {
  Todo= "todo",
  Completed= "completed"
}

type TodoItemProps = {
  text: string | null
  id: string | null
  todoStatus: string | null
  handleDeleteTask: Function
  setTodoItems: Function
  todoItems: TodoItem[]
  handleCompleteTask: Function
}

function TodoItem(props: TodoItemProps) {

  function getStatusColor(todoStatus: string | null){
    switch(todoStatus) {
      case TodoStatus.Completed:
        return "green";
      default:
        return "gray"
    }
  }

  return (
    <View
      style={{
        flexDirection:'row',
        padding: 12,
        marginBottom:12,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 12
      }}
    >
      <IconButton
        icon={props.todoStatus === TodoStatus.Completed ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
        size={24}
        iconColor={getStatusColor(props.todoStatus)}
        onPress={() => props.handleCompleteTask(props.id, props.todoItems, props.setTodoItems)}
      />
      <Text>
        {props.text}
      </Text>
      <IconButton
        icon="delete"
        size={24}
        onPress={() => props.handleDeleteTask(props.id, props.todoItems, props.setTodoItems)}
      />
    </View>
  )
}