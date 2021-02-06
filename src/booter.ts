import { declareRegister } from "aileen-core";
import { ConfigBean, CacheBean } from "./injector";
import { Config } from "./config";
import { CacheImpl } from "./cache";

/**
 * 声明启动器
 */
export const register = declareRegister(async (app, next) => {
  // 插件未配置
  if (!app.has(ConfigBean.ID)) return await next();

  // 服务不启动
  const config = app.get<Config>(ConfigBean.ID);
  if (!config.enable) return await next();

  // 注册依赖
  app.bind(CacheBean.ID).toFactory(() => new CacheImpl(config));

  // 执行应用启动
  await next();
});
