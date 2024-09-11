import { ComponentProps, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, Button, Keyboard } from "react-native";
import { PaperProvider, IconButton, TextInput } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export default function Index() {
  const [textInput, setTextInput] = useState('')
  const [todoItems, setTodoItems] = useState <TodoItem[]>([])
 
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
          return <TodoItem text={todoItem.text} id={todoItem.id} todoStatus={todoItem.todoStatus}/>
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
        size={48}
        iconColor={getStatusColor(props.todoStatus)}
      />
      <Text>
        {props.text}
      </Text>
      <IconButton
        icon="delete"
        size={48}
      />
    </View>
  )
}