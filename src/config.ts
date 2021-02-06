import { RedisOptions } from "ioredis";

export interface Config extends RedisOptions {
  enable?: boolean;
}
