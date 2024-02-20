import { OrderMetricsService, EVENT_NAMES } from '../../service/OrderMetricsService';

export default async function(): Promise<void> {
  try {
    const orderMetricsService = new OrderMetricsService();

    // Review a product
    orderMetricsService.emit(EVENT_NAMES.productReview, {
      userId: 1,
      productId: 1,
      price: 100,
    });

    // Add product to card
    orderMetricsService.emit(EVENT_NAMES.addProductToCart, {
      userId: 1,
      productId: 1,
      price: 100,
    });

    // Review another product
    orderMetricsService.emit(EVENT_NAMES.productReview, {
      userId: 1,
      productId: 2,
      price: 80,
    });

    // Add product to card
    orderMetricsService.emit(EVENT_NAMES.addProductToCart, {
      userId: 1,
      productId: 2,
      price: 80
    });

    // Review another product
    orderMetricsService.emit(EVENT_NAMES.productReview, {
      userId: 1,
      productId: 3,
      price: 55
    });

    // Add product to card
    orderMetricsService.emit(EVENT_NAMES.addProductToCart, {
      userId: 1,
      productId: 3,
      price: 90
    });

    // Remove product from card
    orderMetricsService.emit(EVENT_NAMES.removeProductFromCart, {
      userId: 1,
      productId: 2,
      price: 80,
    });

    // Make order
    orderMetricsService.emit(EVENT_NAMES.makeOrder, {
      userId: 1,
    });

    // Show logs
    console.log('[Task 2]: ');
    console.table(orderMetricsService.logs);
  } catch (e) {
    console.error('[Task 2]: ', e);
  }
}