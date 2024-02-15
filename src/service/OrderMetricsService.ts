import { EventEmitter } from 'node:events';

export const EVENT_NAMES = {
  productReview: 'productReview',
  addProductToCart: 'addProductToCart',
  removeProductFromCart: 'removeProductFromCart',
  makeOrder: 'makeOrder',
} as const;

type EventNamesKeys = keyof typeof EVENT_NAMES;

type EventNames = typeof EVENT_NAMES[EventNamesKeys];

export interface OrderMetricsServicePayload {
  userId: number;
  productId?: number;
  price?: number;
}

interface OrderMetricsServiceLoggerPayload extends OrderMetricsServicePayload{
  eventName: EventNames;
}

export class OrderMetricsService {
  constructor() {
    this.registerEvents();
  }

  public readonly EVENT_NAMES = EVENT_NAMES;

  private readonly eventEmitter = new EventEmitter();

  private readonly logger: OrderMetricsServiceLoggerPayload[] = [];

  public emit(eventName: EventNames, payload: OrderMetricsServicePayload): void {
    this.eventEmitter.emit(eventName, payload);
  }

  public get logs(): OrderMetricsServiceLoggerPayload[] {
    return this.logger;
  }

  private registerEvents(): void {
    Object.values(this.EVENT_NAMES).forEach((eventName: EventNames) => {
      this.eventEmitter.on(eventName, (payload) => {
        this.handleOnEventEmit(eventName, payload)
      });
    });
  }

  private handleOnEventEmit(eventName: EventNames, payload: OrderMetricsServicePayload) {
    this.logEvent({
      ...payload,
      eventName
    });
  }

  private logEvent(payload: OrderMetricsServiceLoggerPayload): void {
    this.logger.push(payload);
  }
}