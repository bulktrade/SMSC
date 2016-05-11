declare var Reflect;

export function NavigationConfig(value) {
  return (target: Function) => {
    Reflect.defineMetadata("NavigationConfig", value, target);
  }
}
