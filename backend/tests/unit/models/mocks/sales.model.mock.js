const sales = [
    { id: 1, date: '2023-09-18 19:27:13' },
    { id: 1, date: '2023-09-18 19:27:25' },
  ];
  
  const salesProducts = [
    [
      {
        salesId: 1,
        productId: 1,
        quantity: 5,
      },
      {
        salesId: 1,
        productId: 2,
        quantity: 10,
      },
      {
        salesId: 2,
        productId: 3,
        quantity: 15,
      },
    ],
  ];
  
  const salesProductsById1 = [
    {
      date: '2023-09-18 19:27:13',
      productId: 1,
      quantity: 5,
    },
    {
      date: '2023-09-18 19:27:25',
      productId: 2,
      quantity: 10,
    },
  ];
  
  const salesProductsResult = [
    {
      date: '2023-09-18 19:27:13',
      productId: 1,
      quantity: 5,
    },
    {
      date: '2023-09-18 19:27:25',
      productId: 2,
      quantity: 10,
    },
  ];

  const getByIdMockWithData = [{
    // date: '2023-05-01T22:14:17.000Z',
    date: '2023-09-18 19:27:25',
    productId: 3,
    quantity: 15,
  }];
  
  module.exports = {
    sales,
    salesProducts,
    salesProductsById1,
    salesProductsResult,
    getByIdMockWithData,
  };