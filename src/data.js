import  Axios,* as others  from "axios";
const data = []  
const https = require('https');

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// {httpsAgent:agent,}
// })  
function Dataf(){
         Axios.get("http://localhost:3001/data",).then((response)=>{
                 // console.log(typeof(response.data));
                 
                 
                response.data.forEach(element => {
                        // var iden = parseInt(data.id);
                        //  if(iden != element.Item_id){
                        //         data.push(element);
                        //  }
                        data.push(element);
                });
                
        }).catch((err) => {
                console.log(err)
            })
        // console.log("loaded");
        console.log(data);
}

Dataf();
export default data;


 // {id:"1",image:"https://i0.wp.com/beewel.in/wp-content/uploads/2022/11/South-Indian-Filter-Coffee-with-filter.jpg?fit=600%2C600&ssl=1",title:"Coffee Powder",text:"asfg",price:90,stock:10},
        // {id:"2",image:"https://images-prod.healthline.com/hlcmsresource/images/AN_images/coffee-worlds-biggest-source-of-antioxidants-1296x728-feature.jpg",title:"Cappucino",text:"asfg",price:60,stock:30},
        // {id:"3",image:"https://hips.hearstapps.com/hmg-prod/images/iced-coffee-1597680350.jpg?crop=1.00xw:0.655xh;0,0.0838xh",title:"Cold Coffee",text:"asfg",price:60,stock:10},
        // {id:"4",image:"https://www.forkinthekitchen.com/wp-content/uploads/2022/06/220518.homemade.caramel.latte-6630-1200x1200.jpg",title:"Laṭte",text:"wrwoqrtwort",price:60,stock:10},

