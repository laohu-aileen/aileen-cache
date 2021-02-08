import IoRedis, { Redis, RedisOptions } from "ioredis";
import { Cache } from "./interface";
import { v1 as uuid } from "uuid";

export class CacheImpl implements Cache {
  protected engine: Redis;
  constructor(option: RedisOptions) {
    this.engine = new IoRedis(option);
  }

  /**
   * 读取缓存
   * @param key
   */
  get(key: string): Promise<string> {
    return this.engine.get(key);
  }

  /**
   * 写入缓存
   * @param key
   * @param value
   * @param timeout
   */
  async set(key: string, value: string, timeout: number = 7200): Promise<void> {
    await this.engine.setex(key, timeout, value);
  }

  /**
   * 读取哈希
   * @param key
   */
  hgetall(
    key: string
  ): Promise<{
    [key: string]: string;
  }> {
    return this.engine.hgetall(key);
  }

  async del(key: string): Promise<void> {
    await this.engine.del(key);
  }

  async dels(keys: any): Promise<void> {
    await this.engine.del(keys);
  }

  async takeLock(key: string, timeout: number) {
    const id = uuid();
    const lock = await this.engine.set(key, id, "PX", timeout * 1000, "NX");
    return lock ? id : null;
  }

  async freeLock(key: string): Promise<void> {
    await this.engine.del(key);
  }

  async keepLock(key: string, lock: string, timeout: number): Promise<boolean> {
    let id = await this.engine.get(key);
    if (id !== lock) return false;
    await this.engine.expire(key, timeout);
    id = await this.engine.get(key);
    return id === lock;
  }
}
