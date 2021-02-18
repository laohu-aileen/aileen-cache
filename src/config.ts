import { NatMap, PreferredSlaves, SecureContextOptions } from "ioredis";
import { ConnectionOptions } from "tls";

export interface Config {
  // 开关
  enable?: boolean;

  // 端口
  port?: number;

  // 主机
  host?: string;

  /**
   * 4 (IPv4) 或 6 (IPv6), 默认是 4.
   */
  family?: number;

  /**
   * 本地Socket路径. 如果设置该熟悉, host 和 family 将被忽略.
   */
  path?: string;

  /**
   * 设置 TCP 连接后连接保持时间. 设置一份非数值参数则不使用长连接.
   */
  keepAlive?: number;
  connectionName?: string;

  /**
   * 设置Redis授权账号仅限版本 >=6.
   */
  username?: string;
  /**
   * 连接严重密码
   */
  password?: string;
  /**
   * Database index to use.
   */
  db?: number;

  /**
   * When a connection is established to the Redis server, the server might still be loading
   * the database from disk. While loading, the server not respond to any commands.
   * To work around this, when this option is true, ioredis will check the status of the Redis server,
   * and when the Redis server is able to process commands, a ready event will be emitted.
   */
  enableReadyCheck?: boolean;
  keyPrefix?: string;

  /**
   * When the return value isn't a number, ioredis will stop trying to reconnect.
   * Fixed in: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/15858
   */
  retryStrategy?(times: number): number | void | null;

  /**
   * By default, all pending commands will be flushed with an error every
   * 20 retry attempts. That makes sure commands won't wait forever when
   * the connection is down. You can change this behavior by setting
   * `maxRetriesPerRequest`.
   *
   * Set maxRetriesPerRequest to `null` to disable this behavior, and
   * every command will wait forever until the connection is alive again
   * (which is the default behavior before ioredis v4).
   */
  maxRetriesPerRequest?: number | null;

  /**
   * 1/true means reconnect, 2 means reconnect and resend failed command. Returning false will ignore
   * the error and do nothing.
   */
  reconnectOnError?(error: Error): boolean | 1 | 2;
  /**
   * By default, if there is no active connection to the Redis server, commands are added to a queue
   * and are executed once the connection is "ready" (when enableReadyCheck is true, "ready" means
   * the Redis server has loaded the database from disk, otherwise means the connection to the Redis
   * server has been established). If this option is false, when execute the command when the connection
   * isn't ready, an error will be returned.
   */
  enableOfflineQueue?: boolean;
  /**
   * The milliseconds before a timeout occurs during the initial connection to the Redis server.
   * default: 10000.
   */
  connectTimeout?: number;
  /**
   * After reconnected, if the previous connection was in the subscriber mode, client will auto re-subscribe these channels.
   * default: true.
   */
  autoResubscribe?: boolean;
  /**
   * If true, client will resend unfulfilled commands(e.g. block commands) in the previous connection when reconnected.
   * default: true.
   */
  autoResendUnfulfilledCommands?: boolean;
  lazyConnect?: boolean;

  tls?: ConnectionOptions;

  /**
   * default: "master".
   */
  role?: "master" | "slave";

  /**
   * default: null.
   */
  name?: string;
  sentinelUsername?: string;
  sentinelPassword?: string;
  sentinels?: Array<{ host: string; port: number }>;
  /**
   * If `sentinelRetryStrategy` returns a valid delay time, ioredis will try to reconnect from scratch.
   * default: function(times) { return Math.min(times * 10, 1000); }
   */
  sentinelRetryStrategy?(times: number): number | void | null;

  /**
   * Can be used to prefer a particular slave or set of slaves based on priority.
   */
  preferredSlaves?: PreferredSlaves;

  /**
   * Whether to support the `tls` option when connecting to Redis via sentinel mode.
   * default: false.
   */
  enableTLSForSentinelMode?: boolean;
  sentinelTLS?: SecureContextOptions;

  /**
   * NAT map for sentinel connector.
   * default: null.
   */
  natMap?: NatMap;

  /**
   * Update the given `sentinels` list with new IP addresses when communicating with existing sentinels.
   * default: true.
   */
  updateSentinels?: boolean;

  /**
   * Enable READONLY mode for the connection. Only available for cluster mode.
   * default: false.
   */
  readOnly?: boolean;

  /**
   * If you are using the hiredis parser, it's highly recommended to enable this option.
   * Create another instance with dropBufferSupport disabled for other commands that you want to return binary instead of string
   */
  dropBufferSupport?: boolean;

  /**
   * Whether to show a friendly error stack. Will decrease the performance significantly.
   */
  showFriendlyErrorStack?: boolean;

  /**
   * When enabled, all commands issued during an event loop iteration are automatically wrapped in a
   * pipeline and sent to the server at the same time. This can improve performance by 30-50%.
   * default: false.
   */
  enableAutoPipelining?: boolean;
}
