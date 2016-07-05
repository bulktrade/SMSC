export function ItemConfig(value) {
  return function (target: Function) {
    Reflect.defineMetadata("ItemConfig", value, target);
  }
}