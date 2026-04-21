import { memo, useEffect, useRef } from 'react';
import type { CompendiumItem } from '../../types/compendium';
import DOMPurify from 'dompurify';

interface CompendiumRowProps {
  item: CompendiumItem;
  index: number;
  isInspected: boolean;
  onInspect: (id: string) => void;
  tabIndex: 0 | -1;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => void;
}

export const CompendiumRow = memo(function CompendiumRow(
  props: CompendiumRowProps,
) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevTabIndex = useRef(props.tabIndex);

  useEffect(() => {
    if (prevTabIndex.current === -1 && props.tabIndex === 0) {
      buttonRef.current?.focus();
    }

    prevTabIndex.current = props.tabIndex;
  }, [props.tabIndex]);

  const baseClasses =
    'border-b border-gray-200 h-full flex flex-col justify-center px-4 transition-colors';

  const bgClasses = props.isInspected
    ? 'bg-blue-100'
    : 'bg-white hover:bg-gray-50 transition';

  return (
    <button
      ref={buttonRef}
      onClick={() => props.onInspect(props.item.id)}
      className={`${baseClasses} ${bgClasses} w-full text-left`}
      aria-pressed={props.isInspected}
      tabIndex={props.tabIndex}
      onKeyDown={(e) => props.onKeyDown(e, props.index)}
    >
      <strong className='text-gray-900 font-semibold'>
        #{props.index}: {props.item.name}
      </strong>
      <span
        className='text-sm text-gray-500 truncate'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.item.descriptionHtml),
        }}
      ></span>
    </button>
  );
});
