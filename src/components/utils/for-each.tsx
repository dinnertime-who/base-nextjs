import * as React from "react";

type ForEachProps<T> = {
  items: T[];
  component: React.ComponentType<{ item: T; index: number }>;
  keyExtractor?: (item: T, index: number) => string | number;
  fallback?: React.ReactNode;
};

export function ForEach<T>({
  items,
  component: Component,
  keyExtractor = (_, index) => index,
  fallback = null,
}: ForEachProps<T>) {
  if (items.length === 0) {
    return fallback;
  }

  return items.map((item, index) => (
    <Component key={keyExtractor(item, index)} item={item} index={index} />
  ));
}
