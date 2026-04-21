import { useState } from 'react';

export interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function VirtualList<T>(props: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollTop(target.scrollTop);
  };

  const startIndex = Math.floor(scrollTop / props.itemHeight);
  const visibleCount = Math.ceil(props.containerHeight / props.itemHeight);
  const endIndex = Math.min(props.items.length, startIndex + visibleCount + 2);
  const visibleItems = props.items.slice(startIndex, endIndex);

  return (
    <div
      className='relative overflow-y-auto w-full border border-gray-300 rounded-md shadow-inner bg-white'
      style={{ height: props.containerHeight }}
      onScroll={handleScroll}
    >
      <ul
        className='w-full'
        style={{ height: props.items.length * props.itemHeight }}
      >
        {visibleItems.map((item, localIndex) => {
          const trueIndex = startIndex + localIndex;
          return (
            <li
              key={trueIndex}
              className='absolute top-0 left-0 w-full'
              style={{
                height: props.itemHeight,
                transform: `translateY(${trueIndex * props.itemHeight}px)`,
              }}
            >
              {props.renderItem(item, trueIndex)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
