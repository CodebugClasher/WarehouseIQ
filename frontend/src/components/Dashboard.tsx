import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="px-4 py-6 space-y-8 bg-white">
      {/* Hero Banner */}
      <div className="w-full h-56 md:h-64 rounded-xl bg-gradient-to-r from-yellow-100 to-blue-100 flex items-center justify-between px-6 md:px-10 overflow-hidden shadow-md">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
            Welcome to WarehouseIQ
          </h1>
          <p className="text-gray-700 mt-2 text-sm md:text-base">
            Track your inventory, manage your warehouse, and optimize your supply chain with ease.
          </p>
          <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 text-sm">
            View Warehouses
          </button>
        </div>
        <img
          src="https://cdn-icons-png.freepik.com/256/10264/10264177.png?semt=ais_hybrid"
          alt="Walmart Promo"
          className="h-40 md:h-52 hidden md:block object-contain"
        />
      </div>
      
     {/* Categories Section */}
<div className="w-full px-4 md:px-8 space-y-4">
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">View Stocks by Category</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      {
        title: 'Groceries',
        image:
          'https://png.pngtree.com/background/20231013/original/pngtree-assortment-of-grocery-items-arranged-on-white-background-photo-picture-image_5492248.jpg',
        bg: 'bg-white-120',
      },
      {
        title: 'Electronics',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        bg: 'bg-white-120',
      },
      {
        title: 'Fashion',
        image:
          'https://www.shutterstock.com/image-photo/stylish-african-american-woman-striking-600nw-2453430777.jpg',
        bg: 'bg-white-120',
      },
      {
        title: 'Home & Kitchen',
        image:
          'https://thumbs.dreamstime.com/b/household-kitchen-appliances-table-against-color-background-interior-element-different-household-kitchen-appliances-118219727.jpg',
        bg: 'bg-white-120',
      },
    ].map((cat, idx) => (
      <div
        key={idx}
        className={`p-4 rounded-xl ${cat.bg} shadow hover:shadow-md transition flex flex-col justify-between`}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{cat.title}</h3>
        <img
          src={cat.image}
          alt={cat.title}
          className="w-full h-40 md:h-48 object-cover rounded-xl"
        />
      </div>
    ))}
  </div>
</div>

      {/* Featured Section */}
<div className="w-full px-4 md:px-8 space-y-4">
 <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT237BLHF1EKiJAR6fq0QiZADmDwMcufHLhzA&s',
        price: '₹3,499',
        current: 50,
        required: 100,
        status: 'LOW',
      },
      {
        img: 'https://t4.ftcdn.net/jpg/04/84/87/61/360_F_484876187_u6HIlCgA2iZdfkoOamuQa43OJH2zaDVR.jpg',
        price: '₹2,199',
        current: 90,
        required: 90,
        status: 'SUFFICIENT',
      },
      {
        img: 'https://t4.ftcdn.net/jpg/02/83/53/27/360_F_283532744_Rbs039ygDyekkcCgXp7n3fwEPfB21tjJ.jpg',
        price: '₹899',
        current: 30,
        required: 120,
        status: 'LOW',
      },
      {
        img: 'https://media.istockphoto.com/id/516075586/vector/vector-black-headphones.jpg?s=612x612&w=0&k=20&c=uoB_B57tC7Rd_PvJupIlNU5eL6ZM2Z8U2vhH8tDhwY0=',
        price: '₹1,299',
        current: 200,
        required: 150,
        status: 'HIGH',
      },
      {
        img: 'https://i.pinimg.com/736x/d3/be/cd/d3becdf372885062d43be71559e0580c.jpg',
        price: '₹599',
        current: 45,
        required: 100,
        status: 'LOW',
      },
      {
        img: 'https://previews.123rf.com/images/alexandrmoroz/alexandrmoroz1206/alexandrmoroz120600077/13894471-luxury-watch-isolated-on-a-white-background.jpg',
        price: '₹5,499',
        current: 120,
        required: 100,
        status: 'HIGH',
      },
      {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfN0x-Fxiatm97mfoIL_ctqJAEeF99kw9qA&s',
        price: '₹1,599',
        current: 90,
        required: 150,
        status: 'LOW',
      },
      {
        img: 'https://i.pinimg.com/736x/f3/7c/9f/f37c9fcd62cfe7925e97b93430532382.jpg',
        price: '₹1,799',
        current: 100,
        required: 100,
        status: 'SUFFICIENT',
      },
    ].map((prod, idx) => (
      <div
        key={idx}
        className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
      >
        <div className="w-full h-56 md:h-64 flex items-center justify-center">
          <img
            src={prod.img}
            alt={`Product ${idx + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-2xl shadow-md">
          <p className="text-sm text-gray-800">
            Price:
            <span className="ml-2 font-semibold text-blue-900">{prod.price}</span>
          </p>
          <p className="text-sm text-gray-800">
            Current Stock:
            <span className="ml-2 font-semibold text-blue-900">{prod.current} units</span>
          </p>
          <p className="text-sm text-gray-800">
            Required Stock:
            <span className="ml-2 font-semibold text-blue-900">{prod.required} units</span>
          </p>
          <p className="text-sm text-gray-800 font-semibold">
            Stock Status:
            <span
              className={`ml-2 font-extrabold ${
                prod.status === 'LOW'
                  ? 'text-red-700'
                  : prod.status === 'HIGH'
                  ? 'text-green-700'
                  : 'text-yellow-600'
              } tracking-wide uppercase`}
            >
              {prod.status}
            </span>
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Delivery Banner */}
      
    </div>
  );
};

export default Dashboard;
