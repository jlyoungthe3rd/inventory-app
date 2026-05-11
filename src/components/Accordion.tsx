import { useId, useState, type ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className='border border-gray-200 rounded-md mb-2'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {title}
      </button>

      {isOpen && (
        <div
          id={contentId}
          className='p-4 border-t border-gray-200 bg-white flex-col flex'
        >
          {children}
        </div>
      )}
    </div>
  );
};
