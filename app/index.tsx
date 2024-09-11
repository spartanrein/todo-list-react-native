import { ComponentProps, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, Button, Keyboard } from "react-native";
import { PaperProvider, IconButton, TextInput } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export default function Index() {
  const [textInput, setTextInput] = useState('')
  const [todoItems, setTodoItems] = useState <TodoItem[]>([])

  interface TodoItem {
    text: string | null;
    id: string | null;
    status: string | null
    // Other properties as needed
  }
  
  function handlePress(todoItems: Array<TodoItem>, textInput: string) {
    let todoItemsCopy = [...todoItems];
    const newTodoItem: TodoItem = {
      text: textInput,
      id: uuidv4(),
      status: null
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
          return <TodoItem text={todoItem.text} id={todoItem.id}/>
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

type TodoItemProps = {
  text: string | null
  id: string | null
}

function TodoItem(props: TodoItemProps) {
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
        icon="checkbox-blank-circle-outline"
        size={48}
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