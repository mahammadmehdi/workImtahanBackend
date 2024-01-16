import express from 'express';
import mongoose, { Schema } from 'mongoose';
import cors from 'cors'
 
const app = express()
const port = 3000

app.use(express.json())

app.use(cors())

const heroSchema = new Schema({
    icon:String,
    name: String,
    description: String,
   
  });

  const heroModel = mongoose.model('Hero', heroSchema);

app.get('/', async (req, res) => {
    const hero = await heroModel.find({})
  res.send(hero)
})

app.get('/:id', async(req, res) => {
    const {id} = req.params
    const hero = await heroModel.findById(id)
    res.send(hero)
  })
  
  app.post('/', async(req, res) => {
    const {icon, name, description} = req.body
    const newHero = new heroModel({icon, name, description} )
    await newHero.save()
    res.send('Ugurla post oldu')
  })
  
  app.put('/:id', async (req, res) => {
    const {id} = req.params
    const {icon, name, description} = req.body
const hero = await heroModel.findByIdAndUpdate(id,{icon, name, description})
    res.send(hero)
  })
  
  app.delete('/:id',async (req, res) => {
    const {id} = req.params
    const hero = await heroModel.findByIdAndDelete(id)
    res.send(hero)
  })

  mongoose.connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})