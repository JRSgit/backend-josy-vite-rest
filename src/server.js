import app from "./app.js";
const PORT = process.env.PORT ? Number(process.env.PORT) : 3333


app.listen(PORT, () => {
  console.log("Ouvindo porta 3333")
})
