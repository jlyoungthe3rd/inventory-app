import { memo } from 'react';
import type { CompendiumItem } from '../../types/compendium';
import DOMPurify from 'dompurify';

interface CompendiumRowProps {
  item: CompendiumItem;
  index: number;
  isInspected: boolean;
  onInspect: (id: string) => void;
}

export const CompendiumRow = memo(function CompendiumRow(
  props: CompendiumRowProps,
) {
  const baseClasses =
    'border-b border-gray-200 h-full flex flex-col justify-center px-4 transition-colors';

  const bgClasses = props.isInspected
    ? 'bg-blue-100'
    : 'bg-white hover:bg-gray-50 transition';
  return (
    <div
      onClick={() => props.onInspect(props.item.id)}
      className={`${baseClasses} ${bgClasses}`}
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
    </div>
  );
});
