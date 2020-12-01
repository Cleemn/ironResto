const mongoose = require('mongoose');
const Product = require('../models/Product.model');
 
const dbtitle = 'ironresto';
mongoose.connect(`mongodb://localhost/${dbtitle}`, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
  .then( db => {
  console.log(`connected to ${db}`);
})
  .catch(err => {
  console.log(`Connexion problem: ${err}`);
});


Product.collection.drop();

const dataProduct = [
  {
    name: "Pizza",
    price: 15,
    description: "La pizza est une recette de cuisine traditionnelle de la cuisine italienne, originaire de Naples en Italie à base de galette de pâte à pain, garnie de divers mélanges d’ingrédients et cuite au four.",
    type: 'plat',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHwyfDB8&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Nachos",
    price: 8,
    description: "Les nachos sont un mets américain à base de farine de maïs ayant subi le processus de nixtamalisation. Associés à la cuisine tex-mex, ils peuvent être consommés soit rapidement comme collation ou bien avec différents accompagnements afin d'en faire un repas complet.",
    type: 'entree',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1582170090097-b251ddbbf7f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=914&q=80"
  },
  {
    name: "Burger",
    price: 13,
    description: "Un hamburger ou par aphérèse burger, est un sandwich d'origine allemande, composé de deux pains de forme ronde généralement garnis de steak haché et de crudités, salade, tomate, oignon, cornichon, et de sauce…",
    type: 'plat',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyfGVufDB8MnwwfA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Whopper",
    price: 13,
    description: "Le Whopper est un hamburger, consistant en un patty de bœuf haché grillé à la flamme, avec de la mayonnaise, de la salade, deux rondelles de tomate, des rondelles de cornichon, du ketchup et trois rondelles d'oignon dans un pain non croustillant mais légèrement grillé et garni de graines de sésame.",
    type: 'plat',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Gateau au chocolat",
    price: 6,
    description: "Un gâteau au chocolat est une pâtisserie à base de chocolat. Il existe de nombreuses recettes à travers le monde. Cette forme de gâteau aurait été imaginée à la fin du XVIIIe siècle, après plusieurs siècles d'utilisation du chocolat uniquement en boisson.",
    type: 'dessert',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1565808229224-264b6fcc5052?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfDJ8MHw%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Nems",
    price: 6,
    description: "Le nem rán ou chả giò est un mets festif traditionnel du Viêt Nam. Très apprécié à l'ancienne cour impériale, ce mets est communément appelé pâté impérial ou rouleau impérial dans la francophonie et fried spring roll, spring roll ou vietnamese roll dans les pays anglo-saxons et à Hong Kong.",
    type: 'entree',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1548029960-695d127f4543?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Salade",
    price: 6,
    description: "La salade est initialement un mets préparé, composé de feuilles d'herbes potagères crues, éventuellement assaisonnées de vinaigrette.",
    type: 'entree',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1548811226-4f26123652c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Gratin de légumes",
    price: 9,
    description: "Un gratin est une préparation qui est cuite au four ou dont une partie de la cuisson se passe au four, en utilisant plus particulièrement le gril, ou à la salamandre, de telle sorte qu'il se forme en surface de la préparation une croûte plus ou moins légère et dorée.",
    type: 'plat',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1586032063807-8c6e8e5a466c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Tarte aux pommes",
    price: 4,
    description: "La tarte aux pommes est un type de tarte sucrée, faite d'une pâte feuilletée ou brisée garnie de pommes émincées. Cette tarte peut être consommée chaude, tiède ou froide.",
    type: 'dessert',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1588227071345-751a485e2f79?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFwcGxlJTIwcGllfGVufDB8MnwwfA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Tarte aux myrtilles",
    price: 4,
    description: "La tarte aux myrtilles ou tarte aux bleuets est une tarte sucrée / pâtisserie garnie de myrtilles ou de bleuets.",
    type: 'dessert',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1525151498231-bc059cfafa2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Pates",
    price: 10,
    description: "La sauce bolognaise est une sauce de la région de Bologne. Elle se cuisine essentiellement à base de coulis de tomate, d'oignon et de viande de bœuf.",
    type: 'plat',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1586955080976-3854194bf139?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGFzdGF8ZW58MHwyfDB8&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Smoothie",
    price: 3,
    description: "Un smoothie ou frappé aux fruits au Canada est un type de boisson réalisée à partir de fruits et de légumes mixés, parfois mélangés à des jus de fruits.",
    type: 'boisson',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1561730734-3a27c18743e8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29jYXxlbnwwfDJ8MHw%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Café",
    price: 3,
    description: "Le café est une boisson énergisante psychotrope stimulante, obtenue à partir des graines torréfiées de diverses variétés de caféier, de l'arbuste caféier, du genre Coffea.",
    type: 'boisson',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1550329869-0c8c34e3fc42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Salade de fruits",
    price: 5,
    description: "La salade de fruits est un dessert composé d'un mélange de fruits. La salade de fruits peut se déguster en toutes saisons. Il en existe différentes recettes en fonction des saisons ou des pays.",
    type: 'dessert',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1541598060305-1a7438a7f937?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Fruits",
    price: 3,
    description: "Dans le langage courant et en cuisine, un fruit est un aliment végétal, à la saveur sucrée, généralement consommé cru.",
    type: 'dessert',
    portion: 1,
    calories: 200,
    photo: "https://images.unsplash.com/photo-1544859450-08a01cd8208b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];
  
Product.insertMany(dataProduct)
  .then( data => {
    console.log("data inserted");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(`Error while inserting products: ${err}`);
  })
;