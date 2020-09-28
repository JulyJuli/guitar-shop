import { OrderByPipe } from './order-by.pipe';

describe('orderby pipe', () => {
  const pipe = new OrderByPipe();

  it('should order by name (desc)', () => {
    const testData = [
      { name: '1', price: 1101 },
      { name: '3', price: 151 },
      { name: 'aaa', price: 9 }
    ];

    const result = pipe.transform(testData, 'name');

    expect(result[0].name).toBe('1');
    expect(result[1].name).toBe('3');
    expect(result[2].name).toBe('aaa');
  });

  it('should order by price (acs)', () => {
    const testData = [
      { price: 1101 },
      { price: 30 },
      { price: 658 }
    ];

    const result = pipe.transform(testData, 'price', true);

    expect(result[0].price).toBe(30);
    expect(result[1].price).toBe(658);
    expect(result[2].price).toBe(1101);
  });
});
