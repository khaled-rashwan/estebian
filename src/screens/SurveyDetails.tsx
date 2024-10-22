import { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, FlatList } from "react-native";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { GraphQLError } from "graphql";
const client = generateClient<Schema>();

const SurveyDetails = () => {
  const dateTimeNow = new Date();
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
  const [errors, setErrors] = useState<GraphQLError>();

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => {
        setTodos([...items]);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  const createTodo = async () => {
    try {
      await client.models.Todo.create({
        content: `${dateTimeNow.getUTCMilliseconds()}`,
      });
    } catch (error: unknown) {
      if (error instanceof GraphQLError) {
        setErrors(error);
      } else {
        throw error;
      }
    }
  };

  if (errors) {
    return <Text>{errors.message}</Text>;
  }

  const renderItem = ({ item }: { item: Schema["Todo"]["type"] }) => (
    <TodoItem {...item} />
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.listItemSeparator} />
        )}
        ListEmptyComponent={() => <Text>القائمة فارغة</Text>}
        style={styles.listContainer}
      ></FlatList>
      <Pressable
        onPress={createTodo}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#1E90FF" : "#2196F3" }, // Feedback on press
        ]}
      >
        <Text style={styles.buttonText}>بند جديد</Text>
      </Pressable>

    </View>
  );
};

const TodoItem = (todo: Schema["Todo"]["type"]) => (
  <View style={styles.todoItemContainer} key={todo.id}>
    <Text
      style={{
        ...styles.todoItemText,
        textDecorationLine: todo.isDone ? "line-through" : "none",
        textDecorationColor: todo.isDone ? "red" : "black",
      }}
    >
      {todo.content}
    </Text>
    <Pressable
      onPress={async () => {
        await client.models.Todo.delete(todo);
      }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#ff6347" : "#ff4500" }, // Change color when pressed
      ]}
    >
      <Text style={styles.buttonText}>مسح</Text>
    </Pressable>

    <Pressable
      onPress={() => {
        client.models.Todo.update({
          id: todo.id,
          isDone: !todo.isDone,
        });
      }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#32cd32" : "#228b22" }, // Change color when pressed
      ]}
    >
      <Text style={styles.buttonText}>{todo.isDone ? "إعادة" : "تم"}</Text>
    </Pressable>

  </View>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  todoItemContainer: { flexDirection: "row", alignItems: "center", padding: 8 },
  todoItemText: { flex: 1, textAlign: "center" },
  listContainer: { flex: 1, alignSelf: "stretch", padding:8 },
  listItemSeparator: { backgroundColor: "lightgrey", height: 2 },
});

export default SurveyDetails;