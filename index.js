const express =require("express");
const users = require("./MOCK_DATA.json");
const locations = require("./LOCATION_MOCK_DATA.json");

const app = express();
const PORT = 8000;
const cors=require('cors');
app.use(cors({ origin: 'http://localhost:4200' }));
// app.use(cors());
// app.use(
//     cors({ 
//         origin: 'http://localhost:8000', 
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         allowedHeaders: [
//             'Content-Type', 
//             'Authorization', 
//             'Origin', 
//             'x-access-token', 
//             'XSRF-TOKEN'
//         ], 
//         preflightContinue: false 
//     })
// );

//Routes
app.get('/users', (req, res)=> {
   const html = `
   <ul>
   ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
   </ul>`;

   res.send(html);
});

app.get('/locations', (req, res)=> {
    const html = `
    <ul>
    ${locations.map((location) => `<li>${location.id}</li>`).join("")}
    </ul>`;
 
    res.send(html);
 });

 //REST API
app.get('/api/locations', (req, res)=>{
    return res.json(locations);
});

app.get('/api/locations/:id', (req, res)=>{
    const id = Number(req.params.id);

    const location = locations.find(location => location.id === id);
    
    return res.json(location);
});


//REST API
app.get('/api/users', (req, res)=>{
    return res.json(users);
});

app.get('/api/users/:id', (req, res)=>{
    const id = Number(req.params.id);
    // res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const user = users.find(user => user.id === id);
    
    return res.json(user);
});


app.listen(PORT, ()=> console.log(`Server started at PORT:${PORT}`));