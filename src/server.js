import app from "./app.js";
const PORT = process.env.PORT ? Num(process.env.PORT) : 3333


app.listen(PORT, () => {
  console.log("Ouvindo porta 3333")
})
