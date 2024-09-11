import { ComponentProps, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TextInput, Button, Keyboard } from "react-native";

export default function Index() {
  const [textInput, setTextInput] = useState('')
  const [todoItems, setTodoItems] = useState <TodoItem[]>([])

  interface TodoItem {
    text: string | null;
    // Other properties as needed
  }
  
  function handlePress(todoItems: Array<TodoItem>, textInput: string) {
    let todoItemsCopy = [...todoItems];
    const newTodoItem: TodoItem = {
      text: textInput,
      // Other properties as needed
    };
    todoItemsCopy.push(newTodoItem);
    setTodoItems(todoItemsCopy);
    setTextInput("")
    Keyboard.dismiss()
  }

  return (
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
          return <TodoItem text={todoItem.text}/>
          })}
        </ScrollView>
        <View
          style={{
            flex:0.4,
            paddingHorizontal:12,
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TextInput
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
  );
}

type TodoItemProps = {
  text: string | null
}

function TodoItem(props: TodoItemProps) {
  return (
    <View
      style={{
        padding: 24,
        marginBottom:12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 12
      }}
    >
      <Text>
        {props.text}
      </Text>
    </View>
  )
}