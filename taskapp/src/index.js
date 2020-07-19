const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/userRouters');
const taskRouter = require('./routers/taskRouters');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () =>
  console.log(`[APP]: listening on http://localhost:${PORT}`)
);
