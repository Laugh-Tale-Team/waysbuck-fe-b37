import mango from '../assets/mango.svg';
import bubble from '../assets/bubble-tea-gelatin.svg';
import greencoco from '../assets/green-coconut.svg';
import bobamango from '../assets/boba-mango.svg';
import berry from '../assets/berry.svg';
import kiwi from '../assets/kiwi.png';
import strawberry from '../assets/strawberry-popping.svg';
import matchacan from '../assets/matcha-can.svg';
import brand1 from "../assets/product.svg"
import brand2 from "../assets/product1.svg"
import brand3 from "../assets/product2.svg"
import brand4 from "../assets/product3.svg"

export let dataProduct = [{
        id: 1,
        name: "Boba Milk Tea",
        price: 27000,
        image: brand1,
    },
    {
        id: 2,
        name: "Boba Chocolate",
        price: 25000,
        image: brand2,
    },
    {
        id: 3,
        name: "Boba Cheese",
        price: 28000,
        image: brand3,
    },
    {
        id: 4,
        name: "Boba Taro",
        price: 24000,
        image: brand4,
    },
];

export let dataTopping = [{
        name: "Mango",
        image: mango,
        price: 6000
    },
    {
        name: "Bubble Tea Gelatin",
        image: bubble,
        price: 5000
    },
    {
        name: "Green Coconut",
        image: greencoco,
        price: 4000
    },
    {
        name: "Boba Mango",
        image: bobamango,
        price: 5000
    },
    {
        name: "Bill Berry Boba",
        image: berry,
        price: 6000
    },
    {
        name: "Kiwi Popping Pearl",
        image: kiwi,
        price: 5000
    },
    {
        name: "Matcha Cantoloupe",
        image: matchacan,
        price: 6000
    },
    {
        name: "Strawberry Popping",
        image: strawberry,
        price: 5000
    },
];
export let dataIncome = [{
        id: "1",
        name: "Budi",
        address: "jl.elang IV",
        postcode: "62738",
        income: 50000,
        status: "success",
        order: [{
            id: 1,
            title: "Ice Coffe Palm Sugar",
            image: brand4,
            price: 25000,
            toppings:[{
                id: 3,
                title:"Green Coconut",
                price: 5000
            },
            {
                id: 2,
                title:"Bubble Tea Gelatin",
                price: 5000
            }]
        },
        {
            id: 5,
            title: "Ice Tea",
            image: brand3,
            price: 10000,
            toppings:[{
                id: 5,
                title:"Bill Berry Boba",
                price: 5000
            }]
        }
    ]
    },
    {
        id: "2",
        name: "Mana",
        address: "jl.kalimantan",
        postcode: "17488",
        income: 50000,
        status: "success",
        order: [{
            id: 1,
            title: "Ice Coffe Palm Sugar",
            price: 25000,
            image: brand4,
            toppings:[{
                id: 3,
                title:"Green Coconut",
                price: 5000
            },
            {
                id: 2,
                title:"Bubble Tea Gelatin",
                price: 5000
            }]
        }
    ]
    }
];

export let userData = [{
        id: 1,
        name: 'admin',
        email: 'admin@gmail.com',
        password: '1234',
        status: 'admin',
    },
    {
        id: 2,
        name: 'user',
        email: 'user@mail.com',
        password: '1234',
        status: 'customer',
    },
];
export let cartList = [
    {   id: "1",
        name: "Budi",
        address: "jl.elang IV",
        postcode: "62738",
        income: 50000,
        status: "success",
        order: [{
            id: 1,
            title: "Ice Coffe Palm Sugar",
            image: brand4,
            price: 25000,
            toppings:[{
                id: 3,
                title:"Green Coconut",
                price: 5000
            },
            {
                id: 2,
                title:"Bubble Tea Gelatin",
                price: 5000
            }]
        },
        {
            id: 5,
            title: "Ice Tea",
            image: brand3,
            price: 10000,
            toppings:[{
                id: 5,
                title:"Bill Berry Boba",
                price: 5000
            }]
        }
    ]
    }
]