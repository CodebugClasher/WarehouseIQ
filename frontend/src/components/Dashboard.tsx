import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="px-4 py-6 space-y-8 bg-white">
      {/* Hero Banner */}
      <div className="w-full h-56 md:h-64 rounded-xl bg-gradient-to-r from-yellow-100 to-blue-100 flex items-center justify-between px-6 md:px-10 overflow-hidden shadow-md">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
            Big Savings This Week
          </h1>
          <p className="text-gray-700 mt-2 text-sm md:text-base">
            Shop top deals across groceries, electronics & fashion
          </p>
          <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 text-sm">
            View Deals
          </button>
        </div>
        <img
           src="https://images.seeklogo.com/logo-png/29/2/walmart-spark-logo-png_seeklogo-292795.png"
          alt="Walmart Promo"
          className="h-40 md:h-52 hidden md:block object-contain"
        />
      </div>

      {/* Categories */}
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
            <h3 className="text-lg font-semibold text-gray-800">{cat.title}</h3>
  
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-50 md:h-50 object-cover rounded-xl"
            />
          </div>
        ))}
      </div>


      {/* Featured Section */}
      <div className="w-full px-4 md:px-8 space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT237BLHF1EKiJAR6fq0QiZADmDwMcufHLhzA&s',
            'https://t4.ftcdn.net/jpg/04/84/87/61/360_F_484876187_u6HIlCgA2iZdfkoOamuQa43OJH2zaDVR.jpg',
            'https://t4.ftcdn.net/jpg/02/83/53/27/360_F_283532744_Rbs039ygDyekkcCgXp7n3fwEPfB21tjJ.jpg',
            'https://media.istockphoto.com/id/516075586/vector/vector-black-headphones.jpg?s=612x612&w=0&k=20&c=uoB_B57tC7Rd_PvJupIlNU5eL6ZM2Z8U2vhH8tDhwY0=',
            'https://i.pinimg.com/736x/d3/be/cd/d3becdf372885062d43be71559e0580c.jpg',
            'https://previews.123rf.com/images/alexandrmoroz/alexandrmoroz1206/alexandrmoroz120600077/13894471-luxury-watch-isolated-on-a-white-background.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfN0x-Fxiatm97mfoIL_ctqJAEeF99kw9qA&s',
            'https://i.pinimg.com/736x/f3/7c/9f/f37c9fcd62cfe7925e97b93430532382.jpg',
          ].map((imgUrl, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              <div className="w-full h-56 md:h-64 flex items-center justify-center">
                <img
                  src={imgUrl}
                  alt={`Product ${idx + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-gray-800">Product {idx + 1}</h3>
                <p className="text-blue-600 font-bold text-sm mt-1">$19.99</p>
                <button className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Delivery Banner */}
      <div className="w-full bg-blue-50 border-l-4 border-blue-400 p-4 rounded shadow-sm">
        <h4 className="text-lg font-semibold text-blue-800">Free Delivery</h4>
        <p className="text-sm text-gray-600 mt-1">
          Get free next-day delivery on orders above ₹999. No membership required!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
