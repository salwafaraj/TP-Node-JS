const express = require('express');
const app = express();
app.use(express.json());

let items = []; 
app.get('/', (req, res) => {
    res.send('Bonjour Salwa Faraj !');
});
app.post('/items', (req, res) => {
    const newItem = req.body; 
    if (!newItem || Object.keys(newItem).length === 0) {
        return res.status(400).send('Un élément est requis'); 
    }
    newItem.id = items.length + 1; 
    items.push(newItem);
    console.log('Éléments actuels :', items); 
    res.status(201).send(items);
});
app.get('/items', (req, res) => {
    res.status(200).send(items); 
});
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id); 
    const item = items.find(i => i.id === itemId);

    if (!item) {
        return res.status(404).send('Élément non trouvé'); 
    }

    res.status(200).send(item); 
});


// PUT endpoint to update an item
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id); // Extract the ID
    const index = items.findIndex(i => i.id === id); // Find the index of the item
  
    if (index !== -1) {
        items[index] = { ...items[index], ...req.body }; // Update the item with the new data
        res.status(200).json(items[index]); // Return the updated item
    } else {
        res.status(404).json({ message: 'Item not found' }); // Return a 404 if not found
    }
  });
  // DELETE endpoint to remove an item
  app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id); // Extract the ID
    const index = items.findIndex(i => i.id === id); // Find the index of the item
  
    if (index !== -1) {
        const deletedItem = items.splice(index, 1); // Remove the item from the array
        res.status(200).json(deletedItem); // Return the deleted item
    } else {
        res.status(404).json({ message: 'Item not found' }); // Return a 404 if not found
    }
  });
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
