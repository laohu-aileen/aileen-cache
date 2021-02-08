export interface Cache {
  /**
   * 读取缓存
   * @param key
   */
  get(key: string): Promise<string>;

  /**
   * 读取哈希
   * @param key
   */
  hgetall(key: string): Promise<{ [key: string]: string }>;

  /**
   * 写入缓存
   * @param key
   * @param value
   * @param timeout
   */
  set(key: string, value: string, timeout?: number): Promise<void>;

  /**
   * 删除缓存
   * @param key
   */
  del(key: string): Promise<void>;

  /**
   * 删除缓存
   * @param keys [string,...]
   */
  dels(keys: any): Promise<any>;

  /**
   * 抢锁
   * @param key
   * @param timeout
   */
  takeLock(key: string, timeout: number): Promise<string>;

  /**
   * 释放锁
   * @param key
   */
  freeLock(key: string): Promise<void>;

  /**
   * 锁续约
   * @param key
   */
  keepLock(key: string, lock: string, timeout: number): Promise<boolean>;
}
