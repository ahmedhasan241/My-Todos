import { db } from "../../db";
import { uuid } from "vue-uuid";
import { sendError } from "h3";

export default defineEventHandler(async (e) => {
  console.log(e);

  const method = e.req.method;
  if (method === "GET") {
    return db.todos;
  }
  if (method === "POST") {
    const body = await readBody(e);

    if (!body.item) {
      const TodoNotFoundError = createError({
        statusCode: 400,
        statusMessage: "No Item Provided",
        data: {},
      });

      sendError(e, TodoNotFoundError);
    }
    const newTodo = {
      id: uuid.v4(),
      item: body.item,
      completed: false,
    };

    db.todos.push(newTodo);

    return newTodo;
  }
});
